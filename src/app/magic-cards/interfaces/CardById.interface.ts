import {
  ForeignName,
  LegalityElement,
  Rarity,
} from './CardsResponse.internface';

export interface CardById {
  number: string;
  artist: string;
  foreignName: ForeignName[];
  legalities: LegalityElement[];
}

export interface CardAndLanguage {
  number: string;
  artist: string;
  setName: string;
  set: string;
  rarity: Rarity;
  foreignName: ForeignName;
  legalities: LegalityElement[];
}
