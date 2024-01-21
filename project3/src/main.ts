// -- This application's entry file.
import { loginController } from './controller';
import { purchase } from './model/purchase';
import { user } from './model/user';

const initApp = () => {
  user.initLocalStorage();
  purchase.initLocalStorage();
  loginController();
};

initApp();
