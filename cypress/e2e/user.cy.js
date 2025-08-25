/// <reference types="cypress" />
import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import { faker } from '@faker-js/faker';

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();

describe('User authentication and follow', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Pass12345!'
    };

    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should log out and log back in', () => {
    userPage.logout();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    userPage.usernameLink.should('contain', user.username);
  });

  it('should follow and unfollow a user', () => {
    const otherUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Pass12345!'
    };
    cy.register(otherUser.email, otherUser.username, otherUser.password);

    userPage.visit(otherUser.username);
    userPage.follow();
    userPage.assertFollowed();

    userPage.unfollow();
    userPage.assertUnfollowed();
  });
});
