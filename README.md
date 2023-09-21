<h1 align="center">
    cryptosia
</h1>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/.github/cover.png">
  <source media="(prefers-color-scheme: light)" srcset="/.github/cover_light.png">
  <img alt="Main projeto cover." src="/.github/cover_light.png">
</picture>

## 💻 Projeto

Utilize o cryptosia para gerar chaves pública e privada em sintonia, garantindo segurança simplificada de mensagens simples por meio da Criptografia RSA.

<br />

## ✨ Tecnologias

<!--
#### Frontend:

-   [ ] HTML
-   [ ] CSS
-   [ ] TypeScript
-   [ ] Next.js
-   [ ] TailwindCSS
-   [ ] Radix & Radix Icons

#### Backend

-   [ ] Emscripten
-   [ ] WebAssembly
-   [ ] C
-->

| Frontend  | Backend |
| ------------------ | ------------- |
| HTML  | WebAssembly  |
| CSS  | Emscripten  |
| TypeScript  | C  |
| Next.js  |   |
| TailwindCSS  |   |
| Radix & Radix Icons  |   |

<br />

## 💽 Como compilar o backend em C

> [!IMPORTANT]  
> O passo a passo disponível a seguir refere-se à compilação em um dispositivo Windows. Para especificações em outros sistemas operacionais, visite a página oficial do [emscripten](https://emscripten.org/docs/getting_started/downloads.html).

<br />

-   Siga as instruções de instalação do **emscripten** em [emscripten.org/docs/getting_started/downloads.html](https://emscripten.org/docs/getting_started/downloads.html)
-   Abra o terminal `Emscripten Windows Command Prompt (emcmdprompt.bat)` disponível no diretório `\emscripten\emsdk` e navegue até `\upstream\emscripten/`
-   Com o terminal no diretório correto, compile o arquivo `cryptosia.c` com o seguinte comando:

```
emcc -O3 "[diretório do arquivo C]\cryptosia.c" -o "[diretório de saída]\cryptosia.js" -lm --profiling-funcs -s MODULARIZE -s WASM=1 -s EXPORT_NAME="CRYPTOSIA" -s ENVIRONMENT="web" -s EXPORTED_FUNCTIONS=[nome das funções antecipados de "_", sem espaços e separados por "," como em "_int_sqrt"] EXPORTED_RUNTIME_METHODS=ccall,cwrap
```

> Exemplo:

```
emcc -O3 "C:\Users\eduar\Projetos\cryptosia\cryptosia-backend\cryptosia.c" -o "C:\Users\eduar\Projetos\cryptosia\cryptosia-backend\cryptosia.js" -lm --profiling-funcs -s MODULARIZE -s WASM=1 -s EXPORT_NAME="CRYPTOSIA" -s ENVIRONMENT="web" -s EXPORTED_FUNCTIONS=_n_factor,_publicKey_totient,_publicKey_e,_privateKey_d,_mdc -s EXPORTED_RUNTIME_METHODS=ccall,cwrap
```

> [!NOTE]  
> _O argumento `-O3` é utilizado para otimizar o código. Portanto, ao utilizá-lo, prepare-se para tempos de compilação maiores. <br /> Para tempos mais rápidos, utilize níveis de otimização menor como -O1, O2 ou Oz!_

-   Copie os arquivos `cryptosia.js` e `cryptosia.wasm` gerados para a pasta `public` do projeto

<br />

## 🚀 Como executar

-   Clone o repositório
-   Instale as dependências com `npm`, `yarn` ou `pnpm`
-   Inicie o servidor com `npm run dev`, `yarn dev` ou `pnpm dev`

Agora você pode acessar [`localhost:3000`](http://localhost:3000) do seu navegador.

<br />

## 👥 Grupo

-   [ ] [Eduardo Maciel](https://github.com/theduardomaciel) - Frontend e Backend
-   [ ] [David Enéas](https://github.com/EneasDavid) - Backend
-   [ ] Maria Emily Nayla Gomes da Silva - Fundamentação teórica matemática e Apresentações
-   [ ] Mariáh Lins Sena - Redição de texto
-   [ ] Pedro Gabriel Medeiros de Lima - Redição de texto
-   [ ] Victória Júllya Cabral da Silva - Redição de texto

<br />

## 📝 Licença

Este projeto utiliza a MIT License. Veja o arquivo de [LICENÇA](LICENSE) para mais detalhes.
