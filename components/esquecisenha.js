import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const FIREBASE_API_KEY = Constants.expoConfig.extra.FIREBASE_API_KEY;

export default function EsqueciSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('darkTheme');
      if (temaSalvo !== null) setIsDark(temaSalvo === 'true');
    };
    carregarTema();
  }, []);

  const styles = getStyles(isDark);

  const handleResetPassword = async () => {
    if (!email) {
      setErro('Informe um e-mail válido');
      setMensagem('');
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMensagem('E-mail de redefinição enviado!');
        setErro('');
      } else {
        const errorMessage = data.error?.message;
        if (errorMessage === 'EMAIL_NOT_FOUND') {
          setErro('Esse e-mail não está cadastrado');
        } else {
          setErro('Erro ao enviar e-mail. Tente novamente.');
        }
        setMensagem('');
      }
    } catch (error) {
      setErro('Erro de conexão. Tente novamente.');
      setMensagem('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#121212' : '#a9c2e7'} />
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={isDark ? '#aaa' : '#999'}
      />

      {erro ? <Text style={styles.error}>{erro}</Text> : null}
      {mensagem ? <Text style={styles.success}>{mensagem}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#a9c2e7',
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: isDark ? '#00BFFF' : '#333',
    },
    input: {
      backgroundColor: isDark ? '#2d2d2d' : '#fff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      fontSize: 16,
      color: isDark ? '#00BFFF' : '#333',
    },
    button: {
      backgroundColor: isDark ? '#FFD700' : '#4a4aa3',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: isDark ? '#00BFFF' : '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    link: {
      textAlign: 'center',
      marginTop: 15,
      color: isDark ? '#00BFFF' : '#333',
      textDecorationLine: 'underline',
    },
    error: {
      color: '#d32f2f',
      marginBottom: 10,
      textAlign: 'center',
    },
    success: {
      color: 'green',
      marginBottom: 10,
      textAlign: 'center',
    },
  });
