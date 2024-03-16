import { Store } from 'pinia';
import { RouteLocationNormalized, Router } from 'vue-router';
import { SettingsState } from 'stores/settings';
import { SessionState } from 'stores/session';

export function registerGuard(
  router: Router,
  settingsStore: Store<'settings', SettingsState>,
  sessionStore: Store<'session', SessionState>
) {
  router.beforeEach(
    async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      // If application is not configured, redirect to /initialize
      if (to.meta.requiresConf && !isInitSettingsConfigured(settingsStore)) {
        console.log('Redirecting to /initialize');
        return '/initialize';
      }
      // If user is not authenticated, redirect to /login
      else if (
        to.meta.requiresAuth &&
        !sessionStore.customerNumber
      ) {
        console.log('Redirecting to /login');
        return '/login';
      }
      // If application is already configured and page requires it, redirect to /
      else if (to.meta.requiresNew && isInitSettingsConfigured(settingsStore)) {
        console.log('Redirecting to /');
        return '/';
      }
      return true;
    }
  );
}

function isInitSettingsConfigured(settings: SettingsState) {
  return settings.configured && settings.url && settings.apiKey;
}
