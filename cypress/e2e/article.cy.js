/// <reference types='cypress' />
/// <reference types='../support' />
import faker from 'faker';
import ArticlePageObject from "../support/pages/article.pageObject";
import HomePageObject from '../support/pages/home.pageObject';
const ArticlePage = new ArticlePageObject();
const HomePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

    cy.register(user.email, user.username, user.password);

    cy.task("generateArticle").then((generateArticle) => {
        article = generateArticle;
      });

    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    ArticlePage.visit();

    ArticlePage.typeTitle(article.title);
    ArticlePage.typeDescription(article.description);
    ArticlePage.typeBody(article.body);
    ArticlePage.typeTags(article.tag);
    ArticlePage.clickPublishBtn();
    ArticlePage.textCheckTitle(article.title);
    ArticlePage.textCheckBody(article.body); 
  });

  it('should be edited using Edit button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createNewArticle(article.title, article.description, article.body);
    const newTitle = "new title";

    ArticlePage.clickOnBtnEdit();
    ArticlePage.clearTitleField();
    ArticlePage.typeTitle(newTitle);
    ArticlePage.clickPublishBtn();

    ArticlePage.textCheckTitle(newTitle);

  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createNewArticle(article.title, article.description, article.body);

    ArticlePage.clickOnDeleteArticle();

    HomePage.clickOnYourFeed();
    HomePage.assertYourFeedArticle(article.title);
  });
});
