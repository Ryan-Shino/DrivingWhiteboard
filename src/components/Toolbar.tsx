import React, { useState } from 'react';
import { Pen, Eraser, Undo, Save, Trash2, Car, Navigation, Map, ShieldAlert, ChevronUp, ChevronRight, ChevronDown, ChevronLeft, Layout } from 'lucide-react';
import type { ToolType } from '../types';

export type Position = 'bottom' | 'top' | 'left' | 'right';

interface ToolbarProps {
  tool: ToolType;
  setTool: (tool: ToolType) => void;
  onUndo: () => void;
  onClear: () => void;
  onSave: () => void;
  color: string;
  setColor: (color: string) => void;
  thickness: number;
  setThickness: (thickness: number) => void;
  position: Position;
  setPosition: (pos: Position) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  tool, setTool, onUndo, onClear, onSave,
  color, setColor, thickness, setThickness,
  position, setPosition
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // 1. Determine Orientation
  const isVertical = position === 'left' || position === 'right';

  // 2. Determine Container Positioning & Flow
  // We want the SETTINGS to be closer to the edge, and TOOLBAR closer to center.
  // This prevents the settings from blocking the popup menus.
  const containerClasses = {
    bottom: 'bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse', // Settings (bottom), Toolbar (top)
    top:    'top-4 left-1/2 -translate-x-1/2 flex-col',             // Settings (top), Toolbar (bottom)
    left:   'left-4 top-1/2 -translate-y-1/2 flex-row',             // Settings (left), Toolbar (right)
    right:  'right-4 top-1/2 -translate-y-1/2 flex-row-reverse'     // Settings (right), Toolbar (left)
  };

  const toggleMenu = (menuName: string) => setActiveMenu(activeMenu === menuName ? null : menuName);

  const btnClass = (isActive: boolean) => 
    `p-2 rounded-lg transition flex items-center justify-center gap-1 ${isActive ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`;

  // Helper for Popup Menu Items
  const MenuItem = ({ label, value }: { label: string, value: ToolType }) => (
    <button 
      onClick={() => { setTool(value); setActiveMenu(null); }}
      className={`w-full text-left px-3 py-2 text-sm whitespace-nowrap rounded-md transition ${tool === value ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      {label}
    </button>
  );

  // Available Colors
  const colors = [
    { name: 'Black', val: '#000000', class: 'bg-black' },
    { name: 'Red', val: '#ef4444', class: 'bg-red-500' },
    { name: 'Blue', val: '#3b82f6', class: 'bg-blue-500' },
    { name: 'Green', val: '#22c55e', class: 'bg-green-500' },
    { name: 'Orange', val: '#f97316', class: 'bg-orange-500' },
  ];

  return (
    <div className={`absolute ${containerClasses[position]} flex items-center gap-2 z-40 pointer-events-none transition-all duration-300`}>
      
      {/* === COMPONENT 1: SETTINGS BAR (Always closest to screen edge) === */}
      {/* Only visible when Pen/Eraser is active */}
      <div 
        className={`
          bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 
          flex ${isVertical ? 'flex-col w-12' : 'flex-row h-12'} items-center gap-3 justify-center pointer-events-auto
          transition-all duration-300
          ${(tool === 'pen' || tool === 'eraser') ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
        `}
      >
          {/* Thickness Slider */}
          <div className={`flex items-center justify-center ${isVertical ? 'h-20 w-8' : 'w-24 h-8'}`}>
              <input 
                  type="range" 
                  min="2" max="20" 
                  value={thickness} 
                  onChange={(e) => setThickness(Number(e.target.value))}
                  className={`
                    bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600
                    ${isVertical ? '-rotate-90 w-20 h-2' : 'w-full h-2'}
                  `}
              />
          </div>
          
          <div className={`bg-gray-200 dark:bg-gray-600 ${isVertical ? 'w-6 h-px' : 'h-6 w-px'}`}></div>

          {/* Color Swatches */}
          <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} gap-1.5`}>
              {colors.map((c) => (
                  <button
                      key={c.name}
                      onClick={() => setColor(c.val)}
                      className={`w-5 h-5 rounded-full border-2 transition ${c.class} ${color === c.val ? 'border-indigo-600 scale-125 shadow-sm' : 'border-transparent hover:scale-110'}`}
                      title={c.name}
                  />
              ))}
          </div>
      </div>

      {/* === COMPONENT 2: MAIN TOOLBAR (Always closer to center) === */}
      <div className={`bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex ${isVertical ? 'flex-col' : 'flex-row'} items-center gap-1 pointer-events-auto`}>
        
        {/* Layout Switcher */}
        <button 
          onClick={() => {
            const positions: Position[] = ['bottom', 'left', 'top', 'right'];
            const next = positions[(positions.indexOf(position) + 1) % 4];
            setPosition(next);
          }}
          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          title="Move Toolbar"
        >
          <Layout size={18} />
        </button>

        <div className={`bg-gray-300 dark:bg-gray-600 ${isVertical ? 'w-6 h-px' : 'h-6 w-px'} mx-1`}></div>

        {/* Tools */}
        <button onClick={() => setTool('pen')} className={btnClass(tool === 'pen')}> <Pen size={20} /> </button>
        <button onClick={() => setTool('eraser')} className={btnClass(tool === 'eraser')}> <Eraser size={20} /> </button>

        <div className={`bg-gray-300 dark:bg-gray-600 ${isVertical ? 'w-6 h-px' : 'h-6 w-px'} mx-1`}></div>

        {/* Dynamic Popup Menus */}
        {/* We map over the categories to keep code clean */}
        {['car', 'arrows', 'objects', 'signs'].map((menu) => {
             const isActive = activeMenu === menu;
             // Check if current tool belongs to this category
             const prefix = menu === 'car' ? 'car' : menu === 'arrows' ? 'arrow' : menu === 'objects' ? 'obj' : 'sign';
             const isToolActive = tool.startsWith(prefix);
             
             // Calculate Popup Position (Always opens away from the toolbar towards center)
             let popupClass = '';
             let chevron = <ChevronUp size={14} />;

             if (position === 'bottom') { popupClass = 'bottom-full mb-2 left-1/2 -translate-x-1/2'; chevron = <ChevronUp size={14} />; }
             if (position === 'top')    { popupClass = 'top-full mt-2 left-1/2 -translate-x-1/2';    chevron = <ChevronDown size={14} />; }
             if (position === 'left')   { popupClass = 'left-full ml-2 top-1/2 -translate-y-1/2';    chevron = <ChevronRight size={14} />; }
             if (position === 'right')  { popupClass = 'right-full mr-2 top-1/2 -translate-y-1/2';   chevron = <ChevronLeft size={14} />; }

             // Icon Selection
             const icons: any = { car: Car, arrows: Navigation, objects: Map, signs: ShieldAlert };
             const Icon = icons[menu];

             return (
               <div key={menu} className="relative">
                 {isActive && (
                   <div className={`absolute ${popupClass} w-44 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-1 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-100`}>
                      {menu === 'car' && <><MenuItem label="Top View" value="car-top" /><MenuItem label="Side View" value="car-side" /><MenuItem label="Driver Seat" value="car-driver" /></>}
                      {menu === 'arrows' && <><MenuItem label="Straight" value="arrow-straight" /><MenuItem label="Curved" value="arrow-curved" /><MenuItem label="U-Turn" value="arrow-uturn" /></>}
                      {menu === 'objects' && <><MenuItem label="Roundabout" value="obj-roundabout" /><MenuItem label="Road" value="obj-road" /><MenuItem label="Parking Bay" value="obj-parking" /></>}
                      {menu === 'signs' && <><MenuItem label="Stop" value="sign-stop" /><MenuItem label="Give Way" value="sign-giveway" /><MenuItem label="Traffic Light" value="sign-light" /></>}
                   </div>
                 )}
                 <button onClick={() => toggleMenu(menu)} className={btnClass(isToolActive)}>
                   <Icon size={20} /> 
                   {chevron}
                 </button>
               </div>
             )
        })}

        <div className={`bg-gray-300 dark:bg-gray-600 ${isVertical ? 'w-6 h-px' : 'h-6 w-px'} mx-1`}></div>

        <button onClick={onUndo} className={btnClass(false)}> <Undo size={20} /> </button>
        <button onClick={onClear} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"> <Trash2 size={20} /> </button>
      </div>
    </div>
  );
};

export default Toolbar;