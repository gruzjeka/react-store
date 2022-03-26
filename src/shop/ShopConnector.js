import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { DataTypes } from "../data/DataTypes";
import { loadData } from "../data/ActionCreators";
import Shop from "./Shop";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = {
  loadData,
};

const filterProducts = (products = [], category) => {
  return !category || category === "All"
    ? products
    : products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
};

export const ShopConnector = connect(
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
