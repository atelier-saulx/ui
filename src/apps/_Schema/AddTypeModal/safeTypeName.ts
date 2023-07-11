const safeTypeName = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-.]/g, '')
}

export default safeTypeName
