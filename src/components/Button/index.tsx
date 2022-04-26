import React from 'react';
import style from './style.module.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

export const Button: React.FC<Props> = ({ ...restProps }: Props) => {
  return <button {...restProps} className={style.button}></button>;
};
