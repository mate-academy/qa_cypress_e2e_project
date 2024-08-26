// /// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let article;
  let user;
  let newuser;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });

    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });

    cy.task('generateUser').then((generatedUser) => {
      newuser = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');

    cy.register(user.email, user.username, user.password);

    cy.signIn(user.email, user.password);

    homePage.clickOnnewArticleLink();

    cy.newArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    );
  });

  // It is a bug
  it('should be able to follow another user', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('error is not defined')) {
        return false;
      }
      return true;
    });

    cy.register(newuser.email, newuser.username, newuser.password);
    cy.signIn(user.email, user.password);

    userPage.yourFeedClick();
    userPage.userAutorClick();

    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });

    userPage.followBtn();

    cy.get('@consoleError').should('be.calledWithMatch', '[vuex] unknown action type: setFollowProfile');
  });
});
