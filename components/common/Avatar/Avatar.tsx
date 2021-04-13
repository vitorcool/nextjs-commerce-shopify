import { FC, useRef, useEffect } from 'react'
import { useUserAvatar } from '@lib/hooks/useUserAvatar'
import { useTheme } from 'next-themes'

interface Props {
  className?: string
  children?: any
}

const Avatar: FC<Props> = ({}) => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  let { userAvatar } = useUserAvatar()
  const { theme } = useTheme()

  return (
    <div
      ref={ref}

      style={{ backgroundImage: userAvatar, backgroundSize: "cover", filter: (theme==='dark'?'invert(1)':'invert(0)') }}
      className="inline-block h-8 w-8 rounded-full border-2 border-primary hover:border-secondary focus:border-transparent transition linear-out duration-150"
      >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
