const Encore = require("@symfony/webpack-encore")

Encore
    .setOutputPath("public/build")
    .setPublicPath("/build")
    .addEntry("popup", "./assets/js/popup/index.tsx")
    .addEntry("option", "./assets/js/option/index.tsx")
    .addEntry("background", "./assets/js/content-scripts/background.ts")
    .addEntry("content-scripts", "./assets/js/content-scripts/content-scripts.ts")
    .enableReactPreset()
    .enableTypeScriptLoader()
    .enableSassLoader()
    .disableSingleRuntimeChunk()

module.exports = Encore.getWebpackConfig()