const { execSync } = require('child_process');

module.exports = {
  branches: ['ci-enhancements','develop'],
  repositoryUrl: 'https://github.com/DevTopocart/apontador-horas',
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
        'assets': ['package.json', 'src-tauri/tauri.conf.json'],
        'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: () => {
          const newVersion = require('./package.json').version;
          const command = `npx json -I -f src-tauri/tauri.conf.json -e "this.package.version='${newVersion}'"`;
          execSync(command);
        }
      }
    ]
  ]
};
