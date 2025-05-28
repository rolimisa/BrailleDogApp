import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SobreScreen = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('darkTheme');
      if (temaSalvo !== null) setIsDark(temaSalvo === 'true');
    };
    carregarTema();
  }, []);

  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#1c1c1c' : '#3B4CCA'}
      />
      <ScrollView>
        <View style={styles.box}>
          <View style={styles.row}>
            <View>
              <Text style={styles.desc}>
                O Dia Nacional do Braille é comemorado em 8 de abril, data que marca o nascimento de José Álvares de Azevedo, um dos principais responsáveis por introduzir o sistema Braille no Brasil.
                Ele foi o idealizador da primeira escola dedicada ao ensino de pessoas cegas no país: o Imperial Instituto de Meninos Cegos, hoje conhecido como Instituto Benjamin Constant.
                A homenagem reconhece sua contribuição pioneira para a inclusão e a educação das pessoas com deficiência visual.
              </Text>

              <Text style={styles.desc}>
                Essa data reforça a importância da acessibilidade, da inclusão e do direito à educação para todos, sendo um marco na luta por igualdade de oportunidades no Brasil.
                Este aplicativo foi desenvolvido com o propósito de ensinar o sistema Braille de forma interativa, acessível e educativa.
                Nele, os usuários têm acesso ao alfabeto Braille, números, palavras do cotidiano, além de poderem praticar com exercícios que fortalecem o reconhecimento dos símbolos e incentivam o aprendizado contínuo.
                É uma ferramenta útil para iniciantes, educadores, familiares e todos que desejam contribuir para a inclusão.
              </Text>

              <Text style={styles.desc}>
                A iniciativa é das desenvolvedoras Ana Isabelly Soncim Venancio e Isabella Rolim de Souza, alunas da ETEC Fernando Prestes, comprometidas com a tecnologia inclusiva e a transformação social.
                O aplicativo nasceu do desejo de quebrar barreiras de comunicação e aproximar o conhecimento de forma acessível a todos, contribuindo para um mundo mais justo e empático.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SobreScreen;

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1c1c1c' : '#a9c2e7',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      backgroundColor: isDark ? '#333' : '#D6EAF8',
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
      color: isDark ? '#fff' : '#000',
    },
    desc: {
      fontSize: 20,
      color: isDark ? '#00BFFF' : '#333',
      marginTop: 20,
      textAlign: 'justify',
    },
    previewText: {
      marginTop: 10,
      textAlign: 'center',
      color: isDark ? '#ccc' : '#000',
    },
  });
