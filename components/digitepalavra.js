import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alfBraille from './afalbraille';

export default function BrailleConverte() {
  const [plvr, setPlvr] = useState('');
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

  const plvrBraille = plvr.trim().toLowerCase().split('');
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 5;
  const spacing = 25;
  const minCellWidth = 80;
  const maxCellWidth = 120;
  const cellWidth = Math.max(Math.min((screenWidth - (spacing * (numColumns + 1))) / numColumns, maxCellWidth), minCellWidth);
  const circleSize = cellWidth / 3;

  const styles = getStyles(isDark, cellWidth, circleSize);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000000' : '#a9c2e7' }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Digite uma palavra:</Text>

          <TextInput
            style={styles.input}
            value={plvr}
            onChangeText={setPlvr}
            placeholder="Digite aqui"
            placeholderTextColor={isDark ? '#00BFFF' : '#888'}
          />

          <View style={[styles.brailleContainer, { gap: spacing }]}>
            {plvrBraille.map((plvB, index) => {
              if (plvB === ' ') return <View key={index} style={{ width: cellWidth }} />;

              const brailleValue = alfBraille[plvB] || 0;
              const points = [
                (brailleValue & 1) !== 0,
                (brailleValue & 2) !== 0,
                (brailleValue & 4) !== 0,
                (brailleValue & 8) !== 0,
                (brailleValue & 16) !== 0,
                (brailleValue & 32) !== 0,
              ];

              return (
                <View key={index} style={styles.cela}>
                  <View style={styles.celaBox}>
                    {[0, 2, 4].map((rowIdx) => (
                      <View style={styles.row} key={rowIdx}>
                        <View style={[styles.circle, points[rowIdx] && styles.filled]} />
                        <View style={[styles.circle, points[rowIdx + 1] && styles.filled]} />
                      </View>
                    ))}
                  </View>
                  <Text style={styles.plvLabel}>{plvB}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDark, cellWidth, circleSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    scrollContainer: {
      alignItems: 'center',
      paddingBottom: 50,
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      marginTop: 30,
      marginBottom: 15,
      color: isDark ? '#00BFFF' : '#333',
    },
    input: {
      backgroundColor: isDark ? '#2d2d2d' : '#fff',
      color: isDark ? '#00BFFF' : '#000',
      width: 320,
      height: 50,
      padding: 15,
      borderRadius: 25,
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 25,
      borderColor: isDark ? '#FFD700' : '#ccc',
      borderWidth: 1,
      elevation: 2,
    },
    brailleContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cela: {
      height: 150,
      width: cellWidth,
      alignItems: 'center',
      marginBottom: 20,
    },
    celaBox: {
      backgroundColor: isDark ? '#000000' : '#dfe4b7',
      borderWidth: 2,
      borderColor: isDark ? '#FFD700' : '#000',
      borderRadius: 10,
      padding: 17,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    circle: {
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      borderWidth: 2,
      borderColor: isDark ? '#FFD700' : '#000',
      margin: 2,
      backgroundColor: isDark ? '#000000' : '#fff',
    },
    filled: {
      backgroundColor: isDark ? '#FFD700' : '#000',
    },
    plvLabel: {
      marginTop: 5,
      fontSize: 26,
      color: isDark ? '#00BFFF' : '#222',
      fontWeight: '600',
      textAlign: 'center',
    },
  });
