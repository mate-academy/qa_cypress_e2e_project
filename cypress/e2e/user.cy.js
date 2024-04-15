/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();
const articlePage = new ArticlePageObject();

describe('User', () => {
  let user, article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;

      cy.createArticle(
        user.username,
        user.email,
        user.password,
        article.title,
        article.description,
        article.body);
    });
  });

  it('should be able to follow the another user', () => {
    cy.intercept('GET', '/articles?*').as('getLogin');
    cy.visit(`/#/@${user.username}`);
    cy.wait('@getLogin').then(() => {
      settingsPage.visit();
      settingsPage.clickLogoutBtn();
      const newUserName = 'riot';
      const newEmail = 'riot@gmail.com';
      cy.register(newUserName, newEmail, user.password);

      cy.intercept('POST', '/users/login').as('Login');
      cy.visit(`/#/@${user.username}`);
      cy.wait('@Login');
      cy.visit(`/#/articles/${article.title}`);
      articlePage.clickFollowUserBtn();

      articlePage.assertContainUnfollowBtn();
    });
  });

  it('should be able to follow the another user', () => {
    cy.intercept('GET', '/articles?*').as('getLogin');
    cy.visit(`/#/@${user.username}`);
    cy.wait('@getLogin').then(() => {
      settingsPage.visit();
      settingsPage.clickLogoutBtn();
      const newUserName = 'riot';
      const newEmail = 'riot@gmail.com';
      cy.register(newUserName, newEmail, user.password);

      cy.intercept('POST', '/users/login').as('Login');
      cy.visit(`/#/@${user.username}`);
      cy.wait('@Login');
      cy.visit(`/#/articles/${article.title}`);
      articlePage.clickFollowUserBtn();

      articlePage.assertContainUnfollowBtn();
    });

    articlePage.clickUnfollowUserBtn();
    articlePage.assertContainFollowBtn();
  });
});
