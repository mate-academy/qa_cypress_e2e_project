/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');

    // Створити нового користувача через API
    const username = 'riot';
    const email = 'riot@qa.team';
    const password = '12345Qwert!';
    // Використання команди для реєстрації користувача
    cy.register(email, username, password).then((response) => {
      // Перевірка, що реєстрація пройшла успішно
      expect(response.status).to.equal(200); // або відповідний код статусу вашого API
      user = { username, email, password }; // Зберігаємо дані користувача для подальшого використання
    });
  });

  it.only('should can log in with existing credentials', () => {
    signInPage.visit();

    // Введення облікових даних
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    // Перевірка, що користувач успішно увійшов
    homePage.assertHeaderContainUsername(user.username);
  });

  it.only('should not provide an ability to log in with wrong email', () => {
    signInPage.visit();

    // Введення неправильного логіна
    signInPage.typeEmail('wrongemail@mail.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.verifyRegistrationError('Invalid user credentials.');
    // Перевірка, що з'являється повідомлення про помилку
  });

  it.only('should not provide an ability to log in with wrong password', () => {
    signInPage.visit();

    // Введення неправильного логіна
    signInPage.typeEmail(user.email);
    signInPage.typePassword('Wrong12!');
    signInPage.clickSignInBtn();
    signInPage.verifyRegistrationError('Invalid user credentials.');
    // Перевірка, що з'являється повідомлення про помилку
  });
});
