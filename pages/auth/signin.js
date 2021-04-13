import { LayoutEmpty } from '@components/common'
import cn from 'classnames'
import { providers as authProviders, signIn, getCsrfToken } from 'next-auth/client'
import { useEffect, useState } from 'react'
import css from './signin.module.css'

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context){
  const { req, res, query } = context;


  const callbackUrl = req?.headers?.referer || query;

  return {
    props:{
      callbackUrl,
      providers: await authProviders(context),
    }
  };

}

export default function SignIn({ csrfToken, providers, callbackUrl, email, error: errorType,...props }) {

  const errors = {
      Signin: 'Try signing with a different account.',
      OAuthSignin: 'Try signing with a different account.',
      OAuthCallback: 'Try signing with a different account.',
      OAuthCreateAccount: 'Try signing with a different account.',
      EmailCreateAccount: 'Try signing with a different account.',
      Callback: 'Try signing with a different account.',
      OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
      EmailSignin: 'Check your email address.',
      CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
      default: 'Unable to sign in.',
    }
  const error = errorType && (errors[errorType] ?? errors.default)


  return (
    <div className={css.signin + ' signin'}>
      {error && (
        <div className={css.error}>
          <p>{error}</p>
        </div>
      )}
      {Object.values(providers).map(provider => (
        <div key={provider.name} className={css.logo}>
          <button className={css.svg+' svg-'+provider.id} 
                   onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}

    </div>
  )
}


SignIn.Layout = LayoutEmpty
