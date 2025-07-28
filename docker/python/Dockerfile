FROM python:3.11-slim

WORKDIR /app

# Instala dependências do sistema (necessárias para pacotes como psycopg2, etc)
RUN apt-get update && apt-get install -y \
  build-essential \
  libpq-dev \
  && rm -rf /var/lib/apt/lists/*

# Copia os arquivos do backend para dentro do container
COPY ./backend /app

# Instala as dependências Python
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

# Comando que roda sua API FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
