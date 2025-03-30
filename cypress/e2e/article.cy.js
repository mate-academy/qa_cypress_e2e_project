/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import articlePageObject from '../support/pages/article.pageObject';


const articlePage = new articlePageObject();
const signInPage = new SignInPageObject();


describe('Article page', () => {
  let user;
  let article;
  
  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    })
    .then(() => {
    cy.register(user.email, user.username, user.password);
    cy.logIn(user.email, user.password);

  });
  });

  it('should be created using New Article form', () => {
    cy.wait(1000);
    cy.visit('/#/editor')
    cy.createArticle(article.title, article.description, article.body); 
  });

  it('should be edited using Edit button', () => {
    cy.wait(1000);
    cy.visit('/#/editor')
    cy.createArticle(article.title, article.description, article.body); 
    articlePage.edidBtn();
    cy.createArticle(article.title, article.description, article.body); 
  });

  it('should be deleted using Delete button', () => {
    cy.wait(1000);
    cy.visit('/#/editor')
    cy.createArticle(article.title, article.description, article.body); 
    articlePage.deleteBtn();   
  });
});
