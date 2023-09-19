<h1 align="center">
    cryptosia
</h1>

![cover](.github/cover.png?style=flat)

## 💻 Projeto

Utilize o cryptosia para gerar chaves pública e privada em perfeita sintonia, garantindo segurança simplificada de mensagens simples por meio da Criptografia RSA.

## ✨ Tecnologias

-   [ ] HTML
-   [ ] CSS
-   [ ] TypeScript
-   [ ] Next.js
-   [ ] TailwindCSS
-   [ ] Radix & Radix Icons

## 💽 Como compilar o backend em C

-   Siga as instruções do **emscripten** em [emscripten.org/docs/getting_started/downloads.html](https://emscripten.org/docs/getting_started/downloads.html)
-   Abra o terminal `Emscripten Windows Command Prompt (emcmdprompt.bat)` disponível na pasta do **emscripten** e navegue até a pasta do projeto dentro do terminal
-   Compile o arquivo `cryptosia.c` com o comando `emcc cryptosia.c -o cryptosia.js -s EXPORTED_FUNCTIONS="['_cryptosia']" -s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" -s MODULARIZE=1 -s 'EXPORT_NAME="cryptosia"' -s WASM=1`
-   Copie o arquivo `cryptosia.js` para a pasta `public` do projeto
-   Copie o arquivo `cryptosia.wasm` para a pasta `public` do projeto

## 🚀 Como executar

-   Clone o repositório
-   Instale as dependências com `npm`, `yarn` ou `pnpm`
-   Inicie o servidor com `npm run dev`, `yarn dev` ou `pnpm dev`

Agora você pode acessar [`localhost:3000`](http://localhost:3000) do seu navegador.

## 👥 Grupo

-   [ ] [Eduardo Maciel](https://github.com/theduardomaciel) - Frontend e Backend
-   [ ] [David Enéas] - Backend

## 📝 Licença

Este projeto utiliza a MIT License. Veja o arquivo de [LICENÇA](LICENSE) para mais detalhes.
