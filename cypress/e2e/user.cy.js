/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Following and unfollowing the user', () => {
  let user;
  let user2;
  let article;
  // const user = {
  //   email: 'test@mail.com',
  //   password: '12345'
  // };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    
  });

  // eslint-disable-next-line max-len
  it('should provide an ability to follow and unfollow the another user', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.login('testQA@qa.com', 'testQA', user.password);

    homePage.visit();
    cy.getByDataCy('global-feed-btn').click();
    cy.getByDataCy('user').contains(user.username).click();
    cy.url().should('contain', 'profile');
    cy.getByDataCy('follow/unfollow').click();
    cy.getByDataCy('follow/unfollow').should('contain', 'Unfollow');
    cy.getByDataCy('follow/unfollow').click();
    cy.getByDataCy('follow/unfollow').should('contain', 'Follow');
  });
});
