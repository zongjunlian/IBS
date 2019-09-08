
const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
  userName: ''
}

export default state