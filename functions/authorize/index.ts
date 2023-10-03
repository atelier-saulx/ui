import { Authorize } from '@based/functions'

// Authorize functions are run every time
// the client calls a function. They return
// a bollean allowing or blocking the request.
const authorize: Authorize = async (_based, _ctx, _name, _payload) => {
  return true
}

export default authorize
