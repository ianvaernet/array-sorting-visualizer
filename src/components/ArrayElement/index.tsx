import React from 'react';
import style from './style.module.css';

type Props = {
  element: number;
};

export const ArrayElement: React.FC<Props> = ({ element }: Props) => {
  return (
    <div className={style.container}>
      <p>{element}</p>
    </div>
  );
};
