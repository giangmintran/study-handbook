# Study Handbook

## Overview
Study Handbook is a React-based web application designed to assist students in their studies. It provides tools and resources for various subjects, including English and Mathematics. The project is built using modern web technologies such as React, Vite, and TailwindCSS.

## Features
- **English Tools**:
  - Dictionary: Look up word definitions and meanings.
- **Mathematics Tools**:
  - Equation Solver: Solve mathematical equations.
  - Formula Utility: Access and manage mathematical formulas.
  - Graph Plotter: Plot mathematical graphs.
  - Vector Calculator: Perform vector calculations.

## Project Structure
The project is organized as follows:
```
public/          # Static assets
src/             # Source code
  assets/        # Images and other assets
  components/    # Reusable components (e.g., Layout, Sidebar)
  pages/         # Page components
    Dashboard.jsx
    Home.jsx
    english/     # English-related pages
      Dictionary.jsx
    math/        # Math-related pages
      EquationSolver.jsx
      FormulaUtility.jsx
      GraphPlotter.jsx
      VectorCalc.jsx
```

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd StudyHandbook
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
### Development Server
To start the development server, run:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Build for Production
To build the project for production, run:
```bash
npm run build
```
The build files will be generated in the `dist/` directory.

### Preview Production Build
To preview the production build locally, run:
```bash
npm run preview
```

## Technologies Used
- **React**: Frontend library for building user interfaces.
- **Vite**: Build tool for fast development.
- **TailwindCSS**: Utility-first CSS framework.
- **Math.js**: Library for mathematical computations.
- **Nerdamer**: Symbolic math library.
- **Function-Plot**: Library for plotting mathematical functions.

## Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
