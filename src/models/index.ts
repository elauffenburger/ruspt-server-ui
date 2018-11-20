export interface HistoryEntry {
    success: boolean;
    input: string;
    output: string;
}

export interface SubmitRusptCodeRequest {
    code: string;
}

export interface SubmitRusptCodeResponse {
    success: boolean;
    output: string;
}
