const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@src": path.resolve(__dirname, "src/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@lang": path.resolve(__dirname, "src/lang/"),
      "@interfaces": path.resolve(__dirname, "src/interfaces/"),
      "@services": path.resolve(__dirname, "src/services/"),
    },
  },
};
