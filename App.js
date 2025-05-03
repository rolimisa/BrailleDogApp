import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, Cadastrar, Menu, AlfabetoBraille, Configuracoes, DigiteNumero, DigitePalavra, Exercicios, Historico, OpcoesPalavras, Sobre} from './components/index'; 

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
            titlle:'Login'
           }} 
        />

        <Stack.Screen
        name="Alfabeto"
        component={AlfabetoBraille}
        options = {{
          tittle: 'Alfabeto Braille'
        }}
        />

        <Stack.Screen
          name="Opcoes"
          component={OpcoesPalavras}
          options={{
            titlle: 'Opções Palavras em Braille'
          }}
        />

        <Stack.Screen
          name="Palavras"
          component={DigitePalavra}
          options={{
            titlle: 'Palavras em Braille'
          }}
        />

          <Stack.Screen
          name="Numeros"
          component={DigiteNumero}
          options={{
            titlle: 'Numeros em Braille'
          }}
        />

          <Stack.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{
            titlle: 'Configuracoes'
          }}
          />

          <Stack.Screen
          name="Exercicios"
          component={Exercicios}
          options={{
            titlle: 'Exercicios'
          }}
          />

          <Stack.Screen
          name="Historico"
          component={Historico}
          options={{
            titlle: 'Historico de palavras consultadas'
          }}
          />

          <Stack.Screen
          name="Sobre"
          component={Sobre}
          options={{
            titlle: 'Sobre'
          }}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;