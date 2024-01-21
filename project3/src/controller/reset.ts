import {
  clearAutoincreaseDaysId,
  clearAutoIncrementIntervalId,
  restartHamburgerController,
  restartOptionsController,
  restartStatusController,
} from '.';
import { purchase } from '../model/purchase';

export const resetController = () => {
  document.getElementById('js-reset-button')?.addEventListener('click', () => {
    if (window.confirm('Reset All Data?')) {
      purchase.resetGameData();
    }

    restartStatusController(clearAutoincreaseDaysId);
    restartOptionsController(clearAutoIncrementIntervalId);
    restartHamburgerController();
  });
};
