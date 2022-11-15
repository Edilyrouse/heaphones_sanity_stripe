import React from 'react';
import Link from 'next/link';
// trae las imagenes desde sanity
import { urlFor } from '../lib/client';
import toast from "react-hot-toast";
//toast.loading('Loading...');


const Product = ({ product: { image, name, slug, price } }) => {
  

  return (

    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
