/* eslint-disable @typescript-eslint/naming-convention */
import { Manuals, Proficiencies, ProficienciesCraft, Tier } from '../shared/common-enums.model';

export interface ItemData {
  _id: string;
  sell_price: number;
  sell_proficiencies: Proficiencies[];
  buy_price: number;
  is_usable: boolean;
  link: string;
  category: ItemCategories;
  manual: Manuals;
  attuenement: boolean;
  give_ration: number;
  craft: CraftData;
}

export interface CraftData {
  craft_mo_cost: number;
  tier: Tier;
  craft_tools: ProficienciesCraft[];
  craft_tbadge: number;
  craft_time: number;
  craft_total_cost: number;
  craft_min_qty: number;
  craft_max_qty: number;
  craft_ingredients: {[key: string]: number}[];
}

export enum ItemCategories {
  components = 'Craft/Spell Comp.',
  base = 'Adv. Gear',
  upgrade = 'Smithing upgrade',
  poison = 'Poison',
  trading = 'Trading Goods',
  companion = 'Beast Companion',
  mount = 'Mount and Accesories',
  vehiclesSea = 'Vehicles(Sea)',
  vehiclesLand = 'Vehicles(Land)',
  food = 'Food recipes',
  ink = 'Arcane Ink',
  t1 = 'Common Magic Item (T1)',
  t2 = 't2Uncommon Magic Item (T2)',
  t3 = 'Rare Magic Item (T3)',
  t4 = 'Very Rare Magic Item (T4)',
  t4Plus = 'Ultra Rare Magic Item (T4)',
  t5 = 'Legendary Magic Item (T5)',
  cursed = 'Cursed',
  homebrew = 'Homebrew',
  tbadge = 'TBadge'
}
