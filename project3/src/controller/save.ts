import { purchase } from '../model/purchase';
import { user } from '../model/user';

export const logoutController = () => {
  document.getElementById('js-save-button')?.addEventListener('click', () => {
    const isUserSaved = user.saveUserNameToLocalStorage();
    const isGameDataSaved = purchase.saveGameDataToLocalStorage();
    if (isUserSaved && isGameDataSaved) {
      alert('Saved your data. Please put the same name when you login');
    }

    location.reload();
  });
};
