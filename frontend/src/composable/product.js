import { processingRequest } from "../backend-endpoint/product";

export default function useCategory(){

  const getProducts = async() => {
    return await processingRequest({
      routeName: 'productList',
      method: 'get',
    });

  }

  const store = async (payload) => {
    return await processingRequest({
      routeName: 'productStore',
      method: 'post',
      payload
    });
  }

  const update = async (payload, params) => {
    return await processingRequest({
      routeName: 'productUpdate',
      method: 'put',
      params: params,
      payload: payload
    });
  }

  const destroy = async (params) => {
    return await processingRequest({
      routeName: 'productDestroy',
      method: 'Delete',
      params: params,
    });
  }

  return {
    getProducts,
    store,
    update,
    destroy
  }
}
