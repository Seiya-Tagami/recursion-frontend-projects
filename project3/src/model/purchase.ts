import { TPurchaseModelData } from '../controller/options';

export type TOption = {
  id: number;
  label: string;
  desc: string;
  img: string;
  maxPurchases: number;
  price: number;
  processingValue: number;
  purchasedItemNums: number;
};

export type TGameData = {
  id: number;
  days: number;
  old: number;
  yen: number;
  burgers: number;
  oneClick: number;
  autoAddingValuePerSec: number;
  options: TOption[];
};

const initOptionsData = [
  {
    id: 1,
    label: 'Flip machine',
    desc: '¥25 / click',
    img: 'images/grill.png',
    maxPurchases: 500,
    price: 15000,
    processingValue: 25,
    purchasedItemNums: 0,
  },
  {
    id: 2,
    label: 'ETF Stock',
    desc: '0.1% / sec',
    img: 'images/chart.png',
    // 無限大を使いたくないので、0で表すことにする。
    maxPurchases: 0,
    price: 300000,
    processingValue: 0.1,
    purchasedItemNums: 0,
  },
  {
    id: 3,
    label: 'ETF Bonds',
    desc: '0.07% / sec',
    img: 'images/chart.png',
    // 無限大を使いたくないので、0で表すことにする。
    maxPurchases: 0,
    price: 300000,
    processingValue: 0.07,
    purchasedItemNums: 0,
  },
  {
    id: 4,
    label: 'Lemonade Stand',
    desc: '¥30 / sec',
    img: 'images/lemonade.png',
    maxPurchases: 1000,
    price: 30000,
    processingValue: 30,
    purchasedItemNums: 0,
  },
  {
    id: 5,
    label: 'Ice Cream Truck',
    desc: '¥120 / sec',
    img: 'images/ice-cream.png',
    maxPurchases: 500,
    price: 100000,
    processingValue: 120,
    purchasedItemNums: 0,
  },
  {
    id: 6,
    label: 'House',
    desc: '¥32,000 / sec',
    img: 'images/house-1.png',
    maxPurchases: 100,
    price: 20000000,
    processingValue: 32000,
    purchasedItemNums: 0,
  },
  {
    id: 7,
    label: 'TownHouse',
    desc: '¥64,000 / sec',
    img: 'images/house-2.png',
    maxPurchases: 100,
    price: 40000000,
    processingValue: 64000,
    purchasedItemNums: 0,
  },
  {
    id: 8,
    label: 'Castle',
    desc: '¥500,000 / sec',
    img: 'images/castle.png',
    maxPurchases: 20,
    price: 250000000,
    processingValue: 500000,
    purchasedItemNums: 0,
  },
  {
    id: 9,
    label: 'Industrial Space',
    desc: '¥2,200,000 / sec',
    img: 'images/industrial-space.png',
    maxPurchases: 10,
    price: 1000000000,
    processingValue: 2200000,
    purchasedItemNums: 0,
  },
  {
    id: 10,
    label: 'Hotel Skyscraper',
    desc: '¥25,000,000 / sec',
    img: 'images/skyscrapers.png',
    maxPurchases: 5,
    price: 10000000000,
    processingValue: 25000000,
    purchasedItemNums: 0,
  },
  {
    id: 11,
    label: 'Bullet-Speed Sky Railway',
    desc: '¥30,000,000,000 / sec',
    img: 'images/high-speed-train.png',
    maxPurchases: 1,
    price: 10000000000000,
    processingValue: 30000000000,
    purchasedItemNums: 0,
  },
];

class Purchase {
  gameDataId: number | null;
  days: number;
  old: number;
  yen: number;
  burgers: number;
  oneClick: number;
  autoAddingValuePerSec: number;
  options: TOption[];

  constructor() {
    this.gameDataId = null;
    this.days = 0;
    this.old = 20;
    this.yen = 1000000;
    this.burgers = 0;
    this.oneClick = 25;
    this.autoAddingValuePerSec = 0;
    this.options = initOptionsData;
  }

  public clickBurger() {
    this.burgers++;
    this.yen += this.oneClick;
  }

  public increaseOld() {
    this.old++;
  }

  public increaseDays() {
    this.days++;
  }

  public increaseYenByAutoAddingValuePerSec() {
    this.yen += this.autoAddingValuePerSec;
  }

  public purchaseItem(data: TPurchaseModelData) {
    this.yen -= data.price * data.nums;
    const foundOption = this.options.find((option) => option.id == data.id);

    if (foundOption !== undefined) {
      if (data.label === 'Flip machine') {
        this.oneClick += foundOption.processingValue * data.nums;
      } else if (data.label === 'ETF Stock' || data.label === 'ETF Bonds') {
        this.autoAddingValuePerSec += foundOption.processingValue * (foundOption.price * data.nums);
        if (data.label === 'ETF Stock') {
          foundOption.price *= 1.1;
          foundOption.price = Math.floor(foundOption.price);
        }
      } else {
        this.autoAddingValuePerSec += foundOption.processingValue * data.nums;
      }

      foundOption.purchasedItemNums += data.nums;
    }
  }

  public fetchGameDataFromLocalStorage(userId: number) {
    const storedGameData = localStorage.getItem('gameData');
    const gameData = storedGameData ? (JSON.parse(storedGameData) as TGameData[]) : [];
    const userGameData = gameData.find((data) => data.id == userId);
    if (userGameData) {
      this.gameDataId = userGameData.id;
      this.days = userGameData.days;
      this.old = userGameData.old;
      this.yen = userGameData.yen;
      this.burgers = userGameData.burgers;
      this.oneClick = userGameData.oneClick;
      this.autoAddingValuePerSec = userGameData.autoAddingValuePerSec;
      this.options = userGameData.options;
    }
  }

  public resetGameData() {
    this.days = 0;
    this.old = 20;
    this.yen = 1000000;
    this.burgers = 0;
    this.oneClick = 25;
    this.autoAddingValuePerSec = 0;
    this.options = initOptionsData;
  }

  public initLocalStorage() {
    if (!localStorage.getItem('gameData')) {
      localStorage.setItem('gameData', JSON.stringify([]));
    }
  }

  public saveGameDataToLocalStorage() {
    const storedGameData = localStorage.getItem('gameData');
    const gameData = storedGameData ? (JSON.parse(storedGameData) as TGameData[]) : [];
    const storedGameDatum = gameData.find((data) => data.id == this.gameDataId);
    if (storedGameData && storedGameDatum !== undefined) {
      const savingGameData = gameData.filter((d) => d.id !== storedGameDatum.id);
      const newGameDatum = {
        id: this.gameDataId as number,
        days: this.days,
        old: this.old,
        yen: this.yen,
        burgers: this.burgers,
        oneClick: this.oneClick,
        autoAddingValuePerSec: this.autoAddingValuePerSec,
        options: this.options,
      };
      savingGameData.push(newGameDatum);
      localStorage.setItem('gameData', JSON.stringify(savingGameData.sort((a, b) => a.id - b.id)));
      return true;
    }

    const mewGameDatum = {
      id: gameData?.length,
      days: this.days,
      old: this.old,
      yen: this.yen,
      burgers: this.burgers,
      oneClick: this.oneClick,
      autoAddingValuePerSec: this.autoAddingValuePerSec,
      options: this.options,
    };
    gameData.push(mewGameDatum);
    localStorage.setItem('gameData', JSON.stringify(gameData));
    return true;
  }
}

export const purchase = new Purchase();
