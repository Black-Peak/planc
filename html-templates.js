/**
 * This file contains HTML templates used by the application.
 * Extracting these templates helps keep the main logic files cleaner.
 */

// Create a global namespace for HTML templates
window.planCTemplates = window.planCTemplates || {};

// HTML templates for filter components
window.planCTemplates.filterComponents = `
<div class="text-weight-bold">Accepts Medicaid:</div>
<div fs-cmsfilter-field="accepts-medicaid" class="w-embed"></div>
</div>
<div class="filters_key-words-embed-wrapper">
  <div class="text-weight-bold">Speak Espanol:</div>
  <div fs-cmsfilter-field="habla-esp" class="w-embed"></div>
</div>
<div class="filters_key-words-embed-wrapper">
  <div class="text-weight-bold">Speak Hindi:</div>
  <div fs-cmsfilter-field="speak-hindi" class="w-embed"></div>
</div>
<div class="filters_key-words-embed-wrapper">
  <div class="text-weight-bold">Video Required:</div>
  <div fs-cmsfilter-field="video" class="w-embed"></div>
</div>
<div class="filters_key-words-embed-wrapper">
  <div class="text-weight-bold">Discount:</div>
  <div fs-cmsfilter-field="discount" class="w-embed"></div>
</div>
<div class="filters_key-words-embed-wrapper">
  <div class="text-weight-bold">Discount:</div>
  <div fs-cmsfilter-field="security" class="w-embed"></div>
</div>
</div>
</div>
`;

// Back to Top button template
window.planCTemplates.backToTopButton = `
<div class="states_result_load-more" id="backToTopBtn">
  <div class="button-icon size-16 w-embed">
    <!-- SVG icon could go here -->
  </div>
  <div class="button-text">back to top of list</div>
</div>
`;

// Export function to get templates
window.planCTemplates.getTemplate = function(templateName) {
  return window.planCTemplates[templateName] || '';
}; 