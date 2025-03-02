/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import SignUpPageObject from '../support/pages/signup.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
describe('User', () => {
  let user1;
  let user2;
  let signUpPage;
  let articlePage;
  let userPage;

  before(() => {
    cy.task('db:clear'); // Очистити базу даних або виконати підготовку

    signUpPage = new SignUpPageObject();
    articlePage = new ArticlePageObject();
    userPage = new UserPageObject();
    // Створити двох користувачів
    user1 = {
      username: 'UserOne',
      email: 'user1@example.com',
      password: 'User123!'
    };

    user2 = {
      username: 'UserTwo',
      email: 'user2@example.com',
      password: 'User234!'
    };
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be able to follow the another user', () => {
    // Додайте обробку винятків на початку тесту
    // Cypress.on('uncaught:exception', (err, runnable) => {
    // return false; // Ігноруйте помилку
    // });

    // Реєстрація User One
    userPage.registerUser(user1);
    signUpPage.verifyRegistrationSuccess();

    cy.visit('/#/editor'); // Перехід на сторінку створення статті
    articlePage.createArticle(); // Виклик функції для створення статті

    userPage.logoutUser(); // Вихід з системи

    // Реєстрація User Two
    userPage.registerUser(user2);
    signUpPage.verifyRegistrationSuccess();

    userPage.goToYourFeed();

    // Знайти статтю автора UserOne
    cy.contains('a.author', 'UserOne').should('be.visible').click();
    cy.contains('h4', 'UserOne').should('be.visible');

    // Слідкувати за UserOne
    userPage.followUser('UserOne');

    // Перейти на Home
    cy.contains('a', 'Home').should('be.visible').click();

    // Перейти до вкладки "Your Feed"
    userPage.goToYourFeed();

    // Перевірити, що на сторінці є статті користувача "UserOne"
    userPage.verifyArticleVisible('UserOne');
  });

  it('should be able to unfollow a user', () => {
    // Додайте обробку винятків на початку тесту
    // Cypress.on('uncaught:exception', (err, runnable) => {
    // return false; // Ігноруйте помилку
    // });

    // Реєстрація User One
    userPage.registerUser(user1);
    signUpPage.verifyRegistrationSuccess();

    cy.visit('/#/editor'); // Перехід на сторінку створення статті
    articlePage.createArticle(); // Виклик функції для створення статті

    userPage.logoutUser(); // Вихід з системи

    // Реєстрація User Two
    userPage.registerUser(user2);
    signUpPage.verifyRegistrationSuccess();

    userPage.goToYourFeed();

    // Знайти статтю автора UserOne
    cy.contains('a.author', 'UserOne').should('be.visible').click();
    cy.contains('h4', 'UserOne').should('be.visible');

    // Відписка від UserOne
    userPage.unfollowUser('UserOne');

    // Перейти на Home
    cy.contains('a', 'Home').should('be.visible').click();

    // Перейти до вкладки "Your Feed"
    userPage.goToYourFeed();

    // Перевірити, що стаття UserOne більше немає у "Your Feed"
    userPage.verifyArticleNotVisible('UserOne');
  });
});
