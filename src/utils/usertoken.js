//封装对token的操作
const TOKEN_KEY = "user";
function setToken(value) {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(value));
}
function getToken() {
  return JSON.parse(window.localStorage.getItem(TOKEN_KEY));
}
function removeToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}
export { setToken, getToken, removeToken };
