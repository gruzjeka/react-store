import React, { Component } from "react";
import ToggleLink from "../shared/ToggleLink";

export default class CategoryList extends Component {
  render() {
    const { baseUrl, categories } = this.props;
    return (
      <>
        <ToggleLink to={baseUrl} exact={true}>
          All
        </ToggleLink>
        {categories &&
          categories.map((category) => (
            <ToggleLink
              key={category}
              to={`${baseUrl}/${category.toLowerCase()}`}
            >
              {category}
            </ToggleLink>
          ))}
      </>
    );
  }
}
