# Coding Challenge - Tractian

## DESAFIO
Construir uma aplicação web mobile que mostre todos os dados e ações possíveis
que utilizam a API criada no desafio back-end.

Importante:
- Mostrar todas as características do ativos;
- Mostrar empresas, unidades e usuários;
- Ações como delegar responsável, atualizar ativo, empresa, unidade e usuários;
- Utilizar gráficos para mostrar os níveis de saúde, status e etc.
- Consumir API (https://github.com/tractian/fake-api)

Obrigatório:
- Engine (React)
- Gráficos (Highcharts)
- Ant Design Mobile

Diferenciais:
- Typescript;
- Padrão de Projetos(Código Limpo/Arquitetura Limpa);

!! Faça apenas o desafio para resoluções de celulares e orientação na vertical.

## Features

A primeira coisa que eu fiz foi dividir as demandas do projeto em "Features", cada uma com os seus casos de uso. A divisão escolhida foi a seguinte:

- Gerenciar dados de máquinas:
  - Buscar entre todas as máquinas.
  - Mostrar detalhes de uma máquina.
  - Modificar dados de uma máquina.
- Gerenciar dados empresariais: 
  - Buscar entre todas em empresas.
  - Mostrar detralhes de uma empresa e suas unidades respectivas.
  - Modificar dados de uma empresa.
  - Modificar dados de uma unidade.
- Gerenciar dados de usuários:
  - Buscar entre todos os usuários.
  - Mostrar detalhes de um usuário.
  - Modificar dados de um usuário.
  - Delegar maquinas para usuários.

## Arquitetura

Para a arquitetura, eu adapter o padrão de CLEAN Archtecture do ResoCoder (https://resocoder.com/2019/08/27/flutter-tdd-clean-architecture-course-1-explanation-project-structure/), que divide o projeto em core e features e segue o padrão abaixo para cada feature:


![image](https://user-images.githubusercontent.com/44446242/167227146-af973687-eddc-4640-a789-cc00b294b1d9.png)

As alterações que fiz na arquitetura são as seguintes:
- Ao invés do BloC do Dart, eu usei o Redux Toolkit.
- No projeto dele, ele divide os "widgets" em duas pastas, "pages" e "widget". Eu optei por usar só a pasta "pages" e fazer uma pasta por página, com os seus componentes respectivos dentro de uma pasta "components" própria.
- Ao invés de usar "entities" e "models", como foi tudo implementado com interfaces do Typescript, eu preferi usar somente as "entities" para as duas camadas.

## Bibliotecas Usadas
- React
- Redux Toolkit (Gerenciamento do Estado)
- Axios (Comunicação com API)
- Awilix (Injeção de Dependências)
- Highcharts (Gráficos)
- Ant Design Mobile (UI)
- Styled Components (Styling)

## Considerações Finais
O projeto está disponível para acesso no GitHub Pages. Obrigado pelo desafio :)
