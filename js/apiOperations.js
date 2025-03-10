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
        const baseUrl = "https://x5y9-ip6q-ykpo.n7c.xano.io/api:t1-Xws3y/suppliers/paginated?";
        const queryParams = new URLSearchParams({
            looking_for: payload.looking_for,
            state: payload.state,
            password: "vbRUJPQBWQWDNTK!yPo9yvJ",
        });

        const additionalParams = ["type_and_amount", "language", "sorting", "accepts_insurance", "accepts_medicaid", "discounts_available", "no_face_interaction", "extra_misoprostol_included"];
        additionalParams.forEach((param) => {
            if (payload[param]) {
                queryParams.append(param, JSON.stringify(payload[param]));
            }
        });

        const url = `${baseUrl}${queryParams.toString()}`;
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok)
            throw new Error("Failed to fetch suppliers");
        const data = await response.json();
        
        if (updateUI) {
            // Validate that data is either an array or has an items property
            if (!data || (!(Array.isArray(data)) && !data.items)) {
                console.error('Invalid API response format:', data);
                throw new Error('Invalid response format from API');
            }
            handleNewData(data, loadMoreFetch);
        }
        return data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw new Error(error);
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
            } else if (data && data.items && Array.isArray(data.items)) {
                return [...acc, ...data.items];
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
 * @param {Object|Array} data The data returned from the API
 * @param {boolean} isLoadMoreFetch Whether this is a "load more" request
 */
function handleNewData(data, isLoadMoreFetch=false) {
    let itemsToProcess;
    
    // Check if data is a paginated response object
    if (data && data.items && Array.isArray(data.items)) {
        // Store pagination data in a global variable for potential later use
        window.planCSharedData = window.planCSharedData || {};
        window.planCSharedData.paginationInfo = {
            currentPage: data.curPage,
            nextPage: data.nextPage,
            prevPage: data.prevPage,
            totalItems: data.itemsTotal,
            totalPages: data.pageTotal,
            perPage: data.perPage,
            offset: data.offset
        };
        
        itemsToProcess = data.items;
    } else if (Array.isArray(data)) {
        itemsToProcess = data;
    } else {
        console.error('Invalid data format received:', data);
        return;
    }
    
    // Transform the data
    const transformedData = transformData(itemsToProcess);
    
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