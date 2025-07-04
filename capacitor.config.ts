import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'flexi-dev',
  webDir: 'www',
  server: {
    url: 'https://restaurant-pos-three.vercel.app',
    cleartext: true
  }
};

export default config;
