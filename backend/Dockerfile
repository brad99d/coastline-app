FROM python:3.12-slim

WORKDIR /app

# prevent caching
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# update system
RUN apt-get update && apt-get install -y \
    build-essential libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# install python packages
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# copy project
COPY . .

# expose django port
EXPOSE 8000

# run django dev server
CMD ["gunicorn", "app.wsgi:application", "-b", "0.0.0.0:8000"]