# TASM DOCS BACKEND

Node js сервер для [руководства по ассемблеру](https://github.com/Avecoder/masmClient)

## Запуск

```bash
  npm install
  npm run dev 
```
    
## Конфигурация

Создайте файл .env в корне вашего проекта:

```
PORT=5000
DB_PASS=YOURPASSWORD
```


## Библиотеки

- express
- mongodb
- mongoose
- multer
- nodemailer
- bcrypt


## Описание маршрутов сервера

### Авторизация
 
```/auth/login```

Тип запроса: POST

#### Тело запроса: 
- lastName
- eLibraryId


### Отправка пригласительной ссылки на почту
 
```/auth/link```

Тип запроса: POST

#### Тело запроса: 
- email




### Проверка пригласительной ссылки
 
```/auth/link```

Тип запроса: GET

#### параметры: 
- auth_token




### Получить информацию о пользователе
 
```/auth/me```

Тип запроса: GET



### Регистрация
 
```/auth/registration```

Тип запроса: POST

#### Тело запроса: 
- email
- password





### Получение постов определенной категории
 
```/posts/:category```

Тип запроса: GET



### Получение поста по id
 
```/post/:id```

Тип запроса: GET




### Создание поста
 
```/posts```

Тип запроса: POST

#### Тело запроса: 

- text
- title
- category
- imageURL (необязательный)






### Удаление поста
 
```/posts/:id```

Тип запроса: DELETE







### Обновление поста
 
```/posts/:id```

Тип запроса: PATCH

#### Тело запроса:
- text
- title
- imageURL
- category
- id
