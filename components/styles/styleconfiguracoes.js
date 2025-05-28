import { StyleSheet } from 'react-native';

export const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#a9c2e7',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
    },
    circleButton: {
      backgroundColor: isDark ? '#000000' : '#F5F5B0', // fundo preto no modo escuro
      width: 160,
      height: 160,
      borderRadius: 80,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      borderColor: isDark ? '#FFD700' : '#000', // contorno amarelo vivo no escuro
      borderWidth: 5,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#00BFFF' : '#000', // azul vivo no escuro
    },
  });
