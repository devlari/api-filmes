# Api Filmes 🎬

Este projeto foi desenvolvido como parte de um desafio técnico para a empresa **cubos.io**.  
A proposta era criar uma API para gerenciamento de filmes, com autenticação, cadastro e listagem, junto com seu ambiente web.

## ✨ Funcionalidades implementadas

- Sistema de autenticação com JWT
- Cadastro, edição, alteração e exclusão de filmes
- Upload de imagens usando Cloudflare R2
- Bot de envios de e-mail automáticos com Resend
- ORM Prisma

---

## 🧰 Tecnologias

- **Typescript**
- **Prisma**
- **PostgreSQL**
- **JWT (jsonwebtoken)**
- **Zod**
- **CRON**

---

##📦 Instalações necessárias
- Node.js (recomendada versão 18 ou superior)
- PostgreSQL rodando localmente ou remotamente
- Prisma CLI (opcional, mas recomendado)
- Terminal de sua preferência

##▶️ Como rodar o projeto localmente
Siga os passos abaixo para clonar o repositório e iniciar a API em ambiente de desenvolvimento:

1. Clone o repositório
```bash
git clone https://github.com/devlari/api-filmes.git
```
2. Acesse a pasta do projeto
```bash
cd api-filmes
```

3. Instale as dependências
```bash
npm install
```
4. Configure as variáveis de ambiente
Crie um arquivo .env na raiz do projeto com as variáveis necessárias.

```ini
DATABASE_URL="postgresql://postgres:1234@localhost:5432/filmesdb"
JWT_SECRET="2bd4bccc123f48b71d91266b5d3ef11c4faee5615b3a67b3b62b761455f93ef4"
JWT_REFRESH_SECRET="5bc46baf3988c33eecd730368833019dc8d5515871d7790729a848f0e470eef8"

R2_ACCESS_KEY_ID="d4ac7d903d4360c5d7107f75e5e6db3b"
R2_SECRET_ACCESS_KEY="50d9aa539b7e196bdfba51e905d82a78d1d10552de7da03d1a16b3351e769fd6"
R2_REGION="auto"
R2_ENDPOINT="https://339ef1903b1550c986f838a45d4fbdfe.r2.cloudflarestorage.com"

RESEND_API_KEY="re_4e6UR1sp_DyVXD9w6TjVNFoGj3sffxcwm"

R2_TOKEN="cf72C8FJsZxABYa0UbjmOKsGdgKUeeNw3DlfYBZB"
R2_BUCKET_NAME="filmes"

R2_BUCKET_URL="https://pub-ba8385b85ead456fbb39dc54e4147006.r2.dev"
```

5. Rode as migrações do Prisma
```bash
npx prisma migrate dev
```

💡 Você também pode abrir o Prisma Studio para visualizar o banco de dados com:
```bash
npx prisma studio
```
6. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

A API estará rodando em:
http://localhost:3000
