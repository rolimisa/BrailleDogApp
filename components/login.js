import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const FIREBASE_API_KEY = Constants.expoConfig.extra.FIREBASE_API_KEY;

export default function Login({ navigation }) {
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

  const getFirebaseErrorMessage = (message) => {
    const errorMessages = {
      EMAIL_NOT_FOUND: 'Usuário não encontrado',
      INVALID_PASSWORD: 'Senha incorreta',
      USER_DISABLED: 'Esta conta foi desativada',
      INVALID_EMAIL: 'E-mail inválido',
      TOO_MANY_ATTEMPTS_TRY_LATER: 'Muitas tentativas. Tente mais tarde',
      MISSING_PASSWORD: 'Preencha a senha',
      MISSING_EMAIL: 'Preencha o e-mail',
      INVALID_LOGIN_CREDENTIALS: 'E-mail ou senha inválidos',
      DEFAULT: 'Erro ao fazer login. Tente novamente.'
    };
    return errorMessages[message] || errorMessages.DEFAULT;
  };

  const handleLogin = async () => {
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Preencha todos os campos para fazer login.');
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        console.log('Resposta do Firebase com erro:', data);
        const firebaseMsg = data?.error?.message || 'DEFAULT';
        throw new Error(firebaseMsg);
      }

      await AsyncStorage.setItem('token', data.idToken);
      navigation.reset({ index: 0, routes: [{ name: 'Menu' }] });
    } catch (error) {
      console.log('Erro de login:', error.message);
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
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={[styles.contentContainer, keyboardStatus && styles.keyboardActive]}>
            <Image source={require('./img/logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>BrailleDog</Text>

            {errorMessage !== '' && (
              <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
                <Icon name="alert-circle" size={16} color="#d32f2f" />
                <Text style={styles.errorText}> {errorMessage}</Text>
              </Animated.View>
            )}

            <View style={styles.inputContainer}>
              <Icon name="email" size={22} color={isDark ? '#ccc' : '#666'} style={styles.icon} />
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
              <Icon name="lock" size={22} color={isDark ? '#ccc' : '#666'} style={styles.icon} />
              <TextInput
                placeholder="Senha"
                placeholderTextColor={isDark ? '#aaa' : '#999'}
                style={styles.input}
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={22} color={isDark ? '#ccc' : '#666'} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')}>
              <Text style={styles.forgotText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={!email.trim() || !password.trim()}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}>
              <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#a9c2e7',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  keyboardActive: {
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 40,
    color: isDark ? '#00BFFF' : '#333',
  },
  logo: {
    width: 200,
    height: 250,
    marginBottom: 20,
    borderRadius: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#2d2d2d' : '#fff',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
    color: isDark ? '#00BFFF' : '#666',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: isDark ? '#00BFFF' : '#333',
  },
  forgotText: {
    alignSelf: 'flex-end',
    color: isDark ? '#00BFFF' : '#4a4aa3',
    marginBottom: 25,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: isDark ? '#FFD700' : '#4a4aa3',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: isDark ? '#00BFFF' : '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  registerText: {
    fontSize: 14,
    color: isDark ? '#00BFFF' : '#555',
    marginTop: 10,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d32f2f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
  },
});

