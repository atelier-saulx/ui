export const resizeImage = (
  url: string | void,
  width: number
): string | void => {
  return url
  // if (typeof url === 'string') {
  //   if (url.includes('based-files')) {
  //     const x = url.split('based.dev/')
  //     const n = [
  //       x[0] + 'based.dev',
  //       `cdn-cgi/image/width=${width * 2},quality=100`,
  //       x[1],
  //     ]
  //     return n.join('/')
  //   }
  // }
  // return url
}
