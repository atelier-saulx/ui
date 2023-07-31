import { BasedSchema } from '@based/schema'
import { useClient } from '@based/react'

export const updateSchema = (obj, client) => {
  //   const client = useClient()

  client.call('db:set-schema', obj)
}

// const fieldWalker =(x): any => {

//     let nSchema
//         //

//     for (let key in x) {
//         //

//         return {  f...field , ...meta }
//     }

// }

const fieldWalker = (x) => {
  console.log('X ??', x)
}

// TODO jim: add if new schema
export const transformOldToNew = (oldSchema: any): BasedSchema => {
  console.log('oldScheam -->', oldSchema)

  const newSchema = oldSchema
  // .type =>
  //      fieldWalker(oldSchema)

  for (const key in oldSchema.types) {
    fieldWalker(oldSchema.types[key])
  }

  return newSchema
}
