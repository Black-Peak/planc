/**
 * Main Application Entry Point
 * Initializes the application and sets up the global state
 */

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing application...');
    
    // Ensure SVG icons are available
    if (!window.svgIcons && !window.planCSharedData.svgIcons) {
        console.error('SVG icons not found. UI elements may not display correctly.');
    } else if (window.svgIcons && !window.planCSharedData.svgIcons) {
        window.planCSharedData.svgIcons = window.svgIcons;
    } else if (!window.svgIcons && window.planCSharedData.svgIcons) {
        window.svgIcons = window.planCSharedData.svgIcons;
    }
    
    // Ensure createNewRow function is available
    if (!window.createNewRow && !window.planCSharedData.createNewRow) {
        console.error('createNewRow function not found. UI elements may not display correctly.');
    } else if (window.createNewRow && !window.planCSharedData.createNewRow) {
        window.planCSharedData.createNewRow = window.createNewRow;
    } else if (!window.createNewRow && window.planCSharedData.createNewRow) {
        window.createNewRow = window.planCSharedData.createNewRow;
    }
    
    // Initialize the application state
    window.planCApp = window.planCApp || {
        counter: {
            all: { showing: 0, total: 0 },
            us_based_telehealth: { showing: 0, total: 0 },
            international_telehealth: { showing: 0, total: 0 },
            websites_that_sell_pills: { showing: 0, total: 0 },
            community_networks: { showing: 0, total: 0 }
        },
        payload: {
            looking_for: "Abortion pills as soon as possible",
            state: "",
            type_and_amount: {
                type: "all",
                amount: 10
            },
            language: {
                hindi: null,
                spanish: null,
                french: null
            },
            sorting: {
                sortColumn: "name",
                orderBy: "asc"
            },
            accepts_insurance: false,
            accepts_medicaid: false,
            discounts_available: false,
            no_face_interaction: false,
            extra_misoprostol_included: false
        },
        sortingModeActive: false,
        ITEMS_INCREMENT: window.planCSharedData?.ITEMS_INCREMENT || 10
    };
    
    // Fix any issues with the code (like unterminated template literals)
    if (typeof window.planCSharedData?.fixLogicJS === 'function') {
        window.planCSharedData.fixLogicJS();
    } else if (typeof window.fixLogicJS === 'function') {
        window.fixLogicJS();
    }
    
    // Set up event listeners
    if (typeof window.planCSharedData?.initEventListeners === 'function') {
        window.planCSharedData.initEventListeners();
    } else if (typeof window.initEventListeners === 'function') {
        window.initEventListeners();
    }
    
    // Load initial data
    if (typeof window.planCSharedData?.fetchSuppliers === 'function') {
        window.planCSharedData.fetchSuppliers(window.planCApp.payload);
    } else if (typeof window.fetchSuppliers === 'function') {
        window.fetchSuppliers(window.planCApp.payload);
    }
    
    console.log('Application initialized successfully');
}); 