/// <reference types='cypress' />
/// <reference types='../support' />
import ArticleEditPageObject from '../support/pages/articleEdit.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articleEditPage = new ArticleEditPageObject();
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
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });
  });

  it('should be created using New Article form', () => {
    articleEditPage.visit();
    articleEditPage.typeTitle(article.title);
    articleEditPage.typeDescription(article.description);
    articleEditPage.typeBody(article.body);
    articleEditPage.clickOnPublish();
    articleEditPage.assertArticleTitle(article.title);
    cy.url().should('include', `articles/${article.title}`);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body);
    articleEditPage.clickOnEditBtn();
    articleEditPage.typeTitle(`{selectAll}${article.newTitle}`);
    articleEditPage.clickOnPublish();
    articleEditPage.assertArticleTitle(article.newTitle);
    cy.url().should('include', `articles/${article.newTitle}`);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description,
      article.body, article.tag);

    articleEditPage.clickOnDeleteBtn();
    homePage.assertNoArticles();
  });
});
