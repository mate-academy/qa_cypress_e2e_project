/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const profilePage = new ProfilePageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let user1;
  let user2;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user1 = generatedUser;
    });
    cy.task('generateUser').then((generatedUser) => {
      user2 = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.request('POST', '/users', {
      email: user1.email,
      username: user1.username,
      password: user1.password,
    }).then(({ body }) => {
      cy.setCookie('drash_sess', body.user.token);
    });
    cy.request('POST', '/users', {
      email: user2.email,
      username: user2.username,
      password: user2.password,
    });
  });

  it('should be able to follow another user', () => {
    profilePage.visit(user2.username);
    profilePage.followBtn.should('be.visible');

    profilePage.clickFollowBtn();

    profilePage.unfollowBtn.should('be.visible');
  });

  it('should be able to unfollow a followed user', () => {
    profilePage.visit(user2.username);
    profilePage.clickFollowBtn();

    profilePage.unfollowBtn.should('be.visible');

    profilePage.clickUnfollowBtn();

    profilePage.followBtn.should('be.visible');
  });
});
