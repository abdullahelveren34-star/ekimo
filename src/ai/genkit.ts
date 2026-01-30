import { configureGenkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const geminiPro = googleAI.model('gemini-pro');

configureGenkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
