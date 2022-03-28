import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CartList extends Component {
  getLinkClasses = () =>
    `btn btn-secondary m-1 ${this.props.cartItems === 0 ? "disabled" : ""}`;

  handleChange = (product, event) => {
    this.props.updateCartQuantity(product, event.target.value);
  };

  getTableBody = () => {
    if (!this.props.cart || this.props.cart.length === 0) {
      return (
        <tr>
          <td colSpan="5">Your cart is empty</td>
        </tr>
      );
    } else {
      return (
        <>
          {this.props.cart.map((item) => (
            <tr key={item.product.id}>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => this.handleChange(item.product, e)}
                />
              </td>
              <td>{item.product.name}</td>
              <td>${item.product.price.toFixed(2)}</td>
              <td>${(item.quantity * item.product.price).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => this.props.removeFromCart(item.product)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <th colSpan="3" className="text-right">
              Total:
            </th>
            <th colSpan="2">${this.props.cartPrice.toFixed(2)}</th>
          </tr>
        </>
      );
    }
  };

  render() {
    return (
      <div className="m-3">
        <h2 className="text-center">Your Cart</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Product</th>
              <th className="text-right">Price</th>
              <th className="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>{this.getTableBody()}</tbody>
        </table>
        <div className="text-center">
          <Link className="btn btn-primary m-1" to="/shop">
            Continue Shopping
          </Link>
          <Link className={this.getLinkClasses()} to="/shop/checkout">
            Checkout
          </Link>
        </div>
      </div>
    );
  }
}
