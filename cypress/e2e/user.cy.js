/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const userPage = new UserPageObject();
const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

describe('Follow/nofollow button', () => {
  before(() => {
    cy.task('db:clear');

    cy.task('generateUser')
      .then((generateUser) => {
        const { email, username, password } = generateUser;
        cy.login(email, username, password).then(() => generateUser);
      })
      .as('user');

    cy.task('generateArticle')
      .then((article) => {
        articlePage.visit();
        articlePage.typeTitle(article.title);
        articlePage.typeDescription(article.description);
        articlePage.typeBody(article.body);
        article.tagList.forEach((tag) => {
          articlePage.typeTag(tag);
        });
        articlePage.publishArticle();
      })
      .as('articles');
    cy.contains('a', 'Settings').click();
    cy.get('[data-cy="settings-logout"]').click();
  });

  it('should provide an ability to follow another user', function () {});

  it('should provide an ability to unfollow another user', function () {});
});
