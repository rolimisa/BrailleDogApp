import React, { useState, useEffect } from 'react';
import {View,TextInput,Text,StyleSheet,Dimensions,ScrollView,SafeAreaView,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alfBraille from './afalbraille';
import { getStyles } from './styles/styledigitepalavra'; 

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


