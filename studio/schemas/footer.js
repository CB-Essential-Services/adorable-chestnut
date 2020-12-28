export default {
        "type": "object",
        "name": "footer",
        "title": "Footer Configuration",
        "validation": null,
        "fields": [
            {
                "type": "image",
                "name": "logo_img",
                "title": "Logo",
                "description": "The logo image displayed in the footer.",
                "validation": null
            },
            {
                "type": "string",
                "name": "tagline",
                "title": "Footer Tagline",
                "description": "The tagline displayed in the footer.",
                "validation": null
            },
            {
                "type": "boolean",
                "name": "has_nav",
                "title": "Enable Navigation Menu",
                "description": "Display the secondary navigation menu in the footer.",
                "initialValue": true,
                "validation": null
            },
            {
                "type": "string",
                "name": "nav_title",
                "title": "Menu Title",
                "description": "The title of the secondary menu displayed in the footer.",
                "validation": null
            },
            {
                "type": "boolean",
                "name": "has_social",
                "title": "Enable Social Links",
                "description": "Display social links in the footer.",
                "initialValue": true,
                "validation": null
            },
            {
                "type": "string",
                "name": "social_title",
                "title": "Social Links Title",
                "description": "The title of the social links list displayed in the footer.",
                "validation": null
            },
            {
                "type": "boolean",
                "name": "has_subscribe",
                "title": "Enable Subscribe",
                "description": "Display the newsletter subscription form in the footer.",
                "initialValue": true,
                "validation": null
            },
            {
                "type": "string",
                "name": "subscribe_title",
                "title": "Subscribe Title",
                "description": "The title of the subscribe block displayed in the footer.",
                "validation": null
            },
            {
                "type": "string",
                "name": "subscribe_content",
                "title": "Subscribe Content",
                "description": "The text content in the subscribe block displayed in the footer.",
                "validation": null
            },
            {
                "type": "string",
                "name": "content",
                "title": "Footer Content",
                "description": "The copyright text displayed in the footer.",
                "validation": null
            },
            {
                "type": "array",
                "name": "footer_links",
                "title": "Footer Links",
                "description": "A list of links displayed in the footer.",
                "validation": null,
                "of": [
                    {
                        "type": "foot_link_props",
                        "name": "foot_link_props",
                        "title": "Foot Link Props",
                    }
                ]
            }
        ]
}