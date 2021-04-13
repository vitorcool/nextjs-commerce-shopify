import { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './AuthState.module.css'
import { useUI } from '@components/ui/context'

export default function AuthState () {
  const [ session, loading ] = useSession()
  const { userAvatar, setUserAvatar } = useUI()

  useEffect(() => {
    if(session){
      setUserAvatar(`url(${session.user.image})`);
    }
  },[session]);

  return (
    <>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}
        </p>
      </div>
    </>
  )
}
