import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PalavrasBraille({ navigation }) {
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
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exercicios')}>
        <Text style={styles.buttonText}>EXERCÍCIOS EM BRAILLE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Historico')}>
        <Text style={styles.buttonText}>HISTÓRICO DE{"\n"}PALAVRAS ACERTADAS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#a9c2e7',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    button: {
      backgroundColor: isDark ? '#000000' : '#dfe4b7', // fundo preto no escuro
      borderRadius: 100,
      width: 180,
      height: 180,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      borderWidth: 5,
      borderColor: isDark ? '#FFD700' : 'black', // contorno amarelo no escuro
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#00BFFF' : '#000', // azul vibrante no escuro
    },
  });
