import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

import CustomNodeTop from './CustomNodeTop';
import Icon from './icon.png';
import Icon1 from './icon1.png';
import Icon2 from './icon2.png';
import Icon3 from './icon3.png';

const parentWidth = 600;
const parentHeight = 200;
const nodeWidth = 20;
const node1PositionX = (parentWidth - nodeWidth * 2) / 2 - 40;
const node2PositionX = node1PositionX + nodeWidth + 50;

const childWidth = 40;
const numberOfChildren = 4;
const totalChildrenWidth = numberOfChildren * childWidth;
const startX = (parentWidth - totalChildrenWidth) / 2;
const start1Y = parentHeight * 0.3;
const start2Y = parentHeight * 0.7;

const initialNodes = [
  {
    id: '2',
    data: { label: '' },
    position: { x: 100, y: 0 },
    className: 'light',
    style: {
      backgroundColor: 'rgba(255, 0, 0, 0.05)',
      width: parentWidth,
      height: parentHeight,
      border: '1px rgba(255, 0, 0, 0.2) dashed',
      pointerEvents: 'none',
    },
    type: 'group',
  },
  {
    id: '2a-1',
    data: { label: '外网', image: Icon2 },
    position: { x: node1PositionX, y: -10 },
    parentId: '2',
    type: 'customTop',
    draggable: false,
  },
  {
    id: '2a-2',
    data: {
      label: '地址集',
      image: Icon3,
      iconStyle: { width: 22, height: 22, marginTop: -4 },
    },
    position: { x: node2PositionX, y: -10 },
    parentId: '2',
    type: 'customTop',
    draggable: false,
  },
  {
    id: '2b-1',
    data: { label: 'Node A.1', image: Icon },
    position: { x: startX, y: start1Y },
    parentId: '2',
    extent: 'parent',
    type: 'custom',
  },
  {
    id: '2b-2',
    data: { label: 'Node b.2', image: Icon },
    position: { x: startX + childWidth, y: start1Y },
    parentId: '2',
    extent: 'parent',
    type: 'custom',
  },
  {
    id: '2b-3',
    data: { label: 'Node b.2', image: Icon },
    position: { x: startX + childWidth * 2, y: start1Y },
    parentId: '2',
    extent: 'parent',
    type: 'custom',
  },
  {
    id: '2b-4',
    data: { label: 'Node b.2', image: Icon },
    position: { x: startX + childWidth * 3, y: start1Y },
    parentId: '2',
    extent: 'parent',
    type: 'custom',
  },
  {
    id: '2c-1',
    data: { label: '', image: Icon1 },
    position: { x: startX, y: start2Y },
    className: 'light',
    parentId: '2',
    // extent: 'parent',
    type: 'custom',
  },
  {
    id: '2c-2',
    data: { label: '', image: Icon1 },
    position: { x: startX + childWidth, y: start2Y },
    parentId: '2',
    // extent: 'parent',
    type: 'custom',
  },
  {
    id: '2c-3',
    data: { label: '', image: Icon1 },
    position: { x: startX + childWidth * 2, y: start2Y },
    parentId: '2',
    // extent: 'parent',
    type: 'custom',
  },
  {
    id: '2c-4',
    data: { label: '', image: Icon1 },
    position: { x: startX + childWidth * 3, y: start2Y },
    parentId: '2',
    // extent: 'parent',
    type: 'custom',
  },
  {
    id: '3',
    data: { label: '' },
    position: { x: 100, y: 300 },
    className: 'light',
    style: {
      backgroundColor: 'rgba(255, 0, 0, 0.05)',
      width: parentWidth,
      height: parentHeight,
      border: '1px rgba(255, 0, 0, 0.2) dashed',
      pointerEvents: 'none',
    },
    type: 'group',
  },
  {
    id: '3a-1',
    data: { label: '外网', image: Icon2 },
    position: { x: node1PositionX, y: -10 },
    parentId: '3',
    type: 'customTop',
    draggable: false,
  },
  {
    id: '3a-2',
    data: {
      label: '地址集',
      image: Icon3,
      iconStyle: { width: 22, height: 22, marginTop: -4 },
    },
    position: { x: node2PositionX, y: -10 },
    parentId: '3',
    type: 'customTop',
    draggable: false,
  },
  {
    id: '3b-1',
    data: { label: 'Node A.1', image: Icon1 },
    position: { x: startX, y: start1Y },
    parentId: '3',
    extent: 'parent',
    type: 'custom',
  },
  {
    id: '3b-2',
    data: { label: 'Node A.1', image: Icon1 },
    position: { x: startX + childWidth, y: start1Y },
    parentId: '3',
    extent: 'parent',
    type: 'custom',
  },
  {
    id: '3b-3',
    data: { label: 'Node A.1', image: Icon1 },
    position: { x: startX + childWidth * 2, y: start1Y },
    parentId: '3',
    extent: 'parent',
    type: 'custom',
  },
  {
    id: '3b-4',
    data: { label: 'Node A.1', image: Icon1 },
    position: { x: startX + childWidth * 3, y: start1Y },
    parentId: '3',
    extent: 'parent',
    type: 'custom',
  },
];

const initialEdges = [
  { id: 'e2a-1-2b-1', source: '2a-1', target: '2b-1', animated: true },
  {
    id: 'e2b-1-2c-3',
    source: '2b-1',
    target: '2c-3',
  },
  {
    id: 'e2b-1-2c-2',
    source: '2b-1',
    target: '2c-2',
  },
  // {
  //   id: 'e2b-1-2b-4',
  //   source: '2b-1',
  //   target: '2b-4',
  // },
  {
    id: 'e2b-1-2c-1',
    source: '2b-1',
    target: '2c-1',
  },
  {
    id: 'e2b-2-2c-1',
    source: '2b-2',
    target: '2c-1',
  },
  {
    id: 'e3a-1-3b-1',
    source: '3a-1',
    target: '3b-1',
  },
  {
    id: 'e3a-1-3b-2',
    source: '3a-1',
    target: '3b-2',
  },
  {
    id: 'e3a-1-3b-3',
    source: '3a-1',
    target: '3b-3',
  },
];

const NestedFlow = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const nodeTypes = {
    custom: CustomNode,
    customTop: CustomNodeTop,
  };

  const handleNodeClick = (event: any, node: any) => {
    event.stopPropagation();
    setEdges((eds) =>
      eds.map((edge) =>
        edge.source === node.id || edge.target === node.id
          ? {
              ...edge,
              style: { stroke: 'rgba(37,59,233,1)', strokeWidth: 1 },
            }
          : {
              ...edge,
              style: { stroke: 'rgba(234,234,234,1)', strokeWidth: 1 },
            }
      )
    );

    setNodes((nds) =>
      nds.map((nodeItem) =>
        nodeItem.type == 'customTop'
          ? {
              ...nodeItem,
            }
          : {
              ...nodeItem,
              data: {
                ...nodeItem.data,
                style: {
                  background: 'rgba(144,205,244,0.3)',
                },
              },
            }
      )
    );
  };

  const handleEdgeClick = (event, edge) => {
    event.stopPropagation();
    setEdges((eds) =>
      eds.map((e) =>
        e.id === edge.id
          ? { ...e, style: { stroke: 'rgba(37,59,233,1)', strokeWidth: 0.7 } }
          : {
              ...e,
              style: { stroke: 'rgba(234,234,234,0.7)', strokeWidth: 0.7 },
            }
      )
    );

    setNodes((nds) =>
      nds.map((node) =>
        node.id === edge.source || node.id === edge.target
          ? {
              ...node,
              data: {
                ...node.data,
                style: {
                  background: 'rgba(37,59,233,0.5)',
                },
              },
            }
          : node.type == 'customTop'
          ? {
              ...node,
              data: {
                ...node.data,
                style: {
                  background: 'none',
                },
              },
            }
          : {
              ...node,
              data: {
                ...node.data,
                style: {
                  background: 'rgba(234,234,234,0.7)',
                },
              },
            }
      )
    );
  };

  const modifiedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onClick: (e) => handleNodeClick(e, node),
    },
  }));

  const onNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      console.log('Updated nodes:', updatedNodes);
      setNodes(updatedNodes);
    },
    [nodes]
  );

  return (
    <ReactFlow
      nodes={modifiedNodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      className="react-flow-subflows-example"
      fitView
      nodeTypes={nodeTypes}
      onEdgeClick={handleEdgeClick}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default NestedFlow;
