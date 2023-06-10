import { sanityImagebuilder } from '../sanity'
import { SanityImageClient } from './SanityImageClient'

type Props = Omit<React.ComponentProps<typeof SanityImageClient>, 'blurDataURL'>

async function getBase64Image(url) {
  // Fetch the image data from the URL
  const response = await fetch(url)

  // Get a Blob of the image data
  const blob = await response.blob()

  // Get an ArrayBuffer of the Blob's contents
  const arrayBuffer = await blob.arrayBuffer()

  // Create a new Uint8Array object from the ArrayBuffer
  const uint8Array = new Uint8Array(arrayBuffer)

  // Convert the Uint8Array to a regular JavaScript array
  const dataArray = Array.from(uint8Array)

  // Convert each item in the array to a string
  const stringData = dataArray.map((byte) => String.fromCharCode(byte)).join('')

  // Convert the string data to a base64 string
  const base64Data = btoa(stringData)

  // Create a data URL
  const dataUrl = `data:${blob.type};base64,${base64Data}`

  // Return the data URL
  return dataUrl
}

export async function SanityImage(props: Props) {
  const blurDataURL =
    props.placeholder !== 'blur'
      ? undefined
      : await getBase64Image(
          sanityImagebuilder.image(props.src).width(10).blur(20).url()
        )

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <SanityImageClient blurDataURL={blurDataURL} {...props} />
  )
}
