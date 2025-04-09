import { Request, Response } from "express";
import slugify from "slugify";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

export const createAccount = async (req : Request, res : Response)=> {

    const {email, password} = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
        const error = new Error('Revisa: el usuario ya existe');
        res.status(409).json({error: error.message})
        return
    }
    
    const handle = slugify(req.body.handle, { lower: true, replacement: '-' });

    const handleExists = await User.findOne({handle});
    if (handleExists) {
        const error = new Error('Nombre de usuario no disponible');
        res.status(409).json({error: error.message})
        return
    }

   const user = new User(req.body);
   user.password = await hashPassword(password)
   user.handle = handle;
   
    await user.save()
    res.status(201).json({
        message: 'User created successfully'
    })
}

export const login = async (req:Request, res:Response) => {

    //? Recibiendo email y password
    const {email, password} = req.body;

    //? Comprobando el usuario en la base de datos
    const user = await User.findOne({email});
    if (!user) {
        const error = new Error('Error en las credenciales');
        res.status(404).json({error: error.message})
        return
    }

    //? Comprobando la contraseña
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('Error en las credenciales');
        res.status(404).json({error: error.message})
        return
    }

    console.log('usuario logueado');
    

    
}