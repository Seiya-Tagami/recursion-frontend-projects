import { login_container } from './common/containers';

export const createLoginView = () => {
  login_container.innerHTML = '';

  const login_view = document.createElement('form');
  login_view.classList.add('space-y-6');
  login_view.innerHTML = `
        <h5 class="text-4xl font-medium text-gray-900 text-center">Clicker Empire Game</h5>
        <div>
          <input
            type="text"
            id="js-login-input"
            placeholder="Enter your username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value=""
            required
          />
        </div>
        <div class="flex gap-6">
          <button
            type="button"
            id="js-new-button"
            class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            New
          </button>
          <button
            type="button"
            id="js-login-button"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>
  `;

  login_container.append(login_view);
};
