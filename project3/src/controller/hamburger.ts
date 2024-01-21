import { purchase } from '../model/purchase';
import { reRenderCountingUpBurgersView, createHamburgerView } from '../view/hamburger';
import { reRenderCountingYenView } from '../view/status';

export const hamburgerController = () => {
  const injectingData = {
    burgers: purchase.burgers,
    oneClick: purchase.oneClick,
  };

  createHamburgerView(injectingData);

  document.getElementById('js-hamburger-click')?.addEventListener('click', () => {
    purchase.clickBurger();
    reRenderCountingUpBurgersView(purchase.burgers);
    reRenderCountingYenView(purchase.yen);
  });
};

export const restartHamburgerController = () => {
  hamburgerController();
};
