# Interactive Driving Whiteboard

## Project Overview

This is a single-file, responsive web application designed to serve as an interactive sketchpad. Its primary purpose is to assist driving instructors in visualising and explaining complex maneuvers, road layouts, and traffic flow during lessons, providing a clear visual aid that traditional methods lack.

Built purely with HTML, Tailwind CSS, and vanilla JavaScript for speed and simplicity.

## Key Features

- Responsive Canvas: Automatically adapts to fit tablets (like iPads) and desktop monitors, making it ideal for in-car use.
- Intuitive Drawing Tools: Selectable colors and adjustable brush sizes for clear diagramming.
- Undo Functionality: Easily correct mistakes or reverse the last step of a maneuver diagram.
- Clear Canvas Button: Instantly resets the board for the next demonstration.
- Touch Optimized: Designed with touchstart and touch-action: none to ensure smooth drawing without accidental scrolling or zooming on touch screens.

## How to Use It (For Instructors)

1. Preparation: Open on a tablet or laptop mounted securely in the vehicle.
2. Demonstration: Use your finger or a stylus to draw:

- Road Layouts: Use different colors to represent lanes, curbs, and painted lines.
- Vehicle Paths: Draw the intended path of the vehicle (e.g., parallel parking trajectory, roundabout entry/exit) using the selected color.
- Traffic: Use the Undo button to step back through the maneuver sequence, explaining each phase clearly.

## Technical Stack

Frontend: HTML5
Styling: Tailwind CSS (via CDN)
Logic: Vanilla JavaScript (Focusing on Canvas API)

## Local Development & Setup

To run this project locally and continue development:

1. Clone the Repository:

```bash
git clone [https://github.com/Ryan-Shino/DrivingWhiteboard.git](https://github.com/Ryan-Shino/DrivingWhiteboard.git)
cd DrivingWhiteboard
```

2. Open the File: Simply open the index.html file in your web browser. No server or compilation steps are required.

## Contributing

Feel free to suggest new features or improvements! Future ideas include adding shape tools (rectangles/circles for cars/roundabouts) and maps.
