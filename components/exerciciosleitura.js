import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Dimensions,Modal,SafeAreaView,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { palavras } from '../src/palavras';
import alfBraille from './afalbraille';
import { salvarScore, carregarScore, salvarPalavrasAcertadas, carregarPalavrasAcertadas } from '../src/database';

export default function ExercicioBraille() {
  const [isDark, setIsDark] = useState(false);
  const [palavra, setPalavra] = useState('');
  const [indiceFaltando, setIndiceFaltando] = useState(null);
  const [palavraFaltante, setPalavraFaltante] = useState('');
  const [respostaUsuario, setRespostaUsuario] = useState('');
  const [score, setScore] = useState(0);
  const [palavrasAcertadas, setPalavrasAcertadas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [dicasUsadas, setDicasUsadas] = useState(0);

  useEffect(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('darkTheme');
      if (temaSalvo !== null) {
        setIsDark(temaSalvo === 'true');
      }
    };
    carregarTema();

    async function carregarDados() {
      const scoreSalvo = await carregarScore() || 0;
      const palavrasSalvas = await carregarPalavrasAcertadas() || [];
      setScore(scoreSalvo);
      setPalavrasAcertadas(palavrasSalvas);
      sortearPalavra(palavrasSalvas);
    }
    carregarDados();
  }, []);

  const styles = getStyles(isDark);

  const sortearPalavra = (palavrasJaAcertadas = []) => {
    const disponiveis = palavras.filter(p => !palavrasJaAcertadas.includes(p));

    if (disponiveis.length === 0) {
      setModalMessage('Parabéns! Você completou todas as 300 palavras! 🎉');
      setModalType('success');
      setModalVisible(true);
      setPalavra('');
      setIndiceFaltando(null);
      setPalavraFaltante('');
      return;
    }

    const sorteada = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    const indice = Math.floor(Math.random() * sorteada.length);

    setPalavra(sorteada);
    setIndiceFaltando(indice);
    setDicasUsadas(0);

    const faltante = sorteada
      .split('')
      .map((l, i) => (i === indice ? '_' : l))
      .join('');

    setPalavraFaltante(faltante);
    setRespostaUsuario('');
  };

  const verificarResposta = async () => {
    if (!palavra || indiceFaltando === null) return;

    if (respostaUsuario.trim().toLowerCase() === palavra[indiceFaltando]?.toLowerCase()) {
      const pontos = dicasUsadas > 0 ? 0.5 : 1;
      setModalMessage(dicasUsadas > 0 ? 'Acertou! (+0.5 ponto)' : 'Acertou! (+1 ponto) 🎉');
      setModalType('success');

      if (!palavrasAcertadas.includes(palavra)) {
        const novaLista = [...palavrasAcertadas, palavra];
        await salvarPalavrasAcertadas(novaLista);
        setPalavrasAcertadas(novaLista);

        const novoScore = score + pontos;
        await salvarScore(novoScore);
        setScore(novoScore);
      }
    } else {
      setModalMessage('Errou! Tente novamente');
      setModalType('error');
    }
    setModalVisible(true);
  };

  const darDica = () => {
    if (dicasUsadas < 1 && palavra && indiceFaltando !== null) {
      setRespostaUsuario(palavra[indiceFaltando].toLowerCase());
      setDicasUsadas(1);
    }
  };

  const handleCompleteModalClose = async () => {
    setModalVisible(false);
    setPalavrasAcertadas([]);
    setScore(0);
    await salvarPalavrasAcertadas([]);
    await salvarScore(0);
    sortearPalavra([]);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalType === 'success' && modalMessage !== 'Parabéns! Você completou todas as 300 palavras! 🎉') {
      sortearPalavra(palavrasAcertadas);
    }
  };

  const plvrBraille = palavra ? palavra.trim().toLowerCase().split('') : [];
  const screenWidth = Dimensions.get('window').width;
  const numColumns = Math.min(5, plvrBraille.length);
  const spacing = 15;
  const maxCellWidth = 100;
  const cellWidth = Math.min((screenWidth - (spacing * (numColumns + 1))) / numColumns, maxCellWidth);
  const circleSize = cellWidth / 3;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#a9c2e7' }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dicaButton}
          onPress={darDica}
          disabled={dicasUsadas > 0 || !palavra}
        >
          <Icon name="lightbulb-on-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.scoreBar}>
          <View style={[styles.scoreFill, { width: `${(score / 300) * 100}%` }]} />
          <Text style={styles.scoreText}>{score.toFixed(1)}/300</Text>
        </View>

        <Text style={styles.title}>Complete a palavra:</Text>
        <Text style={styles.palavraFaltante}>{palavraFaltante || '–'}</Text>

        <TextInput
          style={styles.input}
          value={respostaUsuario}
          onChangeText={setRespostaUsuario}
          placeholder="Digite a letra faltante"
          placeholderTextColor={isDark ? '#aaa' : '#888'}
          maxLength={1}
          autoCapitalize="none"
          autoFocus
        />

        <TouchableOpacity
          onPress={verificarResposta}
          style={styles.botao}
          disabled={!respostaUsuario}
        >
          <Text style={styles.botaoTexto}>Verificar</Text>
        </TouchableOpacity>

        <View style={[styles.brailleContainer, { gap: spacing }]}>
          {plvrBraille.map((plvB, index) => {
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
                  {[0, 2, 4].map((row) => (
                    <View style={styles.row} key={row}>
                      <View style={[
                        styles.circle,
                        { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
                        points[row] && styles.filled,
                        !points[row] && isDark && styles.circleDark
                      ]} />
                      <View style={[
                        styles.circle,
                        { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
                        points[row + 1] && styles.filled,
                        !points[row + 1] && isDark && styles.circleDark
                      ]} />
                    </View>
                  ))}
                </View>
                <Text style={styles.plvLabel}>
                  {index === indiceFaltando ? '' : plvB}
                </Text>
              </View>
            );
          })}
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={modalMessage.includes('300 palavras') ? handleCompleteModalClose : closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={[
              styles.modalContainer,
              modalType === 'success' ? styles.modalSuccess : styles.modalError
            ]}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={modalMessage.includes('300 palavras') ? handleCompleteModalClose : closeModal}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
   dicaButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: isDark ? '#FFD700' : '#4a4aa3',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    zIndex: 1,
  },
    dicaIcone: {
    color: isDark ? '#00BFFF' : '#fff',
    fontSize: 28,
  },
  scoreBar: {
    height: 30,
    width: '100%',
    backgroundColor: isDark ? '#333' : '#e0e0e0',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  scoreFill: {
    height: '100%',
    backgroundColor: '#4a4aa3',
    borderRadius: 15,
  },
  scoreText: {
    position: 'absolute',
    alignSelf: 'center',
    top: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
    title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: isDark ? '#00BFFF' : '#333',
    textAlign: 'center',
  },
   palavraFaltante: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    color: isDark ? '#00BFFF' : '#222',
    letterSpacing: 3,
  },
  input: {
    backgroundColor: isDark ? '#2d2d2d' : '#fff',
    color: isDark ? '#00BFFF' : '#000',
    width: '80%',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
    borderColor: isDark ? '#FFD700' : '#ccc',
    borderWidth: 1,
    elevation: 3,
    marginBottom: 25,
  },
    botao: {
    backgroundColor: isDark ? '#FFD700' : '#4a4aa3',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    elevation: 4,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
    botaoTexto: {
    color: isDark ? '#00BFFF' : '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  brailleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  cela: {
    height: 130,
    alignItems: 'center',
    marginBottom: 15,
  },
  celaBox: {
    backgroundColor: isDark ? '#000000' : '#dfe4b7',
    borderWidth: 2,
    borderColor: isDark ? '#CCA300' : '#000',
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
    borderColor: '#555',
    margin: 2,
  },
  circleDark: {
    backgroundColor: '#444',
  },
   filled: {
    backgroundColor: isDark ? '#FFD700' : '#000',
  },
    plvLabel: {
    marginTop: 5,
    fontSize: 24,
    color: isDark ? '#00BFFF' : '#222',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalSuccess: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  modalError: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 2,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalButton: {
    backgroundColor: '#4a4aa3',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
