import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_API_KEY } from '@env';

export default function EsqueciSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');


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
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9c2e7',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4a4aa3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#333',
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
