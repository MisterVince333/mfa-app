import { NextFunction, Request, Response } from "express";

const consoleRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
};

export { consoleRequest };