/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ArticleFormPageObject from '../support/pages/articleForm.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import PopUpPageObject from '../support/pages/popUp.pageObjects';

const homePage = new HomePageObject();
const articleFormPage = new ArticleFormPageObject();
const articlePage = new ArticlePageObject();
const popUpObject = new PopUpPageObject();

describe('Article tests', () => {
  before(() => {});

  beforeEach(() => {
    cy.task('db:clear');
    homePage.logInProcess();
  });

  it('should be created using New Article form', () => {
    homePage.newArticleBtnClick();
    articleFormPage.fieldsFillingProcess();

    articleFormPage.assertion();
  });

  it('should not be created using New Article form without title', () => {
    homePage.newArticleBtnClick();
    articleFormPage.fieldsFillingProcess('without title');

    popUpObject.popUpAssert('article: failed');
  });

  it('should be edited using Edit button', () => {
    articlePage.articleCreationProcess();
    homePage.goToTheArticle();

    articlePage.editBtn0Click();
    homePage.urlAssertion('edit article page');
  });

  it('should be deleted using Delete button', () => {
    articlePage.articleCreationProcess();
    homePage.goToTheArticle();

    articlePage.deleteBtn0Click();
    articlePage.deleteAssertion();
  });
});
