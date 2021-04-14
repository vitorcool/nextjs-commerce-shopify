import '@assets/main.css'
import '@assets/chrome-bug.css'
import '@assets/svg.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
/* import App, {AppContext} from 'next/app'
import { NextPageContext } from 'next' */

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
/*
MyApp.getInitialProps = async (appContext :AppContext) => {

  const appProps = await App.getInitialProps(appContext)
  const ctx: NextPageContext = appContext.ctx;
  // check that we are in SSR mode (NOT static and NOT client-side)
  if (typeof window === "undefined" && appContext && (ctx?.res?.writeHead !== undefined)) {
    redirectDomain(ctx)
  }
  return { ...appProps }
}

function redirectDomain(context :NextPageContext){
  const mandatoryURL = process.env.NEXTAUTH_URL || undefined;
  if(mandatoryURL){
    const res :any = context.res;
    const req :any = context.req;
    const mandatory = new URL(mandatoryURL)

    const aHostPort :string[] | undefined = req.headers?.host?.split(":")
    if(!aHostPort) {
      return false; // request does not have valid header.host
    }
    const hostname = aHostPort[0] || ""
    const port =     aHostPort[1] || ""

    if(hostname+":"+port !== mandatory.hostname+":"+mandatory.port) {
      const currentURL =mandatory.protocol+"//"+req.headers?.host+req.url;

      // switch hostname
      const current = new URL(currentURL)

      // if hostname are not equal
      current.hostname = mandatory.hostname
      current.port = mandatory.port

      console.log("redirect to mandatory domain ",current.href)
      /res.writeHead(302, { Location: current.href } );
      res.setHeader("location", current.href);
      res.statusCode = 302
      res.end()
      return true;
    }
  }
  return false;
}
 */
