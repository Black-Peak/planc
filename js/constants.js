/**
 * Application Constants
 * Configuration values and data constants used throughout the application
 */

// Configuration constants
const ITEMS_INCREMENT = 10;

// Data constants
const gestational_age_options = [
    { name: "For pregnancies up to 11 weeks", id: "d1a6d16dafcfa0eb1f54a3ac4bff1379" },
    { name: "For pregnancies up to 10 weeks", id: "5472a698e4bae2bf7f4eb6baaf967402" },
    { name: "For pregnancies up to 9 weeks", id: "43dbded3cec70a734b7d137979a5bb18" },
    { name: "For pregnancies up to 8 weeks", id: "6ca3278fc680cdea939fa2ed56c3b8a4" },
    { name: "For pregnancies up to 12 weeks", id: "1efae216aa2d372fa9c545e1330d7abf" },
    { name: "For pregnancies up to 13 weeks", id: "e1fbbf7c20e83dddf3472ef0b47aee3b" }
];

const ages_served_options = [
    { name: "All ages served", id: "03c7c0ace395d80182db07ae2c30f034" },
    { name: "Ages 16+ served", id: "fc490ca45c00b1249bbe3554a4fdf6fb" },
    { name: "Ages 18+ served", id: "3416a75f4cea9109507cacd8e2f2aefc" }
];

const financial_assistance_options = [
    { name: "Financial aid available", id: "a1d0c6e83f027327d8461063f4ac58a6" },
    { name: "Financial aid may be available", id: "853ae90f0351324bd73ea615e6487517" }
];

const show_potential_risk_options = [
    { name: "Potential Legal Risk", id: "d82c8d1619ad8176d665453cfb2e55f0" },
    { name: "Potential Medical Risk", id: "d645920e395fedad7bbbed0eca3fe2e0" }
];

const providerOrder = [
    "us_based_telehealth",
    "international_telehealth",
    "websites_that_sell_pills",
    "community_networks",
];

const counter = {
    us_based_telehealth: {
        showing: 0,
        total: 0
    },
    international_telehealth: {
        showing: 0,
        total: 0
    },
    websites_that_sell_pills: {
        showing: 0,
        total: 0
    },
    community_networks: {
        showing: 0,
        total: 0
    },
    all: {
        showing: 0,
        total: 0
    },
};

// Export to both global namespace and module system
if (typeof window !== 'undefined') {
    // Add to shared data namespace
    window.planCSharedData = window.planCSharedData || {};
    window.planCSharedData.ITEMS_INCREMENT = ITEMS_INCREMENT;
    window.planCSharedData.gestational_age_options = gestational_age_options;
    window.planCSharedData.ages_served_options = ages_served_options;
    window.planCSharedData.financial_assistance_options = financial_assistance_options;
    window.planCSharedData.show_potential_risk_options = show_potential_risk_options;
    window.planCSharedData.providerOrder = providerOrder;
    window.planCSharedData.counter = counter;
    
    // Also add to window for backward compatibility
    window.ITEMS_INCREMENT = ITEMS_INCREMENT;
    window.gestational_age_options = gestational_age_options;
    window.ages_served_options = ages_served_options;
    window.financial_assistance_options = financial_assistance_options;
    window.show_potential_risk_options = show_potential_risk_options;
    window.providerOrder = providerOrder;
    window.counter = counter;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ITEMS_INCREMENT,
        gestational_age_options,
        ages_served_options,
        financial_assistance_options,
        show_potential_risk_options,
        providerOrder,
        counter
    };
} 