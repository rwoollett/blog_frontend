import { PrismaClient } from '@prisma/client';
import { RabbitWrapper } from './lib/rabbitWrapper';


declare global {
  var prisma: PrismaClient | undefined;
  var rabbitWrapper: RabbitWrapper | undefined;
}

export type StatusError = {
  message: string;
}

export interface StatusErrors {
  data?: {
    errors: StatusError[]; 
  }
  status?: string; 
  error?: string;
} 
