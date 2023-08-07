/// <reference types='cypress' />
/// <reference types='../support' />
import NewArticlePageObject
  from '../support/pages/newArticle.pageObject.js';
import HomePageObject
  from '../support/pages/home.pageObject';
import ArticlePageObject
  from '../support/pages/article.pageObject.js';

const newArticle = new NewArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

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
    cy.visit('/');
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    newArticle.visit();
    newArticle.typeTitle(article.title);
    newArticle.typeDescription(article.description);
    newArticle.typeBody(article.body);
    newArticle.typeTag(article.tag);
    newArticle.clickPubArtBtn();

    newArticle.assertNewArticleUrl(article.title);
  });

  it('should be edited using Edit button', () => {
    newArticle.createArticle(user, article.title,
      article.description,
      article.body,
      article.tag);

    newArticle.assertNewArticleUrl(article.title);
    articlePage.clickEditButton();

    newArticle.typeTitle(article.title);
    newArticle.typeDescription(article.description);
    newArticle.typeBody(article.body);
    newArticle.typeTag(article.tag);
    newArticle.clickPubArtBtn();

    newArticle.assertNewArticleUrl(article.title);
  });

  it('should be deleted using Delete button', () => {
    newArticle.createArticle(user, article.title,
      article.description,
      article.body,
      article.tag);

    newArticle.assertNewArticleUrl(article.title);
    articlePage.clickDeleteButton();
    homePage.assertHomePageUrl();
  });
});
