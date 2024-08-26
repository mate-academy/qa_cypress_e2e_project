/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import { title } from 'faker/lib/locales/az';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      const randomSuffix = Date.now();
      user = {
        ...generateUser,
        email: `test${randomSuffix}@mail.com`,
        username: `User${randomSuffix}`,
      };

      cy.register(user.email, user.username, user.password);
      signInPage.visit();

      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
      });

      cy.signIn(user.email, user.password);
      homePage.clickOnnewArticleLink();
    });
  });

  it('should be created using New Article form', () => {
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(article.tag);
    articlePage.clickOnSubmitBtn();

    articlePage.articleTitleBunner.should('contain', article.title);
    articlePage.articleBody.should('contain', article.body);
  });

  it('should be edited using Edit button', () => {
    cy.newArticle(article.title, article.description, article.body);
    articlePage.clickOnEditArticleBtn();
    articlePage.typeArticleTitle(article.title + 'update');
    articlePage.typeArticleBody(article.body + 'update');
    articlePage.clickOnSubmitBtn();
    cy.wait(500);

    articlePage.articleTitleBunner.should('contain', article.title + 'update');
    articlePage.articleBody.should('contain', article.body + 'update');
  });

  it('should be deleted using Delete button', () => {
    cy.newArticle(article.title, article.description, article.body);
    articlePage.clickOnDelitArticleBtn();

    homePage.assertArticleDoesNotExist(article.title);
  });
});
