import React, { Component } from "react";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import CartSummary from "./CartSummary";

export default class Shop extends Component {
  handleAddToCart = (...args) => {
    this.props.addToCart(...args);
    this.props.history.push('/shop/cart');
  }

  render() {
    const { categories, products } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col bg-dark text-white">
            <div className="navbar-brand">SPORTS STORE</div>
            <CartSummary {...this.props} />
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-2">
            <CategoryList baseUrl="/shop/products" categories={categories} />
          </div>
          <div className="col-9 p-2">
            <ProductList products={products} addToCart={this.handleAddToCart} />
          </div>
        </div>
      </div>
    );
  }
}
