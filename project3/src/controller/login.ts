import { hamburgerController, optionsController, statusController, logoutController } from '.';
import { purchase } from '../model/purchase';
import { TUser, user } from '../model/user';
import { game_container, login_container } from '../view/common/containers';
import { createLoginView } from '../view/login';
import { removeCurrentView } from '../view/utils/removeView';
import { resetController } from './reset';

export const loginController = () => {
  createLoginView();

  const loginInput = <HTMLInputElement>document.getElementById('js-login-input');

  document.getElementById('js-new-button')?.addEventListener('click', () => {
    if (loginInput.value) {
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? (JSON.parse(storedUsers) as TUser[]) : [];
      if (users.find((user) => user.username === loginInput.value)) {
        alert('this user already exist');
      } else {
        startGame(loginInput.value);
      }
    } else {
      alert('please type your name to play game');
    }
  });

  document.getElementById('js-login-button')?.addEventListener('click', () => {
    if (loginInput.value) {
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? (JSON.parse(storedUsers) as TUser[]) : [];
      const storedUser = users.find((user) => user.username === loginInput.value);
      if (storedUser) {
        purchase.fetchGameDataFromLocalStorage(storedUser.id);
        startGame(storedUser.username);
      } else {
        alert('no data found');
      }
    } else {
      alert('please type your name to play game');
    }
  });
};

const startGame = (loginUsername: string) => {
  user.setUsername(loginUsername);
  removeCurrentView(login_container, game_container);

  /**
   * initializing game controllers
   */
  statusController();
  optionsController();
  hamburgerController();
  resetController();
  logoutController();
};
