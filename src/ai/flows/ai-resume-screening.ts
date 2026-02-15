'use server';

/**
 * @fileOverview AI-powered resume screening flow.
 *
 * This flow screens candidate resumes based on keywords and job requirements to identify qualified candidates.
 *
 * @function aiResumeScreening - Screens a resume and highlights key qualifications.
 * @typedef {Object} AIResumeScreeningInput - The input type for the aiResumeScreening function.
 * @typedef {Object} AIResumeScreeningOutput - The return type for the aiResumeScreening function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AIResumeScreeningInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be screened.'),
  jobDescription: z
    .string()
    .describe('The description of the job requirements.'),
  keywords: z
    .string()
    .describe(
      'Comma-separated keywords that are important for the job (e.g., React, Node.js, TypeScript).'
    ),
});

export type AIResumeScreeningInput = z.infer<typeof AIResumeScreeningInputSchema>;

const AIResumeScreeningOutputSchema = z.object({
  suitabilityScore: z
    .number()
    .describe(
      'A score (0-100) indicating how well the candidate matches the job requirements.'
    ),
  keyQualifications: z
    .string()
    .describe(
      'A summary of the candidate’s key qualifications and experiences relevant to the job description and keywords.'
    ),
  feedback: z
    .string()
    .describe(
      'Constructive feedback on the resume, including areas for improvement and missing skills or experiences.'
    ),
});

export type AIResumeScreeningOutput = z.infer<typeof AIResumeScreeningOutputSchema>;

export async function aiResumeScreening(input: AIResumeScreeningInput): Promise<AIResumeScreeningOutput> {
  return aiResumeScreeningFlow(input);
}

const aiResumeScreeningFlow = ai.defineFlow(
  {
    name: 'aiResumeScreeningFlow',
    inputSchema: AIResumeScreeningInputSchema,
    outputSchema: AIResumeScreeningOutputSchema,
  },
  async (input) => {
    const prompt = `You are an AI resume screening tool that analyzes resumes based on job descriptions and keywords.

  Job Description: ${input.jobDescription}
  Keywords: ${input.keywords}
  Resume:
  ${input.resumeText || 'No resume text provided.'}

  Based on the job description, keywords, and resume, provide the following:
  1. Suitability Score (0-100): A numerical score indicating how well the candidate matches the job requirements.
  2. Key Qualifications: A summary of the candidate’s key qualifications and experiences relevant to the job description and keywords.
  3. Feedback: Constructive feedback on the resume, including areas for improvement and any missing skills or experiences.

  Ensure that the Suitability Score is between 0 and 100, and the Key Qualifications and Feedback are concise and relevant to the job requirements and keywords.
`;

    const response = await ai.generate({
      model: 'googleai/gemini-pro',
      prompt: prompt,
      output: {
        schema: AIResumeScreeningOutputSchema,
      },
    });

    return response.output!;
  }
);
