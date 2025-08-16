import {auth} from "express-oauth2-jwt-bearer";
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
    namespace Express {
        interface Request {
            auth0Id?: string; // Auth0 user ID
            userId?: string; // MongoDB user ID
        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

/**
 * Middleware function to parse and validate a JSON Web Token (JWT) from the `Authorization` header of an HTTP request.
 *
 * The function checks if the `Authorization` header is properly formatted and contains a Bearer token.
 * It decodes the token to extract the `auth0Id`, fetches the corresponding user from the database, and validates the user's existence.
 * If valid, it appends the `auth0Id` and `userId` to the `req` object for further processing.
 * If the token is missing, improperly formatted, invalid, or if the user is not found, the function returns a 401 Unauthorized response.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param next*/
export const jwtParse = async (req: Request,
                               res: Response,
                               next: NextFunction) => {
    const {authorization} = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json(
            {message: "Unauthorized - no token provided"}
        );
    }

    const token = authorization.split(' ')[1];

    try{
       const decoded = jwt.decode(token) as jwt.JwtPayload;
       const auth0Id = decoded.sub;

       const user = await User.findOne({auth0Id});

       if (!user) {
              return res.status(401).json({message: "Unauthorized - user not found"});
       }

       req.auth0Id = auth0Id as string;
       req.userId = user._id.toString(); // Store user ID in request for further use
         next();

    }catch (e) {
        console.error("Error parsing JWT token:", e);
        return res.status(401).json({message: "Unauthorized - invalid token"});
    }
}

