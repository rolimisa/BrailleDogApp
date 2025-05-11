import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const EditarPerfil = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#3B4CCA" />
      <View style={styles.header}>
        <Text style={styles.headerText}>EDITAR DE PERFIL</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('ConfigurarAcessibilidade')}
        >
          <Text style={styles.buttonText}>CONFIGURAR{"\n"}ACESSIBILIDADE{"\n"}DO APP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('Editar Perfil')}
        >
          <Text style={styles.buttonText}>EDITAR{"\n"}PERFIL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditarPerfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6', // azul claro
  },
  header: {
    backgroundColor: '#3B4CCA', // azul escuro
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  circleButton: {
    backgroundColor: '#F5F5B0', // amarelo claro
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
