import cn from 'classnames'
import s from './Layout.module.css'
import React, { FC } from 'react'
import type { Page } from '@framework/common/get-all-pages'
import { Provider } from 'next-auth/client'

interface Props {
  pageProps: {
    pages?: Page[],
    session:any,
  }
}

const Layout: FC<Props> = ({
  children,
  pageProps: {...pageProps },
}) => {
  return (
    <Provider
          options={{
            clientMaxAge: 0,
            keepAlive: 0
          }}
          session={pageProps.session} >

      <div className={cn(s.root)}>
        <main className="fit">{children}</main>
      </div>
    </Provider>
  )
}

export default Layout
