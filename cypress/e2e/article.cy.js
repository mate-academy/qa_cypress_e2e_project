/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import './../support/commands.js'

const signInPage = new SignInPageObject();

describe('Article', () => {
  let user;

  before(() => {
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
  
      expect(user).to.exist;
  
      signInPage.visit();
      cy.register(user.email, user.username, user.password);
  
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      cy.wait(2000)
    });
  });

  it('should be created, deleted and edited', () => {
    cy.createArticle();
    
    // edit article
    cy.editArticle();

    // delete article
    cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger').as('deleteButton')
    
    cy.get('@deleteButton').click()
    cy.get('div.article-preview').should('contain', 'No articles are here... yet.')
  });
});
