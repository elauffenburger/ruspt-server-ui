import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { SandboxState, makeModule as makeSandboxModule, SandboxModuleConfig } from './modules/sandbox';

Vue.use(Vuex);

export interface AppState {
  sandbox: SandboxState;
}

export interface AppStoreConfig {
  modules: {
    sandbox: SandboxModuleConfig
  }
}

export function makeStore(config: AppStoreConfig): Store<AppState> {
  return new Store({
    modules: {
      sandbox: makeSandboxModule(config.modules.sandbox)
    },
  });
}