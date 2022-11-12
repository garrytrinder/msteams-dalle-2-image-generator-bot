/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// read the state file
const stateFile = path.join(__dirname, '../.fx/states/state.local.json');
const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));

// get the site endpoint property
const siteEndpoint = state['fx-resource-bot'].siteEndpoint;

// get the .env.teamsfx.local file
const envFile = path.join(__dirname, '../bot/.env.teamsfx.local');
const env = fs.readFileSync(envFile, 'utf8');

// if SITE_ENDPOINT variable is not already defined, add it, otherwise replace it
if (!env.includes('SITE_ENDPOINT')) {
  fs.appendFileSync(envFile, `SITE_ENDPOINT=${siteEndpoint}`);
} else {
  const newEnv = env.replace(/SITE_ENDPOINT=.*/g, `SITE_ENDPOINT=${siteEndpoint}`);
  fs.writeFileSync(envFile, newEnv);
}
