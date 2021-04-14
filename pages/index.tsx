import { Layout } from '@components/common'
import { Grid, Marquee, Hero, KeenSlider } from '@components/ui'
import { ProductCard } from '@components/product'
import Image, { ImageProps } from 'next/image'

import type { GetServerSidePropsContext,InferGetServerSidePropsType  } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'
import redirectMandatory from '@utils/redirectMandatory'

export async function getServerSideProps({
  res,req,
  preview,
  locale,
}: GetServerSidePropsContext) {
  if(process && redirectMandatory({res,req, mandatoryURL: process.env.NEXTAUTH_URL ?? ""})){
    return { props:{
      products:[],
      categories:[],
      brands:[],
      pages:[],}}
  }

  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    //revalidate: 14400,
  }
}

export default function Home({
  products,
  brands,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <KeenSlider
        slidesPerView={2}
        loop={true}
        positionIndicator={true}
        buttons={true}
      >
        {[1,2,3,4].map( i =>
          <div
            key={"keenslider-item-"+i}
          >
            <Image
              layout='responsive'
              className={"image-slider-content_"+i}
              width={1024}
              height={400}
              src={"/images/img"+i+".jpg"}
              alt={"Forno Pizza"}
              unoptimized
            />
          </div>
        )}

      </KeenSlider>
      <Grid layout="D"
      >
        {products.slice(0, 6).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee variant="primary">
        {products.slice(0, 3).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="slim"
            imgProps={{
              width: 320,
              height: 320,
            }}
          />
        ))}
      </Marquee>
      <Hero
        headline="Release Details: The Yeezy BOOST 350 V2 ‘Natural'"
        description="
        The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
        ‘Carbon’ iteration, and now release details have been locked in for
        this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
        shoe was originally called ‘Abez’, which translated to ‘Tin’ in
        Hebrew. It’s now undergone a name change, and will be referred to as
        ‘Natural’."
      />

      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
