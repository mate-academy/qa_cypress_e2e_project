import { generateUser } from '../generateUser';
import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/#/register';
  }

  navigateToSignUpPage() {
    cy.get('a.nav-link').contains('Sign up').click();
    cy.url().should('include', '/#/register');
  }

  registerUser() {
    const user = generateUser();
    cy.get('[data-cy="username-sign-up"]').type(user.username);
    cy.get('[data-cy="email-sign-up"]').type(user.email);
    cy.get('[data-cy="password-sign-up"]').type(user.password);
    cy.get('[data-cy="sign-up-btn"]').click();
    cy.url().should('include', '/#/');
    return user;
  }

  registerUserWithExistingEmail(existingUser) {
    const newUser = generateUser();
    newUser.email = existingUser.email; // Використовуємо існуючий email
    cy.get('[data-cy="username-sign-up"]').type(newUser.username);
    cy.get('[data-cy="email-sign-up"]').type(newUser.email);
    cy.get('[data-cy="password-sign-up"]').type(newUser.password);
    cy.get('[data-cy="sign-up-btn"]').click();
    return newUser; // Повертаємо дані нового користувача
  }

  verifyRegistrationSuccess() {
    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-title').should('contain', 'Welcome!');
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
    cy.get('.swal-button').click();
  }

  registerUserWithMissingUsername() {
    // Генеруємо валідні дані для нового користувача, залишаючи username пустим
    const user = {
      username: '',
      email: generateUser().email, // Генеруємо електронну пошту
      password: generateUser().password // Генеруємо пароль
    };

    // Заповнюємо форму реєстрації
    cy.get('[data-cy="email-sign-up"]').type(user.email); // Вводимо електронну пошту
    cy.get('[data-cy="password-sign-up"]').type(user.password); // Вводимо пароль
    cy.get('[data-cy="sign-up-btn"]').click(); // Надсилаємо форму

    return user; // Повертаємо дані користувача для подальшого використання
  }

  verifyRegistrationError(expectedMessage) {
    cy.get('.swal-modal').should('be.visible'); // Перевіряємо, що модальне вікно помилки відображається
    cy.get('.swal-title').should('contain', 'Registration failed!'); // Перевіряємо заголовок модального вікна
    cy.get('.swal-text').should('contain', expectedMessage); // Перевіряємо текст помилки
  }

  registerUserWithMissingEmail() {
    const user = {
      username: generateUser().username, // Генеруємо ім'я користувача
      email: '', // Залишаємо електронну пошту пустою
      password: generateUser().password // Генеруємо пароль
    };
    // Заповнюємо форму реєстрації
    cy.get('[data-cy="username-sign-up"]').type(user.username); // Вводимо юзернейм
    cy.get('[data-cy="password-sign-up"]').type(user.password); // Вводимо пароль
    cy.get('[data-cy="sign-up-btn"]').click(); // Надсилаємо форму

    return user; // Повертаємо дані користувача для подальшого використання
  }

  registerUserWithMissingPassword() {
    // Генеруємо валідні дані для нового користувача, залишаючи пароль пустим
    const user = {
      username: generateUser().username, // Генеруємо ім'я користувача
      email: generateUser().email, // Генеруємо електронну пошту
      password: '' // Залишаємо пароль пустим
    };

    // Заповнюємо форму реєстрації
    cy.get('[data-cy="username-sign-up"]').type(user.username); // Вводимо юзернейм
    cy.get('[data-cy="email-sign-up"]').type(user.email); // Вводимо електронну пошту
    cy.get('[data-cy="sign-up-btn"]').click(); // Надсилаємо форму

    return user; // Повертаємо дані користувача для подальшого використання
  }

  registerUserWithInvalidEmail() {
    // Генеруємо недійсний email
    const user = {
      username: generateUser().username,
      email: 'invalid-email', // Неправильний формат електронної пошти
      password: generateUser().password // Генеруємо валідний пароль
    };

    // Заповнюємо форму реєстрації
    cy.get('[data-cy="username-sign-up"]').type(user.username);
    cy.get('[data-cy="email-sign-up"]').type(user.email);
    cy.get('[data-cy="password-sign-up"]').type(user.password);
    cy.get('[data-cy="sign-up-btn"]').click();

    return user; // Повертаємо дані користувача для подальшого використання
  }

  registerUserWithShortPassword() {
    // Генеруємо дані користувача з коротким паролем
    const user = {
      username: generateUser().username,
      email: generateUser().email,
      password: 'short' // Пароль коротший за 8 символів
    };

    // Заповнюємо форму реєстрації
    cy.get('[data-cy="username-sign-up"]').type(user.username);
    cy.get('[data-cy="email-sign-up"]').type(user.email);
    cy.get('[data-cy="password-sign-up"]').type(user.password);
    cy.get('[data-cy="sign-up-btn"]').click();

    return user; // Повертаємо дані користувача для подальшого використання
  }

  registerUserWithNineCharacterPassword() {
    const user = {
      username: generateUser().username,
      email: generateUser().email,
      password: 'abcdefghi'
    };

    cy.get('[data-cy="username-sign-up"]').type(user.username);
    cy.get('[data-cy="email-sign-up"]').type(user.email);
    cy.get('[data-cy="password-sign-up"]').type(user.password);
    cy.get('[data-cy="sign-up-btn"]').click();

    return user;
  }

  registerUserWithoutNumberInPassword() {
    const user = {
      username: generateUser().username,
      email: generateUser().email,
      password: 'Abcdefgh'
    };

    cy.get('[data-cy="username-sign-up"]').type(user.username);
    cy.get('[data-cy="email-sign-up"]').type(user.email);
    cy.get('[data-cy="password-sign-up"]').type(user.password);
    cy.get('[data-cy="sign-up-btn"]').click();

    return user;
  }

  registerUserWithNumberWithoutUpperCase() {
    const user = {
      username: generateUser().username,
      email: generateUser().email,
      password: '1abcdefg'
    };

    cy.get('[data-cy="username-sign-up"]').type(user.username);
    cy.get('[data-cy="email-sign-up"]').type(user.email);
    cy.get('[data-cy="password-sign-up"]').type(user.password);
    cy.get('[data-cy="sign-up-btn"]').click();

    return user;
  }

  navigateToSettingsAndLogout() {
    cy.visit('http://localhost:1667/#/settings');
    cy.get('button').contains('Or click here to logout').click();
  }
}

export default SignUpPageObject;
