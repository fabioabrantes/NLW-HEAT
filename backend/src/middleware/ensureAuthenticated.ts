import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';

interface IPayload{
  sub:string;
}
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).json({
      errorCode:"token not valid",
    });
  }
  // verificar se o token é valido: Bearer 4579347556680ut9ut9008fjfdjvidf949
  const [b,token] = authToken.split(" ");

  try {
    const {sub} = verify(token,process.env.JWT_SECRET) as IPayload;
    // colocar dentro das requisições a informação do usuário
    req.user_id = sub;
    return next();
  } catch (error) {
    return res.status(401).json({
      errorCode:"token invalid",
    });
  }
}
