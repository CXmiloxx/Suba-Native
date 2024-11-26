    const { getDefaultConfig } = require("expo/metro-config");

    module.exports = (() => {
    const config = getDefaultConfig(__dirname);

    config.resolver.assetExts = config.resolver.assetExts.filter(
        (ext) => ext !== "svg"
    );

    config.resolver.sourceExts = [
        ...config.resolver.sourceExts,
        "svg",
        "js",
        "jsx",
        "ts",
        "tsx",
    ];
    config.transformer = {
        ...config.transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
    };

    return config;
    })();
