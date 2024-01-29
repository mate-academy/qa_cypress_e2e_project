/// <reference types='cypress' />
/// <reference types='../support' />

import OtherUserProfilePageObject from '../support/pages/otherUser.pageObject';

const OtherUserPage = new OtherUserProfilePageObject();

describe('User', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be able to follow and unfollow the another user', () => {
    cy.createArticle(
      user.username,
      user.email,
      user.password,
      article.title,
      article.description,
      article.body,
      article.tag);
    cy.login(user.updateUsername, user.updatedEmail, user.updatedPassword);
    OtherUserPage.visitOtherUserPage(user.username);
    OtherUserPage.clickFollowUnfollowBtn();
    OtherUserPage.assertFollowBtnChahgedUnfollow(user.username);
    OtherUserPage.clickFollowUnfollowBtn();
    OtherUserPage.assertUnfollowBtnChahgedFollow(user.username);
  });
});
