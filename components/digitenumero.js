import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

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
  const [num, setNum] = useState('');

  const numBraille = num.trim().toLowerCase().split('');

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 7;
  const spacing = 20;

  const minCelWidth = 80;
  const maxCellWidth = 120;

  const cellWidth = Math.max(Math.min((screenWidth - (spacing * (numColumns + 1))) / numColumns, maxCellWidth), minCelWidth);
  const circleSize = cellWidth / 3;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.outerContainer}>
        <Text style={styles.title}>Digite o número:</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={num}
          onChangeText={setNum}
          placeholder="Digite aqui..."
          placeholderTextColor="#dfe4b7"
          returnKeyType="done"
        />

        <ScrollView contentContainerStyle={styles.brailleContainer} showsVerticalScrollIndicator>
          <View style={styles.innerBrailleWrapper}>
            {numBraille.map((numB, index) => {
              if (numB === ' ') {
                return <View key={index} style={{ width: cellWidth }} />;
              }

              const chave = numB === ',' ? 'virg' : numB;
              const numbValue = numerosBraille[chave] || 0;

              const points = [
                (numbValue & 1) !== 0,
                (numbValue & 2) !== 0,
                (numbValue & 4) !== 0,
                (numbValue & 8) !== 0,
                (numbValue & 16) !== 0,
                (numbValue & 32) !== 0,
              ];

              return (
                <View key={index} style={[styles.cela, { width: cellWidth }]}>
                  <View style={styles.celaBox}>
                    <View style={styles.row}>
                      <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }, points[0] && styles.filled]} />
                      <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }, points[1] && styles.filled]} />
                    </View>
                    <View style={styles.row}>
                      <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }, points[2] && styles.filled]} />
                      <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }, points[3] && styles.filled]} />
                    </View>
                    <View style={styles.row}>
                      <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }, points[4] && styles.filled]} />
                      <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }, points[5] && styles.filled]} />
                    </View>
                  </View>
                  <Text style={styles.num}>{numB}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
      backgroundColor: '#a9c2e7', // azul mais suave e neutro
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 25,
      textAlign: 'center',
      color: '#333', // texto mais suave
    },
    input: {
      backgroundColor: '#fff',
      color: '#000',
      width: '100%',
      padding: 15,
      borderRadius: 30,
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 30,
      borderWidth: 1,
      borderColor: '#ccc', // cor suave para a borda
    
    },
    brailleContainer: {
      paddingBottom: 50,
      paddingTop: 10,
    },
    innerBrailleWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 20,
    },
    cela: {
      height: 130,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // celaBox permanece como está
    celaBox: {
      backgroundColor: '#dfe4b7',
      borderWidth: 2,
      borderColor: '#000',
      borderRadius: 10,
      padding: 12,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    circle: {
      borderWidth: 1,
      borderColor: '#000',
      margin: 3,
    },
    filled: {
      backgroundColor: '#000',
    },
    num: {
      marginTop: 8,
      fontSize: 18,
      color: '#333',
      textAlign: 'center',
      fontWeight: '600',
    },
  });