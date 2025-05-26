//import { defineConfig } from "vite";
//import tailwindcss from "@tailwindcss/vite";
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// });
// module.exports = { 
//   plugins: [
//     'postcss-import',
//     'tailwindcss/nesting',
//     'tailwindcss',
//     'autoprefixer',
//   ] 
//   }
/*module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
  };*/

  module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
  };