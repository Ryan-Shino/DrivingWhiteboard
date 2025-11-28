export interface CanvasObject {
  id: string;
  type: string; // 'car-top', 'road-roundabout', etc.
  x: number;
  y: number;
  rotation: number;
  src?: string;
  points?: number[];
  color?: string;
}

// All possible tools the app supports
export type ToolType = 
  | 'pen' | 'eraser' | 'cursor'
  // Traffic Tools
  | 'car-top' | 'car-side' | 'car-driver'
  | 'arrow-straight' | 'arrow-curved' | 'arrow-uturn'
  | 'obj-roundabout' | 'obj-road' | 'obj-parking'
  | 'sign-stop' | 'sign-giveway' | 'sign-light';