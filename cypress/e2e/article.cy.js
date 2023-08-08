/// <reference types='cypress' />
/// <reference types='../support' />
import ArticleEditPageObject from '../support/pages/articleEdit.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const ArticleEditPage = new ArticleEditPageObject();
const homePage = new HomePageObject();

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
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);

    ArticleEditPage.visit();
    ArticleEditPage.typeTitle(article.title);
    ArticleEditPage.typeDescription(article.description);
    ArticleEditPage.typeBody(article.body);
    ArticleEditPage.clickOnPublish();
    ArticleEditPage.assertArticleTitle(article.title);
    cy.url().should('include', `articles/${article.title}`);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.createArticle(article.title, article.description, article.body);

    ArticleEditPage.clickOnEditBtn();
    ArticleEditPage.typeTitle(`{selectAll}${article.newTitle}`);
    ArticleEditPage.clickOnPublish();
    ArticleEditPage.assertArticleTitle(article.newTitle);
    cy.url().should('include', `articles/${article.newTitle}`);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.createArticle(article.title, article.description,
      article.body, article.tag);

    ArticleEditPage.clickOnDeleteBtn();
    homePage.checkArticlesList();
  });
});
