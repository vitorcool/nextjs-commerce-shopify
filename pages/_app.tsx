import '@assets/main.css'
import '@assets/chrome-bug.css'
import '@assets/svg.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import App from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {

  const appProps = await App.getInitialProps(appContext)
  // check that we are in SSR mode (NOT static and NOT client-side)
  if (typeof window === "undefined" && appContext.ctx.res.writeHead) {
    redirectDomain(appContext.ctx)
  }
  return { ...appProps }
}

function redirectDomain(context){

  const { res, req } = context;
  const mandatoryURL = process.env.NEXTAUTH_URL || undefined;


  if(mandatoryURL){
    const mandatory = new URL(mandatoryURL)

    let [hostname,port] = req.headers?.host?.split(":")
    port = !port ? "":port

    if(hostname+":"+port !== mandatory.hostname+":"+mandatory.port) {
      const currentURL =mandatory.protocol+"//"+req.headers?.host+req.url;

      // switch hostname
      const current = new URL(currentURL)

      // if hostname are not equal
      current.hostname = mandatory.hostname
      current.port = mandatory.port

      console.log("redirect to mandatory domain ",current.href)
      /* res.writeHead(302, { Location: current.href } ); */
      res.setHeader("location", current.href);
      res.statusCode = 302
      res.end()
    /*   res.end(); */
      return true;
    }
  }
  return false;
}
