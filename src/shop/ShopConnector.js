import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { DataTypes } from "../data/DataTypes";
import { loadData } from "../data/ActionCreators";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../data/CartActionCreators";
import Shop from "./Shop";
import CartList from "./CartList";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = {
  loadData,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};

const filterProducts = (products = [], category) => {
  return !category || category === "All"
    ? products
    : products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
};

const ShopConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends Component {
    render() {
      return (
        <Switch>
          <Route
            path="/shop/products/:category?"
            render={(routeProps) => (
              <Shop
                {...this.props}
                {...routeProps}
                products={filterProducts(
                  this.props.products,
                  routeProps.match.params.category
                )}
              />
            )}
          />
          <Route
            path="/shop/cart"
            render={(routeProps) => (
              <CartList {...routeProps} {...this.props} />
            )}
          />
          <Redirect to="/shop/products" />
        </Switch>
      );
    }

    componentDidMount() {
      this.props.loadData(DataTypes.CATEGORIES);
      this.props.loadData(DataTypes.PRODUCTS);
    }
  }
);

export default ShopConnector;
