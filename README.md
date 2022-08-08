
# Ionic Angular

Com este mvp o usuário pode registrar ponto de entrada e saída. Está configurado para a utilizacao de um estagiário fictício, onde ele não 
consegue realizar a marcacao do ponto se o limite de 6h de trabalho for ultrapassado, somente consegue realizar a marcacao inserindo
uma justificativa.




## Funcionalidades

- Marcacao de ponto de entrada;
- Marcacao de ponto de saída;
- Edicao de marcacao (para editar haverá a necessidade de inserir uma justificativa);
- Filtrar resultados de marcacões anteriores (7, 15, 30, 60 e 90 dias atrás);
- Insercao de justificativas
- Listagem de marcacões efetuadas;







## Melhorias

- A funcionalidade de selecão de tarefas/criacão de tarefas não foi finalizada;
- O usuário consegue realizar a edicão de uma marcacao sem uma justificativa (lógica não finalizada);
- O usuário consegue realizar n marcacões de entrada e saída;


## Stack utilizada

**Front-end:** Ionic, Angular

**Back-end:** none

**Mock**: './src/mockData/employee-records/RecordsData.json'

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/GuilhermeFontanella/ionic.git
```

Entre no diretório do projeto

```bash
  cd time
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  ionic serve
```

