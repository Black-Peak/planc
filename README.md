# PlanC Provider Finder Application

This application has been completely refactored into a modular structure for better maintainability, performance, and code organization.

## Project Structure

The application is now organized into the following components:

### Module Files
- `js/constants.js` - Configuration values and data constants used throughout the application
- `js/svgIcons.js` - SVG icon definitions for the UI components
- `js/utilityFunctions.js` - Common utility functions like transformData, sortItems, and getStyleAttributes
- `js/createRow.js` - Functions for creating provider rows in the UI
- `js/apiOperations.js` - API-related functions for fetching and processing provider data
- `js/domOperations.js` - Functions for manipulating the DOM and handling UI events
- `js/fixLogicJS.js` - (Optional) Utility to bridge functions between namespaces for compatibility

### Main Application
- `main.js` - The main entry point that initializes the application

### HTML
- `index.html` - The main HTML file that loads all the modules in the correct order

## How the Code Works

1. **Initialization Process**
   - The HTML file loads all modules in the correct order
   - `main.js` initializes the application state and sets up event listeners
   - Each module exports its functions to both the global namespace and the `planCSharedData` namespace
   - The application makes API requests to fetch provider data based on the user's filters

2. **Data Flow**
   - User interactions trigger API requests through event listeners defined in `domOperations.js`
   - Data is fetched from the API using functions in `apiOperations.js`
   - Data is transformed using utility functions from `utilityFunctions.js`
   - UI elements are created using functions from `createRow.js`
   - SVG icons from `svgIcons.js` are used throughout the application

3. **Global Namespaces**
   - `window.planCApp` - Contains application state and configuration
   - `window.planCSharedData` - Shared data and functions between modules

## Integration with Webflow

To integrate this application with Webflow:

1. **Host the JavaScript Files**
   - Upload all the JavaScript files to a hosting service (GitHub Pages, Netlify, etc.)
   - Alternatively, combine all files into a single JavaScript file for simpler integration

2. **Include the Scripts in Webflow**
   - In Webflow's project settings, go to "Custom Code"
   - Add script tags in the "Footer Code" section, maintaining the correct order:
   ```html
   <script>
       // Create global shared data namespace
       window.planCSharedData = window.planCSharedData || {};
   </script>
   <script src="https://your-host-location/js/constants.js"></script>
   <script src="https://your-host-location/js/svgIcons.js"></script>
   <script src="https://your-host-location/js/utilityFunctions.js"></script>
   <script src="https://your-host-location/js/createRow.js"></script>
   <script src="https://your-host-location/js/apiOperations.js"></script>
   <script src="https://your-host-location/js/domOperations.js"></script>
   <script src="https://your-host-location/js/fixLogicJS.js"></script>
   <script src="https://your-host-location/main.js"></script>
   ```

3. **HTML Structure**
   - Ensure your Webflow page has the necessary HTML elements with the correct class names
   - The application expects elements with classes like `states_result_component`, `states_info_h1`, etc.

## Development Notes

- When modifying the application, update the appropriate module file rather than combining all changes in one place
- Each module maintains backward compatibility by exporting functions to both the global namespace and the `planCSharedData` namespace
- This architecture allows for easier maintenance and future enhancements

## Browser Compatibility

This application supports modern browsers while maintaining compatibility with older browsers through the use of global namespaces instead of ES6 modules. 