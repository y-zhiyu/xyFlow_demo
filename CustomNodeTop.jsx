import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        position: 'relative',
        padding: '2px 3px 2px 3px',
        borderRadius: '4px',
        fontSize: 7,
        ...data.style,
      }}
      onClick={data.onClick}
    >
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: '#90CDF4',
          width: 3,
          height: 3,
          minWidth: 3,
          minHeight: 3,
        }}
      />
      <img
        src={data.image}
        alt={data.label}
        style={{
          width: '18px',
          height: '18px',
          pointerEvents: 'none',
          ...data.iconStyle,
        }}
      />
      <div>{data.label}</div>
    </div>
  );
};

export default CustomNode;
