import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,Dimensions,ScrollView,Keyboard,TouchableWithoutFeedback,SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStyles } from './styles/styledigitenumero'; 

const numerosBraille = {
  '0': 14,
  '1': 1,
  '2': 5,
  '3': 3,
  '4': 11,
  '5': 9,
  '6': 7,
  '7': 15,
  '8': 13,
  '9': 6,
  virg: 4,
};

export default function NumBraille() {
  const [numInput, setNumInput] = useState('');
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

  const numBraille = numInput.trim().toLowerCase().split('');
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 7;
  const spacing = 20;
  const minCelWidth = 80;
  const maxCellWidth = 120;
  const cellWidth = Math.max(Math.min((screenWidth - (spacing * (numColumns + 1))) / numColumns, maxCellWidth), minCelWidth);
  const circleSize = cellWidth / 3;

  const styles = getStyles(isDark, circleSize, cellWidth);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#a9c2e7' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Digite o número:</Text>

          <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={numInput}
          onChangeText={setNumInput}
          placeholder="Digite aqui..."
          placeholderTextColor={isDark ? '#00BFFF' : '#888'}
          returnKeyType="done"
/>

          <View style={styles.braillePairsWrapper}>
            {numBraille.map((numB, index) => {
              if (!/[\d,]/.test(numB)) return null;

              const chave = numB === ',' ? 'virg' : numB;
              const numbValue = numerosBraille[chave] || 0;

              return (
                <View key={index} style={styles.braillePair}>
                  <IndicadorBraille
                    circleSize={circleSize}
                    cellWidth={cellWidth}
                    isDark={isDark}
                  />
                  <BrailleCell
                    value={numbValue}
                    circleSize={circleSize}
                    cellWidth={cellWidth}
                    isDark={isDark}
                    label={numB}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

function BrailleCell({ value, circleSize, cellWidth, isDark, label }) {
  const points = [
    (value & 1) !== 0,
    (value & 2) !== 0,
    (value & 4) !== 0,
    (value & 8) !== 0,
    (value & 16) !== 0,
    (value & 32) !== 0,
  ];

  const styles = getStyles(isDark, circleSize, cellWidth);

  return (
    <View style={styles.cela}>
      <View style={styles.celaBox}>
        <View style={styles.row}>
          <View style={[styles.circle, points[0] && styles.filled]} />
          <View style={[styles.circle, points[1] && styles.filled]} />
        </View>
        <View style={styles.row}>
          <View style={[styles.circle, points[2] && styles.filled]} />
          <View style={[styles.circle, points[3] && styles.filled]} />
        </View>
        <View style={styles.row}>
          <View style={[styles.circle, points[4] && styles.filled]} />
          <View style={[styles.circle, points[5] && styles.filled]} />
        </View>
      </View>
      <Text style={styles.num}>{label}</Text>
    </View>
  );
}

function IndicadorBraille({ circleSize, cellWidth, isDark }) {
  const styles = getStyles(isDark, circleSize, cellWidth);

  return (
    <View style={styles.cela}>
      <View style={styles.celaBox}>
        <View style={styles.row}>
          <View style={styles.circle} />
          <View style={[styles.circle, styles.filled]} />
        </View>
        <View style={styles.row}>
          <View style={styles.circle} />
          <View style={[styles.circle, styles.filled]} />
        </View>
        <View style={styles.row}>
          <View style={[styles.circle, styles.filled]} />
          <View style={[styles.circle, styles.filled]} />
        </View>
      </View>
    </View>
  );
}

