function getRandomNumber(min = 5, max = 40) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomNumber;
