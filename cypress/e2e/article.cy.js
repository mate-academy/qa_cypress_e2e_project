/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('Article page', () => {
  let user;
  let article;
  let newArticle;
  const noArticlesMessage = 'No articles are here... yet.';
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.username, user.email, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    })
    cy.task('generateNewArticle').then((generateNewArticle) => {
      newArticle = generateNewArticle;
    })
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.fillTitleField(article.title);
    articlePage.fillDescriptionField(article.description);
    articlePage.fillArticleBodyTextarea(article.body);
    articlePage.fillTagsField(article.tag);
    articlePage.clickPublishArticleBtn();

    homePage.visit();
    //cy.visit('/#/my-feed');
    homePage.assertArticlePreviewCardContainsTitle(article.title);
    homePage.assertArticlePreviewCardContainsDescription(article.description);
    
    cy.visit(`/#/@${user.username}`)
    homePage.assertArticlePreviewCardContainsTitle(article.title);
    homePage.assertArticlePreviewCardContainsDescription(article.description);

    cy.visit(`/#/articles/${article.title}`);
    articlePage.assertArticlePageContainsTitle(article.title);
    articlePage.assertArticlePageContainsBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag);

    cy.visit(`/#/editor/${article.title}`);
    articlePage.fillTitleField(newArticle.title);
    articlePage.fillDescriptionField(newArticle.description);
    articlePage.fillArticleBodyTextarea(newArticle.body);
    articlePage.fillTagsField(newArticle.tag);
    articlePage.clickPublishArticleBtn();

    cy.visit('/#/my-feed');
    homePage.assertArticlePreviewCardContainsTitle(newArticle.title);
    homePage.assertArticlePreviewCardContainsDescription(newArticle.description);
    
    cy.visit(`/#/@${user.username}`)
    homePage.assertArticlePreviewCardContainsTitle(newArticle.title);
    homePage.assertArticlePreviewCardContainsDescription(newArticle.description);

    cy.visit(`/#/articles/${newArticle.title}`);
    articlePage.assertArticlePageContainsTitle(newArticle.title);
    articlePage.assertArticlePageContainsBody(newArticle.body);

  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag);

    articlePage.clickDeleteArticleBtn();

    cy.visit(`/#/@${user.username}`)
    articlePage.assertArticlePreviewSectionContainsNoArticlesMessage(noArticlesMessage);
    articlePage.assertArticlePreviewSectionDoesntContainArticleTitle(article.title);

  });
});
