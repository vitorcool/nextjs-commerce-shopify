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

export default function Privacy() {
  return (
    <div>Privacy page</div>
  )
}

Privacy.Layout = LayoutEmpty
