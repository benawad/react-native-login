export default (state={}, action) => {
  console.log('----');
  console.log(action);
  switch(action.type) {
    case 'LOGIN_SUCCEEDED':
      return {
        token: action.response.token,
        ...action.response.data
      }
    default:
      return state
  } 
}
