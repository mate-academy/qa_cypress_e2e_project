/// <reference types='cypress' />
/// <reference types='../support' />

describe('Article', () => {
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.visit('/#/login');
  });

  it('should be created using New Article form', () => {
    let user;

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.request('POST', 'http://localhost:1667/users', {
        email: user.email,
        username: user.username,
        password: user.password
      });

      cy.getByDataCy('login-email-input').type(user.email);
      cy.getByDataCy('login-password-input').type(user.password);
      cy.getByDataCy('signin-button').click(); 

      cy.getByDataCy('navbar-username').should('contain', user.username);

      cy.get('[data-cy="new-article"]').click();

      let article;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;

        cy.getByDataCy('article-title').type(article.title);
        cy.getByDataCy('article-description').type(article.description);
        cy.getByDataCy('article-body').type(article.body);
        cy.get('.ti-new-tag-input').type(article.tag + '{enter}');
        cy.get('[data-cy="publish-article-btn"]').click();
        cy.url().should('eq', http://localhost:1667/#/articles/${article.title});
        cy.get('[data-qa="autor"]').should('include.text', user.username);

      });
    });
  });
});
