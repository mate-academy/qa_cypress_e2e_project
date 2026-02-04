/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/articlePage.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
    });
  });

  it('should create article', () => {
    cy.getByDataQa('nav-new-article').click();

    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag('Other');
      articlePage.clickPublishArticleBtn();

      cy.getByDataQa('article-title-view')
        .should('contain', article.title);
    });
  });

  it('should edit article', () => {
    cy.getByDataQa('nav-new-article').click();

    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag('Other');
      articlePage.clickPublishArticleBtn();

      articlePage.editBtn.click();
      articlePage.typeTitle('changedtitle1234');
      articlePage.clickPublishArticleBtn();

      cy.getByDataQa('article-title-view')
        .should('contain', 'changedtitle1234');
    });
  });

  it('should delete article', () => {
    cy.getByDataQa('nav-new-article').click();

    cy.task('generateArticle').then((article) => {
      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag('Other');
      articlePage.clickPublishArticleBtn();

      articlePage.deleteBtn.click();

      cy.getByDataQa('empty-articles')
        .should('be.visible');
    });
  });
});
