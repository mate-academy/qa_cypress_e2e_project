/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let username;
  let email;
  let password;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      username = user.username;
      email = user.email;
      password = user.password;

      signInPage.visit();
      cy.register(email, username, password);

      signInPage.typeEmail(email);
      signInPage.typePassword(password);

      signInPage.clickSignInBtn();
    });
  });

  it('should be created using New Article form', () => {
    cy.contains('a', 'New Article').click();

    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag('Other');

      articlePage.clickPublishArticleButton();

      cy.contains('h1', article.title).should('be.visible');
    });
  });

  it('should be edited using Edit button', () => {
    cy.contains('a', 'New Article').click();

    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag('Other');

      articlePage.clickPublishArticleButton();

      cy.contains('a', 'Edit Article').click();

      articlePage.typeTitle('updated');
      articlePage.clickPublishArticleButton();

      cy.contains('h1', 'updated').should('be.visible');
    });
  });

  it('should be deleted using Delete button', () => {
    cy.contains('a', 'New Article').click();

    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag('Other');

      articlePage.clickPublishArticleButton();

      cy.contains('button', 'Delete Article').click();
      cy.contains('div', 'No articles are here... yet.');
    });
  });
});
