import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfiguraAcessibilidade = () => {
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('darkTheme');
      if (temaSalvo !== null) {
        setTemaEscuro(temaSalvo === 'true');
      }
    };
    carregarTema();
  }, []);

  const handleTheme = async () => {
    const novoTema = !temaEscuro;
    setTemaEscuro(novoTema);
    await AsyncStorage.setItem('darkTheme', novoTema.toString());
  };

  const styles = getStyles(temaEscuro);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={temaEscuro ? 'light-content' : 'dark-content'}
        backgroundColor={temaEscuro ? '#1c1c1c' : '#3B4CCA'}
      />
      <View style={styles.box}>
        <View style={styles.row}>
          <Ionicons name="moon-outline" size={24} color={temaEscuro ? '#FFD700' : '#000'} />
          <View>
            <Text style={styles.label}>TEMA ESCURO</Text>
            <Text style={styles.desc}>
              FACILITA A VISUALIZAÇÃO{"\n"}PARA PESSOAS COM BAIXA VISÃO
            </Text>
          </View>
          <Switch
            value={temaEscuro}
            onValueChange={handleTheme}
            trackColor={{ true: '#ccc', false: '#ccc' }}
            thumbColor={temaEscuro ? '#FFD700' : '#fff'}
          />
        </View>
      </View>
    </View>
  );
};

export default ConfiguraAcessibilidade;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1c1c1c' : '#a9c2e7',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      backgroundColor: isDarkMode ? '#333' : '#D6EAF8',
      borderRadius: 20,
      padding: 15,
      marginBottom: 15,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#00BFFF' : '#000',
    },
    desc: {
      fontSize: 14,
      color: isDarkMode ? '#00BFFF' : '#333',
      marginTop: 5,
    },
  });
