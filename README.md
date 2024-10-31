# Interactive Pac-Man Game with Joystick Controls

This project recreates the classic Pac-Man game with a modern, interactive twist, using an ESP32 joystick and button setup. Inspired by childhood memories of Pac-Man and created with the help of open-source JavaScript resources, this version uses real joystick controls for a fun, arcade-like experience.

## Supplies
- ESP32
- Joystick
- Push button
- 3D-printed joystick enclosure (STL files provided)
- USB cable for power and data transfer

## Setup

1. **ESP32 Pin Connections**:
   - **Joystick**:
     - X-axis to analog pin `39`
     - Y-axis to analog pin `32`
   - **Push Button**:
     - Connect to digital pin `2` for pause/resume

2. **Power**:
   - Connect the ESP32 to your computer via USB for power and data transfer.

## Usage

1. **ESP32 Setup**:
   - Upload `pac_man_interactive_device_arduino` to the ESP32 using the Arduino IDE. This code reads joystick and button inputs, sending directional commands to the browser-based game via serial output.
   
2. **Game Interface**:
   - Place `index.html`, `app.js`, and `style.css` in the same directory.
   - Open `index.html` in a browser to start the game.

3. **3D Printing** (optional):
   - Use `Part Studio 1 - Bottom.stl` and `Part Studio 1 - Top.stl` files to 3D print a custom enclosure for the joystick for an enhanced arcade feel.


## The Product

![Pacman GIF](https://github.com/jieji09/COMS3930-Module-2/blob/1bf210c94d4574e17834fb53d76bb51227882cf8/pacman.gif)
