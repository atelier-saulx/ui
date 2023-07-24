export const pathReader = (a: any, path: string[]): any => {
  let d = a
  for (let i = 0; i < path.length; i++) {
    const seg = path[i]
    if (d?.[seg] !== undefined) {
      d = d[seg]
    } else {
      d = undefined
      break
    }
  }
  return d
}
