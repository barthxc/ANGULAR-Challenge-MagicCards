export interface CardsResponse {
  cards: Card[];
}

export interface Card {
  name: string;
  manaCost: string;
  cmc: number;
  colors: Color[];
  colorIdentity: Color[];
  type: string;
  types: Type[];
  subtypes?: string[];
  rarity: Rarity;
  set: Set;
  setName: SetName;
  text: string;
  artist: string;
  number: string;
  power?: string;
  toughness?: string;
  layout: Layout;
  multiverseid?: string;
  imageUrl?: string;
  variations?: string[];
  foreignNames?: ForeignName[];
  printings: string[];
  originalText?: string;
  originalType?: string;
  legalities: LegalityElement[];
  id: string;
  flavor?: string;
  rulings?: Ruling[];
  supertypes?: Supertype[];
}

export enum Color {
  U = 'U',
  W = 'W',
}

export interface ForeignName {
  name: string;
  text: string;
  type: string;
  flavor: null | string;
  imageUrl: string;
  language: Language;
  identifiers: Identifiers;
  multiverseid: number;
}

export interface Identifiers {
  scryfallId: string;
  multiverseId: number;
}

export enum Language {
  ChineseSimplified = 'Chinese Simplified',
  French = 'French',
  German = 'German',
  Italian = 'Italian',
  Japanese = 'Japanese',
  PortugueseBrazil = 'Portuguese (Brazil)',
  Russian = 'Russian',
  Spanish = 'Spanish',
}

export enum Layout {
  Normal = 'normal',
}

export interface LegalityElement {
  format: Format;
  legality: LegalityEnum;
}

export enum Format {
  Alchemy = 'Alchemy',
  Brawl = 'Brawl',
  Commander = 'Commander',
  Duel = 'Duel',
  Explorer = 'Explorer',
  Future = 'Future',
  Gladiator = 'Gladiator',
  Historic = 'Historic',
  Historicbrawl = 'Historicbrawl',
  Legacy = 'Legacy',
  Modern = 'Modern',
  Oathbreaker = 'Oathbreaker',
  Oldschool = 'Oldschool',
  Pauper = 'Pauper',
  Paupercommander = 'Paupercommander',
  Penny = 'Penny',
  Pioneer = 'Pioneer',
  Predh = 'Predh',
  Premodern = 'Premodern',
  Standard = 'Standard',
  Standardbrawl = 'Standardbrawl',
  Timeless = 'Timeless',
  Vintage = 'Vintage',
}

export enum LegalityEnum {
  Legal = 'Legal',
  Restricted = 'Restricted',
}

export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  MythicRare = 'Mythic Rare',
  Special = 'Special',
  BasicLand = 'Basic Land',
}

export interface Ruling {
  date: Date;
  text: string;
}

export enum Set {
  The10E = '10E',
}

export enum SetName {
  TenthEdition = 'Tenth Edition',
}

export enum Type {
  Artifact = 'Artifact',
  Battle = 'Battle',
  Conspiracy = 'Conspiracy',
  Creature = 'Creature',
  Dragon = 'Dragon',
  Elemental = 'Elemental',
  Enchantment = 'Enchantment',
  Goblin = 'Goblin',
  Hero = 'Hero',
  Instant = 'Instant',
  Jaguar = 'Jaguar',
  Kindred = 'Kindred',
  Knights = 'Knights',
  Land = 'Land',
  Legend = 'Legend',
  Phenomenon = 'Phenomenon',
  Plane = 'Plane',
  Planeswalker = 'Planeswalker',
  Scheme = 'Scheme',
  Sorcery = 'Sorcery',
  Stickers = 'Stickers',
  Summon = 'Summon',
  Tribal = 'Tribal',
  Universewalker = 'Universewalker',
  Vanguard = 'Vanguard',
  Wolf = 'Wolf',
}

export enum Supertype {
  Basic = 'Basic',
  Host = 'Host',
  Legendary = 'Legendary',
  Ongoing = 'Ongoing',
  Snow = 'Snow',
  World = 'World',
}
