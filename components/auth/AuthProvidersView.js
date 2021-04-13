import { useState, useEffect } from 'react'
import { signIn, providers as oAuthProviders, getCsrfToken } from 'next-auth/client'
import css from './AuthProvidersView.module.css'


export default function AuthProvidersView ({ email = "", error: errorType = false }) {
  const [csrfToken,setCsrfToken] = useState()
  const [providers,setProviders] = useState(oAuthProviders())
  const [cb,setCallbackUrl] = useState()

  useEffect(() => {
    let isSubscribed = true
    setCallbackUrl(window.location.href);
    getCsrfToken().then( data => {if (isSubscribed) setCsrfToken(data) })
    oAuthProviders().then( data => {if (isSubscribed) setProviders(data)})
    // console.log("cb=",cb,"csrf=",csrfToken,"providers=",providers)
    return () => isSubscribed = false
  }, [])

  const providersToRender = Object.values(providers).filter(provider => {

    if(provider.type === 'email') {
      return false
    }else if (provider.type === 'oauth'){
      // Always render oauth and email type providers
      return true
    } else if (provider.type === 'credentials' && provider.credentials) {
      // Only render credentials type provider if credentials are defined
      return true
    }
    // Don't render other provider types
    return false
  })

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
    default: 'Unable to sign in.'
  }

  const error = errorType && (errors[errorType] ?? errors.default)

  return (
    <div className={css.signin}>
      {error &&
        <div className={css.error}>
          <p>{error}</p>
        </div>}
      {providersToRender.map((provider, i) =>
        <div key={provider.id} className={css.provider}>
          {provider.type === 'oauth' &&
            <form action={provider.signinUrl} method='POST'>
              <input type='hidden' name='csrfToken' value={csrfToken} />
              {cb && <input type='hidden' name='callbackUrl' value={cb} />}

              <div key={provider.name}>
                <button type='submit' className={css.svg+' svg-'+provider.id}
                      onClick={(e) => {
                        e.preventDefault();
                        signIn(provider.id)
                        }}>Sign in with {provider.name}</button>
              </div>
              {/* <button type='submit' className='button'>Sign in with {provider.name}</button> */}
            </form>}
          {(provider.type === 'email' || provider.type === 'credentials') && (i > 0) &&
          providersToRender[i - 1].type !== 'email' && providersToRender[i - 1].type !== 'credentials' &&
            <hr />}
          {provider.type === 'email' &&
            <form action={provider.signinUrl} method='POST'>
              <input type='hidden' name='csrfToken' value={csrfToken} />
              <label for={`input-email-for-${provider.id}-provider`}>Email</label>
              <input id={`input-email-for-${provider.id}-provider`} autoFocus type='text' name='email' value={email} placeholder='email@example.com' />
              <button type='submit'>Sign in with {provider.name}</button>
            </form>}
          {provider.type === 'credentials' &&
            <form action={provider.callbackUrl} method='POST'>
              <input type='hidden' name='csrfToken' value={csrfToken} />
              {Object.keys(provider.credentials).map(credential => {
                return (
                  <div key={`input-group-${provider.id}`}>
                    <label
                      for={`input-${credential}-for-${provider.id}-provider`}
                    >{provider.credentials[credential].label || credential}
                    </label>
                    <input
                      name={credential}
                      id={`input-${credential}-for-${provider.id}-provider`}
                      type={provider.credentials[credential].type || 'text'}
                      value={provider.credentials[credential].value || ''}
                      placeholder={provider.credentials[credential].placeholder || ''}
                    />
                  </div>
                )
              })}
              <button type='submit'>Sign in with {provider.name}</button>
            </form>}
          {(provider.type === 'email' || provider.type === 'credentials') && ((i + 1) < providersToRender.length) &&
            <hr />}
        </div>
      )}
    </div>
  )
}

AuthProvidersView.getInitialProps = async (context) => {
  const { req, res, query } = context;
  const session = await getSession({ req });


  const { callbackUrl } = query;

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: callbackUrl,
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    callbackUrl,
    providers: await providers(context),
  };
};
