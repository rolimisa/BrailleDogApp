import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const getStyles = (isDark, circleSize, cellWidth) =>
  StyleSheet.create({
    scrollContent: {
      minHeight: Dimensions.get('window').height,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 60,
      alignItems: 'center',
      backgroundColor: isDark ? '#000000' : '#a9c2e7',
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 20,
      textAlign: 'center',
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
    borderWidth: 1,
    borderColor: isDark ? '#FFD700' : '#ccc',
    marginBottom: 30,
  },

    braillePairsWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
    },
    braillePair: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      marginBottom: 20,
    },
    cela: {
      height: 150,
      width: cellWidth,
      alignItems: 'center',
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
    num: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      color: isDark ? '#00BFFF' : '#333',
      marginTop: 5,
    },
  });
