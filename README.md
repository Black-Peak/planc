# PlanC Provider Finder Application

This application has been refactored from a single large JavaScript file into a modular structure for better maintainability and performance.

## Project Structure

The application is now organized into the following components:

### Core Files
- `logic.js` - The original file, now reduced in size by extracting major functions
- `logic2.js` - The continuation of the original file's functionality
- `connector.js` - Bridges data and functions between the two main logic files

### Modules
- `js/svgIcons.js` - SVG icon definitions extracted from the main file
- `js/utilityFunctions.js` - Common utility functions like transformData and sortItems
- `js/createRow.js` - Functions for creating provider rows in the UI
- `js/apiOperations.js` - API-related functions like fetchSuppliers
- `js/fixLogicJS.js` - Utilities to fix any issues with the original logic.js file

### Templates and HTML
- `html-templates.js` - HTML templates extracted from the JavaScript files
- `index.html` - The main HTML file that loads all the modules in the correct order

## How the Code Works

1. **Initialization Process**
   - The HTML file loads all modules in the correct order
   - Each module exports its functions to both module systems and the global namespace
   - The connector.js file ensures functions from logic.js are available to logic2.js
   - The fixLogicJS.js file handles any issues with the original logic.js file (such as unterminated template literals)

2. **Data Flow**
   - The application loads data from the API using functions in apiOperations.js
   - Data is transformed using utility functions from utilityFunctions.js
   - UI elements are created using functions from createRow.js
   - SVG icons from svgIcons.js are used throughout the application

3. **Global Namespaces**
   - `window.planCApp` - Contains application state and configuration
   - `window.planCSharedData` - Shared data and functions between modules
   - `window.planCTemplates` - HTML templates used by the application

## Development Notes

- When modifying the application, update the appropriate module file rather than the main logic.js file
- If you need to add new functionality, create a new module file and update the imports in index.html
- The fixLogicJS.js file helps bridge any gaps between the modules and the original code

## Browser Compatibility

This application has been refactored to work with modern browsers while maintaining compatibility with older browsers through the use of global namespaces. 