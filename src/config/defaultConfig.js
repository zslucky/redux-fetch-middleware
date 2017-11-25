/*
 *
 *  Default global config
 *
 */
const defaultConifg = {
  suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],
  responseType: 'json',
  debug: false,
  fetchOptions: {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

export default defaultConifg
