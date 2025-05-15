import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated ,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_API_KEY } from '@env';

export default function Cadastrar({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getFirebaseErrorMessage = (errorCode) => {
    const errorMessages = {
      "EMAIL_EXISTS": "Este e-mail já está cadastrado",
      "INVALID_EMAIL": "E-mail inválido",
      "auth/invalid-password": "Senha fraca (mínimo 6 caracteres)",
      "DEFAULT": "Ocorreu um erro. Tente novamente mais tarde."
    };
    const code = errorCode.replace('auth/', '');
    return errorMessages[code] || errorMessages.DEFAULT;
  };

  useEffect(() => {
    if (errorMessage) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [errorMessage]);

  const handleCadastro = async () => {
    setErrorMessage('');

    if (email.trim() === '' || password.trim() === '') {
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

      if (!response.ok) throw new Error(data.error.message);

      await AsyncStorage.setItem('userToken', data.idToken);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./img/logo.png')} // ajusta o caminho se precisar
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>BrailleDog</Text>

      {errorMessage ? (
        <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
          <Icon name="alert-circle" size={16} color="#d32f2f" />
          <Text style={styles.errorText}> {errorMessage}</Text>
        </Animated.View>
      ) : null}

      <View style={styles.inputContainer}>
        <Icon name="email" size={22} color="#666" style={styles.icon} />
        <TextInput 
          placeholder="E-mail"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={22} color="#666" style={styles.icon} />
        <TextInput 
          placeholder="Senha (mínimo 06 caracteres)"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon name={passwordVisible ? "eye-off" : "eye"} size={22} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleCadastro}
        disabled={email.trim() === '' || password.trim() === ''}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9c2e7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 250,
    marginBottom: 20,
    borderRadius: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4a4aa3',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  registerText: {
    fontSize: 14,
    color: '#555',
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
