import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';

const SobreScreen = () => {
  const conteudo = `
O Dia Nacional do Braille é comemorado em 8 de abril, data que marca o nascimento de José Álvares de Azevedo um dos principais responsáveis por introduzir o sistema Braille no Brasil.
Ele foi o idealizador da primeira escola dedicada ao ensino de pessoas cegas no país: o Imperial Instituto de Meninos Cegos, hoje conhecido como Instituto Benjamin Constant.
A homenagem reconhece sua contribuição pioneira para a inclusão e a educação das pessoas com deficiência visual.
Essa data reforça a importância da acessibilidade, da inclusão e do direito à educação para todos, sendo um marco na luta por igualdade de oportunidades no Brasil.

Este aplicativo foi desenvolvido com o propósito de ensinar o sistema Braille de forma interativa, acessível e educativa.
Nele, os usuários têm acesso ao alfabeto Braille, números, palavras do cotidiano, além de poderem praticar com exercícios que fortalecem o reconhecimento dos símbolos e incentivam o aprendizado contínuo.
É uma ferramenta útil para iniciantes, educadores, familiares e todos que desejam contribuir para a inclusão.

A iniciativa é das desenvolvedoras Ana Isabelly Soncim Venancio e Isabella Rolim de Souza, alunas da ETEC Fernando Prestes, comprometidas com a tecnologia inclusiva e a transformação social.
O aplicativo nasceu do desejo de quebrar barreiras de comunicação e aproximar o conhecimento de forma acessível a todos, contribuindo para um mundo mais justoe empático.`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#3B4CCA" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.texto}>{conteudo}</Text>
      </ScrollView>
    </View>
  );
};

export default SobreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9c2e7',
  },
  header: {
    backgroundColor: '#3B4CCA',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  scrollContent: {
    padding: 15,
  },
  texto: {
    fontSize: 18,
    lineHeight: 28,
    color: '#000',
  },
});