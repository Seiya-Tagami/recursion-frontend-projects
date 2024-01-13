import { batteries, cameras } from "./constant";
import { Battery, Camera } from "./types";

const brand = document.getElementById('js-brand') as HTMLSelectElement;
const model = document.getElementById('js-model') as HTMLSelectElement;
const power = document.getElementById('js-power') as HTMLSelectElement;
const batteriesContainer = document.getElementById('js-batteries') as HTMLUListElement;

let arrangedCameras: Camera[] = [];
let arrangedBatteries: Battery[] = [];
let selectedModel: Camera = {
  brand: "",
  model: "",
  powerConsumptionWh: 0
};
let cameraPower: number = 0;
let accessoryPower: number = 0;
let totalConsumptionPower: number = 0;

/**
 * generate and change options of model from brand
 * @param {string} brand
 */
function createModelFieldFromBrand(brand: string) {
  model!.innerHTML = '';
  arrangedCameras = cameras.filter((camera) => camera.brand === brand);
  arrangedCameras.forEach((camera) => {
    const optionEl = document.createElement('option');
    optionEl.innerText = camera.model;
    model!.append(optionEl);
  });
  cameraPower = arrangedCameras[0].powerConsumptionWh;
  totalConsumptionPower = accessoryPower + cameraPower;

  arrangedBatteries = arrangeBatteries(totalConsumptionPower);
  createBatteriesView(arrangedBatteries);
}

/**
 * generate and change view of batteries
 * @param {Array} arrangedBatteries
 */
function createBatteriesView(arrangedBatteries: Battery[]) {
  batteriesContainer!.innerHTML = '';
  arrangedBatteries.forEach((battery) => {
    let estimatedTime = Math.round((battery.voltage * battery.capacityAh * 10) / totalConsumptionPower) / 10;

    const liEl = document.createElement('li');
    liEl.classList.add('py-3', 'sm:py-4');

    const divEl_1 = document.createElement('div');
    divEl_1.classList.add('flex', 'items-center', 'space-x-4');

    const divEl_2 = document.createElement('div');
    divEl_2.classList.add('flex-1', 'min-w-0');

    const pEl_1 = document.createElement('p');
    pEl_1.classList.add('text-md', 'font-medium', 'text-gray-900', 'truncate');
    pEl_1.innerText = battery.batteryName;

    const pEl_2 = document.createElement('p');
    pEl_2.classList.add('inline-flex', 'items-center', 'text-base', 'font-semibold', 'text-gray-900');
    pEl_2.innerText = `Estimate ${estimatedTime.toFixed(1)} hours`;

    divEl_2.append(pEl_1);
    divEl_1.append(divEl_2);
    divEl_1.append(pEl_2);
    liEl.append(divEl_1);

    batteriesContainer.append(liEl);
  });
}

/**
 * @param {number} totalConsumptionPower
 * @returns arranged batteries array
 */
function arrangeBatteries(totalConsumptionPower: number): Battery[] {
  return batteries.filter((battery) => {
    let maxConsumptionPower = battery.maxDraw * battery.endVoltage;
    return totalConsumptionPower < maxConsumptionPower;
  });
}

brand.addEventListener('change', (e) => {
  const targetElement = e.target as HTMLSelectElement
  createModelFieldFromBrand(targetElement.value);
});

model.addEventListener('change', (e) => {
  const targetElement = e.target as HTMLSelectElement;
  selectedModel = arrangedCameras.filter((camera) => camera.model === targetElement.value)[0];
  cameraPower = selectedModel.powerConsumptionWh;
  totalConsumptionPower = accessoryPower + cameraPower;

  arrangedBatteries = arrangeBatteries(totalConsumptionPower);
  createBatteriesView(arrangedBatteries);
});

power.addEventListener('change', (e) => {
  const targetElement = e.target as HTMLSelectElement;
  accessoryPower = parseFloat(targetElement.value);
  totalConsumptionPower = accessoryPower + cameraPower;

  arrangedBatteries = arrangeBatteries(totalConsumptionPower);
  createBatteriesView(arrangedBatteries);
});

/**
 * initialize app
 */
(() => {
  const power = document.getElementById('js-power') as HTMLSelectElement
  accessoryPower = parseFloat(power.value);
  createModelFieldFromBrand('Cakon');
})()
