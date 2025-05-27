import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarPerfil = ({ navigation }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('darkTheme');
      if (temaSalvo !== null) {
        setIsDark(temaSalvo === 'true');
      }
    };
    carregarTema();
  }, []);

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000000' : '#3B4CCA'}
      />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('ConfigurarAcessibilidade')}
        >
          <Text style={styles.buttonText}>
            CONFIGURAR{"\n"}ACESSIBILIDADE{"\n"}DO APP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('EditarPerfil')}
        >
          <Text style={styles.buttonText}>
            EDITAR{"\n"}PERFIL
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditarPerfil;

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#a9c2e7',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
    },
    circleButton: {
      backgroundColor: isDark ? '#000000' : '#F5F5B0', // fundo preto no modo escuro
      width: 160,
      height: 160,
      borderRadius: 80,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      borderColor: isDark ? '#FFD700' : '#000', // contorno amarelo vivo no escuro
      borderWidth: 5,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#00BFFF' : '#000', // azul vivo no escuro
    },
  });
