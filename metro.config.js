const extraNodeModules = require("node-libs-browser");
// expo v41:
// remove the @ (see: https://blog.expo.io/expo-sdk-41-12cc5232f2ef)
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      assetPlugins: ["expo-asset/tools/hashAssetFiles"],
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      extraNodeModules,
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();
