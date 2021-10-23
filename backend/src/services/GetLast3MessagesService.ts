import PrismaClient from '../prisma';

class GetLast3MessagesService{

  async execute(){
    const messages = await PrismaClient.message.findMany({
      take:3, // aqui pega as últimas mensagens
      orderBy:{
        created_at:'desc'
      },
      include:{
        user:true
      }
    });
    return messages;
  }
}
export {GetLast3MessagesService}