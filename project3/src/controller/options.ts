import { TOption, purchase } from '../model/purchase';
import { reRenderCountingTotalView, createDetailView } from '../view/detail';
import { reRenderCountingUpOneClickView } from '../view/hamburger';
import { createOptionsView } from '../view/options';
import { reRenderCountingYenView } from '../view/status';

export type TOptionsViewData = {
  id: number;
  label: string;
  desc: string;
  img: string;
  maxPurchases: number;
  price: number;
  processingValue: number;
  purchasedItemNums: number;
}[];

export type TDetailViewData = TOption;

export type TPurchaseModelData = {
  id: number;
  label: string;
  nums: number;
  price: number;
};

export let clearAutoIncrementIntervalId: number | undefined;

export const optionsController = () => {
  const startAutoIncrementYen = 0 < purchase.autoAddingValuePerSec ? true : false;
  createOptionsView(purchase.options);

  /**
   * if startAutoIncrementYen is true, increase yen automatically
   */
  if (startAutoIncrementYen) {
    clearAutoIncrementIntervalId = setInterval(() => {
      purchase.increaseYenByAutoAddingValuePerSec();
      reRenderCountingYenView(purchase.yen);
    }, 1000);
  }

  purchase.options.forEach((data) => {
    document.querySelector(`.js-button-${data.id}`)?.addEventListener('click', () => {
      const injectingData = data as TDetailViewData;
      createDetailView(injectingData);

      /**
       * counting total yen
       */
      let total = 0;
      let inputValue = 0;
      let price = 0;
      document.getElementById(`js-input-${data.id}`)?.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement | null;
        if (target) {
          inputValue = parseInt(target.value, 10);
          price = injectingData.price;
          total = inputValue * price;
          reRenderCountingTotalView(total);
        }
      });

      /**
       * when clicking go back
       */
      document.getElementById(`js-go-back-${data.id}`)?.addEventListener('click', () => {
        restartOptionsController(clearAutoIncrementIntervalId);
      });

      /**
       * when clicking purchase
       */
      document.getElementById(`js-purchase-${data.id}`)?.addEventListener('click', () => {
        if (inputValue == 0) {
          alert('invalid number');
          restartOptionsController(clearAutoIncrementIntervalId);
          return;
        } else if (purchase.yen < total) {
          alert("You don't have enough money...");
          restartOptionsController(clearAutoIncrementIntervalId);
          return;
        }

        const injectingData = {
          id: data.id,
          label: data.label,
          nums: inputValue,
          price: price,
        };

        purchase.purchaseItem(injectingData);

        reRenderCountingYenView(purchase.yen);
        reRenderCountingUpOneClickView(purchase.oneClick);

        restartOptionsController(clearAutoIncrementIntervalId);
      });
    });
  });
};

export const restartOptionsController = (clearAutoIncrementIntervalId: number | undefined) => {
  clearInterval(clearAutoIncrementIntervalId);
  optionsController();
};
