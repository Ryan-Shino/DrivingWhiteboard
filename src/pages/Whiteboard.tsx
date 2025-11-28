import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Toolbar from '../components/Toolbar';
import type { ToolType } from '../types';
import type { Position } from '../components/Toolbar'; // Import the type

interface LineData {
  tool: ToolType;
  points: number[];
  color: string;      // Added property
  thickness: number;  // Added property
}

const Whiteboard = () => {
  const [tool, setTool] = useState<ToolType>('pen');
  const [lines, setLines] = useState<LineData[]>([]);
  

  const [color, setColor] = useState('#000000');
  const [thickness, setThickness] = useState(5);
  const [position, setPosition] = useState<Position>('bottom');

  const isDrawing = useRef(false);

  const handleMouseDown = (e: any) => {
    if (tool !== 'pen' && tool !== 'eraser') return;

    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    
    // Create new line with CURRENT color and thickness
    setLines([...lines, { 
      tool, 
      points: [pos.x, pos.y],
      color: tool === 'eraser' ? '#ffffff' : color, // Eraser effectively uses bg color logic or composite
      thickness: thickness
    }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;
    
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };

  const handleClear = () => {
    setLines([]);
  };

  return (
    <div className="h-full bg-gray-50 relative overflow-hidden">
      
      {/* Updated Toolbar with props */}
      <Toolbar 
        tool={tool} setTool={setTool}
        color={color} setColor={setColor}
        thickness={thickness} setThickness={setThickness}
        position={position} setPosition={setPosition} // <--- HERE
        onUndo={handleUndo} onClear={handleClear} onSave={() => {}}
      />

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              // Use line-specific props
              stroke={line.tool === 'eraser' ? '#ffffff' : line.color}
              strokeWidth={line.thickness}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              // For eraser to actually transparent-erase, we use destination-out
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Whiteboard;