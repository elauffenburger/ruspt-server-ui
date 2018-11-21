import { Module } from 'vuex';
import { SubmitRusptCodeResponse, HistoryEntry, SubmitRusptCodeRequest } from '@/models';
import { Logger } from 'winston';
import { RusptServerService } from '@/services/ruspt-server-service';
import { AppState } from '..';

export interface SandboxState {
    lastCodeSubmission: SubmitRusptCodeResponse | null;
    codeSubmissionHistory: HistoryEntry[];
}

export interface SandboxModuleConfig {
    services: {
        logger: Logger,
        rusptServerService: RusptServerService
    };
}

export const MUTATIONS = {
    NEW_CODE_SUBMISSION: 'newCodeSubmission',
    NEW_HISTORY_ENTRY: 'newHistoryEntry',
    CLEAR_HISTORY: 'clearHistory'
};

export const ACTIONS = {
    SUBMIT_CODE: 'submitCode',
    CLEAR_HISTORY: 'clearHistory'
};

export const GETTERS = {
    HISTORY_STACK: 'historyStack'
};

const HISTORY_STORAGE_KEY = '_history';

export function makeModule(config: SandboxModuleConfig): Module<SandboxState, AppState> {
    const { services } = config;
    const { logger, rusptServerService } = services;

    return {
        namespaced: true,
        state: {
            lastCodeSubmission: null,
            codeSubmissionHistory: loadSavedHistory(),
        },
        getters: {
            [GETTERS.HISTORY_STACK]: state => {
                const history = state.codeSubmissionHistory;

                // reduce right -> left to produce a stack
                return history.reduceRight((acc, entry) => {
                    acc.push(entry);

                    return acc;
                }, [] as HistoryEntry[]);
            },
        },
        mutations: {
            [MUTATIONS.NEW_CODE_SUBMISSION](state, submission: SubmitRusptCodeResponse) {
                state.lastCodeSubmission = submission;
            },
            [MUTATIONS.NEW_HISTORY_ENTRY](state, history: HistoryEntry) {
                state.codeSubmissionHistory.push(history);

                saveHistory(state.codeSubmissionHistory);
            },
            [MUTATIONS.CLEAR_HISTORY](state) {
                state.codeSubmissionHistory = [];

                saveHistory([]);
            }
        },
        actions: {
            async [ACTIONS.SUBMIT_CODE]({ commit }, code: string) {
                logger.log('[submitCode]: received request: %O', code);

                const request: SubmitRusptCodeRequest = { code };

                const response = await rusptServerService.submitCode(request);
                commit(MUTATIONS.NEW_CODE_SUBMISSION, response);

                const history: HistoryEntry = {
                    input: request.code,
                    output: response.output,
                    success: response.success,
                };

                commit(MUTATIONS.NEW_HISTORY_ENTRY, history);
            },
            [ACTIONS.CLEAR_HISTORY]({ commit }) {
                commit(MUTATIONS.CLEAR_HISTORY);
            },
        },
    };

    function saveHistory(history: HistoryEntry[]) {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    }

    function loadSavedHistory(): HistoryEntry[] {
        return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '[]');
    }
}