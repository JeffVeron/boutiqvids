 // src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <h2>🛒 Product List</h2>
      <p>Number of Products  = {products.length}</p>
      {products.map((p) => (
        <div key={p.product_id}>
          <h3>{p.name}</h3>
          <p>Price: ${p.price}</p>
          <img src={p.image_url} alt={p.name} width="150" />
          <p>{p.description}</p>
          <hr />    
        </div>
      ))}
    </div>
  );
};

export default ProductList;
