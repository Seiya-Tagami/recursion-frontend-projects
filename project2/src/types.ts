export type Camera = {
  brand: string
  model: string
  powerConsumptionWh: number
}

export type Battery = {
  batteryName: string;
  capacityAh: number;
  voltage: number;
  maxDraw: number;
  endVoltage: number;
}