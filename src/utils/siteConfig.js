const config = require(`../../.ghost.json`).production;
module.exports = {
    siteUrl:
        process.env.NODE_ENV === `production`
            ? process.env.SITE_URL || config.siteUrl || `http://ssks-ss.com`
            : `http://localhost:2368`, // Site domain. Do not include a trailing slash!

    postsPerPage: 4, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

    siteTitleMeta: `*新機能搭載`, // This allows an alternative site title for meta data for pages.
    siteDescriptionMeta: `新機能を搭載しています`, // This allows an alternative site description for meta data for pages.

    shareImageWidth: 1000, // Change to the width of your default share image
    shareImageHeight: 523, // Change to the height of your default share image

    shortTitle: `ssks-ss.com`, // Used for App manifest e.g. Mobile Home Screen
    siteIcon: `favicon.png`, // Logo in /static dir used for SEO, RSS, and App manifest
    backgroundColor: `#e9e9e9`, // Used for Offline Manifest
    themeColor: `#15171A`, // Used for Offline Manifest
};
