/// <reference types="cypress" />
/// <reference types="../support" />

import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import ArticleEditPageObject from '../support/pages/articleEdit.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const newArticlePage = new NewArticlePageObject();
const articlePage = new ArticlePageObject();
const articleEditPage = new ArticleEditPageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;
  let newArticle;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });

    cy.task('generateNewArticle').then(generateNewArticle => {
      newArticle = generateNewArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);

    newArticlePage.visit();

    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTags(article.tag);

    newArticlePage.clickPublishArticle();

    articlePage.checkTitleArticle(article.title);
    articlePage.checkBodyArticle(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(
                      user.email, 
                      user.username, 
                      user.password, 
                      article.title, 
                      article.description, 
                      article.body, 
                      article.tag
      ).then((response) => {
          const slug =response.body.article.slug;

          cy.visit(`/#/articles/${slug}`);
        });
    
    articlePage.clickEditArticle();

    articleEditPage.typeNewTitle(newArticle.title);
    articleEditPage.typeNewDescription(newArticle.description);
    articleEditPage.typeNewBody(newArticle.body);
    articleEditPage.typeNewTags(newArticle.tag);

    articleEditPage.clickPublishArticle();

    articlePage.checkTitleArticle(article.title);
    articlePage.checkBodyArticle(article.body);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(
                      user.email, 
                      user.username, 
                      user.password, 
                      article.title, 
                      article.description, 
                      article.body, 
                      article.tag
      ).then((response) => {
          const slug =response.body.article.slug;

          cy.visit(`/#/articles/${slug}`);
        });
    
    articlePage.clickDeleteArticle();

    homePage.checkHomeUrl();
  });
});
