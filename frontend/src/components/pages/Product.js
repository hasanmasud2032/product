import React, { useEffect, useState } from "react";
import useProduct from '../../composable/product';
import Button from "../Button";
import DeleteModal from "../DeleteModal";
import Modal from "../Modal";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { getProducts, destroy } = useProduct()
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  
  const loadProducts = async() => {
    try {
      const response = await getProducts();
       setProducts(response.data)
    } catch (error) {
      
    }
  }

  const productDeleteConfirmation = (productId) => {
    setProductId(productId)
    setIsOpenDeleteModal(true);
  }

  const productDeleteConfirmed = async() => {
    try {
      await destroy({productId})
      loadProducts();
      setIsOpenDeleteModal(false);   
     } catch (error) {
      console.log(error)
     }
  }

  const productAdd = () => {
    openModal();
    setProduct(null);
  }

  const productEdit = (product) => {
    openModal();
    setProduct(product);
  }
  useEffect(() => {
    loadProducts();
    },[])

    return <>
          <Button type="button" onClick={productAdd}>
            Add New
          </Button>
            
          {isOpen && <Modal closeModal={closeModal} product={product} loadProducts={loadProducts}/>}

          {
            isOpenDeleteModal  && <DeleteModal closeModal={setIsOpenDeleteModal} requestedResponse={productDeleteConfirmed}/>
          }

          <div style={{ marginTop: '20px' }}>
          <table>
            <tbody>
              <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
                {
                  products.map((product) => 
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category?.name}</td>
                      <td className="flex">
                        <Button onClick={() => productEdit(product)} style={{ marginLeft:'20px' }}>
                          Edit
                        </Button>
                        <Button onClick={() => productDeleteConfirmation(product.id)} style={{ background:'red' }}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                }
            </tbody>
          </table>        
          </div>
    </>;
  }
  