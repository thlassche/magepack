const glob = require('glob');
const fs = require('fs');
const path = require('path');

/**
 * Returns a list of deployed frontend locales paths excluding Magento blank theme.
 *
 * @returns {string[]}
 */
const getLocales = (
    localesGlobPattern = '{pub/static/frontend/*/*/*,pub/static/adminhtml/*/*/*}'
) => {
    const locales = glob
        .sync(localesGlobPattern)
        .filter((locale) => !locale.includes('Magento/blank'))
        .filter(
            (locale) =>
                fs.existsSync(path.join(locale, 'requirejs-config.min.js')) ||
                fs.existsSync(path.join(locale, 'requirejs-config.js'))
        );

    if (!locales.length) {
        throw new Error(
            'No locales found! Make sure magepack is running after static content is deployed.'
        );
    }

    return locales;
};

module.exports = getLocales;
