import { useCallback } from "react";
import { processingRequest } from "../backend-endpoint/category";

export default function useCategory(){

  const getCategories = useCallback(async() => {
    try {
      const response = await processingRequest({
        routeName: 'categoryList',
        method: 'get',
      });

      return response.data;
      
    } catch (error) {
      console.log('error',error)
    }
  },[])

  return {
    getCategories,
  }
}
