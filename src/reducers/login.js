export default (state={}, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCEEDED':
      return action.response.data
    default:
      return state
  } 
}
