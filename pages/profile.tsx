import type {GetStaticPropsContext } from 'next'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import useCustomer from '@framework/customer/use-customer'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { User } from 'next-auth'
import Image from 'next/image'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}



export default function Profile() {
  const { data: customer } = useCustomer()
  const [ session ] = useSession()
  const [ profile, setProfile ] = useState<User | undefined>()

  useEffect(() => {
    let data = (customer) ?
    {
      image: "",
      name: customer?.firstName+" "+customer?.lastName,
      email: customer?.email,
    } :
    (session) ? 
    {
      image: session?.user?.image,
      name: session?.user?.name,
      email: session?.user?.email,
    } 
    : {};

    setProfile(data)
    console.log(profile)
  },[customer,session])

  return (
    <Container>
      <Text variant="pageHeading">My Profile</Text>
      {profile && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            {(
              <div>
                <Text variant="sectionHeading">Photo</Text>
                <span>
                  <Image
                    width={64}
                    height={64}
                    className="bg-gray-300"                 
                    src={(profile && profile.image && profile.image.length > 0) ? profile.image : '/user.svg' }
                    alt={profile.name+" avatar"}
                    unoptimized
                  />
                </span>
              </div>
            )}
            <div>
              <Text variant="sectionHeading">Full Name</Text>
              <span>
                {profile.name}
              </span>
            </div>
            <div className="mt-5">
              <Text variant="sectionHeading">Email</Text>
              <span>{profile.email}</span>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

Profile.Layout = Layout
