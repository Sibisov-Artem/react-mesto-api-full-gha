require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./utils/errors/NotFoundError');

const regularHttp = require('./utils/regularHttp');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

// mongoose.connect('mongodb://localhost:27017/mestodb');
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
}).then(() => {
  console.log('connected to db');
});

app.use(requestLogger); // подключаем логгер запросов до всех обработчиков роутов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.get('/', (req, res) => {
  res.send('проверка');
});

app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regularHttp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use(errorLogger); // нужно подключить после обработчиков роутов и до обработчиков ошибок

app.use((req, res, next) => {
  next(new NotFoundError('Тут ничего нет'));
});

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
});
