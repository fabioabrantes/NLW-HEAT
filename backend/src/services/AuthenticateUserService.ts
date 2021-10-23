import axios from 'axios';
import PrismaClient from '../prisma';
import {sign} from 'jsonwebtoken';

interface IAccessTokenResponse{
  access_token:string;
}
interface IUserResponse{
  avatar_url:string;
  login:string;
  id:number;
  name:string;
}
class AuthenticateUserService{
 // receber o code(string)
  async execute(code:string) {
    const url = "https://github.com/login/oauth/access_token";
    //recuperar o access_token no github (token que o github vai disponibilizar para a gente ter acesso as informações do user no github)
    const {data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(url,null,{
      params:{
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers:{
        "Accept": "application/json",
      }
    });

    // busca as informações do user no github usando access_token
    const {data} = await axios.get<IUserResponse>("https://api.github.com/user",{
      headers:{
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });
    const {
      login,
      avatar_url,
      id,
      name
    } = data;
    /* 
      verificar se o usuário existe no DB
        se sim = gera um token
        se não = cria no DB, gera um token
      retornar o token com as infos do user
    */
    const user = await PrismaClient.user.findFirst({ 
      where:{
        github_id:id
      }
    });
    if(!user){
      await PrismaClient.user.create({
        data:{
          github_id:id,
          login,
          avatar_url,
          name
        }
      });
    }

    const token = sign(
      {
        user:{
          name: user.name,
          avatar_url: user.avatar_url,
          id:user.id
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn:"1d"
      }
    );

    return {token,user};
  }
}

export  {AuthenticateUserService};