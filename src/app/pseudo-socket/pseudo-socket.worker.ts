import {DataModel} from "../models/data.model";
import {ChildModel} from "../models/child.model";

let timerId: any;

addEventListener('message', ({data}) => {
  if (data.stop) {
    clearInterval(timerId);
    return;
  }
  const {interval, dataSize, additionalIds} = data;

  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    const data = generateData(dataSize, additionalIds);
    postMessage(data);
  }, interval);
});

function generateData(size: number, additionalIds: string[]): DataModel[] {
  const data: DataModel[] = [];

  for (let i = 0; i < size; i++) {
    let id;
    if (size >= 10) {
      id = i >= size - 10 ? (i >= size - 10 + additionalIds.length ? generateRandomId() : additionalIds[i - (size - 10)]) : generateRandomId();
    } else {
      id = i < additionalIds.length ? additionalIds[i] : generateRandomId();
    }

    const int = Math.floor(Math.random() * 100);
    const float = Math.random() * 100;
    const color = generateRandomColor();
    const childId = generateRandomId();
    const childColor = generateRandomColor();

    let child = new ChildModel(childId, childColor);
    const element: DataModel = new DataModel(id, int, float, color, child);
    data.push(element);
  }

  return data;
}

function generateRandomId(): string {
  const length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
