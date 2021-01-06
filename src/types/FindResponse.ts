import { Rune } from '../db/entity/Rune';

export interface FindResponse {
  count?: number;
  runes: Rune[];
}
