/// <reference types='cypress' />
/// <reference types='../support' />
import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';

const createArticlePage = new CreateArticlePageObject();
const articlePage = new ArticlePageObject();
const editArticle = new EditArticlePageObject();

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

    createArticlePage.visit();

    createArticlePage.addTitle(article.title);

    createArticlePage.addDescription(article.description);

    createArticlePage.addBody(article.body);

    createArticlePage.addTags(article.tag);

    createArticlePage.clickOnThePublish();

    cy.get('h1').should('contain', article.title);

    cy.url().should('include', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);

    cy.newArticle(article);

    articlePage.assertArticleTitle();

    articlePage.assertArticleBody();

    articlePage.clickOnTheEditBtn();

    editArticle.editTitle(article.title);

    editArticle.editDescription(article.description);

    editArticle.editBody(article.body);

    editArticle.editTags(article.tag);

    editArticle.clickOnThePublish();

    cy.get('h1').should('contain', article.title);

    cy.url().should('include', article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);

    cy.newArticle(article);

    articlePage.clickOnTheDeleteBtn();

    cy.url().should('include', '/#/');

    cy.get('h1').should('contain.text', 'conduit');

    cy.get('p').should('contain.text', 'A place to share your knowledge.');
  });
});
