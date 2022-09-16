import { getUrl, sendRequest } from './route';

const routerList = {
    categoryList : 'categories',
}

export function processingRequest(object){
  return sendRequest(getUrl(routerList, object), object);
} 



