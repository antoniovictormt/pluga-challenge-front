# 📦 Pluga Challenge Front

Aplicação desenvolvida em **Next.js + TypeScript** para o desafio técnico da **Pluga**.

![Banner](https://via.placeholder.com/1200x300?text=Pluga+Challenge+Front)

---

## 📸 Demonstração da Interface

### ⭐ Lista de Aplicações
![Lista](https://via.placeholder.com/900x500?text=Listagem+de+Apps)

### ⭐ Modal de Detalhes
![Modal](https://via.placeholder.com/900x500?text=Modal+de+Detalhes)

---

## 🚀 Funcionalidades

| Funcionalidade | Descrição |
|---------------|-----------|
| 🔍 Busca em tempo real | Filtra ferramentas enquanto o usuário digita |
| 📄 Paginação | Navegação entre páginas baseada no total filtrado |
| 🧰 Modal de detalhes | Exibe informações completas da ferramenta |
| 🕒 Histórico de visualizações | Armazena no `localStorage` as últimas ferramentas abertas |
| 🌐 Consumo da API oficial | Busca dados de https://pluga.co/ferramentas_search.json |
| 🌎 Estado Global | Utiliza Context API para compartilhar estado |

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologias |
|----------|-------------|
| **Frontend** | Next.js, React, TypeScript |
| **Estilização** | Tailwind CSS, DaisyUI |
| **Testes** | Jest, Testing Library |
| **Ferramentas** | ESLint, Prettier |

---

## 📁 Estrutura do Projeto

```
src/
  app/
  components/
  context/
  service/
  types.ts
public/
jest.config.ts
tailwind.config.ts
```

---

## ▶️ Como Rodar o Projeto

```bash
npm install
npm run dev
```

Acesse:  
👉 http://localhost:3000

---

## 🧪 Testes

```bash
npm run test
```

Gera cobertura completa em:  
📁 `/coverage`

---

## 🧹 Scripts

| Script | Ação |
|--------|------|
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm start` | Executa build |
| `npm run lint` | Executa ESLint |
| `npm run format` | Ajusta formatação com Prettier |
| `npm test` | Roda a suíte de testes |

---

## 📄 Licença

Projeto desenvolvido exclusivamente para fins de **desafio técnico**.

---

## ✨ Créditos

Feito com ❤️ por **Antonio Melo**.
