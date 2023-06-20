/// <reference types="cypress" />
/// <reference types="../support" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticleEditorPageObject from '../support/pages/articleEditor.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articleEditPage = new ArticleEditorPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
    cy.login(user.email, user.username, user.password);
    cy.task('generateArticle')
      .then(generateArticle => {
        article = generateArticle;
      });
  });

  it('should be created using New Article form', () => {
    articleEditPage.visit();
    articleEditPage.typeArticleTitleField(article.title);
    articleEditPage.typeArticleDescriptionField(article.description);
    articleEditPage.typeArticleBodyField(article.body);
    articleEditPage.publishArticleBtn.click();
    articlePage.articleTitle.should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    articleEditPage.visit();
    cy.createArticle(article.title, article.description, article.body).then((respons) => {
      const slug = respons.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    });
    articlePage.clickOnEditBtn();
    articleEditPage.typeArticleTitleField('new title');
    articleEditPage.typeArticleDescriptionField('new description');
    articleEditPage.typeArticleBodyField('new body');
    articleEditPage.publishArticleBtn.click();
    articlePage.articleTitle.should('contain', 'new title');
  });

  it('should be deleted using Delete button', () => {
    articleEditPage.visit();
    cy.createArticle(article.title, article.description, article.body).then((respons) => {
      const slug = respons.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
      articlePage.clickOnDeleteBtn();
      homePage.cheackArticlesList();
    });
  });
});
