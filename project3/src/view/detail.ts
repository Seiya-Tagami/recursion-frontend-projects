import { TDetailViewData } from '../controller/options';
import { options_container } from './common/containers';

export const createDetailView = (data: TDetailViewData) => {
  options_container.innerHTML = '';

  const detail_view = document.createElement('div');
  detail_view.classList.add('w-full', 'bg-indigo-700', 'p-4', 'rounded-lg');
  detail_view.innerHTML = `
  <div class="flex justify-around items-center">
  <div class="flex flex-col gap-2 text-white">
    <span class="text-2xl">${data.label}</span>
    <span>Max purchase: ${data.maxPurchases ? data.maxPurchases : '∞'}</span>
    <span>Price: ￥${data.price}</span>
    <span>Get ${data.desc}</span>
  </div>
  <img src="${data.img}" alt="" class="w-[200px] h-[200px]" />
</div>
<div class="flex flex-col gap-4">
  <label for="" class="text-white text-xl">How many would you like to buy?</label>
  <input
    type="number"
    name="userFirstDeposit"
    id="js-input-${data.id}"
    placeholder="Enter your first deposit"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    value="0"
    min="0"
    max="${data.maxPurchases ? data.maxPurchases - data.purchasedItemNums : 9999999999}"
  />
  <span id="js-total-view" class="text-right text-white">total: ￥0</span>
</div>
<div class="flex gap-4 mt-2">
  <button
    type="button"
    id="js-go-back-${data.id}"
    class="w-full text-indio-700 bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
    Go Back
  </button>
  <button
    type="button"
    id="js-purchase-${data.id}"
    class="w-full text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
    Purchase
  </button>
</div>
  `;

  options_container.append(detail_view);
};

export const reRenderCountingTotalView = (yen: number) => {
  const total_view = <HTMLSpanElement>document.getElementById('js-total-view');
  total_view.innerHTML = `total: ￥${yen}`;
};
