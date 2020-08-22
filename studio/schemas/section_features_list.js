export default {
    "type": "object",
    "name": "section_features_list",
    "title": "Section Features List",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "validation": null
        },
        {
            "type": "markdown",
            "name": "content",
            "title": "Content",
            "description": "The text content of the feature.",
            "validation": null
        },
        {
            "type": "image",
            "name": "image",
            "title": "Image",
            "description": "The image of the feature.",
            "validation": null
        },
        {
            "type": "array",
            "name": "actions",
            "title": "Action Buttons",
            "validation": null,
            "of": [
                {
                    "type": "action"
                }
            ]
        }
    ],
    "preview": {
        "select": {
            "title": "title"
        }
    }
}