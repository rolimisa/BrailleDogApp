import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_API_KEY } from '@env';

export default function Cadastrar({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const getFirebaseErrorMessage = (errorCode) => {
    const errorMessages = {
      "EMAIL_EXISTS": "Este e-mail já está cadastrado",
      "INVALID_EMAIL": "E-mail inválido",
      "auth/invalid-password": "Senha fraca (mínimo 6 caracteres)",
      "DEFAULT": "Ocorreu um erro. Tente novamente mais tarde."
    };

    // Remove o prefixo 'auth/' se existir
    const code = errorCode.replace('auth/', '');
    return errorMessages[code] || errorMessages.DEFAULT;
  };

  React.useEffect(() => {
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
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      await AsyncStorage.setItem('userToken', data.idToken);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BRAILLEDOG</Text>

      {errorMessage ? (
        <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
          <Text style={styles.errorText}>
            <Icon name="alert-circle" size={16} color="#d32f2f" /> {errorMessage}
          </Text>
        </Animated.View>
      ) : null}

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="E-mail"
          style={styles.input}
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Icon name="email" size={24} color="#555" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Senha (mínimo 06 caracteres)"
          style={styles.input}
          placeholderTextColor="#555"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon name={passwordVisible ? "eye-off" : "eye"} size={24} color="#555" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footerText}>Já tem uma conta? Faça login</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Comic Sans MS',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dfe4b7',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#555',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#4a4aa3',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    color: '#000',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d32f2f'
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});