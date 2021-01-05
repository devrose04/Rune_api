import { JsonPrimitive } from './JsonPrimitive';

export type Json = JsonPrimitive | Json[] | { [key: string]: Json };
