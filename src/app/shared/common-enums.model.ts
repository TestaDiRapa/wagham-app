export type EnumDictionary<T extends string | symbol, U> = {
  [K in T]: U;
};

export enum Territories {
  amueron = 'Amueron',
  bolgarMarsh = 'Bolgar\'s Marsh',
  sanguineSlough = 'Sanguine\'s Slough',
  califfato = 'Califfato di Sratjiss',
  ornwelund = 'Città-Stato di Ornwelun',
  dumalia = 'Dumalia',
  fanendeluial = 'Fanendeluial',
  foKhar = 'Fo\'Khar',
  gnomerion = 'Gnomerion',
  smeg = 'Montagne di Smeg',
  vatakia = 'Gran Ducato di Vatakia',
  arcotia = 'Impero di Arcotia',
  japachi = 'Japachi',
  heba = 'Savana di Heba',
  krezanith = 'Krezanith',
  kusia = 'Kusia',
  fortezza = 'La Fortezza',
  lingwenor = 'Lingwenor',
  inthibir = 'Oligarchia di Intibhir',
  inveriw = 'Protettorato di Inveriw',
  rukudan = 'Rukûdan',
  drelluma = 'Terre di Drelluma',
  corno = 'Tiefling del Corno del Demone',
  lingua = 'Tiefling della Lingua del Demone',
  centauri = 'Tribù dei Verdi Pascoli',
  tritoniSeaElf = 'Vapua, Kiunur e Hirmaa',
  amazzoni = 'Sorellanza delle Amazzoni'
}

export enum BuildingTypes {
    possedimentoT1 = 'Possedimento T1',
    possedimentoT2 = 'Possedimento T2',
    possedimentoT3 = 'Possedimento T3',
    possedimentoT4 = 'Possedimento T4',
    possedimentoT5 = 'Possedimento T5',
    officinaT1 = 'Officina T1',
    officinaT2 = 'Officina T2',
    officinaT3 = 'Officina T3',
    officinaT4 = 'Officina T4',
    officinaT5 = 'Officina T5'
}

export enum Languages {
  abyssal = 'Abyssal',
  celestial = 'Celestial',
  common = 'Common',
  deepSpeech = 'Deep Speech',
  draconic = 'Draconic',
  druidic = 'Druidic',
  dwarvish = 'Dwarvish',
  elvish = 'Elvish',
  giant = 'Giant',
  gnomish = 'Gnomish',
  goblin = 'Goblin',
  halfling = 'Halfling',
  infernal = 'Infernal',
  orc = 'Orc',
  primordial = 'Primordial',
  sylvan = 'Sylvan',
  thievesCant = 'Thieves\' Cant',
  undercommon = 'Undercommon'
}

export enum Proficiencies {
  alchemist = 'Alchemist\'s supplies',
  calligrapher = 'Calligrapher\'s supplies',
  carpenter = 'Carpenter\'s tools',
  cartographer = 'Cartographer\'s tools',
  cobbler = 'Cobbler\'s tools',
  cookBrewer = 'Cook\'s and Brewer\'s tools',
  disguise = 'Disguise kit',
  forgery = 'Forgery kit',
  glassblower = 'Glassblower\'s tools',
  herbalism = 'Herbalism kit',
  jeweler = 'Jeweler\'s tools',
  leatherworker = 'Leatherworker\'s tools',
  mason = 'Mason\'s tools',
  navigator = 'Navigator\'s tools',
  painter = 'Painter\'s supplies',
  poisoner = 'Poisoner\'s kit',
  potter = 'Potter\'s tools',
  smith = 'Smith\'s tools',
  thieves = 'Thieves tools',
  tinker = 'Tinker\'s tools',
  vehiclesLand = 'Vehicles (Land)',
  vehiclesSea = 'Vehicles (Sea)',
  weaver = 'Weaver\'s tools',
  woodcarver = 'Woodcarver\'s tools',
  gamingDice = 'Gaming Set - Dice Set',
  gamingDragonchess = 'Gaming Set - Dragonchess Set',
  gamingCard = 'Gaming Set - Playing Card Set',
  gamingThreeDragon = 'Gaming Set - Three-Dragon Ante Set',
  moneyBAdge = 'ProficiencyMoneyBadge',
  instrumentBagpipes = 'Musical instrument - Bagpipes',
  instrumentDrum = 'Musical instrument - Drum',
  instrumentDulcimer = 'Musical instrument - Dulcimer',
  instrumentFlute = 'Musical instrument - Flute',
  instrumentHorn = 'Musical instrument - Horn',
  instrumentLute = 'Musical instrument - Lute',
  instrumentLyre = 'Musical instrument - Lyre',
  instrumentPanFlute = 'Musical instrument - Pan Flute',
  instrumentShawn = 'Musical instrument - Shawm',
  instrumentViol = 'Musical instrument - Viol'
}
