import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, Cadastrar, Menu, AlfabetoBraille, Configuracoes, DigiteNumero, DigitePalavra,Exercicios, Historico, OpcoesPalavras, Sobre, ConfiguraAcessibilidade, EditaPerfil, EsqueciSenha
} from './components/index';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

function AuthGate({ children }) {
  const [loading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      setLoggedIn(!!token);
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3B4CCA" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={loggedIn ? 'Menu' : 'Login'}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{ title: 'Esqueci Senha' }} />
      <Stack.Screen name="Cadastrar" component={Cadastrar} options={{ title: 'Cadastro' }} />
      <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
      <Stack.Screen name="Alfabeto" component={AlfabetoBraille} options={{ title: 'Alfabeto Braille' }} />
      <Stack.Screen name="Opcoes" component={OpcoesPalavras} options={{ title: 'Exercícios' }} />
      <Stack.Screen name="Palavras" component={DigitePalavra} options={{ title: 'Palavras em Braille' }} />
      <Stack.Screen name="Numeros" component={DigiteNumero} options={{ title: 'Números em Braille' }} />
      <Stack.Screen name="Configuracoes" component={Configuracoes} options={{ title: 'Ajustes' }} />
      <Stack.Screen name="Exercicios" component={Exercicios} options={{ title: 'Exercícios em Braille' }} />
      <Stack.Screen name="Historico" component={Historico} options={{ title: 'Histórico' }} />
      <Stack.Screen name="Sobre" component={Sobre} options={{ title: 'Sobre' }} />
      <Stack.Screen name="ConfigurarAcessibilidade" component={ConfiguraAcessibilidade} options={{ title: 'Configurar Acessibilidade' }} />
      <Stack.Screen name="EditarPerfil" component={EditaPerfil} options={{ title: 'Editar Perfil' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthGate />
    </NavigationContainer>
  );
}