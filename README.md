# Sistema de Reservas de Hotel

Este é um sistema de gerenciamento de reservas de hotel com backend em Node.js/Express e frontend em Next.js.

## Funcionalidades

- Gerenciamento de hóspedes
- Gerenciamento de quartos
- Gerenciamento de reservas

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose (para o banco de dados PostgreSQL)

## Configuração

1. Clone o repositório:
```bash
git clone https://seu-repositorio/sistema-reservas-hotel.git
cd sistema-reservas-hotel
```

2. Instale as dependências:
```bash
# Instala as dependências do backend
npm install

# Instala as dependências do frontend
cd frontend
npm install
cd ..
```

3. Configure o banco de dados:
```bash
# Inicia o PostgreSQL com Docker
cd docker
docker-compose up -d
cd ..
```

4. Configure as variáveis de ambiente:
```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

5. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

6. Inicie o projeto em modo de desenvolvimento:
```bash
npm run dev
```

## Execução

- Backend: http://localhost:3001
- Frontend: http://localhost:3000

## Estrutura do Projeto

```
/
├── frontend/            # Código do frontend (Next.js)
├── prisma/              # Configuração do Prisma e migrações
├── src/                 # Código do backend
│   ├── routes/          # Rotas da API
│   ├── lib/             # Bibliotecas e utilidades
│   ├── app.ts           # Configuração do Express
│   └── index.ts         # Ponto de entrada do servidor
├── docker/              # Configuração do Docker
└── README.md            # Este arquivo
```
