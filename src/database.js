import AsyncStorage from '@react-native-async-storage/async-storage';

const SCORE_KEY = '@BrailleApp:score';
const PALAVRAS_ACERTADAS_KEY = '@BrailleApp:palavrasAcertadas';

export const salvarScore = async (score) => {
  try {
    await AsyncStorage.setItem(SCORE_KEY, score.toString());
  } catch (e) {
    console.error('Erro ao salvar score:', e);
  }
};

export const carregarScore = async () => {
  try {
    const value = await AsyncStorage.getItem(SCORE_KEY);
    return value ? parseFloat(value) : 0;
  } catch (e) {
    console.error('Erro ao carregar score:', e);
    return 0;
  }
};

export const salvarPalavrasAcertadas = async (palavras) => {
  try {
    await AsyncStorage.setItem(PALAVRAS_ACERTADAS_KEY, JSON.stringify(palavras));
  } catch (e) {
    console.error('Erro ao salvar palavras acertadas:', e);
  }
};

export const carregarPalavrasAcertadas = async () => {
  try {
    const value = await AsyncStorage.getItem(PALAVRAS_ACERTADAS_KEY);
    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.error('Erro ao carregar palavras acertadas:', e);
    return [];
  }
};