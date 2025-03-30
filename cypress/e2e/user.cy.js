/// <reference types='cypress' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let firstUser;
  let secondUser;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateUser').then((generateUser) => {
      firstUser = generateUser;
      cy.createArticle(firstUser.username,
        firstUser.email,
        firstUser.password,
        article.body,
        article.description,
        article.title);
    });
    cy.task('generateUser').then((generateUser) => {
      secondUser = generateUser;
      cy.register(secondUser.email, secondUser.username, secondUser.password);
    });
  });

  it('should be able to follow the another user', () => {
    signInPage.visit();
    signInPage.typeEmail(secondUser.email);
    signInPage.typePassword(secondUser.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(secondUser.username);

    userPage.clickAuthorLink();
    userPage.clickFollowButoon();
  });
});
