import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Animated } from 'react-native';

export default function MenuScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    setIsEnabled(prev => !prev);
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isEnabled]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#a9c2e7', '#333'],
  });

  const buttonColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#dfe3b7', '#555'],
  });

  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000', '#fff'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      {/* Título */}
      <Animated.Text style={[styles.title, { color: textColor }]}>
        MENU
      </Animated.Text>
      <View style={styles.underline} />
    

      {/* Grupos de botões com moldura */}
      {[[
        { label: 'ALFABETO\nEM\nBRAILLE', route: 'Alfabeto' },
        { label: 'NÚMEROS\nEM\nBRAILLE', route: 'Numeros' },
      ], [
        { label: 'PALAVRAS\nEM\nBRAILLE', route: 'Palavras' },
        { label: 'EXERCÍCIOS', route: 'Opcoes' },
      ], [
        { label: 'CONFIGURAÇÕES', route: 'Configuracoes' },
        { label: 'SOBRE', route: 'Sobre' },
      ]].map((row, rowIndex) => (
        <View key={rowIndex} style={styles.cardContainer}>
          <View style={styles.buttonRow}>
            {row.map(({ label, route }) => (
              <TouchableOpacity
                key={label}
                style={[styles.button, { backgroundColor: buttonColor }]}
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

      {/* Switch de tema */}
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Comic Sans MS',
  },
  underline: {
    height: 3,
    width: 80,
    backgroundColor: '#4a4aa3',
    borderRadius: 2,
    marginBottom: 20,
  },
  brailleBackground: {
    position: 'absolute',
    top: 10,
    right: 20,
    fontSize: 20,
    color: '#ffffff22', // bem sutil
  },
  cardContainer: {
    borderWidth: 2,
    borderColor: '#4a4aa3',
    borderRadius: 20,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#ffffff11',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  button: {
    borderRadius: 60,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1.5,
    borderColor: '#000',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Comic Sans MS',
  },
  switchContainer: {
    marginTop: 30,
  },
});
