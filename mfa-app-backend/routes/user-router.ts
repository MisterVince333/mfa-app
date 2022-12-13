import express, { Request, Response } from 'express';
import * as userModel from '../models/user';

const userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        await userModel.register(req.body.name, req.body.surname, req.body.email, req.body.password, req.body.secret);
        return res.status(200).json({ success: true })
    } catch (error: any) {
        return res.status(200).json({ success: false, error: error.message })
    }
})

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const token = await userModel.login(req.body.email, req.body.password, req.body.otp);
        return res.status(200).json({ success: true, token: token })
    } catch (error: any) {
        return res.status(200).json({ success: false, error: error.message })
    }
});

userRouter.get('/generate_qr', async (req: Request, res: Response) => {
    const two_fa = await userModel.generate_qr();
    return res.status(200).json(two_fa)
});

userRouter.post('/check_email', async (req: Request, res: Response) => {
    if (await userModel.findUserByEmail(req.body.email)) {
        return res.status(200).json({ exists: true })
    } else {
        return res.status(200).json({ exists: false })
    }
});

userRouter.post('/check_otp', async (req: Request, res: Response) => {
    if (await userModel.check_otp(req.body.secret, req.body.otp)) {
        return res.status(200).json({ correct: true })
    } else {
        return res.status(200).json({ correct: false })
    }
});

userRouter.post('/check_jwt', async (req: Request, res: Response) => {
    try {
        await userModel.check_jwt(req.body.token)
        return res.status(200).json({ correct: true })
    } catch (error: any) {
        return res.status(200).json({ correct: false, error: error.message })
    }
});

export { userRouter }; 