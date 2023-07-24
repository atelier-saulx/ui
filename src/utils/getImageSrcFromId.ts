import { useQuery } from '@based/react'
import { resizeImage, useLanguage } from '~'

export const getImageSrcFromId = (id) => {
  const { language } = useLanguage()
  const { data } = useQuery('db', {
    $id: id,
    $language: language,
    src: true,
  })
  return resizeImage(data.src, 100)
}
