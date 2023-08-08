/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';

const homePage = new HomePageObject();
const createArticle = new CreateArticlePageObject();
const editArticle = new EditArticlePageObject();

describe('Article', () => {
  let article;
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);

    createArticle.visit();
    createArticle.typeTitle(article.title);
    createArticle.typeDescription(article.description);
    createArticle.typeBody(article.body);
    createArticle.typeTag(article.tag);
    createArticle.publishArticle(article.publishArticle);

    createArticle.assertArticleTitleExists(article.title);
    createArticle.assertArticleBodyMatches(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.newArticle(article);

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
    cy.register(user.email, user.username, user.password);
    cy.newArticle(article);

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
