import React, { useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function MenuScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      const carregarTemaSalvo = async () => {
        const temaSalvo = await AsyncStorage.getItem('darkTheme');
        const tema = temaSalvo === 'true';
        setIsDarkMode(tema);
        animatedValue.setValue(tema ? 1 : 0);
      };
      carregarTemaSalvo();
    }, [])
  );

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#a9c2e7', '#000000'],
  });

  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000', '#00BFFF'],
  });

  const styles = getStyles(isDarkMode);

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      {[[
        { label: 'ALFABETO\nEM\nBRAILLE', route: 'Alfabeto' },
        { label: 'NÚMEROS\nEM\nBRAILLE', route: 'Numeros' },
      ], [
        { label: 'PALAVRAS\nEM\nBRAILLE', route: 'Palavras' },
        { label: 'EXERCÍCIOS', route: 'Opcoes' },
      ], [
        { label: 'AJUSTES', route: 'Configuracoes' },
        { label: 'SOBRE', route: 'Sobre' },
      ]].map((row, rowIndex) => (
        <View key={rowIndex} style={styles.cardContainer}>
          <View style={styles.buttonRow}>
            {row.map(({ label, route }) => (
              <TouchableOpacity
                key={label}
                style={[
                  styles.button,
                  {
                    backgroundColor: isDarkMode ? '#000' : '#dfe4b7',
                    borderColor: isDarkMode ? '#FFD700' : '#000',
                  },
                ]}
                onPress={() => navigation.navigate(route)}
              >
                <Animated.Text style={[styles.buttonText, { color: textColor }]}>
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </Animated.View>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      padding: 10,
    },
    cardContainer: {
      borderRadius: 20,
      padding: 10,
      marginVertical: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 30,
    },
    button: {
      borderRadius: 60,
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      borderWidth: 5,
      // Removido elevation e sombra
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
