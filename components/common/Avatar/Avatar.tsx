import { FC, useRef, useEffect } from 'react'
import { useUserAvatar } from '@lib/hooks/useUserAvatar'

interface Props {
  className?: string
  children?: any
}

const Avatar: FC<Props> = ({}) => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  let { userAvatar } = useUserAvatar()

/*   useEffect(() => {

  },[userAvatar])
 */
  return (
    <div
      ref={ref}
      style={{backgroundImage: `url(${userAvatar})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: 'whitesmoke'}}
      className="inline-block h-9 w-9 rounded-full border-2 border-primary hover:border-secondary focus:border-transparent transition linear-out duration-150 overflow-hidden"
      >

 {/*      {(userAvatar && userAvatar.trim().length > 0) && (
          <Image
            alt={'Avatar'}
            src={userAvatar}
            height={50}
            width={50}
            quality="85"
            layout="responsive"
          />
        )} */}
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
