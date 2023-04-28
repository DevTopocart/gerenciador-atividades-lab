const { execSync } = require('child_process');

module.exports = {
  branches: ['technical/ci-enhancements'],
  repositoryUrl: 'https://github.com/paschendale/webgis-itabirito',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    [
      '@semantic-release/git', {
        'assets': ['app/package.json', 'src-tauri/tauri.conf.json'],
        'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: () => {
          const version = require('./src-tauri/tauri.conf.json').package.version;
          const newVersion = semanticRelease.getNextVersion(version, 'minor');
          const command = `npx json -I -f src-tauri/tauri.conf.json -e "this.package.version='${newVersion}'"`;
          execSync(command);
        }
      }
    ]
  ],
  pkgRoot: 'app'
};
