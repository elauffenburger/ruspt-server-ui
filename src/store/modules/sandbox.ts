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
    }
}

export const MUTATIONS = {
    NEW_CODE_SUBMISSION: 'newCodeSubmission',
    NEW_HISTORY_ENTRY: 'newHistoryEntry'
}

export function makeModule(config: SandboxModuleConfig): Module<SandboxState, AppState> {
    const { services } = config;
    const { logger, rusptServerService } = services;

    return {
        namespaced: true,
        state: {
            lastCodeSubmission: null,
            codeSubmissionHistory: [],
        },
        getters: {
            historyStack: state => {
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
        },
        actions: {
            async submitCode({ commit }, code: string) {
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
        },
    };

    function saveHistory(history: HistoryEntry[]) {

    }
}