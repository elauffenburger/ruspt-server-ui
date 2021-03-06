import { SubmitRusptCodeResponse, SubmitRusptCodeRequest, HistoryEntry } from '@/models';
import { Logger } from 'winston';

export interface RusptServerService {
    submitCode(request: SubmitRusptCodeRequest): Promise<SubmitRusptCodeResponse>;
}

export class ApiRusptServerService implements RusptServerService {
    constructor(private apiUrl: string, private logger: Logger) { }

    public async submitCode(request: SubmitRusptCodeRequest): Promise<SubmitRusptCodeResponse> {
        try {
            const response = await fetch(`${this.apiUrl}/submit-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            });

            return (await response.json()) as SubmitRusptCodeResponse;
        } catch (e) {
            this.logger.error('Something went wrong while attempting to submit code to ruspt server: %O', e);

            throw e;
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
export class MockRusptServerService implements RusptServerService {
    private static FAKE_RESPONSES: SubmitRusptCodeResponse[] = [
        {
            success: true,
            output: `4`,
        },
        {
            success: false,
            output: `Error: symbol defn undefined (this is totally made-up -- I don't know what it would say here!)`,
        },
    ];

    private requestCount = 0;

    constructor(private logger: Logger) { }

    public submitCode(request: SubmitRusptCodeRequest): Promise<SubmitRusptCodeResponse> {
        this.logger.info('Received request: %O', request);

        const responses = MockRusptServerService.FAKE_RESPONSES;

        return Promise.resolve(responses[this.requestCount++ % responses.length]);
    }
}
