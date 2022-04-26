import React from 'react';
import style from './style.module.css';

type Props = {
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({ label, value, onChange }: Props) => {
  return (
    <>
      <label htmlFor="arrayLengthInput" className={style.inputLabel}>
        {label}
      </label>
      <input id="arrayLengthInput" type="number" value={value} onChange={onChange} />
    </>
  );
};
