/// <reference types='cypress' />
/// <reference types='../support' />
import EditArticlePageObject from "../support/pages/editArticle.PageObject";
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
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      articleData = generateArticle;
    });
    cy.task('generateArticle').then((generateArticle) => {
      updateArticleData = generateArticle;
    });
    cy.login();
    editArticlePage.visit();
  });

  it('should be created using New Article form', () => {
    editArticlePage.createArticle(articleData.title, articleData.description, articleData.body, articleData.tag);
    articlePage.accertArticleCreated(articleData.title, articleData.description, username);
  });

  it('should be edited using Edit button', () => {
    editArticlePage.createArticle(articleData.title, articleData.description, articleData.body, articleData.tag);
    articlePage.clickEditArticleBtn();
    editArticlePage.updateArticle(updateArticleData.title, updateArticleData.description, updateArticleData.body, updateArticleData.tag);
    articlePage.accertArticleUpdated(updateArticleData.title, updateArticleData.description, username);
  });

  it('should be deleted using Delete button', () => {
    editArticlePage.createArticle(articleData.title, articleData.description, articleData.body, articleData.tag);
    articlePage.clickDeleteArticleBtn();
    homePage.accertAbsentArticle(articleData.title);
  });
});
