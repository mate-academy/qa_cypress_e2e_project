/// <reference types='cypress' />
/// <reference types='../support' />

import ArticleForm from '../support/pages/Article.pageObject';

const newArticle = new ArticleForm();

describe('Article', () => {
  let user;
  let article;
  const articleUrl = 'http://localhost:1667/#/articles/';
  const homeUrl = 'http://localhost:1667/#/';
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.username, user.password);
      });
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

    newArticle.visitArticlePage();
  });

  it('should be created using New Article form', () => {
    newArticle.filledArticleTitle(article.title);
    newArticle.filledArticleAbout(article.description);
    newArticle.filledYourArticle(article.body);
    newArticle.filledArticleTag(article.tag);
    newArticle.clickPublishArticleBtn();
    newArticle.assertArticleTitle(article.title);
    newArticle.assertArticleUrl(articleUrl + article.title);
  });

  it('should be edited using Edit button', () => {
    newArticle.filledArticleTitle(article.title);
    newArticle.filledArticleAbout(article.description);
    newArticle.filledYourArticle(article.body);
    newArticle.filledArticleTag(article.tag);
    newArticle.clickPublishArticleBtn();
    newArticle.assertArticleTitle(article.title);
    newArticle.assertArticleUrl(articleUrl + article.title);
    newArticle.assertArticleAuthorName(user.username);
    newArticle.assertEditBtn();
    newArticle.clickEditArticleBtn();
    newArticle.filledArticleTitle(article.title);
    newArticle.filledArticleAbout(article.description);
    newArticle.filledYourArticle(article.body);
    newArticle.filledArticleTag(article.tag);
    newArticle.clickPublishArticleBtn();
    newArticle.assertArticleTitle(article.title);
    newArticle.assertArticleUrl(articleUrl + article.title);
  });

  it('should be deleted using Delete button', () => {
    newArticle.filledArticleTitle(article.title);
    newArticle.filledArticleAbout(article.description);
    newArticle.filledYourArticle(article.body);
    newArticle.filledArticleTag(article.tag);
    newArticle.clickPublishArticleBtn();
    newArticle.assertArticleTitle(article.title);
    newArticle.assertArticleUrl(articleUrl + article.title);
    newArticle.assertArticleAuthorName(user.username);
    newArticle.assertDeleteArticleBtn();
    newArticle.clickDeleteArticleBtn();
    newArticle.assertArticleFeed();
    newArticle.assertArticleUrl(homeUrl);
  });
});
