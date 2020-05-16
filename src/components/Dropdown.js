import React, { useState, useEffect, useRef } from "react";
import { DownOutlined } from "@ant-design/icons";

const Dropdown = ({ children }) => {
  const [toggleDropdown, handleDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, () => {
    handleDropdown(false);
  });

  const renderToggle = () => {
    const toggle = children[0];
    const { className } = toggle.props;
    let newClassName = className.concat(" dropdown-toggle");

    if (React.isValidElement(toggle)) {
      return React.cloneElement(toggle, {
        onClick: (e) => {
          handleDropdown(true);
          e.preventDefault();
        },
        className: newClassName,
      });
    }
    return null;
  };

  const renderItems = () => {
    return React.Children.map(children, (child, index) => {
      if (index !== 0 && React.isValidElement(child)) {
        return React.cloneElement(child);
      }
    });
  };

  return (
    <div ref={dropdownRef} className="dropdown">
      {renderToggle()}
      {toggleDropdown ? (
        <div className="dropdown-items">{renderItems()}</div>
      ) : null}
    </div>
  );
};

/**
 * Does work when a click is detected outside of the referenced element
 * SOURCE:
 *  - https://stackoverflow.com/a/42234988
 *
 * @param {*} ref Reference to the wrapper element
 * @param {*} work A function containing work to be done
 */
function useOutsideAlerter(ref, work) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        work();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, work]);
}

export default Dropdown;

export const Sub = ({ children, label }) => {
  const [toggle, setToggle] = useState(false);

  const renderItems = () => {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child);
      }
    });
  };

  const handleToggle = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }

  return (
    <div className="sub-dropdown">
      <button class="sub-dropdown__toggle" onClick={() => handleToggle()}>
        <span className="text">{label}</span>
        <DownOutlined className="icon" rotate={toggle ? 180 : 0} />
      </button>
      <div class={`sub-dropdown__content ${toggle ? "open" : ""}`}>{toggle ? renderItems() : null}</div>
    </div>
  );
};
