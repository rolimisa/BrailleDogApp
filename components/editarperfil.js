import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_API_KEY } from '@env';

export default function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
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

    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Erro', 'Usuário não autenticado');
          navigation.navigate('Login');
          return;
        }

        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: token }),
          }
        );

        const data = await res.json();
        if (res.ok && data.users?.length > 0) {
          const user = data.users[0];
          setEmail(user.email || '');
          setUsuario(user.displayName || '');
        } else {
          throw data.error || new Error('Erro ao buscar dados do usuário');
        }
      } catch (error) {
        Alert.alert('Erro', error.message || 'Erro desconhecido');
      }
    };

    carregarTema();
    loadUserData();
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
      };
      if (email) body.email = email;
      if (senha) body.password = senha;
      if (usuario) body.displayName = usuario;

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

      Alert.alert('Sucesso', 'Perfil atualizado!');
      setSenha('');
      setConfirmarSenha('');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao atualizar perfil');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    Alert.alert('Logout', 'Você saiu do app.');
    navigation.navigate('Login');
  };

  const renderEditableField = (icon, value, onChange, placeholder, secure = false, mostrar, toggleMostrar) => (
    <View style={styles.editFieldContainer}>
      <View style={styles.editFieldContent}>
        {icon}
        <TextInput
          style={styles.editInput}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#ccc' : '#888'}
          secureTextEntry={secure && !mostrar}
          value={value}
          onChangeText={onChange}
          autoCapitalize="none"
        />
        {secure ? (
          <TouchableOpacity onPress={toggleMostrar}>
            <Feather name={mostrar ? 'eye' : 'eye-off'} size={20} color={isDark ? '#fff' : '#3B4CCA'} />
          </TouchableOpacity>
        ) : (
          <Feather name="edit" size={18} color={isDark ? '#fff' : '#3B4CCA'} />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#1c1c1c' : '#3B4CCA'}
      />

      <View style={styles.header}>
        <Text style={styles.headerText}>EDITAR PERFIL</Text>
      </View>

      <View style={styles.avatarContainer}>
        <FontAwesome name="user-circle-o" size={100} color={isDark ? '#fff' : '#000'} />
      </View>

      <View style={styles.form}>
        {renderEditableField(
          <Ionicons name="person" size={20} color={isDark ? '#fff' : 'black'} />,
          usuario,
          setUsuario,
          'Nome de usuário'
        )}
        {renderEditableField(
          <MaterialCommunityIcons name="email-outline" size={20} color={isDark ? '#fff' : 'black'} />,
          email,
          setEmail,
          'Email'
        )}
        {renderEditableField(
          <MaterialCommunityIcons name="lock-outline" size={20} color={isDark ? '#fff' : 'black'} />,
          senha,
          setSenha,
          'Nova senha',
          true,
          mostrarSenha,
          () => setMostrarSenha(!mostrarSenha)
        )}
        {renderEditableField(
          <MaterialCommunityIcons name="lock-outline" size={20} color={isDark ? '#fff' : 'black'} />,
          confirmarSenha,
          setConfirmarSenha,
          'Confirmar nova senha',
          true,
          mostrarConfirmarSenha,
          () => setMostrarConfirmarSenha(!mostrarConfirmarSenha)
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
        <FontAwesome name="power-off" size={30} color={isDark ? '#fff' : 'black'} />
        <Text style={styles.logoutText}>DESLOGAR DO APP</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#a9c2e7',
    },
    header: {
      backgroundColor: '#4a4aa3',
      padding: 20,
      alignItems: 'center',
    },
    headerText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    avatarContainer: {
      marginVertical: 20,
      alignItems: 'center',
    },
    form: {
      marginHorizontal: 20,
      padding: 10,
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
      color: isDark ? '#fff' : '#000',
    },
    saveButton: {
      backgroundColor: '#4a4aa3',
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#fff',
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
      color: isDark ? '#fff' : '#000',
    },
  });
