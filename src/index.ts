import { LlmAgent, GOOGLE_SEARCH } from '@google/adk';

const agent = new LlmAgent({
    name: 'researcher',
    model: 'gemini-flash-latest',
    instruction: 'You help users research topics thoroughly.',
    tools: [GOOGLE_SEARCH],
});
