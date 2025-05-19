import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alfBraille from './afalbraille';

const alfabeto = Object.entries(alfBraille)
  .filter(([letra]) => letra.length === 1 && letra.match(/[a-z]/i))
  .map(([letra, braille]) => ({
    letra: letra.toUpperCase(),
    braille,
  }));

export default function AlfabetoBrailleAnimado() {
  const [selecionado, setSelecionado] = useState(null);
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

  const styles = getStyles(isDark);

  const renderBraille = (braille) => {
    const bin = braille.toString(2).padStart(6, '0').split('').reverse();
    return (
      <View style={styles.cela}>
        {bin.map((bit, i) => (
          <View
            key={i}
            style={[
              styles.circle,
              bit === '1' ? styles.filled : null,
              isDark && bit !== '1' ? styles.circleDark : null,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#a9c2e7' }}>
      <View style={styles.container}>
        <FlatList
          data={alfabeto}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.letra}
              onPress={() => setSelecionado(item)}
            >
              <Text style={styles.textoLetra}>{item.letra}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.letra}
          numColumns={3}
          contentContainerStyle={styles.grid}
        />

        <Modal
          visible={!!selecionado}
          transparent
          animationType="fade"
          onRequestClose={() => setSelecionado(null)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setSelecionado(null)}>
            <View style={styles.modalCard}>
              <Text style={styles.modalLetra}>{selecionado?.letra}</Text>
              {selecionado && renderBraille(selecionado.braille)}
            </View>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    grid: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    letra: {
      backgroundColor: isDark ? '#2d2d2d' : '#dfe4b7',
      width: Dimensions.get('window').width / 3.5,
      height: 100,
      borderRadius: 50,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: isDark ? 'rgb(223, 228, 183)' : 'black',
    },
    textoLetra: {
      fontSize: 26,
      fontWeight: 'bold',
      color: isDark ? 'rgb(223, 228, 183)' : '#000',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      backgroundColor: isDark ? '#2d2d2d' : '#dfe4b7',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      width: 220,
    },
    modalLetra: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDark ?  'rgb(223, 228, 183)' : '#000',
    },
    cela: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 250,
      height: 300,
      justifyContent: 'center',
    },
    circle: {
      width: 80,
      height: 80,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#000',
      margin: 5,
      backgroundColor: '#fff',
    },
    circleDark: {
      backgroundColor: '#555',
    },
    filled: {
      backgroundColor: isDark ? 'rgb(223, 228, 183)' : '#000',
    },
  });
