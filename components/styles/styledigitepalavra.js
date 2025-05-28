import { StyleSheet} from 'react-native';

export const getStyles = (isDark, cellWidth, circleSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    scrollContainer: {
      alignItems: 'center',
      paddingBottom: 50,
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      marginTop: 30,
      marginBottom: 15,
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
      marginBottom: 25,
      borderColor: isDark ? '#FFD700' : '#ccc',
      borderWidth: 1,
      elevation: 2,
    },
    brailleContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cela: {
      height: 150,
      width: cellWidth,
      alignItems: 'center',
      marginBottom: 20,
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
    plvLabel: {
      marginTop: 5,
      fontSize: 26,
      color: isDark ? '#00BFFF' : '#222',
      fontWeight: '600',
      textAlign: 'center',
    },
  });