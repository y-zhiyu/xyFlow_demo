import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        position: 'relative',
        padding: '2px 3px 0px 3px',
        borderRadius: '4px',
        backgroundColor: 'rgba(144,205,244,0.3)',
        cursor: 'pointer',
        ...data.style,
      }}
      onClick={data.onClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: '#90CDF4',
          width: 2,
          height: 2,
          minWidth: 2,
          minHeight: 2,
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: '#90CDF4',
          width: 2,
          height: 2,
          minWidth: 2,
          minHeight: 2,
        }}
      />
      <img
        src={data.image}
        alt={data.label}
        style={{ width: '20px', height: '20px', pointerEvents: 'none' }}
      />
    </div>
  );
};

export default CustomNode;
