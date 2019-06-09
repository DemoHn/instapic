export interface ErrorObject {
  code: number
  title: string
  description: string
}

const errorMap = {
  '10001': {
    title: 'Validation Error',
  },
  '10200': {
    title: 'Authentication Error',
  },
  '20000': {
    title: 'Server Error',
    description: 'SQL execution error',
  },
  '30000': {
    title: 'Login Error',
  },
  '30001': {
    title: 'User Error',
  },
}
/** How will those errors be triggered in axios?
 * 
 * axios.put(this.apiBaseEndpoint + '/' + id, input)
    .then((response) => {
        // Success
    })
    .catch((error) => {
        // Error
        if (error.response) {
            // mapKnownError(xxxx)
        } else if (error.request) {            
            // mapNetworkError()
        } else {            
            // mapFatalError()
        }
        console.log(error.config);
    });
 */
export function mapKnownError(respData: any): ErrorObject {
  // @ts-ignore
  const errorMapItem = errorMap[`${respData.code}`]
  return {
    code: respData.code,
    title: errorMapItem ? errorMapItem.title : 'Server Error',
    description: errorMapItem
      ? errorMapItem.description || respData.message
      : respData.message || 'please try again',
  }
}

export function mapNetworkError(): ErrorObject {
  return {
    code: 1000,
    title: 'Network Error',
    description: 'please try again',
  }
}

export function mapFatalError(): ErrorObject {
  return {
    code: 1001,
    title: 'Fatal Error',
    description: 'this maybe caused from server',
  }
}
