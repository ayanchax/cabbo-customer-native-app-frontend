/* global __dirname */
const { loadEnvFile } = require('node:process');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const [environment, ...args] = process.argv.slice(2);
if (!['local', 'dev', 'prod'].includes(environment)) {
  console.error('Usage: node scripts/expo-env.cjs <local|dev|prod> [android|ios] [expo command] [options]');
  process.exit(1);
}

const platform = ['android', 'ios'].includes(args[0]) ? args.shift() : undefined;
if (args.length === 0 || args[0].startsWith('-')) args.unshift('start');
if (platform) {
  if (args[0] === 'start') {
    args.splice(1, 0, `--${platform}`);
  } else if (args[0] === 'export') {
    args.splice(1, 0, '--platform', platform);
  } else {
    console.error('Platform shortcuts support start and export. For other Expo commands, omit the platform shortcut.');
    process.exit(1);
  }
}
console.log(`Running Expo CLI in ${environment} environment: expo ${args.join(' ')}`);

const root = path.resolve(__dirname, '..');
// Prevent inherited public settings from mixing with the selected environment.
for (const key of Object.keys(process.env)) {
  if (key.startsWith('EXPO_PUBLIC_')) delete process.env[key];
}
loadEnvFile(path.join(root, `.env.${environment}`));
process.env.EXPO_NO_DOTENV = '1';

const expoCli = path.join(path.dirname(require.resolve('expo/package.json')), 'bin', 'cli');
// Start the Expo CLI with the selected environment and arguments.
const result = spawnSync(process.execPath, [expoCli, ...args], {
  cwd: root,
  env: process.env,
  stdio: 'inherit',
});
if (result.error) {
  console.error(result.error.message);
}
process.exit(result.status ?? 1);
