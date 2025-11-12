import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@/server/routers/_app';

/**
 * Create a typed tRPC React client
 * This gives you full TypeScript autocomplete and type checking
 * when calling your API from the frontend
 */
export const trpc = createTRPCReact<AppRouter>();
