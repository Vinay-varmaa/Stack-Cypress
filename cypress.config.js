const { defineConfig } = require("cypress");
const fs = require("fs"); // Import File System module

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 120000, // Adjust timeout settings as needed

    setupNodeEvents(on, config) {
      // Register the missing task "writeToFixture"
      on("task", {
        writeToFixture({ filename, data }) {
          const filePath = `cypress/fixtures/${filename}`;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Write JSON data into the file
          return null; // Ensure Cypress returns a valid response
        },
      });

      return config; // Cypress requires returning the config object
    }
  }
});
