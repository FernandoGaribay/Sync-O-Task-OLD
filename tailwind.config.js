/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,svelte}", './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

