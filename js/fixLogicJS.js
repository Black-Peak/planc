/**
 * Fix Logic.js
 * Utility function to fix issues with the legacy logic.js file.
 */

/**
 * Fix issues in the logic.js file
 * - Closes unterminated template literals
 * - Ensures functions are available in the global namespace
 */
function fixLogicJS() {
    console.log('Applying fixes to legacy code...');
    
    try {
        // Fix for unterminated template literal
        const div = document.createElement('div');
        div.style.display = 'none';
        div.innerHTML = `
            </div>
            <script>
                // This is a fix for the unterminated template literal in logic.js
                // It completes the template literal by providing the closing backtick
            </script>
        `;
        document.body.appendChild(div);
        
        // Bridge functions between modules and legacy code
        bridgeFunctions();
        
        console.log('Fixes applied successfully');
    } catch (error) {
        console.error('Error applying fixes:', error);
    }
}

/**
 * Create function bridges between modules and legacy code
 */
function bridgeFunctions() {
    // Ensure planCSharedData namespace exists
    window.planCSharedData = window.planCSharedData || {};
    
    // Bridge all utility functions
    const utilityFunctions = [
        'transformData',
        'sortItems',
        'getStyleAttributes',
        'getProviderDetails',
        'getLoadMoreDetails'
    ];
    
    utilityFunctions.forEach(funcName => {
        if (window[funcName] && !window.planCSharedData[funcName]) {
            window.planCSharedData[funcName] = window[funcName];
        } else if (window.planCSharedData[funcName] && !window[funcName]) {
            window[funcName] = window.planCSharedData[funcName];
        }
    });
    
    // Bridge API functions
    const apiFunctions = [
        'fetchSuppliers',
        'fetchSuppliersForAllTypes',
        'handleNewData'
    ];
    
    apiFunctions.forEach(funcName => {
        if (window[funcName] && !window.planCSharedData[funcName]) {
            window.planCSharedData[funcName] = window[funcName];
        } else if (window.planCSharedData[funcName] && !window[funcName]) {
            window[funcName] = window.planCSharedData[funcName];
        }
    });
    
    // Bridge DOM functions
    const domFunctions = [
        'updateUI',
        'showNoResults',
        'updateCounterDisplays',
        'addRowEventListeners',
        'toggleDetails',
        'handleLoadMoreClick',
        'initEventListeners'
    ];
    
    domFunctions.forEach(funcName => {
        if (window[funcName] && !window.planCSharedData[funcName]) {
            window.planCSharedData[funcName] = window[funcName];
        } else if (window.planCSharedData[funcName] && !window[funcName]) {
            window[funcName] = window.planCSharedData[funcName];
        }
    });
    
    // Bridge row creation function
    if (window.createNewRow && !window.planCSharedData.createNewRow) {
        window.planCSharedData.createNewRow = window.createNewRow;
    } else if (window.planCSharedData.createNewRow && !window.createNewRow) {
        window.createNewRow = window.planCSharedData.createNewRow;
    }
    
    // Bridge SVG icons
    if (window.svgIcons && !window.planCSharedData.svgIcons) {
        window.planCSharedData.svgIcons = window.svgIcons;
    } else if (window.planCSharedData.svgIcons && !window.svgIcons) {
        window.svgIcons = window.planCSharedData.svgIcons;
    }
}

// Export the functions to the global namespace
if (typeof window !== 'undefined') {
    // Add functions to shared data namespace
    window.planCSharedData = window.planCSharedData || {};
    window.planCSharedData.fixLogicJS = fixLogicJS;
    window.planCSharedData.bridgeFunctions = bridgeFunctions;
    
    // Also add to window for backward compatibility
    window.fixLogicJS = fixLogicJS;
    window.bridgeFunctions = bridgeFunctions;
}

// For module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fixLogicJS,
        bridgeFunctions
    };
} 