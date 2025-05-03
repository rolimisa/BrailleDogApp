import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import alfBraille from './afalbraille'; 

export default function BrailleConverte() {
  const [plvr, setPlvr] = useState('');

  const plvrBraille = plvr.trim().toLowerCase().split('');
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 5;
  const spacing = 25;

  const minCellWidth = 80;
  const maxCellWidth = 120;
  const cellWidth = Math.max(Math.min((screenWidth - (spacing * (numColumns + 1))) / numColumns, maxCellWidth), minCellWidth);
  const circleSize = cellWidth / 3;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Digite uma palavra:</Text>

          <TextInput
            style={styles.input}
            value={plvr}
            onChangeText={setPlvr}
            placeholder="Digite aqui"
          />

          <View style={[styles.brailleContainer, { gap: spacing }]}>
            {plvrBraille.map((plvB, index) => {
              if (plvB === ' ') {
                return <View key={index} style={{ width: cellWidth }} />;
              }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9c2e7', // azul mais suave
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
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    width: 320,
    height: 50,
    padding: 15,
    borderRadius: 25,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
    borderColor: '#ccc',
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
    alignItems: 'center',
    marginBottom: 20,
  },
  // celaBox permanece como está
  celaBox: {
    backgroundColor: '#dfe4b7',
    borderWidth: 2,
    borderColor: '#000',
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
    borderWidth: 1,
    borderColor: '#000',
    margin: 2,
  },
  filled: {
    backgroundColor: '#000',
  },
  plvLabel: {
    marginTop: 5,
    fontSize: 26,
    color: '#222',
    fontWeight: '600',
    textAlign: 'center',
  },
});