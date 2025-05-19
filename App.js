import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, Cadastrar, Menu, AlfabetoBraille, Configuracoes, DigiteNumero, DigitePalavra, Exercicios, Historico, OpcoesPalavras, Sobre, ConfiguraAcessibilidade, EditaPerfil, EsqueciSenha} from './components/index'; 

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Não mostra o cabeçalho na tela de login
        />
        <Stack.Screen
          name="EsqueciSenha"
          component={EsqueciSenha}
          options={{
            title: 'Esqueci Senha', // Título da tela
          }}
          />
        <Stack.Screen
          name="Cadastrar"
          component={Cadastrar}
          options={{
            title: 'Cadastro', // Título da tela
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ 
            tittle:'Login'
           }} 
        />

        <Stack.Screen
        name="Alfabeto"
        component={AlfabetoBraille}
        options = {{
          title: 'Alfabeto Braille'
        }}
        />

        <Stack.Screen
          name="Opcoes"
          component={OpcoesPalavras}
          options={{
            title: 'Exercícios'
          }}
        />

        <Stack.Screen
          name="Palavras"
          component={DigitePalavra}
          options={{
            title: 'Palavras em Braille'
          }}
        />

          <Stack.Screen
          name="Numeros"
          component={DigiteNumero}
          options={{
            title: 'Números em Braille'
          }}
        />

          <Stack.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{
            title: 'Ajustes'
          }}
          />

          <Stack.Screen
          name="Exercicios"
          component={Exercicios}
          options={{
            title: 'Exercícios em Braille'
          }}
          />

          <Stack.Screen
          name="Historico"
          component={Historico}
          options={{
            title: 'Histórico'
          }}
          />

          <Stack.Screen
          name="Sobre"
          component={Sobre}
          options={{
            title: 'Sobre'
          }}
          />

          <Stack.Screen
          name="ConfigurarAcessibilidade"
          component={ConfiguraAcessibilidade}
          options={{
            title: 'Configurar Acessibilidade'
          }}
          />

          <Stack.Screen
          name="EditarPerfil"
          component={EditaPerfil}
          options={{
            title: 'Editar Perfil'
          }}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;