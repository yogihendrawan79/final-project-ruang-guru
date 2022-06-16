module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7D3FE6',
        'lulus': '#03AC0E',
        'gagal': '#E51818',
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
