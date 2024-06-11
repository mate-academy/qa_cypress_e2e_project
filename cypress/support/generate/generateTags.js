import generateRandomText from './generateRandomText';
import getRandomNumber from './generateRandomNumber';

function generateTags() {
  let randomStr = generateRandomText(getRandomNumber(4, 100));

  randomStr = randomStr.split(' ').join('{enter}') + '{enter}';

  return randomStr;
}

export default generateTags;
