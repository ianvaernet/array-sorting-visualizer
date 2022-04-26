import React from 'react';
import style from './style.module.css';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ ...props }) => {
  return <input {...props} className={style.input} />;
};
