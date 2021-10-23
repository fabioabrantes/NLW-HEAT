import {Request, Response} from 'express';
import { ProfileUserService } from '../services/ProfileUserService';



class ProfileUserController{

  async handle(req: Request, res: Response): Promise<Response>{
    const {user_id} = req;

    const profileUserService = new ProfileUserService();
    
    const result = await profileUserService.execute(user_id);

    return res.json(result);
  }
}
export {ProfileUserController}