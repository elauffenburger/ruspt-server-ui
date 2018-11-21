import Vue from 'vue';
import Vuex, { Action, StoreOptions, Store } from 'vuex';
import { SubmitRusptCodeRequest, HistoryEntry, SubmitRusptCodeResponse } from './models';
import { RusptServerService, ApiRusptServerService, MockRusptServerService } from './services/ruspt-server-service';
import env from '@/env';

Vue.use(Vuex);

export interface AppState {
  sandbox: SandboxState;
}

export interface SandboxState {
  lastCodeSubmission: SubmitRusptCodeResponse | null;
  codeSubmissionHistory: HistoryEntry[];
}

interface AppStoreServices {
  rusptServerService: RusptServerService;
}

const SERVICES: AppStoreServices = {
  rusptServerService: new ApiRusptServerService(env.rusptServerAddress),
};

function saveHistory(history: HistoryEntry[]) {
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
        historyStack: (state: SandboxState) => {
          const history = state.codeSubmissionHistory;

          // reduce right -> left to produce a stack
          return history.reduceRight((acc, entry) => {
            acc.push(entry);

            return acc;
          }, [] as HistoryEntry[]);
        },
      },
      mutations: {
        newCodeSubmission(state: SandboxState, submission: SubmitRusptCodeResponse) {
          state.lastCodeSubmission = submission;
        },
        newHistoryEntry(state, history: HistoryEntry) {
          state.codeSubmissionHistory.push(history);

          saveHistory(state.codeSubmissionHistory);
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
