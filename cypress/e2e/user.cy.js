/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';

const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;
  let userToFollow;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      userToFollow = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.createArticle(user.username, user.email, user.password,
      article.title, article.description, article.body, article.tag);
    cy.register(userToFollow.email, userToFollow.username, userToFollow.password);
    cy.login(userToFollow.email, userToFollow.username, userToFollow.password);
  });

  it('should be able to follow the another user', () => {
    profilePage.visit(user.username);
    profilePage.clickFollowBtn();
    profilePage.assertFollowBth();
  });
});
