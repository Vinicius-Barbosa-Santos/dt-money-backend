# DT Money API

API para gerenciamento de transações financeiras (income/outcome) com Node.js, Express e Prisma Client JS (SQLite). Inclui validação com Zod, normalização do campo `type` para maiúsculo e endpoint de resumo com totais.

## Stack

- Node.js (ES2022) + TypeScript
- Express 5
- Prisma Client JS (SQLite)
- Zod (validação)
- CORS

## Requisitos

- Node.js 18+ e `npm`
- SQLite (embarcado via arquivo, não requer serviço externo)

## Configuração

1. Instalar dependências:

```bash
npm i
```

2. Geração do Prisma Client:

- O Prisma Client JS precisa ser gerado a partir do `schema.prisma`.
- Se não quiser rodar manualmente, adicione um `postinstall` no `package.json`:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "postinstall": "prisma generate"
  }
}
```

- Alternativamente, rode:

```bash
npx prisma generate
```

3. Migrações (após definir/alterar modelos):

```bash
npx prisma migrate dev --name create_tables
```

4. Subir o servidor:

```bash
npm run dev
```

Servidor escuta em `http://localhost:8080`.

## Banco de Dados

- `datasource` em `prisma/schema.prisma` usa SQLite:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

- O arquivo do banco (`dev.db`) fica dentro de `prisma/`.

## Estrutura de Pastas
