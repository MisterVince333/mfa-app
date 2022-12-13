import { PrismaClient, User } from '@prisma/client'
const bcrypt = require("bcrypt")
const speakeasy = require("speakeasy")
const qrcode = require("qrcode")
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient()



export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export async function check_otp(secret: string, otp: number) {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: otp
    })
}

export async function generate_qr() {
    const secret_generated = speakeasy.generateSecret({
        name: "MFA App"
    })
    const secret = secret_generated.base32
    const qr = await qrcode.toDataURL(secret_generated.otpauth_url)
    return { secret, qr }
}

export async function register(name: string, surname: string, email: string, password: string, secret: string) {
    try {
        return await prisma.user.create({
            data: {
                name: name,
                surname: surname,
                email: email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                secret: secret
            }
        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function login(email: string, password: string, otp: number) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user || !bcrypt.compareSync(password, user.password) || !await check_otp(user.secret, otp)) {
            throw new Error("Wrong credentials")
        }
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    } catch (e) {
        throw new Error((e as Error).message)
    }
}

export async function check_jwt(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (e) {
        throw new Error("Invalid token")
    }
}


