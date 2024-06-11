function getRandomNumber(min = 5, max = 30) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomNumber;
