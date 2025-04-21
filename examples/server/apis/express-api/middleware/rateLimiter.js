const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 100, // límite de 100 solicitudes por IP
  message: 'Has excedido el límite de 100 solicitudes en 5 minutos',
  headers: true,
});

module.exports = limiter;
