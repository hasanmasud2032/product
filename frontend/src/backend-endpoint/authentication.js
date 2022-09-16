import { getUrl, sendRequest } from './route';

const routerList = {
    login : 'login',
    logout : 'logout',
    registration : 'registration',
    authenticatedUser: 'authenticated-user'
}

export function processingRequest(object){
  return sendRequest(getUrl(routerList, object), object);
} 



