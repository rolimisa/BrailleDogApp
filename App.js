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
          tittle: 'Alfabeto Braille'
        }}
        />

        <Stack.Screen
          name="Opcoes"
          component={OpcoesPalavras}
          options={{
            tittle: 'Opções Palavras em Braille'
          }}
        />

        <Stack.Screen
          name="Palavras"
          component={DigitePalavra}
          options={{
            tittle: 'Palavras em Braille'
          }}
        />

          <Stack.Screen
          name="Numeros"
          component={DigiteNumero}
          options={{
            tittle: 'Numeros em Braille'
          }}
        />

          <Stack.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{
            tittle: 'Configuracoes'
          }}
          />

          <Stack.Screen
          name="Exercicios"
          component={Exercicios}
          options={{
            tittle: 'Exercicios'
          }}
          />

          <Stack.Screen
          name="Historico"
          component={Historico}
          options={{
            tittle: 'Historico de palavras consultadas'
          }}
          />

          <Stack.Screen
          name="Sobre"
          component={Sobre}
          options={{
            tittle: 'Sobre'
          }}
          />

          <Stack.Screen
          name="ConfigurarAcessibilidade"
          component={ConfiguraAcessibilidade}
          options={{
            tittle: 'Configurar Acessbilidade'
          }}
          />

          <Stack.Screen
          name="Editar Perfil"
          component={EditaPerfil}
          options={{
            tittle: 'Editar Perfil'
          }}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;