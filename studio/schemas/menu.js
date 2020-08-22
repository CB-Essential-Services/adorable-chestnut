export default { 
    "type": "object",
    "name": "menu",
    "title": "Menu Action Buttons",
    "validation": null,
    "fields": [
        {
            "type": "array",
            "name": "actions",
            "title": "Action Buttons",
            "description": "The action buttons displayed in the menu.",
            "validation": null,
            "of": [
                {
                    "type": "action"
                }
            ]
        }
    ]
}