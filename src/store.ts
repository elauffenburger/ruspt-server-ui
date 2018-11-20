import Vue from 'vue';
import Vuex, { Action, StoreOptions, Store } from 'vuex';
import { SubmitRusptCodeRequest, HistoryEntry, SubmitRusptCodeResponse } from './models';
import { RusptServerService, ApiRusptServerService, MockRusptServerService } from './services/ruspt-server-service';

Vue.use(Vuex);

interface AppStoreServices {
  rusptServerService: RusptServerService;
}

const SERVICES: AppStoreServices = {
  rusptServerService: new MockRusptServerService(),
};

export interface AppState {
  sandbox: SandboxState;
}

export interface SandboxState {
  lastCodeSubmission: SubmitRusptCodeResponse | null;
  codeSubmissionHistory: HistoryEntry[];
}

const store = new Store({
  modules: {
    sandbox: {
      namespaced: true,
      state: ((): SandboxState => {
        return {
          lastCodeSubmission: null,
          codeSubmissionHistory: [],
        };
      })(),
      getters: {
        history: ({ codeSubmissionHistory }) => {
          return codeSubmissionHistory;
        },
      },
      mutations: {
        newCodeSubmission(state: SandboxState, submission: SubmitRusptCodeResponse) {
          state.lastCodeSubmission = submission;
        },
        newHistoryEntry(state, history: HistoryEntry) {
          state.codeSubmissionHistory.push(history);
        },
      },
      actions: {
        async submitCode({ commit }, code: string) {
          console.log('[submitCode]: received request: %O', code);

          const request: SubmitRusptCodeRequest = { code };

          const response = await SERVICES.rusptServerService.submitCode(request);
          commit('newCodeSubmission', response);

          const history: HistoryEntry = {
            input: request.code,
            output: response.output,
            success: response.success,
          };

          commit('newHistoryEntry', history);
        },
      },
    },
  },
});

export default store;
