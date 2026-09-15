// Tailwind v4 通过 PostCSS 插件接入，配置写在 CSS 里（见 src/app/globals.css）。
// 不再需要 tailwind.config.js。
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
