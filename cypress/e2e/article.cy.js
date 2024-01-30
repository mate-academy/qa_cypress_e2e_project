/// <reference types='cypress' />
/// <reference types='../support' />

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    cy.visit('#/editor');
    cy.getByDataCy('ArticleTitleQA').type(article.title);
    cy.getByDataCy('ArticleDescriptionQA').type(article.description);
    cy.getByDataCy('WriteArticleQA').type(article.body);
    cy.get('.vue-tags-input').type(article.tag);
    cy.getByDataCy('PublishArticleButtonQA').click();
    cy.getByDataCy('ArticleBodyQA').should('contain', article.body);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
      cy.getByDataCy('EditArticleButtonQA').eq(0).click();
      cy.getByDataCy('ArticleTitleQA').clear().type('New Article Title');
      cy.getByDataCy('PublishArticleButtonQA').click();
      cy.get('.banner h1').should('contain', 'New Article Title');
    });
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
      cy.getByDataCy('DeleteArticleButtonQA').eq(0).click();
      cy.intercept('GET', '**/*').as('getPage');
      cy.visit(`/#/articles/${slug}`);
      cy.wait('@getPage').its('response.statusCode').should('eq', 200);
    });
  });
});
