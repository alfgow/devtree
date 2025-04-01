import colors from 'colors';
import server from './server';

// interface Product {
//     id: number;
//     price: number;
//     name: string;
// }

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(colors.magenta.bold('Server is running on port'), port);
});

// let productName = 'Laptop'
// let isAuth = true

// let product : Product = {
//     id: 1,
//     price: 30,
//     name: 'tablet',
// }

// let product2 : Product = {
//     id: 2,
//     price: 40,
//     name: 'tablet 11 pulgadas',
// }

// const numbers = [1, 2, 3, 4, 5]