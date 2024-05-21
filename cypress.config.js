const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'w9vq3a',
  e2e: {
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'cypress/reports/junit/test-results-[hash].xml',
      toConsole : true
    },
    video: true,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
