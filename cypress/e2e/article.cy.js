/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

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

    cy.signIn(user.email, user.password);

    articlePage.newArticleLinkClick();

    cy.newArticle(
      article.title,
      article.description,
      article.body
    );

    articlePage.bannerArticleCheck(article.title);
    articlePage.bodyArticleCheck(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);

    cy.signIn(user.email, user.password);

    articlePage.newArticleLinkClick();

    cy.newArticle(
      article.title,
      article.description,
      article.body
    );

    articlePage.clickEditBtn();
    articlePage.typeTitle(article.title + 'newtitle');
    articlePage.typeText(article.body + 'newbody');
    articlePage.clickPublishBtn();

    articlePage.bannerArticleCheck(article.title + 'newtitle');
    articlePage.bodyArticleCheck(article.body + 'newbody');
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);

    cy.signIn(user.email, user.password);

    articlePage.newArticleLinkClick();

    cy.newArticle(
      article.title,
      article.description,
      article.body
    );

    articlePage.clickDeleteBtn();
    articlePage.usernameLinkClick();
    articlePage.articlePreviewCheck(article.title);
    articlePage.articlePreviewCheck(article.body);
  });
});
