export const hrefIsActive = (
  href: string,
  selected: string,
  data?: { href: string }[]
) => {
  if (!href) return false

  if (href.includes('#') && !selected.includes('#')) {
    selected = selected + location.hash
  }

  if (href === selected) {
    return href.length
  }

  if (selected.startsWith(href)) {
    const l = href.length
    const nextChar = selected[l]
    if (nextChar === undefined || nextChar === '/' || nextChar === '?') {
      if (
        !data ||
        !data.find((item) => {
          return item.href !== href && l < hrefIsActive(item.href, selected)
        })
      ) {
        return l
      }
    }
  }

  const char = href[0]
  // if (char === '#') {
  //   return location.hash === href
  // }

  if (char === '?') {
    return location.search.substring(1).split('&').includes(href.substring(1))
  }

  const i = href.indexOf('?')
  if (i > 0) {
    return hrefIsActive(href.substring(0, i), selected, data)
  }

  // if (
  //   i !== -1 &&
  //   location.search
  //     .substring(1)
  //     .split('&')
  //     .includes(href.substring(i + 1))
  // ) {
  //   console.log(
  //     i,
  //     href.substring(0, i),
  //     selected,
  //     hrefIsActive(href.substring(0, i), selected, data)
  //   )
  //   return i === 0 || hrefIsActive(href.substring(0, i), selected, data)
  // }

  return false
}
