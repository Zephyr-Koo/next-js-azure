import Cookies from 'js-cookie';

const CookieName = 'sticky-session';

export default class CookieManager {
  static get cookieName() {
    return CookieName;
  }

  static setCookiesIfNotPresent(value) {
    if (!Cookies.get(this.cookieName)) {
      Cookies.set(this.cookieName, value);
    }
  }
}