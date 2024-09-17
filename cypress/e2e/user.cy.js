/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
// eslint-disable-next-line no-unused-vars
import faker from 'faker';

const userPage = new UserPageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let user;
  let secondUser;

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateSecondUser').then((generateSecondUser) => {
      secondUser = generateSecondUser;
    });
  });

  it('should be able to follow the another user', () => {
    // eslint-disable-next-line max-len
    cy.registerSecondUser(secondUser.email, secondUser.username, secondUser.password);
    cy.register(user.email, user.username, user.password);
    userPage.visit(secondUser.username);

    cy.get('h4').should('contain', secondUser.username);

    userPage.clickFollowBtn(secondUser.username);

    userPage.assertFollowingUser(secondUser.username);
  });

  it('should be able to unfollow the followed user', () => {
    // eslint-disable-next-line max-len
    cy.registerSecondUser(secondUser.email, secondUser.username, secondUser.password);
    cy.register(user.email, user.username, user.password);
    userPage.visit(secondUser.username);

    cy.get('h4').should('contain', secondUser.username);

    userPage.clickFollowBtn(secondUser.username);
    userPage.clickUnfollowBtn(secondUser.username);

    userPage.assertUnfollowingUser(secondUser.username);
  });
});
