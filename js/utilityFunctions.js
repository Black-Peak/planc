/**
 * Utility Functions
 * Common utility functions used across the application.
 * Extracted from logic.js to reduce file size.
 */

/**
 * Transform API data items into a format usable by the UI
 * @param {Array} items Array of provider items from the API
 * @returns {Array} Transformed data items
 */
function transformData(items) {
    // Make a deep copy to avoid mutating the original data
    return items.map((item) => {
        if (item?.us_based_telehealth) {
            item = {
                ...item,
                providerType: "Online Clinics",
                type: "us_based_telehealth",
                // keep original key for grouping
            };
        } else if (item?.international_telehealth) {
            item = {
                ...item,
                providerType: "International Online Clinics",
                type: "international_telehealth",
            };
        } else if (item?.websites_that_sell_pills) {
            item = {
                ...item,
                providerType: "Websites that sell pills",
                type: "websites_that_sell_pills",
            };
        } else if (item?.community_networks) {
            item = {
                ...item,
                providerType: "Community Networks",
                type: "community_networks",
            };
        } else {
            console.warn("No recognized provider type for item with id", item.id);
            return null;
        }
        item.age_served = ages_served_options.find((entry) => entry.id === item.age_served)?.name || "";
        item.gestational_age = gestational_age_options.find((entry) => entry.id === item.gestational_age)?.name || "";
        item.provider_type_text = item.providerType;
        item.financial_assistance = financial_assistance_options.find((entry) => entry.id === item.financial_assistance)?.name || "";
        item.show_potentional_risk = show_potential_risk_options.find((entry) => entry.id === item.show_potentional_risk)?.name || "";
        item.style = getStyleAttributes(item);
        item.leftDetails = getProviderDetails(item);
        return item;
    }).filter((item) => item !== null);
}

/**
 * Sort items according to the application's sorting rules
 * @param {Object} a First item to compare
 * @param {Object} b Second item to compare
 * @returns {number} Comparison result (-1, 0, 1)
 */
function sortItems(a, b) {
    if (
        !a.display_name ||
        !b?.display_name ||
        a?.isLoadMoreButton ||
        b?.isLoadMoreButton
    ) {
        return 0;
    }

    // Helper: get the order index for an item.
    const getProviderIndex = (item) => {
        if (!item.type) return providerOrder.length;
        const typeLower = item.type.toLowerCase();
        // If the type is "all" or not in our providerOrder, assign a high index.
        const index = providerOrder.indexOf(typeLower);
        return index === -1 ? providerOrder.length : index;
    };

    const indexA = getProviderIndex(a);
    const indexB = getProviderIndex(b);

    if (indexA !== indexB) {
        return indexA - indexB;
    }

    // If they have the same provider type index, sort alphabetically by display name.
    return a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase());
}

/**
 * Get style attributes for a provider item
 * @param {Object} item The provider item
 * @returns {Object} Style attributes
 */
function getStyleAttributes(item) {
    if (item.providerType === "Online Clinics") {
        return {
            class: "is-clinic",
            activeColor: "#1c6c77",
            passiveColor: "#dcf8fc",
            label: "Online Clinic that mails pills",
        };
    } else if (item.providerType === "International Online Clinics") {
        return {
            class: "is-clinic",
            activeColor: "#1c6c77",
            passiveColor: "#dcf8fc",
            label: "International Online Clinic",
        };
    } else if (item.providerType === "Websites that sell pills") {
        return {
            class: "is-website",
            activeColor: "#3647b3",
            passiveColor: "#e2e5f",
            label: "Websites that sell pills",
        };
    } else if (item.providerType === "Community Networks") {
        return {
            class: "is-community",
            activeColor: "#ad4ba1",
            passiveColor: "#feeafc",
            label: "Community Networks",
        };
    }
}

/**
 * Get additional details for a provider
 * @param {Object} data Provider data
 * @returns {string} HTML with provider details
 */
function getProviderDetails(data) {
    let detailsHtml = "";
    if (data) {
        if (data?.type === "us_based_telehealth") {
            detailsHtml = `<div class="states_result_card is-clinic">
        <div class="states_result_text_column gap-20">
          <div class="states_result_details_feature">
            <div class="button-icon is-card is-clinic w-embed"><svg aria-hidden="true" role="img" fill="none" width="100%" height="100%" style="" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
            <title>Icon</title>
            <rect width="25" height="25" fill="white"></rect>
            <path d="M16.25 8H8.75C8.41848 8 8.10054 8.1317 7.86612 8.36612C7.6317 8.60054 7.5 8.91848 7.5 9.25V16.75C7.5 17.0815 7.6317 17.3995 7.86612 17.6339C8.10054 17.8683 8.41848 18 8.75 18H16.25C16.5815 18 16.8995 17.8683 17.1339 17.6339C17.3683 17.3995 17.5 17.0815 17.5 16.75V9.25C17.5 8.91848 17.3683 8.60054 17.1339 8.36612C16.8995 8.1317 16.5815 8 16.25 8ZM13.125 16.75H8.75V12.375H13.125V16.75ZM16.25 16.75H14.375V12.375H16.25V16.75ZM16.25 11.125H8.75V9.25H16.25V11.125Z" fill="black"></path>
            </svg></div>
          <div class="states_result_details-h4">This is an online clinic that mails pills</div>
        </div>
        <!-- More content here for US-based telehealth -->
        </div>`;
        } else if (data?.type === "international_telehealth") {
            detailsHtml = `<div class="states_result_card is-clinic">
            <!-- Detailed content for international telehealth -->
            </div>`;
        } else if (data?.type === "websites_that_sell_pills") {
            detailsHtml = `<div class="states_result_card is-website">
            <!-- Detailed content for websites that sell pills --> 
            </div>`;
        } else if (data?.type === "community_networks") {
            detailsHtml = `<div class="states_result_card is-community">
            <!-- Detailed content for community networks -->
            </div>`;
        }
    }
    return detailsHtml;
}

/**
 * Get details for a "Load More" button
 * @param {Object} item The load more item
 * @returns {Object} Details for the load more button
 */
function getLoadMoreDetails(item) {
    let loadMoreLabel = "";
    let style = {};
    
    if (item.type === "us_based_telehealth") {
        style = getStyleAttributes({ providerType: "Online Clinics" });
        loadMoreLabel = "Online Clinics";
    } else if (item.type === "international_telehealth") {
        style = getStyleAttributes({ providerType: "International Online Clinics" });
        loadMoreLabel = "International Online Clinics";
    } else if (item.type === "websites_that_sell_pills") {
        style = getStyleAttributes({ providerType: "Websites that sell pills" });
        loadMoreLabel = "Websites that sell pills";
    } else if (item.type === "community_networks") {
        style = getStyleAttributes({ providerType: "Community Networks" });
        loadMoreLabel = "Community Networks";
    }
    
    return { style, loadMoreLabel };
}

// Export the functions to the global namespace
if (typeof window !== 'undefined') {
    // Add functions to shared data namespace
    window.planCSharedData = window.planCSharedData || {};
    window.planCSharedData.transformData = transformData;
    window.planCSharedData.sortItems = sortItems;
    window.planCSharedData.getStyleAttributes = getStyleAttributes;
    window.planCSharedData.getProviderDetails = getProviderDetails;
    window.planCSharedData.getLoadMoreDetails = getLoadMoreDetails;
    
    // Also add to window for backward compatibility
    window.transformData = transformData;
    window.sortItems = sortItems;
    window.getStyleAttributes = getStyleAttributes;
    window.getProviderDetails = getProviderDetails;
    window.getLoadMoreDetails = getLoadMoreDetails;
}

// For module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        transformData,
        sortItems,
        getStyleAttributes,
        getProviderDetails,
        getLoadMoreDetails
    };
} 