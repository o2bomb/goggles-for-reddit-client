import { Component } from "react";
import ReactDOM from "react-dom";

/**
 * This component takes in any component as a prop and renders
 * it directly under the root element of the DOM
 */
class Portal extends Component {
  constructor(props) {
    super(props);
    // Create div that the popup will render into
    this.root = document.getElementById("root");
    this.el = document.createElement("div");
  }

  componentDidMount() {
    // Append el into the DOM on mount
    this.root.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove el from the root element on unmount
    this.root.removeChild(this.el);
  }

  render() {
    // Use a portal to render this element's children into the root element
    // of the DOM
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

export default Portal;