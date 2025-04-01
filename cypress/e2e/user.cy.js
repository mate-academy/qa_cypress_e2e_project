/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from "../support/pages/signIn.pageObject";
import ArticlePageObject from "../support/pages/article.pageObject";

const articlePage = new ArticlePageObject;

const signInPage = new SignInPageObject();

describe('User', () => {
  let user1;
  let user2;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    signInPage.visit();
    cy.register(user1.email, user1.username, user1.password);
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();

    cy.get(':nth-child(1) > .article-meta > .info > .author').click();

    // cy.visit('/');
    
    // cy.getByDataCy('article').click();
    // articlePage.typeTitle('article.title');
    // articlePage.typeDescription('article.description');
    // articlePage.typeBody('article.body');
    // articlePage.clickSubmit();
    // cy.wait(3000); 
    // cy.getByDataCy('settings').click();
    // cy.visit('/');
    // cy.get(':nth-child(1) > .article-meta > .info > .author').click();
    // cy.get('[data-cy="log-out"]').click();
    // cy.getByDataCy('follow').click();



    // signInPage.visit();
    // cy.register(user2.email, user2.username, user2.password);
    // signInPage.typeEmail(user2.email);
    // signInPage.typePassword(user2.password);
    // signInPage.clickSignInBtn();
    // cy.visit('/');
    // cy.login(user1.email, user1.password);
    // cy.visit(`#/@${user1.username}`);
    // cy.contains(user1.username).should('be.visible');
    // cy.visit(`/#/profile/${user2.username}`);

    // cy.get('.btn-outline-secondary').contains('Follow').click();

    // cy.get('.btn-outline-secondary').contains('Unfollow').should('be.visible');
  });
});
