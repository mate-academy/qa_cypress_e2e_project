/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import userPageObject from '../support/pages/user.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const userPage = new userPageObject();
const settingsPage = new SettingsPageObject();

describe('User', () => {
  let userForFollow;
  let userFollower;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      userForFollow = generateUser;
      cy.log(userForFollow.username)
    });
    cy.task('generateUser').then(generateUser => {
      userFollower = generateUser;
      cy.log(userFollower.username)
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(userForFollow.email, userForFollow.username, userForFollow.password);
    cy.wait(1000);
    // settingsPage.visit();
    // cy.contains('.btn', 'Or click here to logout.').click();
    // cy.wait(1000);

    cy.login(userFollower.email, userFollower.username, userFollower.password);

    cy.visit(`http://localhost:1667/#/@${userForFollow.username}/`);
    cy.wait(1000);
//  userPage.username.should('contain', userForFollow.username);
    cy.contains('.user-info button', 'Follow').click();
    cy.get('.user-info button').should('contain', 'Unfollow');
  });
});
