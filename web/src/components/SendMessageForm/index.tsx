import { FormEvent, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { useAuth } from '../../contexts/useAuth';
import { api } from '../../services/api';

import styles from './styles.module.scss';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const { user, signOut } = useAuth();

  async function handleSendMessage(event: FormEvent) {/* para usar o event para impedir carregamento da pagina que é padrão do submit */
    event.preventDefault()

    if (!message.trim()) {/* verifica se o texto está vazio mesmo removendo os espaços. não faz nada */
      return;
    }

    setIsSendingMessage(true)

    try {
      await api.post('messages', {
        message,
      })

      setMessage('');
    } finally {
      setIsSendingMessage(false)
    }
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size={32} />
        Sair
      </button>

      <header className={styles.signedUserInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form 
        onSubmit={handleSendMessage} 
        className={styles.sendMessageForm}
      >
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />

        <button 
          disabled={isSendingMessage} 
          type="submit"
        >
          Enviar mensagem
        </button>
      </form>
    </div>
  )
}