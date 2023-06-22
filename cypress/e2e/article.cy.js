/// <reference types="cypress" />
/// <reference types="../support" />

import ArticleEditPageObject from '../support/pages/articleEdit.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';


const articleEditPage = new ArticleEditPageObject();
const articlePage = new ArticlePageObject();
const newArticlePage = new NewArticlePageObject();
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
    newArticlePage.typeArticleTitle(article.title);
    newArticlePage.typeArticleDescription(article.description);
    newArticlePage.typeArticleBody(article.body);
    newArticlePage.typeArticleTag(article.tag);
    newArticlePage.clickPublishArticle();
    articlePage.checkArticleTitle(article.title);
    articlePage.checkArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(user.email, user.username, user.password, article.title, article.description, article.body, article.tag
    ).then((response) => {
      const slug =response.body.article.slug;

      cy.visit(`/#/articles/${slug}`);
    });

    articlePage.clickEditArticle();
    articleEditPage.typeNewArticleTitle(newArticle.title);
    articleEditPage.typeNewArticleDescription(newArticle.description);
    articleEditPage.typeNewArticleBody(newArticle.body);
    articleEditPage.typeNewArticleTag(newArticle.tag);
    articleEditPage.clickPublishArticle();
    articlePage.checkArticleTitle(article.title);
    articlePage.checkArticleBody(article.body);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(user.email, user.username, user.password, article.title, article.description, article.body, article.tag
      ).then((response) => {
        const slug =response.body.article.slug;
  
        cy.visit(`/#/articles/${slug}`);
      });

    articlePage.clickDeleteActicle();
    homePage.assertHomePageUrl();
  });
});
