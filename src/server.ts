import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db';
import router from './router';


const server = express();
connectDB()

//! Habilitar la lectura de datos en el Form
server.use(express.json());

server.use('/', router)

export default server;