import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

const PerfilScreen = () => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSalvar = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    try {
      // Atualizar email
      if (email !== user.email) {
        await user.updateEmail(email);
        alert('Email atualizado com sucesso!');
      }

      // Atualizar senha
      if (senha) {
        await user.updatePassword(senha);
        alert('Senha atualizada com sucesso!');
      }

      // Atualizar nome de usuário
      if (usuario && usuario !== user.displayName) {
        await user.updateProfile({ displayName: usuario });
        alert('Nome de usuário atualizado com sucesso!');
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar as informações.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      alert('Você saiu do app.');
    } catch (error) {
      console.error(error);
      alert('Erro ao deslogar.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#3B4CCA" />
      <View style={styles.header}>
        <Text style={styles.headerText}>EDITAR PERFIL</Text>
      </View>

      <View style={styles.avatarContainer}>
        <FontAwesome name="user-circle-o" size={100} color="black" />
      </View>

      <View style={styles.form}>
        <View style={styles.inputRow}>
          <Ionicons name="person" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={usuario}
            onChangeText={setUsuario}
          />
        </View>

        <View style={styles.inputRow}>
          <MaterialCommunityIcons name="email-outline" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputRow}>
          <MaterialCommunityIcons name="eye-off-outline" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.inputRow}>
          <MaterialCommunityIcons name="eye-off-outline" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
          <Text style={styles.saveButtonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <FontAwesome name="power-off" size={30} color="black" />
        <Text style={styles.logoutText}>DESLOGAR DO APP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  header: {
    backgroundColor: '#3B4CCA',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  avatarContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#D6EAF8',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    gap: 15,
    elevation: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#3B4CCA',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
