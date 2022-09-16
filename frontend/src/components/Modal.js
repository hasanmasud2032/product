import React, { useEffect, useState } from "react";
import useCategory from '../composable/category';
import useProduct from '../composable/product';
import Button from "./Button";
import TextInput from "./TextInput";
import ValidationMessage from './ValidationMessage';

export default function Modal({closeModal, product, loadProducts}) {
    const { getCategories } = useCategory()
    const { store, update } = useProduct()

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [validationErrors, setValidationErrors] = useState(null);

    const submitHandler = async() => {
       try {
        if(!product)
        {
            await store({
                name,
                price,
                category_id
            })
    
        }
        else 
        {
            await update({
                name,
                price,
                category_id
            },{productId : product.id})
    
        }
        loadProducts();
        closeModal();
        
       } catch (error) {
        if(error.response.status === 422) {
            setValidationErrors(error.response.data.errors)
          }
       }
    }

    useEffect(() =>{
        ( async () => {
            try {
              const response = await getCategories();
              setCategories(response)
            } catch (error) {
              
            }
          })()

     if(product)
     {
        setName(product.name);
        setPrice(product.price);
        setCategoryId(product.category_id);
     }
    },[])
   return  (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
           <h4>{product ? 'Edit Product' : 'Add Product'}</h4>
           <span className="close" onClick={closeModal}>&times;</span>
        </div>
        <div className="pt">
            <p className="pb">Name</p>
            <TextInput value={name} onChange={(event) => setName(event.target.value)}/>
            {validationErrors && <ValidationMessage data={validationErrors} field='name' />}
        </div>

        <div className="pt">
            <p className="pb">Price</p>
            <TextInput value={price} onChange={(event) => setPrice(event.target.value)}/>
            {validationErrors && <ValidationMessage data={validationErrors} field='price' />}
        </div>

        <div className="pt">
            <p className="pb">Category</p>
            <select value={category_id} onChange={(event) => setCategoryId(event.target.value)}>
            <option>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {validationErrors && <ValidationMessage data={validationErrors} field='category_id' />}
        </div>

        <Button type="button" className="mt" onClick={submitHandler}>
           {product ? 'Update' : ' Save'}
        </Button>
      </div>
    </div>
   )
  }
  