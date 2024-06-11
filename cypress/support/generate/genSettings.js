import generateUsername from './generateUsername.js';
import generateRandomText from './generateRandomText.js';
import generateEmail from './generateEmail.js';
import generatePasswords from './generatePassword.js';

function genSettings() {
  function genUrl() {
    const address = generateUsername();
    const domain = generateUsername(3);
    const endpoint = generateUsername();
    return `http://${address}.${domain}/${endpoint}`.toLowerCase();
  }

  return {
    url: genUrl(),
    newUsername: generateUsername(),
    bio: generateRandomText(50),
    newEmail: generateEmail(),
    newPassword: generatePasswords()
  };
}

export default genSettings;
