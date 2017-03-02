export const signup = (username, email, password, room_num) => ({
  type: 'SIGNUP_REQUESTED',
  payload: {
    username,
    email,
    password,
    room_num
  }
})
