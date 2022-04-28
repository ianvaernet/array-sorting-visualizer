import React from 'react';
import style from './style.module.css';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
};

export const Select: React.FC<Props> = ({ options, ...restProps }: Props) => {
  return (
    <select {...restProps} className={style.select}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};
