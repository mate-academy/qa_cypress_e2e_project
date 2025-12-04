/* eslint-disable no-multiple-empty-lines */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    // Очистка базы перед каждым тестом
    cy.task('db:clear');
    // Генерация нового пользователя для теста
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should allow a user to register successfully', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    // Проверяем, что после регистрации пользователь попал на главную
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow a user to register with existing email', () => {
    // Создаем пользователя через API или команду регистрации
    cy.register(user.email, user.username, user.password);

    signUpPage.visit();

    // Пытаемся зарегистрироваться с тем же email
    signUpPage.typeUsername('anotherUser');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('anotherPassword123');
    signUpPage.clickSignUpBtn();

    // Проверяем сообщение об ошибке
    cy.get('[data-qa=error-messages]')
      .should('be.visible')
      .and('contain', 'email has already been taken');
  });
});
