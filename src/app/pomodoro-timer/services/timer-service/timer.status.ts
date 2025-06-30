export const phaseStatus = {
    WORK: 'WORK',
    SHORT_BREAK: 'SHORT BREAK',
    LONG_BREAK: 'LONG BREAK',
}
export type PhaseStatus = typeof phaseStatus[keyof typeof phaseStatus];


export const runningStatus = {
    STARTED: 'STARTED',
    PAUSED: 'PAUSED',
    STOPPED: 'STOPPED',
}
export type RunningStatus = typeof runningStatus[keyof typeof runningStatus];
