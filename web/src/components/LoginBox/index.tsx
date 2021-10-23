import {VscGithubInverted} from 'react-icons/vsc'

import { useAuth } from '../../contexts/useAuth';
import { api } from '../../services/api';

import styles from './styles.module.scss';



export function LoginBox(){
  
  const { signInUrl } = useAuth();

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signWithGithubButton}>
        <VscGithubInverted size="24" />
        Entrar com o github
      </a>
    </div>
  );
}