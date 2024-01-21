const status_container = document.getElementById('js-status-container') as HTMLDivElement;

export type TStatusData = {
  username: string;
  old: number;
  days: number;
  yen: number;
};

export const createStatusView = (data: TStatusData) => {
  status_container.innerHTML = '';

  const status_view = document.createElement('div');
  status_view.classList.add('w-full', 'flex', 'justify-evenly', 'gap-2');

  status_view.innerHTML = `
  <div class="max-w-[260px] w-full p-2 flex justify-center items-center bg-violet-500 text-center text-white font-bold rounded-md">
    <span>${data.username}</span>
  </div>
  <div class="max-w-[260px] w-full p-2 flex justify-center items-center bg-violet-500 text-center text-white font-bold rounded-md">
    <span id="js-years-old-view">${data.old} years old</span>
  </div>
  <div class="max-w-[260px] w-full p-2 flex justify-center items-center bg-violet-500 text-center text-white font-bold rounded-md">
    <span id="js-days-view">${data.days} days</span>
  </div>
  <div class="max-w-[260px] w-full p-2 flex justify-center items-center bg-violet-500 text-center text-white font-bold rounded-md">
    <span id="js-yen-view">¥${data.yen}</span>
  </div>
  `;

  status_container.append(status_view);
};

export const reRenderCountingUpYearsOld = (old: number) => {
  const years_old_view_container = <HTMLSpanElement>document.getElementById('js-years-old-view');
  years_old_view_container.innerText = `${old} years old`;
};

export const reRenderCountingUpDays = (days: number) => {
  const days_view_container = <HTMLSpanElement>document.getElementById('js-days-view');
  days_view_container.innerText = `${days} days`;
};

export const reRenderCountingYenView = (yen: number) => {
  const yen_view_container = <HTMLSpanElement>document.getElementById('js-yen-view');
  yen_view_container.innerText = `¥${yen}`;
};
