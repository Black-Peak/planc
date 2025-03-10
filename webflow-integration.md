# Webflow Integration Instructions

Copy and paste one of the following code snippets into the "Footer Code" section of your Webflow site settings under "Custom Code".

## Option 1: Using Raw GitHub URLs

The code below uses your specific GitHub repository information:

```html
<script>
    // Create global shared data namespace
    window.planCSharedData = window.planCSharedData || {};
</script>

<!-- Load all module files in the correct order -->
<script src="https://raw.githubusercontent.com/Black-Peak/planc/main/js/constants.js"></script>
<script src="https://raw.githubusercontent.com/Black-Peak/planc/main/js/svgIcons.js"></script>
<script src="https://raw.githubusercontent.com/Black-Peak/planc/main/js/utilityFunctions.js"></script>
<script src="https://raw.githubusercontent.com/Black-Peak/planc/main/js/createRow.js"></script>
<script src="https://raw.githubusercontent.com/Black-Peak/planc/main/js/apiOperations.js"></script>
<script src="https://raw.githubusercontent.com/Black-Peak/planc/main/js/domOperations.js"></script>
<script src="https://raw.githubusercontent.com/Black-Peak/planc/main/js/fixLogicJS.js"></script>
<script src="https://raw.githubusercontent.com/Black-Peak/planc/main/main.js"></script>
```

## Option 2: Using JSDelivr (Recommended for Production)

JSDelivr is a free CDN for GitHub projects and provides better performance and reliability.
Use this format for production environments:

```html
<script>
    // Create global shared data namespace
    window.planCSharedData = window.planCSharedData || {};
</script>

<!-- Load all module files in the correct order -->
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/constants.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/svgIcons.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/utilityFunctions.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/createRow.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/apiOperations.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/domOperations.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/fixLogicJS.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/main.js"></script>
```

## Important HTML Structure Requirements

Ensure your Webflow page includes at least these key HTML elements with the exact class names:

```html
<h1 class="states_info_h1">Provider Results</h1>
<h2 class="states_info_h1 is-main">0 Results</h2>
<div class="states_info_text hide-mobile-landscape">
    Showing <span class="states_info_text is-grey">0 of 0 Results</span>
</div>

<!-- This element is required for displaying results -->
<div class="states_result_component-wrapper is-main">
    <div class="states_result_component"></div>
</div>
```

The application also expects filter elements like:
- Select dropdown with id "Sort-by-4"
- Select dropdown with id "filters_location_dropdown"
- Select dropdown with id "Need-6"
- Select dropdown with id "Language"
- Checkbox filters with specific ids (like "accepts_insurance", "extra_misoprostol", etc.)

If any of these elements are missing, you may need to adjust the JavaScript to match your Webflow structure. 

<script>
    // Create global shared data namespace
    window.planCSharedData = window.planCSharedData || {};
</script>

<!-- Load all module files in the correct order -->
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/constants.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/svgIcons.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/utilityFunctions.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/createRow.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/apiOperations.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/domOperations.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/js/fixLogicJS.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Black-Peak/planc@main/main.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-queryparam@1/queryparam.js"></script> 