import inputStyles from "./input.module.css";
import React, { FC } from "react";
import { department } from "../types/db-types";

type InputComponent = React.FC<JSX.IntrinsicElements['input']>;

export const Input: InputComponent = ({ className, ...props }) => {
  const fullClassName = inputStyles.input + (className ? ' ' + className : '');

  return (
    <input
      className={fullClassName}
      {...props}
    />
  );
}

type DivComponent = React.FC<JSX.IntrinsicElements['div']>;

export const FormField: DivComponent = (props) => {
  const { title, children, className, ...otherProps } = props;
  const fullClassName = inputStyles.rowWrap + (className ? ' ' + className : '');

  return (
    <div className={fullClassName} {...otherProps}>
      <div className={inputStyles.rowName}>{title}</div>
      {children}
    </div>
  );
}
export const FormInput: InputComponent = (props) => {
  const { title, style, ...inputProps } = props;

  return (
    <FormField title={title} style={style}><Input {...inputProps} /></FormField>
  );
}

interface SelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  items: any[];
  getOptionLabel: (item: any) => string;
  multiple?: boolean;
  required?: boolean;
}

export const Select: FC<SelectProps> = (props) => {
  const { title, items, className, getOptionLabel, required, ...selectProps } = props as any;
  const fullClassName = inputStyles.input + (className ? ' ' + className : '');

  return (
    <FormField title={title}>
      <select className={fullClassName} {...selectProps}>
        {!required ? <option value={''} /> : '' }
        {items.map((item) => {
          const children = getOptionLabel(item);

          return (
            <option value={item.id} key={item.id}>{children}</option>
          );
        })}
      </select>
    </FormField>
  );
}

export const EnumSelect = (...enumItems) => (props, action) => {
  const items = enumItems.map((id) => ({ id }));

  return (
    <Select
      key={props.key}
      required={action != 'search'}
      items={items}
      getOptionLabel={(item: department) => String(item.id)}
      {...props}
    />
  );
}


interface ButtonComponent extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  confirm?: string;
}

export const Button: FC<ButtonComponent> = (props) => {
  const { className, confirm, title, ...otherProps } = props;
  const fullClassName = inputStyles.button + (className ? ' ' + className : '');

  if (confirm) otherProps.onClick = (e) => !window.confirm(confirm) ? e.preventDefault() : '';

  return (
    <button className={fullClassName} title={title} {...otherProps}>{title}</button>
  )
}
