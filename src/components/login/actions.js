export const login = (email, password) => ({
  type: 'LOGIN_REQUESTED',
  payload: {
    email,
    password,
  }
})
