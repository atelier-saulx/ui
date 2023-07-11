export const getObjectId = (overId, properties, objects) => {
  if (overId) {
    if (overId in objects) {
      return objects[overId].field
    }
    if (overId in properties) {
      return properties[overId].field
    }
  }
}

export const getDepth = (path, depth = 0) => {
  for (let i = 1; i < path.length; i++) {
    const key = path[i]
    if (key === 'properties') {
      depth++
      i++
    }
  }
  return depth
}
