import { processingRequest } from "../backend-endpoint/authentication";

export default function useAuthentication(){

  const login = async (payload) => {
    return await processingRequest({
      routeName: 'login',
      method: 'post',
      payload
    });
  }

  const logout = async () => {
    return await processingRequest({
      routeName: 'logout',
      method: 'post'
    });
  }

  const register = async (payload) => {
    return await processingRequest({
      routeName: 'registration',
      method: 'post',
      payload
    });
  }

  const authenticatedUser = async (payload) => {
    return await processingRequest({
      routeName: 'authenticatedUser',
      method: 'get'
    });
  }

  return {
    login,
    logout,
    register,
    authenticatedUser
  }
}
