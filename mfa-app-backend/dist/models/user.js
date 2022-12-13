"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_jwt = exports.login = exports.register = exports.generate_qr = exports.check_otp = exports.findUserByEmail = void 0;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const jwt = require('jsonwebtoken');
const prisma = new client_1.PrismaClient();
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
    });
}
exports.findUserByEmail = findUserByEmail;
function check_otp(secret, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        return speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: otp
        });
    });
}
exports.check_otp = check_otp;
function generate_qr() {
    return __awaiter(this, void 0, void 0, function* () {
        const secret_generated = speakeasy.generateSecret({
            name: "MFA App"
        });
        const secret = secret_generated.base32;
        const qr = yield qrcode.toDataURL(secret_generated.otpauth_url);
        return { secret, qr };
    });
}
exports.generate_qr = generate_qr;
function register(name, surname, email, password, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.user.create({
                data: {
                    name: name,
                    surname: surname,
                    email: email,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                    secret: secret
                }
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.register = register;
function login(email, password, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user || !bcrypt.compareSync(password, user.password) || !(yield check_otp(user.secret, otp))) {
                throw new Error("Wrong credentials");
            }
            return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
exports.login = login;
function check_jwt(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY);
        }
        catch (e) {
            throw new Error("Invalid token");
        }
    });
}
exports.check_jwt = check_jwt;
