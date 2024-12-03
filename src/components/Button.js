import React from "react";
import "../styles/Button.css";

const Button = ({ label, name, value, onClick, variant = "primary", disabled = false }) => {
  const handleKeyDown = (event) => {
    if (!disabled && (event.key === "Enter" || event.key === " ")) {
      onClick();
    }
  };
  return (
    <div
      className={`button ${variant} ${disabled ? "disabled" : ""}`}
      role="button"
      name={name}
      value={value}
      tabIndex={disabled ? -1 : 0}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={!disabled ? handleKeyDown : undefined}
      aria-disabled={disabled}
    >
      {label}
    </div>
  );
};

export default Button;
