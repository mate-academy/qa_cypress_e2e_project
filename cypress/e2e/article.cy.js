/// <reference types="cypress" />
/// <reference types="../support" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });

    cy.task('db:clear').then(() => {
      signInPage.visit();
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    articlePage.clickOnNewArticleLink();
  });

  it('should be created using New Article form', () => {
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.clickPublishArticleBtn();

    articlePage.getArticleTitle().should('contain', article.title);
    articlePage.getArticleBody().should('contain', article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticleAsUser(article.title, article.description, article.body);
    articlePage.clickOnArticle(article.title);
    articlePage.clickEditArticle();

    const updatedTitle = `${article.title} - Edited`;
    articlePage.typeArticleTitle(updatedTitle);
    articlePage.clickPublishArticleBtn();

    articlePage.getArticleTitle().should('contain', updatedTitle);
  });

  it.only('should be deleted using Delete button', () => {
    cy.createArticleAsUser(article.title, article.description, article.body);
    articlePage.clickOnArticle(article.title);
    articlePage.clickDeleteArticle();

    homePage.assertArticleDoesNotExist(article.title);
  });
});
