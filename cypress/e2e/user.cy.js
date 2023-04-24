/// <reference types="cypress" />
/// <reference types="../support" />

describe('User', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generatedUser => {
      user = generatedUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });   
  });

  it('should be able to follow the another user', () => {
    let userEmail = 'riot@qa.team';
    let userPassword = '12345Qwert!';
    let userUsername = 'riot';

    cy.intercept('POST', '/users')
      .as('register');
    
    cy.visit('/register')

    cy.getByDataCy('sign-up-input-username')
      .type(user.username);
    cy.getByDataCy('sign-up-input-email')
      .type(user.email);
    cy.getByDataCy('sign-up-input-password')
      .type(user.password);
    cy.getByDataCy('sign-up-button')
      .click();

    cy.wait('@register');

    cy.get('.swal-text')
      .should('have.text', 'Your registration was successful!');
    cy.getByDataCy('username-link')
      .should('contain', user.username)
    cy.get('.swal-button')
      .click();

    cy.visit('/editor');

    cy.createArticle(article.title, article.description, article.body) 
      .then(response => {
    cy.visit(`/articles/${response.body.article.slug}`)
    });
    cy.contains(article.title)
      .should('be.visible');
      cy.url()
      .should('include', '/articles/' + article.title);

      cy.visit('/settings');

      cy.getByDataCy('user-logout-button')
      .click();

    cy.url()
      .should('include', '/');
    cy.getByDataCy('sign-in-link')
      .should('be.visible');
    cy.getCookie('drash_sess')
      .should('have.property', 'value', 'null');

      cy.visit('/login')
    cy.getByDataCy('email-sign-in')
      .type(userEmail);
    cy.getByDataCy('password-sign-in')
      .type(userPassword);
    cy.getByDataCy('sign-in-btn')
      .click();
    
    cy.getByDataCy('username-link')
      .should('contain', userUsername);
    cy.url()
      .should('include', '/');

    cy.contains(user.username)
    .should('be.visible').click();
    cy.getByDataCy(follow-button).click();
  });
    
  it('should be able to unfollow the another user', () => {
    let userEmail = 'riot@qa.team';
    let userPassword = '12345Qwert!';
    let userUsername = 'riot';

    cy.intercept('POST', '/users')
      .as('register');
    
    cy.visit('/register')

    cy.getByDataCy('sign-up-input-username')
      .type(user.username);
    cy.getByDataCy('sign-up-input-email')
      .type(user.email);
    cy.getByDataCy('sign-up-input-password')
      .type(user.password);
    cy.getByDataCy('sign-up-button')
      .click();

    cy.wait('@register');

    cy.get('.swal-text')
      .should('have.text', 'Your registration was successful!');
    cy.getByDataCy('username-link')
      .should('contain', user.username)
    cy.get('.swal-button')
      .click();

    cy.visit('/editor');

    cy.createArticle(article.title, article.description, article.body) 
      .then(response => {
    cy.visit(`/articles/${response.body.article.slug}`)
    });
    cy.contains(article.title)
      .should('be.visible');
      cy.url()
      .should('include', '/articles/' + article.title);

      cy.visit('/settings');

      cy.getByDataCy('user-logout-button')
      .click();

    cy.url()
      .should('include', '/');
    cy.getByDataCy('sign-in-link')
      .should('be.visible');
    cy.getCookie('drash_sess')
      .should('have.property', 'value', 'null');

      cy.visit('/login')
    cy.getByDataCy('email-sign-in')
      .type(userEmail);
    cy.getByDataCy('password-sign-in')
      .type(userPassword);
    cy.getByDataCy('sign-in-btn')
      .click();
    
    cy.getByDataCy('username-link')
      .should('contain', userUsername);
    cy.url()
      .should('include', '/');

    cy.contains(user.username)
    .should('be.visible').click();
    cy.getByDataCy(follow-button).click();
  }); 

  cy.getByDataCy(unfollow-button).click();
});
