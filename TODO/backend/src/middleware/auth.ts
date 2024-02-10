import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req, res, next) => {
    try {
        if (req.session && req.session.userId) {
            console.log("User is authenticated. UserId:", req.session.userId);
            next();
        } else {
            console.log("User is not authenticated.");
            throw createHttpError(401, "User not authenticated");
        }
    } catch (error) {
        console.error("Error in requiresAuth middleware:", error);
        next(error);
    }
};