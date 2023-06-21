/// <reference types="cypress" />
/// <reference types="../support" />

describe('Article', () => {
  let article;
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.visit('/editor');
  });
});
  it('should be edited using Edit button', () => {

  });

  it('should be deleted using Delete button', () => {

  });
});
