import { Router } from 'express';
import User from './models/User';

const router = Router();

//! Routing Auth
router.post('/auth/register', async (req, res)=> {
    const user = new User(req.body);
    await user.save()
    res.json({
        message: 'User created successfully',
        user
    })
})


export default router;