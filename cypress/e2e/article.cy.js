/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/articlePage.pageObject';

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
    articlePage.clickNewArticleBtn();

    cy.task('generateArticle').then((article) => {
      const randomTag = faker.word.noun();

      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag(randomTag);

      articlePage.clickPublishArticleBtn();

      cy.get('[data-qa=article-title]').should('have.text', article.title);
    });
  });

  it('should be edited using Edit button', () => {
    articlePage.clickNewArticleBtn();

    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag(faker.word.noun());

      articlePage.clickPublishArticleBtn();
      articlePage.clickEditArticleBtn();

      const newTitle = `changedtitle-${Date.now()}`;
      articlePage.clearTitle().typeTitle(newTitle);

      articlePage.clickPublishArticleBtn();

      cy.get('[data-qa=article-title]').should('have.text', newTitle);
    });
  });

  it('should be deleted using Delete button', () => {
    articlePage.clickNewArticleBtn();

    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag(faker.word.noun());

      articlePage.clickPublishArticleBtn();

      cy.get('[data-qa=article-title]').should('have.text', article.title);

      articlePage.clickDeleteArticleBtn();

      articlePage.noArticlesMessage.should(
        'contain.text',
        'No articles are here... yet.'
      );
    });
  });
});
