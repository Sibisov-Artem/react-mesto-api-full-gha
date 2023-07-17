// Верифицируем токен
// извлечение и проверяка токен
// Проверяем, что пользователь имеет доступ к данному
// ресурсу. Если нет — возвращаем ошибку

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError'); // 401
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) { // с "|| !authorization.startsWith('Bearer ')" выходим на ошибку...
    //  уточнить, почему это происходит...
    next(new UnauthorizedError('Необходима авторизация, нет authorization'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'strong-secret-key');
    console.log(payload);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
