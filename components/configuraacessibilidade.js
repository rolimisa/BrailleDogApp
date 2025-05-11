import React, { useState } from 'react';
import {View,Text,Switch,StyleSheet,StatusBar} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const ConfiguraAcessibilidade = () => {
  const [temaClaro, setTemaClaro] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [tamanhoTexto, setTamanhoTexto] = useState(14);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#3B4CCA" />
      <View style={styles.header}>
        <Text style={styles.headerText}>ACESSIBILIDADE DO APLICATIVO</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.row}>
          <Ionicons name="sunny-outline" size={24} color="black" />
          <Text style={styles.label}>TEMA CLARO</Text>
          <Switch
            value={temaClaro}
            onValueChange={setTemaClaro}
            trackColor={{ true: '#3B4CCA', false: '#ccc' }}
          />
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.row}>
          <Ionicons name="moon-outline" size={24} color="black" />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>TEMA ESCURO</Text>
            <Text style={styles.desc}>
              FACILITA A VISUALIZAÇÃO{"\n"}PARA PESSOAS COM BAIXA VISÃO
            </Text>
          </View>
          <Switch
            value={temaEscuro}
            onValueChange={setTemaEscuro}
            trackColor={{ true: '#3B4CCA', false: '#ccc' }}
          />
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>TAMANHO DO TEXTO</Text>
        <Slider
          style={{ width: '100%' }}
          minimumValue={12}
          maximumValue={24}
          step={1}
          value={tamanhoTexto}
          onValueChange={setTamanhoTexto}
          minimumTrackTintColor="#3B4CCA"
          maximumTrackTintColor="#ccc"
        />
        <Text style={[styles.previewText, { fontSize: tamanhoTexto }]}>
          Texto de exemplo
        </Text>
      </View>
    </View>
  );
};

export default ConfiguraAcessibilidade;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    padding: 10,
  },
  header: {
    backgroundColor: '#3B4CCA',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: '#D6EAF8',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  desc: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  previewText: {
    marginTop: 10,
    textAlign: 'center',
  },
});
