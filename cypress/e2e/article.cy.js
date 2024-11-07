
import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let article;

  before(() => {
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear'); 
  });

  it('should be created using New Article form', () => {
    articlePage.visitNewArticlePage();
    articlePage.createArticle(article.title, article.description, article.body);

    cy.contains(article.title).should('be.visible'); // Verify the article is created
  });

  it('should be edited using Edit button', () => {
    articlePage.visitEditArticlePage(article.slug);
    articlePage.editArticle('Updated Title', 'Updated Description', 'Updated Body');

    cy.contains('Updated Title').should('be.visible'); // Verify the article is updated
  });

  it('should be deleted using Delete button', () => {
    articlePage.visitArticlePage(article.slug);
    articlePage.deleteArticle();

    cy.contains('No articles are here... yet.').should('be.visible'); // Verify the article is deleted
  });
});
