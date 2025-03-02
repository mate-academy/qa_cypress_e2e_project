/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signup.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

describe('Article', () => {
  let signUpPage;
  let homePage;
  let articlePage;

  before(() => {
    cy.task('db:clear');

    signUpPage = new SignUpPageObject();
    homePage = new HomePageObject();
    articlePage = new ArticlePageObject();
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
    const user = signUpPage.registerUser();
    homePage.assertHeaderContainUsername(user.username);
    signUpPage.verifyRegistrationSuccess(); // Перевірка успішної реєстрації
  });

  it('should be created using New Article form', () => {
    articlePage.navigateToArticlePage(); // Перехід на сторінку створення статті
    articlePage.createArticle(); // Виклик функції для створення статті
    articlePage.verifyArticleTitleExists(); // Перевірка, що назва статті відображається
  });

  it('should be created using New Article form without tag', () => {
    articlePage.navigateToArticlePage(); // Перехід на сторінку створення статті
    articlePage.createArticleWithoutTag(); // Виклик функції для створення статті
    articlePage.verifyArticleTitleExists(); // Перевірка, що назва статті відображається
  });

  it('should be edited using Edit button', () => {
    articlePage.navigateToArticlePage(); // Перехід на сторінку створення статті
    articlePage.createArticle(); // Виклик функції для створення статті
    articlePage.verifyArticleTitleExists(); // Перевірка, що назва статті відображається
    articlePage.clickEditButton(); // Клікнути на кнопку Едіт

    const updatedTitle = 'Updated Title';
    const updatedDescription = 'Updated description of the article.';
    const updatedBody = 'Updated body text with more details.';

    articlePage.updateArticle(updatedTitle, updatedDescription, updatedBody); // Виклик нового методу для оновлення статті
    articlePage
      .verifyArticleChanges(updatedTitle, updatedBody, updatedDescription); // Перевірка що всі зміни були збережені
  });

  it('should be deleted using Delete button', () => {
    articlePage.navigateToArticlePage(); // Перехід на сторінку створення статті
    articlePage.createArticle(); // Виклик функції для створення статті
    articlePage.verifyArticleTitleExists(); // Перевірка, що назва статті відображається
    articlePage.deleteArticle(); // Видалення та перевірка видалення статті
  });
});
