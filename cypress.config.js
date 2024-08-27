const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://afg-machinery.com',
    viewportWidth: 1440,
    viewportHeight: 700,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
