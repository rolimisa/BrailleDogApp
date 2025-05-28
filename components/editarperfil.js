import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const FIREBASE_API_KEY = Constants.expoConfig.extra.FIREBASE_API_KEY;

export default function PerfilScreen({ navigation }) {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('darkTheme');
      if (temaSalvo !== null) setIsDark(temaSalvo === 'true');
    };
    carregarTema();
  }, []);

  const styles = getStyles(isDark);

  const handleSalvar = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    setLoading(true);
    try {
      const idToken = await AsyncStorage.getItem('token');
      if (!idToken) {
        Alert.alert('Erro', 'Usuário não autenticado');
        setLoading(false);
        return;
      }

      const body = {
        idToken,
        returnSecureToken: true,
        password: senha,
      };

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw data.error || new Error('Erro ao atualizar perfil');
      }

      if (data.idToken) {
        await AsyncStorage.setItem('token', data.idToken);
      }

      Alert.alert('Sucesso', 'Senha atualizada!');
      setSenha('');
      setConfirmarSenha('');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao atualizar perfil');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout', 'Você saiu do app.');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (e) {
      Alert.alert('Erro', 'Falha ao sair do app.');
    }
  };

  const renderEditableField = (icon, value, onChange, placeholder, secure = false, mostrar, toggleMostrar) => (
    <View style={styles.editFieldContainer}>
      <View style={styles.editFieldContent}>
        {icon}
        <TextInput
          style={[styles.editInput, { color: isDark ? '#00BFFF' : '#000' }]}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#00BFFF' : '#888'}
          secureTextEntry={secure && !mostrar}
          value={value}
          onChangeText={onChange}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={toggleMostrar}>
          <Feather name={mostrar ? 'eye' : 'eye-off'} size={20} color={isDark ? '#00BFFF' : '#3B4CCA'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#1c1c1c' : '#3B4CCA'} />

      <View style={styles.avatarContainer}>
        <FontAwesome name="user-circle-o" size={100} color={isDark ? '#FFD700' : '#000'} />
      </View>

      <View style={styles.form}>
        {renderEditableField(
          <MaterialCommunityIcons name="lock-outline" size={20} color={isDark ? '#00BFFF' : '#000'} />,
          senha, setSenha, 'Nova senha', true, mostrarSenha, () => setMostrarSenha(!mostrarSenha)
        )}
        {renderEditableField(
          <MaterialCommunityIcons name="lock-outline" size={20} color={isDark ? '#00BFFF' : '#000'} />,
          confirmarSenha, setConfirmarSenha, 'Confirmar nova senha', true, mostrarConfirmarSenha, () => setMostrarConfirmarSenha(!mostrarConfirmarSenha)
        )}

        <TouchableOpacity
          style={[styles.saveButton, loading && { opacity: 0.7 }]}
          onPress={handleSalvar}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>{loading ? 'SALVANDO...' : 'SALVAR'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <FontAwesome name="power-off" size={30} color={isDark ? '#FFD700' : '#000'} />
        <Text style={[styles.logoutText, { color: isDark ? '#FFD700' : '#000' }]}>DESLOGAR DO APP</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#a9c2e7',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 60,
    },
    avatarContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    form: {
      width: '90%',
      gap: 20,
    },
    editFieldContainer: {
      backgroundColor: isDark ? '#2d2d2d' : '#fff',
      borderRadius: 12,
      padding: 12,
      elevation: 3,
    },
    editFieldContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: isDark ? '#FFD700' : '#4a4aa3',
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    saveButtonText: {
      color: isDark ? '#00BFFF' : '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    logout: {
      alignItems: 'center',
      marginTop: 30,
    },
    logoutText: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
