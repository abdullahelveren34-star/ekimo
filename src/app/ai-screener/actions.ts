'use server';

import { aiResumeScreening, AIResumeScreeningInput } from '@/ai/flows/ai-resume-screening';

export async function screenResume(input: AIResumeScreeningInput) {
  try {
    const output = await aiResumeScreening(input);
    return { success: true, data: output };
  } catch (error) {
    console.error('AI resume screening failed:', error);
    return { success: false, error: 'AI taraması sırasında bir hata oluştu.' };
  }
}
