import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            message: "Unauthorized"
        })
    }

    //Bearer asd54fa56s4dfa564dfa56s4df
    const token = authToken.split(" ")[1];
    try {
        verify(token, "503e4f72-75c4-4020-88d2-63117c59a566")
        return next();
    } catch (error) {
        return response.status(401).json({
            message: "Token Invalid"
        })
    }
}