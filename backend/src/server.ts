import { serverHttp } from "./app";

serverHttp.listen(4000, ()=>{
  console.log('server online on port 4000');
})