export default {
    "type": "object",
    "name": "header",
    "title": "Header Configuration",
    "validation": null,
    "fields": [
      {
        "type": "string",
        "name": "title",
        "title": "Header Title",
        "description": "The title displayed in the header if no logo image added.",
        "validation": null
      },
      {
        "type": "image",
        "name": "logo_img",
        "title": "Logo",
        "description": "The logo image displayed in the header.",
        "validation": null
      },
      {
        "type": "boolean",
        "name": "has_nav",
        "title": "Enable Navigation Menu",
        "description": "Display the navigation menu bar in the header.",
        "initialValue": true,
        "validation": null
      },
      {
        "type": "array",
        "name": "actions",
        "title": "Action Buttons",
        "description": "The action buttons displayed in the menu.",
        "validation": null,
        "of": [{"type": "action"}]
      }
    ]
  }