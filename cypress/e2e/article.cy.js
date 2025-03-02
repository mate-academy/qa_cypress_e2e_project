/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import CreateArticlePage from '../support/pages/articleCreating.pageObject.js';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const createArticlePage = new CreateArticlePage();

describe('Create, update, delete article', () => {
  let article;
  let user;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('db:clear');
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.clickOkBtn();
  });

  it('should be created using New Article form', () => {
    createArticlePage.visit();
    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTags(article.tag);
    createArticlePage.clickArticleCreateBtn();

    homePage.assertArticleIsCreated(article.title);
  });

  it('should be edited title using Edit button', () => {
    createArticlePage.visit();
    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTags(article.tag);
    createArticlePage.clickArticleCreateBtn();

    createArticlePage.clickEditBtn();
    createArticlePage.typeTitle('Checking');
    createArticlePage.clickArticleCreateBtn();

    homePage.assertUpdatedArticleTitle('Checking');
  });

  it('should be edited body using Edit button', () => {
    createArticlePage.visit();
    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTags(article.tag);
    createArticlePage.clickArticleCreateBtn();

    createArticlePage.clickEditBtn();
    createArticlePage.typeBody('Checking');
    createArticlePage.clickArticleCreateBtn();

    homePage.assertUpdatedBody('Checking');
  });

  it('should be deleted using Delete button', () => {
    createArticlePage.visit();
    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTags(article.tag);
    createArticlePage.clickArticleCreateBtn();

    createArticlePage.clickDeleteBtn();
    homePage.assertArticleIsDeleted(article.title);
  });
});
