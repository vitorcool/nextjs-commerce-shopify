import { LayoutEmpty } from '@components/common'
//import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

/*
export const getStaticProps: GetStaticProps = async (context) => {
  // ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}


export const getServerSideProps: GetServerSideProps = async (context) => {
}
*/

export default function Signout() {
    return (
    <div>Signout page</div>
  )
}

Signout.Layout = LayoutEmpty
