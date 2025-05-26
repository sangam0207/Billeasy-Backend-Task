import jwt from 'jsonwebtoken'
import { ENV } from '../configs/constant.js';
const generateNewSession=(payload, sessionTime) =>{
    const token = jwt.sign(payload, ENV.SECRET_KEY, {
      expiresIn: sessionTime,
    });
    
    return token;
  }
export {generateNewSession};