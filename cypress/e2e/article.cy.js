/// <reference types='cypress' />
/// <reference types='../support' />
import EditArticlePageObject from "../support/pages/editArticle.pageObject";
import ArticlePageObject from "../support/pages/article.PageObject";
import HomePageObject from "../support/pages/home.pageObject";

const editArticlePage = new EditArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let articleData;
  let updateArticleData;
  const username = 'riot';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      articleData = generateArticle;
    });
    cy.task('generateArticle').then((generateArticle) => {
      updateArticleData = generateArticle;
    });
    cy.login();
  });

  it('should create new article', () => {
    editArticlePage.visit();
    editArticlePage.createArticle(articleData.title, articleData.description, articleData.body, articleData.tag);
    articlePage.accertArticleTitle(articleData.title);
    articlePage.accertArticleDescription(articleData.description);
    articlePage.accertAuthorUsername(username);
  });

  it('should be uptated', () => {
    editArticlePage.visit();
    editArticlePage.createArticle(articleData.title, articleData.description, articleData.body, articleData.tag);
    articlePage.clickEditArticleBtn();
    editArticlePage.updateArticle(updateArticleData.title, updateArticleData.description, updateArticleData.body, updateArticleData.tag);
    articlePage.accertArticleTitle(updateArticleData.title);
    articlePage.accertArticleDescription(updateArticleData.description);
    articlePage.accertAuthorUsername(username);
  });

  it('should be deleted', () => {
    editArticlePage.visit();
    editArticlePage.createArticle(articleData.title, articleData.description, articleData.body, articleData.tag);
    articlePage.clickDeleteArticleBtn();
    homePage.accertAbsentArticle(articleData.title);
  });
});