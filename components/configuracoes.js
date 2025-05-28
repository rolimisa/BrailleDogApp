import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getStyles } from './styles/styleconfiguracoes'; 

const EditarPerfil = ({ navigation }) => {
  const [isDark, setIsDark] = useState(false);

useFocusEffect(
  React.useCallback(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('darkTheme');
      if (temaSalvo !== null) {
        setIsDark(temaSalvo === 'true');
      }
    };
    carregarTema();
  }, [])
);

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

