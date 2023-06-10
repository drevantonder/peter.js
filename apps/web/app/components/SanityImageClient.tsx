'use client'

import Image from 'next/image'
import { sanityImagebuilder } from '../sanity'

const imageLoader = ({ src, width, quality }) => {
  return sanityImagebuilder.image(src).width(width).quality(quality).url()
}

type Props = Omit<React.ComponentProps<typeof Image>, 'loader'>

export function SanityImageClient(props: Props) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image loader={imageLoader} {...props} />
  )
}
