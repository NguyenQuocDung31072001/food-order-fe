import React from 'react';

const _ItemWrapper: React.FC<{ width: number; children: React.ReactNode }> = ({ width, children }) => {
  return (
    <div
      style={{
        width: width,
      }}
    >
      {children}
    </div>
  );
};

export const ItemWrapper = React.memo(_ItemWrapper);
