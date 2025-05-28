import React, { useState, useRef, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Animated, Image, KeyboardAvoidingView, Platform, Keyboard,
TouchableWithoutFeedback, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getStyles } from './styles/stylecadastro'; 


const FIREBASE_API_KEY = Constants.expoConfig.extra.FIREBASE_API_KEY;

export default function Cadastrar({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('darkTheme');
      if (temaSalvo !== null) setIsDark(temaSalvo === 'true');
    };
    carregarTema();
  }, []);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardStatus(true)
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardStatus(false)
    );
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (errorMessage) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timeout = setTimeout(() => {
        setErrorMessage('');
        fadeAnim.setValue(0);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  const getFirebaseErrorMessage = (errorCode) => {
    const errorMessages = {
      EMAIL_EXISTS: 'Este e-mail já está cadastrado.',
      INVALID_EMAIL: 'O e-mail informado é inválido.',
      WEAK_PASSWORD: 'A senha deve conter no mínimo 6 caracteres.',
      OPERATION_NOT_ALLOWED: 'Cadastro desabilitado temporariamente.',
      DEFAULT: 'Ocorreu um erro. Tente novamente mais tarde.',
    };

    const code = errorCode.replace('auth/', '').split(':')[0].trim().toUpperCase();
    return errorMessages[code] || errorMessages.DEFAULT;
  };

  const handleCadastro = async () => {
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Preencha todos os campos para se cadastrar.');
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();
      console.log('Resposta Firebase cadastro:', data);

      if (!response.ok) throw new Error(data.error.message);

      await AsyncStorage.setItem('token', data.idToken);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      console.log('Erro no cadastro:', error.message);
      setErrorMessage(getFirebaseErrorMessage(error.message));
    }
  };

  const styles = getStyles(isDark);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.contentContainer, keyboardStatus && styles.keyboardActive]}>
            <Image
              source={require('./img/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>BrailleDog</Text>

            {errorMessage !== '' && (
              <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
                <Icon name="alert-circle" size={16} color="#d32f2f" />
                <Text style={styles.errorText}> {errorMessage}</Text>
              </Animated.View>
            )}

            <View style={styles.inputContainer}>
              <Icon name="email" size={22} color={isDark ? '#00BFFF' : '#666'} style={styles.icon} />
              <TextInput
                placeholder="E-mail"
                placeholderTextColor={isDark ? '#aaa' : '#999'}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={22} color={isDark ? '#00BFFF' : '#666'} style={styles.icon} />
              <TextInput
                placeholder="Senha (mínimo 06 caracteres)"
                placeholderTextColor={isDark ? '#aaa' : '#999'}
                style={styles.input}
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon name={passwordVisible ? "eye-off" : "eye"} size={22} color={isDark ? '#00BFFF' : '#666'} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleCadastro}
              disabled={!email.trim() || !password.trim()}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerText}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

