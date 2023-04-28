const { execSync } = require('child_process');

const newVersion = require('./package.json').version;
const command = `npx json -I -f src-tauri/tauri.conf.json -e "this.package.version='${newVersion}'"`;
execSync(command);
