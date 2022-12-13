"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userModel = __importStar(require("../models/user"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel.register(req.body.name, req.body.surname, req.body.email, req.body.password, req.body.secret);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(200).json({ success: false, error: error.message });
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield userModel.login(req.body.email, req.body.password, req.body.otp);
        return res.status(200).json({ success: true, token: token });
    }
    catch (error) {
        return res.status(200).json({ success: false, error: error.message });
    }
}));
userRouter.get('/generate_qr', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const two_fa = yield userModel.generate_qr();
    return res.status(200).json(two_fa);
}));
userRouter.post('/check_email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield userModel.findUserByEmail(req.body.email)) {
        return res.status(200).json({ exists: true });
    }
    else {
        return res.status(200).json({ exists: false });
    }
}));
userRouter.post('/check_otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield userModel.check_otp(req.body.secret, req.body.otp)) {
        return res.status(200).json({ correct: true });
    }
    else {
        return res.status(200).json({ correct: false });
    }
}));
userRouter.post('/check_jwt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel.check_jwt(req.body.token);
        return res.status(200).json({ correct: true });
    }
    catch (error) {
        return res.status(200).json({ correct: false, error: error.message });
    }
}));
