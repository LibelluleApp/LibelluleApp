module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver", {
        alias: {
          "@Components": "./components",
          "@Api": "./api",
          "@Utils": "./utils"
        },
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ]
      }
      ]
    ]
  };
};