/**
 * DOM Operations
 * Functions for manipulating the DOM and handling UI events.
 * Extracted from logic.js to reduce file size.
 */

// No longer importing from shared namespace to avoid duplicate declarations

/**
 * Update the UI with provider data
 * @param {Array} providers Array of provider data objects
 * @param {boolean} isLoadMore Whether this is a "load more" operation
 */
function updateUI(providers, isLoadMore = false) {
    if (!Array.isArray(providers) || providers.length === 0) {
        showNoResults();
        return;
    }

    const resultsContainer = document.querySelector('.states_result_component');
    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }

    // Clear existing content if not loading more
    if (!isLoadMore) {
        resultsContainer.innerHTML = '';
    } else {
        // Remove load more buttons when loading more
        document.querySelectorAll('.states_result_load-more').forEach(el => el.remove());
    }

    // Ensure we have access to the svgIcons
    const svgIcons = window.svgIcons || window.planCSharedData?.svgIcons || {};
    if (!svgIcons || Object.keys(svgIcons).length === 0) {
        console.warn('SVG icons not found or empty. UI elements may not display correctly.');
    }

    // Add new rows
    providers.forEach(provider => {
        // Get the createNewRow function directly or from the global namespace
        let createRowFn;
        
        if (typeof window.createNewRow === 'function') {
            createRowFn = window.createNewRow;
        } else if (typeof window.planCSharedData?.createNewRow === 'function') {
            createRowFn = window.planCSharedData.createNewRow;
        } else {
            console.error('createNewRow function not found');
            return;
        }
        
        try {
            const row = createRowFn(provider, svgIcons);
            if (row) {
                resultsContainer.appendChild(row);
            } else {
                console.error('Failed to create row for provider:', provider);
            }
        } catch (error) {
            console.error('Error creating row:', error, provider);
        }
    });

    // Update counter displays
    updateCounterDisplays();
    
    // Add event listeners to new rows
    addRowEventListeners();
}

/**
 * Show a message when no results are found
 */
function showNoResults() {
    const resultsContainer = document.querySelector('.states_result_component');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="states_result_no-results">
                <div class="states_result_no-results-text">No providers found matching your criteria.</div>
                <div class="states_result_no-results-text">Try adjusting your filters or search terms.</div>
            </div>
        `;
    }

    // Update counter displays to show zeros
    updateCounterDisplays();
}

/**
 * Update counter displays in the UI
 */
function updateCounterDisplays() {
    // Update main counter
    const mainCounter = document.querySelector('.states_info_h1.is-main');
    if (mainCounter) {
        mainCounter.textContent = `${counter.all.showing} Results`;
    }

    // Update showing/total counter
    const infoText = document.querySelector('.states_info_text .states_info_text.is-grey');
    if (infoText) {
        infoText.textContent = `${counter.all.showing} of ${counter.all.total} Results`;
    }

    // Update provider type counters if they exist
    for (const type in counter) {
        if (type !== 'all') {
            const typeCounter = document.querySelector(`.counter-${type}`);
            if (typeCounter) {
                typeCounter.textContent = counter[type].total;
            }
        }
    }
}

/**
 * Add event listeners to provider rows
 */
function addRowEventListeners() {
    // Add click listeners to regular provider rows
    document.querySelectorAll('.states_result_item:not(.has-listeners)').forEach(row => {
        // Add toggle for expanding/collapsing details
        const chevron = row.querySelector('.button-icon.is-down-arrow');
        if (chevron) {
            chevron.addEventListener('click', () => {
                toggleDetails(row);
            });
        }

        // Mark as having listeners
        row.classList.add('has-listeners');
    });

    // Add click listeners to "Load More" buttons
    document.querySelectorAll('.states_result_load-more:not(.has-listeners)').forEach(button => {
        button.addEventListener('click', (e) => {
            handleLoadMoreClick(button);
        });

        // Mark as having listeners
        button.classList.add('has-listeners');
    });
}

/**
 * Toggle the details section of a provider row
 * @param {HTMLElement} row The provider row element
 */
function toggleDetails(row) {
    const details = row.querySelector('.states_result_details');
    const chevron = row.querySelector('.button-icon.is-down-arrow');
    
    if (details) {
        if (details.classList.contains('is-active')) {
            // Hide details
            details.classList.remove('is-active');
            if (chevron) {
                chevron.classList.remove('is-active');
            }
        } else {
            // Show details
            details.classList.add('is-active');
            if (chevron) {
                chevron.classList.add('is-active');
            }
        }
    }
}

/**
 * Handle click on a "Load More" button
 * @param {HTMLElement} button The load more button element
 */
function handleLoadMoreClick(button) {
    const providerType = button.getAttribute('data-provider-type');
    if (!providerType) {
        console.error('Provider type not found on load more button');
        return;
    }

    // Update payload for the specific provider type
    const payload = { ...window.planCApp.payload };
    payload.type_and_amount = {
        type: providerType,
        amount: counter[providerType].showing + window.planCApp.ITEMS_INCREMENT
    };

    // Fetch more providers
    fetchSuppliers(payload, true);
}

/**
 * Initialize event listeners for filters and controls
 */
function initEventListeners() {
    // Location dropdown
    const locationDropdown = document.getElementById('filters_location_dropdown');
    if (locationDropdown) {
        locationDropdown.addEventListener('change', () => {
            window.planCApp.payload.state = locationDropdown.value === 'Select State' ? '' : locationDropdown.value;
            fetchSuppliers(window.planCApp.payload);
        });
    }

    // Need dropdown
    const needDropdown = document.getElementById('Need-6');
    if (needDropdown) {
        needDropdown.addEventListener('change', () => {
            window.planCApp.payload.looking_for = needDropdown.value;
            fetchSuppliers(window.planCApp.payload);
        });
    }

    // Language dropdown
    const languageDropdown = document.getElementById('Language');
    if (languageDropdown) {
        languageDropdown.addEventListener('change', () => {
            // Reset language values
            window.planCApp.payload.language = {
                hindi: null,
                spanish: null,
                french: null
            };
            
            // Set selected language
            const value = languageDropdown.value;
            if (value.includes('Hindi')) {
                window.planCApp.payload.language.hindi = true;
            } else if (value.includes('Espanol')) {
                window.planCApp.payload.language.spanish = true;
            } else if (value.includes('Francais')) {
                window.planCApp.payload.language.french = true;
            }
            
            fetchSuppliers(window.planCApp.payload);
        });
    }

    // Checkboxes
    const checkboxes = {
        'offers_slilding_scale': 'discounts_available',
        'accepts_insurance': 'accepts_insurance',
        'accepts_medicaid': 'accepts_medicaid',
        'video_visit_required': 'no_face_interaction',
        'extra_misoprostol': 'extra_misoprostol_included'
    };

    for (const [id, payloadKey] of Object.entries(checkboxes)) {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                window.planCApp.payload[payloadKey] = checkbox.checked;
                fetchSuppliers(window.planCApp.payload);
            });
        }
    }

    // Sort dropdown
    const sortDropdown = document.getElementById('Sort-by-4');
    if (sortDropdown) {
        sortDropdown.addEventListener('change', () => {
            const value = sortDropdown.value;
            const [column, order] = value.split('-');
            
            window.planCApp.payload.sorting = {
                sortColumn: column,
                orderBy: order
            };
            
            fetchSuppliers(window.planCApp.payload);
        });
    }
}

// Export the functions to the global namespace
if (typeof window !== 'undefined') {
    // Add functions to shared data namespace
    window.planCSharedData = window.planCSharedData || {};
    window.planCSharedData.updateUI = updateUI;
    window.planCSharedData.showNoResults = showNoResults;
    window.planCSharedData.updateCounterDisplays = updateCounterDisplays;
    window.planCSharedData.addRowEventListeners = addRowEventListeners;
    window.planCSharedData.toggleDetails = toggleDetails;
    window.planCSharedData.handleLoadMoreClick = handleLoadMoreClick;
    window.planCSharedData.initEventListeners = initEventListeners;
    
    // Also add to window for backward compatibility
    window.updateUI = updateUI;
    window.showNoResults = showNoResults;
    window.updateCounterDisplays = updateCounterDisplays;
    window.addRowEventListeners = addRowEventListeners;
    window.toggleDetails = toggleDetails;
    window.handleLoadMoreClick = handleLoadMoreClick;
    window.initEventListeners = initEventListeners;
}

// For module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateUI,
        showNoResults,
        updateCounterDisplays,
        addRowEventListeners,
        toggleDetails,
        handleLoadMoreClick,
        initEventListeners
    };
} 