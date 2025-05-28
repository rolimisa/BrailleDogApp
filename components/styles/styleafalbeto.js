import { StyleSheet, Dimensions } from 'react-native';

export const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    grid: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    letra: {
      backgroundColor: isDark ? '#000000' : '#dfe4b7',
      width: Dimensions.get('window').width / 3.5,
      height: 100,
      borderRadius: 50,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: isDark ? '#FFD700' : 'black',
    },
    textoLetra: {
      fontSize: 26,
      fontWeight: 'bold',
      color: isDark ? '#00BFFF' : '#000',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      backgroundColor: isDark ? '#000000' : '#dfe4b7',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      width: 220,
    },
    modalLetra: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDark ? '#00BFFF' : '#000',
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
      borderRadius: 40,
      margin: 5,
      borderWidth: 4,
    },
    filled: {
      backgroundColor: '#FFD700',
      borderColor: '#FFD700',
    },
    unfilled: {
      backgroundColor: '#000000',
      borderColor: '#FFD700',
    },
  });
