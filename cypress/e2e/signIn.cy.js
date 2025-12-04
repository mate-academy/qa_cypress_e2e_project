/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    // Очищаем базу перед каждым тестом
    cy.task('db:clear');

    // Генерируем и регистрируем нового пользователя перед каждым тестом
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    // Попытка входа с неверным паролем
    signInPage.typeEmail(user.email);
    signInPage.typePassword('wrongPassword');
    signInPage.clickSignInBtn();

    // Проверка сообщения об ошибке
    cy.get('[data-qa=error-messages]')
      .should('be.visible')
      .and('contain', 'email or password is invalid');

    // Проверка, что мы не попали на главную страницу
    cy.url().should('not.include', '/');
  });
});
