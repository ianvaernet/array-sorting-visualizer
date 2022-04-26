import React, { ReactElement } from 'react';
import style from './style.module.css';

type Props = {
  children: ReactElement<any, any>;
  label: string;
};

export const LabeledInput: React.FC<Props> = ({ children, label }: Props) => {
  return (
    <>
      <label htmlFor={children.props.id} className={style.inputLabel}>
        {label}
      </label>
      {children}
    </>
  );
};
