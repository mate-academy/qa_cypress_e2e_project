/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User page', () => {
  let user;
  // let article;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    // cy.task('generateArticle').then((generateArticle) => {
    //   article = generateArticle;
    // });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.otherEmail, user.otherUsername, user.otherPassword);
    cy.login(user.otherEmail, user.otherPassword);
  });

  it.only('should be able to follow the another user', () => {
    userPage.visitUserPage(user.username);
    // userPage.clickFollowBtn();
    // userPage.assertBtnUnfollow(user.username);
  });

  it('should be able to unfollow the another user', () => {
    userPage.visitUserPage(user.username);
    userPage.clickFollowBtn();
    userPage.assertBtnUnfollow(user.username);
    userPage.clickFollowBtn();
    userPage.assertBtnFollow(user.username);
  });
});
