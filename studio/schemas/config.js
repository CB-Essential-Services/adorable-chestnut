export default {
    "type": "document",
    "name": "config",
    "title": "Global Site Config",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "description": "Site title",
            "validation": Rule => Rule.required()
        },
        {
            "type": "string",
            "name": "palette",
            "title": "Color Palette",
            "description": "The color palette of the theme.",
            "initialValue": "blue",
            "validation": null,
            "options": {
                "list": [
                    "blue",
                    "purple",
                    "green",
                    "orange"
                ]
            }
        },
        {
            "type": "header",
            "name": "header",
            "title": "Header Config",
          },
          {
            "type": "menu",
            "name": "menu",
            "title": "Menu Action Buttons",
          },
          {
            "type": "footer",
            "name": "footer",
            "title": "Footer Config",
          },
        {
            "type": "string",
            "name": "stackbit_file_path",
            "title": "Config File Path",
            "description": "The file path of the configuration file",
            "hidden": false,
            "validation": Rule => Rule.required(),
            "options": {
                "list": [
                    "site-metadata.json"
                ]
            }
        },
        {
            "type": "string",
            "name": "stackbit_model_type",
            "title": "Stackbit Model Type",
            "description": "Stackbit model type",
            "hidden": false,
            "validation": Rule => Rule.required(),
            "options": {
                "list": [
                    "config"
                ]
            }
        }
    ],
    "singleInstance": true
}