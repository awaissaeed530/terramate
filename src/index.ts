import { callModel, OpenRouter, tool } from '@openrouter/agent';
import { z } from 'zod';

const client = new OpenRouter()

const weatherTool = tool({
    name: 'get_weather',
    description: 'Get the current weather for a location',
    inputSchema: z.object({
        location: z.string().describe('City name'),
    }),
    execute: async ({ location }) => {
        return { temperature: 72, condition: 'sunny', location };
    },
});

const result = callModel(client, {
    model: 'openrouter/free',
    input: 'What is the weather in San Francisco?',
    tools: [weatherTool],
});

const text = await result.getText();
console.log(text);