import { Router } from 'express';

const router = Router();

//! Routing Auth
router.post('/auth/register', (req, res)=> {
    console.log(req.body);
})


export default router;