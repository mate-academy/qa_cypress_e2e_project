/// <reference types='cypress' />
/// <reference types='../support' />

import { UserPageObject } from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User page', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
    cy.createArticle(
      user.username,
      user.email,
      user.password,
      article.title,
      article.description,
      article.body,
      article.tag);
    cy.register(user.anotherUsername, user.anotherEmail, user.anotherPassword);
  });

  it('should be able to follow the another user', () => {
    userPage.visitUserPage(user.username);
    userPage.clickFollowBtn();
    userPage.assertBtnChahgeToUnfollow(user.username);
  });

  it('should be able to unfollow the another user', () => {
    userPage.visitUserPage(user.username);
    userPage.clickFollowBtn();
    userPage.assertBtnChahgeToUnfollow(user.username);
    userPage.clickFollowBtn();
    userPage.assertBtnChahgeToFollow(user.username);
  });
});
