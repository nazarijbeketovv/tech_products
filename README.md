# Тех.задание


## API эндпоинты:

- `GET /api/v1/products/` — Получение списка всех продуктов в формате JSON.
  
  **Пример ответа**:
  ```json
  [
      {
          "id": 1,
          "name": "Продукт 1",
          "description": "Описание продукта 1",
          "price": 99.99
      },
      {
          "id": 2,
          "name": "Продукт 2",
          "description": "Описание продукта 2",
          "price": 199.99
      }
  ]

- `POST /api/v1/products/` — Добавление нового продукта.
  
  **Пример запроса**:
  ```json
    {
        "name": "Пример продукта",
        "description": "Описание продукта",
        "price": 99.99
    }
    ```

  **Пример ответа**:
  ```json
    {
        "id": 3,
        "name": "Пример продукта",
        "description": "Описание продукта",
        "price": 99.99
    }
    ```

## Установка и запуск

### 1. Клонирование репозитория:

```bash
git clone https://github.com/nazarijbeketovv/tech_products
cd tech_products
```

### 2. Установка зависимостей:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Создание и применение миграций:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```
### 4. Запуск приложения:

```bash
python3 manage.py runserver
```

## Установка и запуск с помощью Docker:

```bash
docker-compose up --build
```

## Запуск тестов:

```bash
python3 manage.py test apps
```

## Структура проекта:

```bash
.
├── Dockerfile
├── LICENSE.txt
├── README.md
├── apps
│   └── products
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── serializers.py
│       ├── static
│       │   └── products
│       │       ├── css
│       │       │   └── styles.css
│       │       └── js
│       │           └── script.js
│       ├── templates
│       │   └── products
│       │       └── products.html
│       ├── tests
│       │   ├── __init__.py
│       │   └── test_views.py
│       ├── urls.py
│       └── views.py
├── config
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── docker-compose.yml
├── entrypoint.sh
├── manage.py
├── media
├── nginx
│   ├── Dockerfile
│   └── nginx.conf
├── requirements.txt
└── static
```