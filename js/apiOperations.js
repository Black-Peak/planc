/**
 * API Operations
 * Functions for interacting with the server API.
 * Extracted from logic.js to reduce file size.
 */

/**
 * Fetch suppliers from the API based on the provided parameters
 * @param {Object} payload Parameters for the API request
 * @param {boolean} loadMoreFetch Whether this is a "load more" request
 * @param {boolean} updateUI Whether to update the UI with the results
 * @returns {Promise<Array>} Promise that resolves to the fetched data
 */
async function fetchSuppliers(payload, loadMoreFetch=false, updateUI=true) {
    try {
        // Build query params
        const queryParams = [];
        if (payload.looking_for) {
            queryParams.push(`looking_for=${encodeURIComponent(payload.looking_for)}`);
        }
        if (payload.state) {
            queryParams.push(`state=${encodeURIComponent(payload.state)}`);
        }
        if (payload.type_and_amount && payload.type_and_amount.type) {
            queryParams.push(`type=${encodeURIComponent(payload.type_and_amount.type)}`);
        }
        if (payload.type_and_amount && payload.type_and_amount.amount) {
            queryParams.push(`amount=${encodeURIComponent(payload.type_and_amount.amount)}`);
        }
        if (payload.language && payload.language.hindi) {
            queryParams.push(`hindi=${encodeURIComponent(payload.language.hindi)}`);
        }
        if (payload.language && payload.language.spanish) {
            queryParams.push(`spanish=${encodeURIComponent(payload.language.spanish)}`);
        }
        if (payload.language && payload.language.french) {
            queryParams.push(`french=${encodeURIComponent(payload.language.french)}`);
        }
        if (payload.sorting && payload.sorting.sortColumn) {
            queryParams.push(`sort_column=${encodeURIComponent(payload.sorting.sortColumn)}`);
        }
        if (payload.sorting && payload.sorting.orderBy) {
            queryParams.push(`order_by=${encodeURIComponent(payload.sorting.orderBy)}`);
        }
        if (payload.accepts_insurance) {
            queryParams.push(`accepts_insurance=${encodeURIComponent(payload.accepts_insurance)}`);
        }
        if (payload.accepts_medicaid) {
            queryParams.push(`accepts_medicaid=${encodeURIComponent(payload.accepts_medicaid)}`);
        }
        if (payload.discounts_available) {
            queryParams.push(`discounts_available=${encodeURIComponent(payload.discounts_available)}`);
        }
        if (payload.no_face_interaction) {
            queryParams.push(`no_face_interaction=${encodeURIComponent(payload.no_face_interaction)}`);
        }
        if (payload.extra_misoprostol_included) {
            queryParams.push(`extra_misoprostol_included=${encodeURIComponent(payload.extra_misoprostol_included)}`);
        }

        // Build the URL
        const baseUrl = 'https://api.example.com/suppliers'; // Replace with actual API URL
        const url = `${baseUrl}${queryParams.length ? '?' + queryParams.join('&') : ''}`;

        // Make the API request
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Process the data
        if (updateUI) {
            handleNewData(data, loadMoreFetch);
        }

        return data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        return [];
    }
}

/**
 * Fetch suppliers for all provider types
 * @param {Object} payload Parameters for the API requests
 * @returns {Promise<Array>} Promise that resolves to the combined data from all requests
 */
async function fetchSuppliersForAllTypes(payload) {
    try {
        const providerTypes = [
            "us_based_telehealth",
            "international_telehealth",
            "websites_that_sell_pills",
            "community_networks"
        ];
        
        const requests = providerTypes.map(type => {
            const typePayload = {
                ...payload,
                type_and_amount: {
                    ...payload.type_and_amount,
                    type
                }
            };
            
            return fetchSuppliers(typePayload, false, false);
        });
        
        const results = await Promise.all(requests);
        
        // Combine all results
        const combinedData = results.reduce((acc, data) => {
            if (Array.isArray(data)) {
                return [...acc, ...data];
            }
            return acc;
        }, []);
        
        // Process the combined data
        handleNewData(combinedData, false);
        
        return combinedData;
    } catch (error) {
        console.error('Error fetching suppliers for all types:', error);
        return [];
    }
}

/**
 * Handle new data from the API
 * @param {Array} data The data returned from the API
 * @param {boolean} isLoadMoreFetch Whether this is a "load more" request
 */
function handleNewData(data, isLoadMoreFetch=false) {
    if (!Array.isArray(data)) {
        console.error('Invalid data format received:', data);
        return;
    }
    
    // Transform the data
    const transformedData = transformData(data);
    
    // Update counters
    updateCounters(transformedData);
    
    // Sort the data
    const sortedData = transformedData.sort(sortItems);
    
    // Add "Load More" buttons if needed
    const dataWithLoadMore = addLoadMoreButtons(sortedData);
    
    // Update the UI
    if (typeof updateUI === 'function') {
        updateUI(dataWithLoadMore, isLoadMoreFetch);
    }
}

/**
 * Update the counters for each provider type
 * @param {Array} data The transformed provider data
 */
function updateCounters(data) {
    // Reset counters
    for (const type in counter) {
        counter[type].showing = 0;
        counter[type].total = 0;
    }
    
    // Count items by type
    data.forEach(item => {
        if (item.type && counter[item.type]) {
            counter[item.type].total++;
            counter[item.type].showing++;
            counter.all.total++;
            counter.all.showing++;
        }
    });
}

/**
 * Add "Load More" buttons to data for provider types with more than ITEMS_INCREMENT items
 * @param {Array} data The sorted provider data
 * @returns {Array} Data with load more buttons added
 */
function addLoadMoreButtons(data) {
    const result = [...data];
    const typeCounts = {};
    
    // Count occurrences of each type
    data.forEach(item => {
        if (item.type) {
            typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
        }
    });
    
    // Insert load more buttons where needed
    for (const type in typeCounts) {
        if (typeCounts[type] > ITEMS_INCREMENT) {
            // Find the position to insert the button (after ITEMS_INCREMENT items of this type)
            let count = 0;
            let insertPosition = -1;
            
            for (let i = 0; i < result.length; i++) {
                if (result[i].type === type) {
                    count++;
                    if (count === ITEMS_INCREMENT) {
                        insertPosition = i + 1;
                        break;
                    }
                }
            }
            
            if (insertPosition >= 0) {
                // Create a load more button
                const loadMoreButton = {
                    isLoadMoreButton: true,
                    type: type
                };
                
                // Insert the button
                result.splice(insertPosition, 0, loadMoreButton);
                
                // Update counters
                if (counter[type]) {
                    counter[type].showing = ITEMS_INCREMENT;
                }
            }
        }
    }
    
    return result;
}

// Export the functions to the global namespace
if (typeof window !== 'undefined') {
    // Add functions to shared data namespace
    window.planCSharedData = window.planCSharedData || {};
    window.planCSharedData.fetchSuppliers = fetchSuppliers;
    window.planCSharedData.fetchSuppliersForAllTypes = fetchSuppliersForAllTypes;
    window.planCSharedData.handleNewData = handleNewData;
    window.planCSharedData.updateCounters = updateCounters;
    window.planCSharedData.addLoadMoreButtons = addLoadMoreButtons;
    
    // Also add to window for backward compatibility
    window.fetchSuppliers = fetchSuppliers;
    window.fetchSuppliersForAllTypes = fetchSuppliersForAllTypes;
    window.handleNewData = handleNewData;
    window.updateCounters = updateCounters;
    window.addLoadMoreButtons = addLoadMoreButtons;
}

// For module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchSuppliers,
        fetchSuppliersForAllTypes,
        handleNewData,
        updateCounters,
        addLoadMoreButtons
    };
} 