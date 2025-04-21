const clase = require('./calcular_fecha');

let fecha_nueva = clase.calcular(new Date('2025-01-01'), new Date('2025-03-01'));

let string_date1 = new Date(fecha_nueva).getFullYear() - 1970 + " años, " + new Date(fecha_nueva).getMonth() + " meses, " + new Date(fecha_nueva).getDate() + " días";
console.log("La diferencia entre las fechas es: " + string_date1);

console.log(clase.saludar());