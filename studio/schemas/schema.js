// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import user defined schema types
import config from './config.js';
import header from './header.js';
import social from './social.js';
import author from './author.js';
import landing from './landing.js';
import blog from './blog.js';
import page from './page.js';
import post from './post.js';
import menu from './menu.js';
import footer from './footer.js';
import youtube from './youtube.js';
import foot_link_props from './foot_link_props';
import social_link_props from './social_link_props';
import section_content from './section_content.js';
import section_cta from './section_cta.js';
import section_faq from './section_faq.js';
import section_faq_props from './section_faq_props.js';
import section_features from './section_features.js';
import section_features_list from './section_features_list.js';
import section_hero from './section_hero.js';
import section_posts from './section_posts.js';
import section_pricing from './section_pricing.js';
import section_pricing_plans from './section_pricing_plans.js';
import section_reviews from './section_reviews.js';
import section_reviews_props from './section_reviews_props.js';
import section_contact from './section_contact.js';
import action from './action.js';
import site_menus from './site_menus.js';
import site_menu_item from './site_menu_item.js';
import page_menus from './page_menus.js';
import page_menu_item from './page_menu_item.js';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    config,
    social,
    author,
    landing,
    blog,
    header,
    menu,
    footer,
    youtube,
    foot_link_props,
    social_link_props,
    page,
    post,
    section_content,
    section_cta,
    section_faq,
    section_faq_props,
    section_features,
    section_features_list,
    section_hero,
    section_posts,
    section_pricing,
    section_pricing_plans,
    section_reviews,
    section_reviews_props,
    section_contact,
    action,
    site_menus,
    site_menu_item,
    page_menus,
    page_menu_item
    ])
})
