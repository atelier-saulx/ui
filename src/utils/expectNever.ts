export const expectNever = (value: never): never => {
  throw new TypeError('Unexpected value: ' + JSON.stringify(value))
}
