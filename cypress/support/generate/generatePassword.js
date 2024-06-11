function getRandomChar(characters) {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

function generatePasswords() {
  function generatePassword(option = 'default') {
    let length = 8;
    let lowercase = 'abcdefghijklmnopqrstuvwxyz';
    let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '0123456789';

    if (option === 'less than 8') {
      length = Math.floor(Math.random() * 8);
    }

    if (option === 'without lowercase') {
      lowercase = '';
    }

    if (option === 'without number') {
      numbers = '';
    }

    if (option === 'without uppercase') {
      uppercase = '';
    }

    let password = '';

    password += getRandomChar(lowercase);
    password += getRandomChar(uppercase);
    password += getRandomChar(numbers);

    for (let i = password.length; i < length; i++) {
      const randomType = Math.floor(Math.random() * 3);
      switch (randomType) {
        case 0:
          password += getRandomChar(lowercase);
          break;
        case 1:
          password += getRandomChar(uppercase);
          break;
        case 2:
          password += getRandomChar(numbers);
          break;
      }
    }

    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    return password;
  }

  return {
    passwordDefault: generatePassword(),
    passwordLessThan8: generatePassword('less than 8'),
    passwordWithoutNumber: generatePassword('without number'),
    passwordWithoutUpper: generatePassword('without uppercase'),
    passwordWithoutLower: generatePassword('without lowercase')
  };
}

export default generatePasswords;
