/// <reference types="cypress" />
/// <reference types="../support" />

import faker from 'faker';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/userPage.pageObject';
import EditArticlePageObjectePageObject from '../support/pages/editArticle.pageObject';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const editArticlePage = new EditArticlePageObjectePageObject();

const user1 = {
  username: 'riot1',
  email: 'riot1@qa.team',
  password: '12345Qwert!'
};

const user2 = {
  username: 'riot2',
  email: 'riot2@qa.team',
  password: '12345Qwert!'
};

describe('User', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it.only('should be able to follow and unfollow the another user', () => {

    cy.register(
      user1.email,
      user1.username,
      user1.password
    );
    cy.register(
      user2.email,
      user2.username,
      user2.password
    );

    signInPage.visit();

    userPage.emailField.type(user1.email)
    userPage.passwordField.type(user1.password);
    userPage.clickSubmitButton.click();
    homePage.assertUsernameLink(user1.username);
    cy.visit('#/editor')
    userPage.newArticleTitle.type(faker.random.word());
    userPage.newArticleDescription.type(faker.random.words());
    userPage.newArticleBody.type(faker.random.words());
    userPage.newArticleTags.eq(0).type(faker.random.word());
    editArticlePage.submitBtn.click();
    cy.wait(5000);
    cy.visit('#/my-feed');
    userPage.settingsLink.click();
    userPage.logoutButton.click();

    signInPage.visit();
    userPage.emailField.type(user2.email)
    userPage.passwordField.type(user2.password);
    userPage.clickSubmitButton.click();
    homePage.assertUsernameLink(user2.username);
    cy.visit('#/my-feed');
    userPage.followUnfollowButton.click();
    userPage.followedCounter.should('contain', '1');

    userPage.followUnfollowButton.click();
    userPage.followedCounter.should('contain', '0');
  });

});
