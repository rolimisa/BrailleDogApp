import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { carregarPalavrasAcertadas } from '../src/database';
import { alfBraille } from '../src/palavras';

export default function HistoricoPalavras({ navigation }) {
  const [palavrasAcertadas, setPalavrasAcertadas] = useState([]);
  const [palavraSelecionada, setPalavraSelecionada] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('darkTheme');
      if (temaSalvo !== null) setIsDark(temaSalvo === 'true');
    };

    const carregarHistorico = async () => {
      const historico = await carregarPalavrasAcertadas();
      setPalavrasAcertadas(historico);
    };

    carregarTema();
    carregarHistorico();
  }, []);

  const styles = getStyles(isDark);

  const renderBraille = (letra) => {
    const brailleValue = alfBraille[letra.toLowerCase()] || 0;
    return (
      <View style={styles.letraContainer}>
        {[0, 2, 4].map((bit) => (
          <View key={bit} style={styles.row}>
            <View style={[
              styles.circle,
              (brailleValue & (1 << bit)) ? styles.filled : (isDark ? styles.circleDark : null)
            ]} />
            <View style={[
              styles.circle,
              (brailleValue & (1 << (bit + 1))) ? styles.filled : (isDark ? styles.circleDark : null)
            ]} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#a9c2e7' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Histórico de Palavras Acertadas</Text>
        <Text style={styles.subtitle}>Total: {palavrasAcertadas.length} palavras</Text>

        {palavrasAcertadas.length === 0 ? (
          <Text style={styles.emptyMessage}>Nenhuma palavra acertada ainda!</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {palavrasAcertadas.map((palavra, index) => (
              <View key={index} style={styles.palavraContainer}>
                <TouchableOpacity
                  style={styles.palavraButton}
                  onPress={() =>
                    setPalavraSelecionada(palavraSelecionada === palavra ? null : palavra)
                  }
                >
                  <Text style={styles.palavraText}>{palavra}</Text>
                </TouchableOpacity>

                {palavraSelecionada === palavra && (
                  <View style={styles.brailleView}>
                    <Text style={styles.brailleTitle}>Representação Braille:</Text>
                    <View style={styles.brailleLetters}>
                      {palavra.split('').map((letra, idx) => (
                        <View key={idx} style={styles.brailleLetterContainer}>
                          <View style={styles.brailleCell}>
                            {renderBraille(letra)}
                          </View>
                          <Text style={styles.brailleLetterText}>{letra}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: isDark ? '#fff' : '#333',
    textAlign: 'center',
    marginTop: 60,
  },
  subtitle: {
    fontSize: 18,
    color: isDark ? '#aaa' : '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: isDark ? '#888' : '#555',
    textAlign: 'center',
    marginTop: 50,
  },
  scrollContainer: {
    paddingBottom: 20,
    width: '100%',
  },
  palavraContainer: {
    marginBottom: 15,
    width: '100%',
  },
  palavraButton: {
    backgroundColor: '#4a4aa3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  palavraText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  brailleView: {
    backgroundColor: isDark ? '#2d2d2d' : '#dfe4b7',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: isDark ? '#fff' : '#333',
  },
  brailleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: isDark ? '#fff' : '#333',
    textAlign: 'center',
  },
  brailleLetters: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
  brailleLetterContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  brailleCell: {
    backgroundColor: isDark ? '#2d2d2d' : '#dfe4b7',
    padding: 12,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#555',
  },
  letraContainer: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: isDark ? '#555' : '#fff',
  },
  circleDark: {
    backgroundColor: '#444',
  },
  filled: {
    backgroundColor: isDark ? 'rgb(223, 228, 183)' : '#000',
  },
  brailleLetterText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#fff' : '#333',
  },
});
