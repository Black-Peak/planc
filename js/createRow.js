/**
 * Row Creation Functions
 * These functions are responsible for creating rows in the provider list.
 * Extracted from logic.js to reduce file size.
 */

/**
 * Creates a new row for a provider item
 * @param {Object} data The provider data
 * @param {Object} svgIcons SVG icons object
 * @returns {HTMLElement} The created row element
 */
function createNewRow(data, svgIcons) {
    const row = document.createElement("div");
    const svgChevron = `<svg aria-hidden="true" role="img" fill="currentColor" width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>Icon</title><path d="M7.99301 12.2063C7.90129 12.2074 7.81036 12.1893 7.72605 12.1532C7.64175 12.1171 7.56594 12.0637 7.5035 11.9965L1.20979 5.7028C0.93007 5.42308 0.93007 4.98951 1.20979 4.70979C1.48951 4.43007 1.92308 4.43007 2.2028 4.70979L8.00699 10.514L13.7972 4.72378C14.0769 4.44406 14.5105 4.44406 14.7902 4.72378C15.0699 5.0035 15.0699 5.43706 14.7902 5.71678L8.4965 12.0105C8.35664 12.1504 8.17483 12.2203 8.00699 12.2203L7.99301 12.2063Z" fill="currentColor"></path></svg>`;

    function createFeatureSection(text, svg="") {
        return `<div class="states_result_feature">${svg ? `<div class="button-icon is-result-show w-embed">${svg}</div>` : ""}<div>${text}</div></div>`;
    }

    function createSvgIconForProperty(feature) {
        switch (feature) {
        case "extra_misoprostol_included":
            return `
              <svg aria-hidden="true" role="img" fill="none" width="100%" height="100%" style="" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <title>Extra Misoprostol Included</title>
                <rect x="0.625" y="0.625" width="14.75" height="14.75" rx="7.375" fill="#DCF8FC"></rect>
                <rect x="0.625" y="0.625" width="14.75" height="14.75" rx="7.375" stroke="#72E2F2" stroke-width="0.75"></rect>
                <path d="M7.58301 6.95821C7.58301 6.71198 7.53451 6.46816 7.44028 6.24067C7.34605 6.01319 7.20794 5.80649 7.03383 5.63238C6.85972 5.45827 6.65302 5.32016 6.42554 5.22593C6.19805 5.1317 5.95424 5.08321 5.70801 5.08321C5.46178 5.08321 5.21796 5.1317 4.99048 5.22593C4.76299 5.32016 4.55629 5.45827 4.38218 5.63238C4.20807 5.80649 4.06996 6.01319 3.97573 6.24067C3.88151 6.46816 3.83301 6.71198 3.83301 6.95821M7.58301 6.95821C7.58301 7.45549 7.38546 7.9324 7.03383 8.28403C6.6822 8.63566 6.20529 8.83321 5.70801 8.83321C5.21073 8.83321 4.73381 8.63566 4.38218 8.28403C4.03055 7.9324 3.83301 7.45549 3.83301 6.95821M7.58301 6.95821H3.83301M10.0366 6.34873C9.365 6.34273 8.78675 5.76377 8.78959 5.08558C8.79243 4.40863 9.35768 3.84351 10.0346 3.84083C10.5304 3.83887 11.0008 4.15015 11.1964 4.60568C11.3273 4.91072 11.3303 5.26517 11.2045 5.57238C11.0159 6.0332 10.5345 6.35317 10.0366 6.34873Z" stroke="#2F3B58" stroke-width="0.75" stroke-linecap="round"></path>
                <path d="M11.7105 10.2421C11.9972 9.94896 12.1567 9.55455 12.1544 9.1445C12.1521 8.73445 11.9882 8.34184 11.6982 8.05188C11.4083 7.76193 11.0157 7.59802 10.6056 7.59573C10.1956 7.59344 9.80115 7.75295 9.50798 8.03964L8.03964 9.50798C7.75295 9.80115 7.59344 10.1956 7.59573 10.6056C7.59802 11.0157 7.76193 11.4083 8.05188 11.6982C8.34184 11.9882 8.73445 12.1521 9.1445 12.1544C9.55455 12.1567 9.94896 11.9972 10.2421 11.7105L11.7105 10.2421Z" stroke="#2F3B58" stroke-width="0.75"></path>
                <path d="M8.83301 8.83301C8.83301 8.83301 8.95009 9.44134 9.62926 10.1205C10.3084 10.7988 10.9163 10.9163 10.9163 10.9163" stroke="#2F3B58" stroke-width="0.75"></path>
              </svg>
            `;
        case "video_visit_required":
            return `
            <svg aria-hidden="true" role="img" fill="none" width="100%" height="100%" style="" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <title>Icon</title>
            <rect x="0.625" y="0.625" width="14.75" height="14.75" rx="7.375" fill="#FFD7DA"></rect>
            <rect x="0.625" y="0.625" width="14.75" height="14.75" rx="7.375" stroke="#FF5E6B" stroke-width="0.75"></rect>
            <path d="M8 3.8335C5.93208 3.8335 4.25 5.51558 4.25 7.5835C4.25 8.97016 5.00833 10.1802 6.13042 10.8293L5.26917 11.4035C5.19479 11.4531 5.13833 11.5253 5.10814 11.6094C5.07795 11.6936 5.07562 11.7852 5.10149 11.8708C5.12737 11.9563 5.18008 12.0313 5.25184 12.0846C5.3236 12.1379 5.4106 12.1668 5.5 12.1668H10.5C10.5894 12.1668 10.6765 12.1381 10.7483 12.0848C10.8202 12.0315 10.8729 11.9566 10.8989 11.871C10.9248 11.7854 10.9225 11.6937 10.8923 11.6095C10.8621 11.5253 10.8057 11.4531 10.7312 11.4035L9.87 10.8293C10.9917 10.1802 11.75 8.97016 11.75 7.5835C11.75 5.51558 10.0679 3.8335 8 3.8335ZM8 10.5002C6.39208 10.5002 5.08333 9.19141 5.08333 7.5835C5.08333 5.97558 6.39208 4.66683 8 4.66683C9.60792 4.66683 10.9167 5.97558 10.9167 7.5835C10.9167 9.19141 9.60792 10.5002 8 10.5002Z" fill="#FF5E6B"></path>
            <path d="M8.00033 5.5C6.85158 5.5 5.91699 6.43458 5.91699 7.58333C5.91699 8.73208 6.85158 9.66667 8.00033 9.66667C9.14908 9.66667 10.0837 8.73208 10.0837 7.58333C10.0837 6.43458 9.14908 5.5 8.00033 5.5ZM7.37533 7.58333C7.29322 7.58331 7.21193 7.56711 7.13608 7.53566C7.06024 7.50422 6.99133 7.45814 6.9333 7.40007C6.81609 7.28278 6.75027 7.12373 6.75033 6.95792C6.75035 6.87581 6.76655 6.79452 6.798 6.71868C6.82944 6.64283 6.87552 6.57393 6.93359 6.51589C7.05088 6.39868 7.20993 6.33286 7.37574 6.33292C7.54156 6.33297 7.70056 6.39889 7.81777 6.51618C7.93498 6.63347 8.0008 6.79252 8.00074 6.95833C8.00069 7.12415 7.93476 7.28315 7.81748 7.40036C7.70019 7.51757 7.54114 7.58339 7.37533 7.58333Z" fill="#FF5E6B"></path>
            </svg>
          `;
        case "pills":
            return svgIcons.pills;
        case "buoy":
            return svgIcons.buoy;
        case "acceptsSomeInsurancePlans":
            return svgIcons.acceptsSomeInsurancePlans;
        default:
            return "";
        }
    }

    // Build feature rows based on provider data
    function generateFeatureRows() {
        let features = "";
        if (data.accepts_insurance && data.accepts_insurance !== "false") {
            features += createFeatureSection(data.accepts_insurance_copy || "Accepts insurance", svgIcons.acceptsSomeInsurancePlans);
        }
        if (data.accepts_medicaid && data.accepts_medicaid !== "false") {
            features += createFeatureSection(data.accepts_medicaid_copy || "Accepts Medicaid", svgIcons.acceptsSomeInsurancePlans);
        }
        if (data.discounts_available && data.discounts_available !== "false") {
            features += createFeatureSection(data.discounts_available_copy || "Discounts available", svgIcons.acceptsSomeInsurancePlans);
        }
        if (data.spanish_available && data.spanish_available !== "false") {
            features += createFeatureSection("Se habla Español", "");
        }
        if (data.no_face_interaction && data.no_face_interaction !== "false") {
            features += createFeatureSection(data.no_face_interaction_copy || "Video visit is required", createSvgIconForProperty("video_visit_required"));
        }
        if (data.extra_misoprostol_included && data.extra_misoprostol_included !== "false") {
            features += createFeatureSection(data.extra_misoprostol_included_copy || "Extra misoprostol included", createSvgIconForProperty("extra_misoprostol_included"));
        }
        return features;
    }

    function generateFeatureRowsInline() {
        let features = "";
        if (data.accepts_insurance && data.accepts_insurance !== "false") {
            features += `<div class="features_pill">
                <div class="features_pill_text">${data.accepts_insurance_copy || "Accepts insurance"}</div>
            </div>`;
        }
        if (data.accepts_medicaid && data.accepts_medicaid !== "false") {
            features += `<div class="features_pill">
                <div class="features_pill_text">${data.accepts_medicaid_copy || "Accepts Medicaid"}</div>
            </div>`;
        }
        if (data.discounts_available && data.discounts_available !== "false") {
            features += `<div class="features_pill">
                <div class="features_pill_text">${data.discounts_available_copy || "Discounts available"}</div>
            </div>`;
        }
        if (data.spanish_available && data.spanish_available !== "false") {
            features += `<div class="features_pill">
                <div class="features_pill_text">Se habla Español</div>
            </div>`;
        }
        if (data.no_face_interaction && data.no_face_interaction !== "false") {
            features += `<div class="features_pill">
                <div class="features_pill_text">${data.no_face_interaction_copy || "Video visit is required"}</div>
            </div>`;
        }
        if (data.extra_misoprostol_included && data.extra_misoprostol_included !== "false") {
            features += `<div class="features_pill">
                <div class="features_pill_text">${data.extra_misoprostol_included_copy || "Extra misoprostol included"}</div>
            </div>`;
        }
        return features;
    }

    function buildOwnershipString() {
        let result = "";
        if (data.ownership_text) {
            result = data.ownership_text;
        } else if (data.ownership && data.ownership.length) {
            result = data.ownership.join(", ") || "";
        }
        return result ? `<div class="states_result_text_small">${result}</div>` : "";
    }

    function createProviderInteractionsSection() {
        let interactionsSection = "";
        
        // Contact and interaction methods
        if (data.contact_methods && data.contact_methods.length) {
            let contactMethods = `<div class="states_result_interaction-wrapper">`;
            
            if (data.contact_methods.includes("Phone")) {
                contactMethods += `<div class="states_result_interaction">
                    <div class="button-icon is-interaction w-embed">${svgIcons.phone || ""}</div>
                    <div>Phone</div>
                </div>`;
            }
            
            if (data.contact_methods.includes("Text")) {
                contactMethods += `<div class="states_result_interaction">
                    <div class="button-icon is-interaction w-embed">${svgIcons.chat || ""}</div>
                    <div>Text</div>
                </div>`;
            }
            
            if (data.contact_methods.includes("Chat")) {
                contactMethods += `<div class="states_result_interaction">
                    <div class="button-icon is-interaction w-embed">${svgIcons.chat || ""}</div>
                    <div>Chat</div>
                </div>`;
            }
            
            if (data.contact_methods.includes("Email")) {
                contactMethods += `<div class="states_result_interaction">
                    <div class="button-icon is-interaction w-embed">${svgIcons.mail || ""}</div>
                    <div>Email</div>
                </div>`;
            }
            
            contactMethods += `</div>`;
            interactionsSection += contactMethods;
        }
        
        return interactionsSection;
    }

    // Set up row structure for a standard provider item
    if (!data.isLoadMoreButton) {
        row.className = `states_result_item w-dyn-item ${data.type}`;
        row.setAttribute("data-provider-type", data.type);
        
        // Left column with provider details
        const leftColumn = `
            <div class="states_result_left-column">
                <div class="states_result_top-content">
                    <div class="states_result_name-price">
                        <div>
                            <div class="states_result_name">${data.display_name || ""}</div>
                            ${buildOwnershipString()}
                        </div>
                        ${data.typical_price ? `<div class="states_result_text-block">${data.typical_price}</div>` : ""}
                    </div>
                    <div class="states_result_delivery">
                        ${data.delivery_time ? `<div class="states_result_text-block">${data.delivery_time}</div>` : ""}
                    </div>
                </div>
                <div class="states_result_features-wrapper">${generateFeatureRows()}</div>
                ${createProviderInteractionsSection()}
            </div>
        `;
        
        // Right column with actions and additional info
        const rightColumn = `
            <div class="states_result_right-column">
                <div class="button-icon is-down-arrow w-embed">${svgChevron}</div>
                <a href="${data.website_link || '#'}" target="_blank" class="button is-result w-button">Visit Website</a>
                <div class="states_result_text_small">Ships to ${data.state_list || "all states"}</div>
            </div>
        `;
        
        // Bottom details section (initially hidden)
        const detailsSection = `
            <div class="states_result_details">
                <div class="states_result_details-wrapper">
                    <div class="states_result_details_left-column">
                        ${data.leftDetails || ""}
                    </div>
                    <div class="states_result_details_right-column">
                        ${data.right_column_html || ""}
                    </div>
                </div>
            </div>
        `;
        
        row.innerHTML = `${leftColumn}${rightColumn}${detailsSection}`;
    } 
    // Set up row structure for a "Load More" button
    else {
        const { style, loadMoreLabel } = getLoadMoreDetails(data);
        
        row.className = `states_result_load-more w-dyn-item ${data.type}`;
        row.setAttribute("data-provider-type", data.type);
        
        row.innerHTML = `
            <div class="states_result_load-more-button">
                <div class="button-row">
                    <div class="button-icon is-show-more is-${style.class} w-embed">${svgIcons.arrowRight2 || ""}</div>
                    <div>Show more ${loadMoreLabel}</div>
                </div>
            </div>
        `;
    }

    return row;
}

// Export the functions
if (typeof window !== 'undefined') {
    // Add to shared data namespace
    window.planCSharedData = window.planCSharedData || {};
    window.planCSharedData.createNewRow = createNewRow;
    
    // Also add to window for backward compatibility
    window.createNewRow = createNewRow;
}

// For module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createNewRow
    };
} 