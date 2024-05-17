const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'cypress/reports/junit/test-results-[hash].xml',
      toConsole : true
    },
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
