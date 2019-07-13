const userAction = (type, user) => {
  switch (type) {
    case 'GET_USER':
      return {
        type: 'GET_USER',
        user: user
      }
    case 'SET_USER':
      return {
        type: 'REMOVE_USER',
        user: null
      }
  }
}

export default userAction