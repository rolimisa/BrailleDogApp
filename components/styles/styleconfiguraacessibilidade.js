import { StyleSheet } from 'react-native';

export const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1c1c1c' : '#a9c2e7',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      backgroundColor: isDarkMode ? '#333' : '#D6EAF8',
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
      color: isDarkMode ? '#00BFFF' : '#000',
    },
    desc: {
      fontSize: 14,
      color: isDarkMode ? '#00BFFF' : '#333',
      marginTop: 5,
    },
  });