/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let article;
  let newUser;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.loginAsUser(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      cy.createArticleAsUser(article.title, article.description, article.body);
    });
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    userPage.visit();
    cy.reload();

    cy.loginAsUser(newUser.email, newUser.username, newUser.password);
    userPage.clickUserFeed();
    userPage.clickUserArticle();
    userPage.clickOnFollowBtn();
  });
});
