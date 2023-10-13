/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();
const userPage = new UserPageObject();

let element;
let user;
let otherUser;
let text;

describe('User', () => {
  before(() => {
    cy.allure()
      .feature('Follow/Unfollow user')
      .epic('Logged in user');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('customVariables').then((customVariables) => {
      element = customVariables;
    });
    cy.task('generateUser').then((generateUser) => {
      otherUser = generateUser;
    });
    cy.task('websiteText').then((websiteText) => {
      text = websiteText;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.registerUser(user);
    signInPage.loginUser(otherUser);
    userPage.openPage(element.url.user, user.username);
  });

  it('should be able to follow the another user', () => {
    userPage.assertData(element.button.follow, `${text.follow} ${user.username}`);
    userPage.clickOnButton(element.button.follow);
    userPage.assertData(element.button.unfollow, `${text.unfollow} ${user.username}`);
  });

  it('should be able to follow the another user', () => {
    userPage.clickOnButton(element.button.follow);
    userPage.assertData(element.button.unfollow, `${text.unfollow} ${user.username}`);
    userPage.clickOnButton(element.button.unfollow);
    userPage.assertData(element.button.follow, `${text.follow} ${user.username}`);
  });
});
