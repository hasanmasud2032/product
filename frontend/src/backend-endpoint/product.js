import { getUrl, sendRequest } from './route';

const routerList = {
    productList : 'products',
    productStore : 'products',
    productShow : 'products/:productId',
    productUpdate : 'products/:productId',
    productDestroy : 'products/:productId',
}

export function processingRequest(object){
  return sendRequest(getUrl(routerList, object), object);
} 



