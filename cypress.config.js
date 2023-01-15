const { defineConfig } = require("cypress");

const {
  beforeRunHook,
  afterRunHook,
} = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    embeddedScreenshots: true,
    quiet: true,
    saveAllAttempts: false,
    video: true,
  },
  viewportHeight: 550,
  viewportWidth: 660,
  projectId: "iyjif9",
  defaultCommandTimeout: 8000,
  e2e: {
    setupNodeEvents(on, config) {
      on("before:run", async (details) => {
        console.log("override before:run");
        await beforeRunHook(details);
      });

      on("after:run", async () => {
        console.log("override after:run");
        await afterRunHook();
      });
      require("cypress-mochawesome-reporter/plugin")(on);
      on("task", {});

      // implement node event listeners here
    },

    // experimentalFetchPolyfill: true,
    // experimentalInteractiveRunEvents: true,
    // experimentalRunAllSpecs: true,
    // experimentalStudio: true,
    // experimentalWebKitSupport: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 12000,
    pageLoadTimeout: 150000,
    baseUrl: "https://www.founderandlightning.com",
    specPattern: "cypress/integration/Test/*.js",
    env: {
      test_url: "/contact",
    },
  },
});
