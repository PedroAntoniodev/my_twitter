# MyTwitter - Projeto Fullstack

Este projeto é composto por duas partes principais:

- **Backend**: API construída em Django + Django REST Framework
- **Frontend**: Interface web construída em React com Vite

---

## 🚀 Backend (Django REST Framework)

### Estrutura

- Framework: Django + Django REST Framework
- Banco de dados: SQLite (padrão do Django)
- Hospedagem: PythonAnywhere → https://pedroantoniodev1.pythonanywhere.com

### Instalação local

1. Clone o repositório:
   git clone <url-do-repo>
   cd backend

2. Crie e ative um ambiente virtual:
   python -m venv venv
   source venv/bin/activate # Linux/Mac
   venv\Scripts\activate # Windows

3. Instale as dependências:
   pip install -r requirements.txt

4. Execute as migrações:
   python manage.py migrate

5. Inicie o servidor:
   python manage.py runserver

### Testes

Para rodar os testes automatizados:
pytest

---

## 🎨 Frontend (React + Vite)

### Estrutura

- Framework: React com Vite
- Hospedagem: Vercel → https://mytwitter-pedroantoniodev.vercel.app

### Instalação local

1. Acesse a pasta do frontend:
   cd frontend

2. Instale as dependências:
   npm install

3. Execute em modo desenvolvimento:
   npm run dev

4. Build para produção:
   npm run build

   A saída será gerada na pasta dist/.

### Configuração de rotas (React Router)

Para que as rotas funcionem corretamente na Vercel, crie um arquivo vercel.json na raiz do frontend:

{
"rewrites": [
{ "source": "/(.*)", "destination": "/" }
]
}

---

## 🔗 Integração Frontend ↔ Backend

- O frontend consome a API hospedada em PythonAnywhere:
  https://pedroantoniodev1.pythonanywhere.com

---

## 🌐 Deploy

### Backend (PythonAnywhere)

1. Crie uma conta em pythonanywhere.com.
2. Configure um novo app Django.
3. Faça upload do código do backend.
4. Instale as dependências via requirements.txt.
5. Configure o WSGI para apontar para o wsgi.py do projeto.
6. A API estará disponível em:
   https://pedroantoniodev1.pythonanywhere.com

### Frontend (Vercel)

1. Crie uma conta em vercel.com.
2. Clique em New Project e selecione o repositório.
3. Configure o Root Directory para frontend.
4. Build Command: npm run build
5. Output Directory: dist
6. Deploy automático a cada git push.

---

## 🧪 Testes

- Backend: pytest
- Frontend: npm run dev (modo desenvolvimento para validar rotas e componentes)

---

## 📌 Observações

- Limpe o cache do navegador após deploy para ver alterações visuais.
