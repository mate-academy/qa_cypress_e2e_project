import { faker } from '@faker-js/faker';

function generatePassword() {
  // Генерація випадкового пароля
  const length = 8;
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  // Гарантуємо, що пароль міститиме принаймні одну малу літеру, одну велику літеру та одну цифру
  const passwordArray = [
    lowerCaseLetters
      .charAt(Math.floor(Math.random() * lowerCaseLetters.length)),
    upperCaseLetters
      .charAt(Math.floor(Math.random() * upperCaseLetters.length)),
    numbers.charAt(Math.floor(Math.random() * numbers.length))
  ];

  // Заповнюємо решту пароля випадковими символами з усіх категорій
  for (let i = 3; i < length; i++) {
    const allCharacters = lowerCaseLetters + upperCaseLetters + numbers;
    passwordArray.push(allCharacters
      .charAt(Math.floor(Math.random() * allCharacters.length)));
  }

  // Перемішуємо символи для отримання випадкового пароля
  return passwordArray.sort(() => Math.random() - 0.5).join('');
}

export function generateUser() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: generatePassword() // Генерування пароля, що відповідає вимогам
  };
}
