/* eslint-disable cypress/no-unnecessary-waiting */
// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';

const homePage = new HomePageObject();
const createArticle = new CreateArticlePageObject();
const editArticle = new EditArticlePageObject();

describe('Article', () => {
  let article;
  beforeEach(() => {
    cy.task('db:clear');

    cy.register();
    cy.visit('#/login');
    cy.signIn();

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.wait(5000);
    createArticle.visit();
    cy.wait(5000);
    createArticle.typeTitle(article.title);
    createArticle.typeDescription(article.description);
    createArticle.typeBody(article.body);
    createArticle.typeTag(article.tag);
    createArticle.publishArticle(article.publishArticle);

    createArticle.assertArticleTitleExists(article.title);
    createArticle.assertArticleBodyMatches(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.wait(5000);
    cy.newArticle(article);
    cy.wait(5000);
    createArticle.assertArticleTitleExists(article.title);
    createArticle.assertArticleBodyMatches(article.body);

    editArticle.editArticle();
    editArticle.editTitle(article.title);
    editArticle.editDescription(article.description);
    editArticle.editBody(article.body);
    editArticle.editTag(article.tag);
    editArticle.publishArticle();

    createArticle.assertArticleTitleExists(article.title);
    createArticle.assertArticleBodyMatches(article.body);
  });

  it('should be deleted using Delete button', () => {
    cy.wait(5000);
    cy.newArticle(article);
    cy.wait(5000);
    createArticle.assertArticleTitleExists(article.title);
    createArticle.assertArticleBodyMatches(article.body);

    createArticle.deleteArticle();
    // eslint-disable-next-line max-len
    createArticle.assertDeletedArticleMessage('Deleted the article. Going home...');
    homePage.assertMainPageUrl();
    homePage.assertMainPageLogo();
    homePage.assertMainPageLogoText();
  });
});
