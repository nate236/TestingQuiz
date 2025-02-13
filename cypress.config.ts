import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    // configure component testing, including the dev server settings if needed
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000', // adjust based on your app's running port
    supportFile: false,
  },
})
