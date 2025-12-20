export const PWA_CONSTANTS = {
  MANIFEST_PATH: '/pwa/manifest.json',
  SERVICE_WORKER_PATH: '/pwa/sw.js',
  ICONS: {
    SMALL: '/pwa/pwa-192.png',
    LARGE: '/pwa/pwa-512.png',
  },
  BACKGROUND_COLOR: '#2d3134',
  APP_NAME: 'DailyRoutine Learn',
  APP_SHORT_NAME: 'DR Learn',
  APP_DESCRIPTION: 'Мобильно-ориентированная читалка с поддержкой Markdown',
  LANG: 'ru',
  CATEGORIES: ['education', 'utilities'],
  CACHE_NAME_PREFIX: 'daily-routine-learn',
  CACHE_VERSION: 'v1',
} as const
