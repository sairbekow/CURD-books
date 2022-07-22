import {_TOKEN} from "../data/consts";

class HttpRequests {
  get = (url) => {
    const getInner = async () => {
      try {
        const response = await fetch(url, {
          method: 'get',
          headers: {'Content-Type': 'application/json', 'X-Auth': _TOKEN}
        })

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`)
        }

        return await response.json()

      } catch (error) {
        throw error
      }
    }
    return getInner()
  }

  post = (url, body, token) => {
    const postInner = async () => {
      try {
        const response = await fetch(url, {
          method: 'post',
          headers: token
            ? {'Content-Type': 'application/json', 'X-Auth': _TOKEN}
            : {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        })

        if (!response.ok) {
          console.log(`Could not fetch ${url}, status: ${response.status}`)
        }

        return await response.json()
      } catch (error) {
        console.log(error)
      }
    }
    return postInner()
  }

  delete = (url, body) => {
    const deleteInner = async () => {
      try {
        const response = await fetch(url, {
          method: 'delete',
          headers: {'Content-Type': 'application/json', 'X-Auth': _TOKEN},
          body: JSON.stringify(body)
        })

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`)
        }

        return await response.json()

      } catch (error) {
        throw error
      }
    }
    deleteInner()
  }

  put = (url, body) => {
    const putInner = async () => {
      try {
        const response = await fetch(url, {
          method: 'put',
          headers: {'Content-Type': 'application/json', 'X-Auth': _TOKEN},
          body: JSON.stringify(body)
        })

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`)
        }

        return await response.json()

      } catch (error) {
        throw error
      }
    }
    putInner()
  }
}

export default HttpRequests