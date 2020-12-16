


import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProducts } from '../../redux/actions.ts'
import { ADD_PRODUCT, AppState } from '../../types'





export default function ProductTable() {
  const productsInCart = useSelector((state: AppState) => state.product.inCart)
  const dispatch = useDispatch()
  const products: any[] = useSelector((state: AppState) => state.products)
  console.log(products)
  React.useEffect(() => {
    fetch('http://localhost:8080/api/v1/products')
      .then((res) => res.json())
      .then((result) => {
        dispatch(addProducts(result))
      })
  }, [dispatch])

console.log('bla')

  const promise = () => {
    return new Promise((resolve, reject) => setTimeout(resolve, 200))
  }


  console.log(print())
  return(
  <div>{products.map((product) => {
    return (
      <ul>
        <li>{product.name}</li>
    <li>{product.description}</li>
      </ul>
    )
  })}</div>
  )
}




// import React from "react";

// interface ProductDocument  {
//   name: string;
//   description: string;
//   categories: string[];
//   variants: string[];
//   sizes: string[];
//   items: number;
//   price: number;
// }

// export default function ProductTable() {
//   const [products, setProducts] = React.useState<ProductDocument[]>([]);

//   React.useEffect(() => {
//     const getProducts = async () => {
//       const productsPromise = await fetch(
//         "http://localhost:8080/api/v1/products"
//       );

//       const products: ProductDocument[] = await productsPromise.json();
  
//       setProducts(products);
//     };
//     getProducts();
//   }, []);

//   // return <div className="App">{JSON.stringify(products)}</div>;
//   return (
//   <ul>{products.map((product) => {
//     console.log(product)
//   return (
//   <ul>
//     <li>{product.name}</li>
//     <li>{product.categories}</li>
//     <li>{product.description}</li>
//   </ul>
//   )
//   })}</ul>
//   )
// }
