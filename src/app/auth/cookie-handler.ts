import * as cookieStore from "cookies-next"

const getCookie = (name: string) => cookieStore.getCookie(name)

const deleteCookie = (key: string) => cookieStore.deleteCookie(key)

const setCookie = (key: string, value: string, options?: any) => {
  cookieStore.setCookie(key, value, options)
}

// const getCookies = (name: string) => cookieStore.getCookies(name)

const getAllCookies = () => cookieStore.getCookies()

const CookiesHandler = {
  getAllCookies,
  //   getCookies,
  getCookie,
  setCookie,
  deleteCookie,
}

export default CookiesHandler
