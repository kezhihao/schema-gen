import { z } from 'zod';

export const SchemaSchema = z.object({
    name: z.string(),
    age: z.number(),
    active: z.boolean(),
});

export type Schema = z.infer<typeof SchemaSchema>;