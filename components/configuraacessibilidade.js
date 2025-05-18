import React, { useState } from 'react';
import {View,Text,Switch,StyleSheet,StatusBar} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ConfiguraAcessibilidade = () => {
  const [temaEscuro, setTemaEscuro] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#3B4CCA" />
      <View style={styles.box}>
        <View style={styles.row}>
          <Ionicons name="moon-outline" size={24} color="black" />
          <View>
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
    </View>
  );
};

export default ConfiguraAcessibilidade;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9c2e7',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  previewText: {
    marginTop: 10,
    textAlign: 'center',
  },
});
