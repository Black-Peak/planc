/**
 * Connector script for bridging logic.js and logic2.js
 * This script creates shared contexts between the split files.
 */

// Create a global namespace to share data between files
window.planCSharedData = window.planCSharedData || {};

// Initialize shared data structures if needed
window.planCSharedData.counter = window.planCSharedData.counter || {};
window.planCSharedData.payload = window.planCSharedData.payload || {};

// Explicitly expose functions from logic.js for use in logic2.js
document.addEventListener('DOMContentLoaded', function() {
  console.log('Connector script initializing shared context...');
  
  // Make sure svgIcons is available globally
  if (typeof original !== 'undefined' && original.svgIcons) {
    window.svgIcons = original.svgIcons;
    window.planCSharedData.svgIcons = original.svgIcons;
    console.log('SVG icons loaded from original.js');
  }
  
  // Wait for logic.js to execute first
  setTimeout(function() {
    // First check if svgIcons exists in the global scope
    if (typeof svgIcons !== 'undefined' && typeof window.svgIcons === 'undefined') {
      window.svgIcons = svgIcons;
      console.log('SVG icons copied to window namespace');
    }
    
    // Link variables from logic.js to the shared namespace
    if (typeof svgIcons !== 'undefined') {
      window.planCSharedData.svgIcons = svgIcons;
      console.log('SVG icons stored in shared namespace');
    } else if (typeof window.svgIcons !== 'undefined') {
      window.planCSharedData.svgIcons = window.svgIcons;
      console.log('SVG icons copied from window to shared namespace');
    }
    
    if (typeof counter !== 'undefined') window.planCSharedData.counter = counter;
    if (typeof payload !== 'undefined') window.planCSharedData.payload = payload;
    if (typeof sortingModeActive !== 'undefined') window.planCSharedData.sortingModeActive = sortingModeActive;
    if (typeof ITEMS_INCREMENT !== 'undefined') window.planCSharedData.ITEMS_INCREMENT = ITEMS_INCREMENT;
    
    // Link functions from logic.js
    if (typeof getProviderDetails !== 'undefined') window.planCSharedData.getProviderDetails = getProviderDetails;
    if (typeof getLoadMoreDetails !== 'undefined') window.planCSharedData.getLoadMoreDetails = getLoadMoreDetails;
    if (typeof getStyleAttributes !== 'undefined') window.planCSharedData.getStyleAttributes = getStyleAttributes;
    if (typeof transformData !== 'undefined') window.planCSharedData.transformData = transformData;
    if (typeof sortItems !== 'undefined') window.planCSharedData.sortItems = sortItems;
    if (typeof fetchSuppliersForAllTypes !== 'undefined') window.planCSharedData.fetchSuppliersForAllTypes = fetchSuppliersForAllTypes;
    if (typeof fetchSuppliers !== 'undefined') window.planCSharedData.fetchSuppliers = fetchSuppliers;
    if (typeof handleNewData !== 'undefined') window.planCSharedData.handleNewData = handleNewData;
    if (typeof applyFilters !== 'undefined') window.planCSharedData.applyFilters = applyFilters;
    if (typeof createNewRow !== 'undefined') {
      window.planCSharedData.createNewRow = createNewRow;
      console.log('createNewRow function stored in shared namespace');
    }
    
    console.log('Connector script has linked functions from logic.js');
  }, 100);
}); 