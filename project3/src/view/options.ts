import { TOptionsViewData } from '../controller/options';
import { options_container } from './common/containers';

export const createOptionsView = (data: TOptionsViewData) => {
  options_container.innerHTML = '';

  const options_view: HTMLDivElement[] = data.map((d) => {
    const option_view_div = document.createElement('div');
    option_view_div.classList.add(
      `js-button-${d.id}`,
      'w-full',
      'h-[200px]',
      'px-6',
      'py-4',
      'flex',
      'justify-between',
      'items-center',
      'bg-indigo-700',
      'hover:border-4',
      'hover:border-green-400',
      'border',
      'rounded-md',
      'cursor-pointer',
    );

    option_view_div.innerHTML = `
    <div class="flex items-center gap-2">
      <img src="${d.img}" class="w-[160px] h-[160px] rounded" />
      <div class="flex flex-col p-2 text-white font-bold">
        <span class="text-2xl">${d.label}</span>
        <span class="text-xl">￥${d.price}</span>
      </div>
    </div>
    <div class="flex flex-col items-end p-2 text-white font-bold">
      <span class="text-3xl">${d.purchasedItemNums}</span>
      <span class="text-green-500">${d.desc}</span>
    </div>
  `;
    return option_view_div;
  });

  options_view.forEach((option) => {
    options_container.append(option);
  });
};
