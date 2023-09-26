import React, { MouseEventHandler } from "react";
import "./Button.scss";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant: string;
  className?: string;
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant,
  className,
  id,
  onClick,
  children,
}) => {
  return (
    <button
      type={type as "button" | "submit" | "reset" | undefined}
      className={`btn-component ${variant} ${className ? className : ""}`}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
