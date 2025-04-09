import { Request, Response } from "express";
import { validationResult } from "express-validator";
import slugify from "slugify";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req : Request, res : Response)=> {

    //! Manejo de errores de validación
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() });
    }

    console.log(errors);
    return
    

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