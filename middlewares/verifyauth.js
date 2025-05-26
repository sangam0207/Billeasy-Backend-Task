import jwt, { decode } from 'jsonwebtoken';
import ErrorResponse from '../lib/error.res.js'
import { ENV } from '../configs/constant.js';


const verifyAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization || req.cookies['token']) {
            let token;
            if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];
            else token = req.cookies['token'];
            
            if (token) {
                // Check if the token exists in the blacklist
                if (revokedTokens.has(token) || ( req.cookies['token'] && revokedTokens.has(req.cookies['token']))) {
                   next(ErrorResponse.unauthorized("You are not authorized to access this resource"))
                }
                const decoded = jwt.verify(token,ENV.SECRET_KEY );
                const userId = decoded.id;
                req.userId = userId;
                req.role = decoded.role;
                next();
            }
            else {
                next(ErrorResponse.unauthorized("You are not authorized to access this resource"))
            }
        }
        else {
            next(ErrorResponse.unauthorized("You are not authorized to access this resource"))
        }
    } catch(error) {
        next(ErrorResponse.unauthorized("You are not authorized to access this resource"))
    }
}


export default verifyAuth;