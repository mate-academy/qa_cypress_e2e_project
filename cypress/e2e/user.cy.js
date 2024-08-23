/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import SetingsPageObject from '../support/pages/settings.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const articlePage = new ArticlePageObject();
const userPage = new UserPageObject();
const settingsPage = new SetingsPageObject();

describe('User', () => {
  let user;
  let newuser;
  let article;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

    cy.task('generateUser').then((generateUser) => {
      newuser = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');

    cy.register(user.email, user.username, user.password);

    cy.signIn(user.email, user.password);

    articlePage.newArticleLinkClick();

    cy.newArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    );

    settingsPage.settingsLinkClick();
    settingsPage.logOutBtn;
  });

  // bug
  it('should be able to follow the another user', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('error is not defined')) {
        return false;
      }
      return true;
    });
    cy.register(newuser.email, newuser.username, newuser.password);

    cy.signIn(newuser.email, newuser.password);
    userPage.yourFeedClick();
    userPage.userAutorClick();
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });

    userPage.followBtn();

    cy.get('@consoleError').should(
      'be.calledWithMatch',
      '[vuex] unknown action type: setFollowProfile'
    );
  });
});
