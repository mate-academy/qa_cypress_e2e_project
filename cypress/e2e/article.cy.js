/// <reference types="cypress" />
/// <reference types="../support" />
import NewArticlePageObject from '../support/pages/editArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const newArticlePage = new NewArticlePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let testData;
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login();
    cy.task('generateArticle')
      .then(generateArticle => {
        article = generateArticle;
  });

  it('should be created using New Article form', () => {
    newArticlePage.visit();
    newArticlePage.articleTitleField.type(article.title);
    newArticlePage.articleDescriptionField.type(article.description);
    newArticlePage.articleBodyField.type(article.body);
    newArticlePage.articleTagField.type(article.tag);
    newArticlePage.submitBtn.click();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
  });

  it('should be deleted using Delete button', () => {

  });
});
