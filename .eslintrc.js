module.exports = {
    "extends": "airbnb",
    "settings": {
        // These packages are provided 'magically' by Gatsby
        'import/core-modules': ['react', 'config'],
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-quotes": [2, "prefer-single"],
        "no-console": "off",
        "react/require-default-props": "off",
        "react/no-array-index-key": "off",
        "react/prop-types": "off",
        "class-methods-use-this": "off"
    },
    "env": {
        "browser": true,
        "es6": true,
    }
};