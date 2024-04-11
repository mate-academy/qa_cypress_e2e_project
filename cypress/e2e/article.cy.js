/// <reference types='cypress' />
/// <reference types='../support' />

import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import HomePageObject from '../support/pages/home.pageObject'

const newArticlePage = new NewArticlePageObject;
const articlePage = new ArticlePageObject;
const profilePage = new ProfilePageObject;
const homePage = new HomePageObject;

describe('Article', () => {
  let article;
  let secondArticle;
  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
    cy.task('generateArticle').then(generateArticle => {
      secondArticle = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.visit('/#/editor');

    // filling the article's fields with data
    newArticlePage.typeArticleTitle(article.title);
    newArticlePage.typeArticleDescription(article.description);
    newArticlePage.typeArticleBody(article.body);
    newArticlePage.typeArticleTag(article.tag);
    newArticlePage.clickOnSubmitButton;

    // asserting entered data in the article's fields
    articlePage.checkArticleTitle(article.title);
    articlePage.checkArticleBody(article.body);
    articlePage.clickOnUsernameInArticle;
    profilePage.checkArticleDescription(article.description);  
  });

  it('should be edited using Edit button', () => {
    cy.createArticleViaUi(article);

    articlePage.clickOnEditArticleButton;

    // filling the article's field with new data
    newArticlePage.typeArticleTitle(secondArticle.title);
    newArticlePage.typeArticleDescription(secondArticle.description);
    newArticlePage.typeArticleBody(secondArticle.body);
    newArticlePage.typeArticleTag(secondArticle.tag);
    newArticlePage.clickOnSubmitButton;

    // asserting edited data in the article's fields
    articlePage.checkArticleTitle(secondArticle.title);
    articlePage.checkArticleBody(secondArticle.body);
    articlePage.clickOnUsernameInArticle;
    profilePage.checkArticleDescription(secondArticle.description); 
  });

  it('should be deleted using Delete button', () => {
    cy.createArticleViaUi(article);

    articlePage.clickOnDeleteArticleButton;

    homePage.articlePreview
      .should('contain.text', 'No articles are here... yet.');
  });
});
