export const isInteger = num => Math.floor(num) === num;

export const randomBetween = (min, max) => {
  const random = Math.random() * (max - min) + min;
  const isInt = isInteger(min) && isInteger(max);
  return isInt ? Math.floor(random) : random;
}

// 0.3, 0.5, 2 即得到0.30-0.50之间的小数
export const randomBetweenPrecision = (min, max, precision)=> {
  return randomBetween(min * Math.pow(10, precision), max * Math.pow(10, precision)) / Math.pow(10, precision);
}

export const randomColor = () => {
  const r = randomBetween(0, 256);
  const g = randomBetween(0, 256);
  const b = randomBetween(0, 256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}