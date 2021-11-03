/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
const exec = require('child_process').execSync;  
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('before:run', async (details) => {  
    console.log('override before:run');  
    await beforeRunHook(details);  
    //If you are using other than Windows remove below two lines  
    await exec("rimraf cypress/reports")  
  });

  on('after:run', async () => {  
    console.log('override after:run');  
    //if you are using other than Windows remove below line starts with await exec  
    await exec("npx jrm ./test-results.xml ./cypress/reports/junit/*.xml");  
    await afterRunHook();
  });  
};
