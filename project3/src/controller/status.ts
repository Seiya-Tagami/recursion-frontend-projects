import { purchase } from '../model/purchase';
import { user } from '../model/user';
import {
  TStatusData,
  reRenderCountingUpDays,
  reRenderCountingUpYearsOld,
  createStatusView,
} from '../view/status';

export let clearAutoincreaseDaysId: number | undefined;
export const statusController = () => {
  const injectingData: TStatusData = {
    username: user.username,
    old: purchase.old,
    days: purchase.days,
    yen: purchase.yen,
  };

  createStatusView(injectingData);

  /**
   * calculating and injecting days and years old
   */
  clearAutoincreaseDaysId = setInterval(() => {
    purchase.increaseDays();
    reRenderCountingUpDays(purchase.days);
    if (purchase.days % 365 == 0) {
      purchase.increaseOld();
      reRenderCountingUpYearsOld(purchase.old);
    }
  }, 1000);
};

export const restartStatusController = (clearAutoincreaseDaysId: number | undefined) => {
  clearInterval(clearAutoincreaseDaysId);
  statusController();
};
