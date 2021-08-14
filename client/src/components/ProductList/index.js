import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { idbPromise } from '../../utils/helpers';

import { connect } from 'react-redux';
import { UPDATE_PRODUCTS } from '../../actions';

function ProductList({ dispatch, currentCategory, products }) {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if(data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      })
    } else if(!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        })
      })
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if(!currentCategory) {
      return products;
    }
    return products.filter(product => product.category._id === currentCategory);
  }


  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products?.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentCategory: state.reducers.currentCategory,
  products: state.reducers.products
})

export default connect(mapStateToProps)(ProductList);
