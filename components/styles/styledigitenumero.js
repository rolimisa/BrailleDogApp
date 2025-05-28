import { StyleSheet, Dimensions } from 'react-native';


export const getStyles = (isDark, circleSize, cellWidth) =>
  StyleSheet.create({
    scrollContent: {
      minHeight: Dimensions.get('window').height,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 60,
      alignItems: 'center',
      backgroundColor: isDark ? '#000000' : '#a9c2e7',
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 20,
      textAlign: 'center',
      color: isDark ? '#00BFFF' : '#333',
    },
    input: {
    backgroundColor: isDark ? '#2d2d2d' : '#fff', 
    color: isDark ? '#00BFFF' : '#000',           
    width: 320,
    height: 50,
    padding: 15,
    borderRadius: 25,
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: isDark ? '#FFD700' : '#ccc',
    marginBottom: 30,
  },

    braillePairsWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
    },
    braillePair: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      marginBottom: 20,
    },
    cela: {
      height: 150,
      width: cellWidth,
      alignItems: 'center',
    },
    celaBox: {
      backgroundColor: isDark ? '#000000' : '#dfe4b7',
      borderWidth: 2,
      borderColor: isDark ? '#FFD700' : '#000',
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
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      borderWidth: 2,
      borderColor: isDark ? '#FFD700' : '#000',
      margin: 2,
      backgroundColor: isDark ? '#000000' : '#fff',
    },
    filled: {
      backgroundColor: isDark ? '#FFD700' : '#000',
    },
    num: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      color: isDark ? '#00BFFF' : '#333',
      marginTop: 5,
    },
  });
