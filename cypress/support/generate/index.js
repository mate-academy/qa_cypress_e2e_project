import generateUsername from './generateUsername.js';
import generateEmail from './generateEmail.js';
import generatePasswords from './generatePassword.js';
import genSettings from './genSettings.js';
import generateRandomText from './generateRandomText.js';
import getRandomNumber from './generateRandomNumber.js';
import generateTags from './generateTags.js';

function generateData() {
  return {
    user: {
      username: generateUsername(),
      email: generateEmail(),
      password: generatePasswords(),
      settings: genSettings()
    },
    someone: {
      username: generateUsername(),
      email: generateEmail(),
      password: generatePasswords()
    },
    article: {
      title: generateRandomText(getRandomNumber(5, 20)),
      about: generateRandomText(getRandomNumber(10, 40)),
      body: generateRandomText(getRandomNumber(50, 200)),
      tags: generateTags()
    }
  };
}

export default generateData;
