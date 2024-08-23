/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

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
    cy.task('db:clear');

    cy.register(user.email, user.username, user.password);

    cy.signIn(user.email, user.password);

    articlePage.newArticleLinkClick();

    cy.newArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    );
  });

  it('should be created using New Article form', () => {
    articlePage.bannerArticleCheck(article.title);
    articlePage.bodyArticleCheck(article.body);
  });

  it('should be edited using Edit button', () => {
    articlePage.editArticleBtn();
    articlePage.articleTitleType(article.title + 'newtitle');
    articlePage.articleBodyType(article.body + 'newbody');
    articlePage.publishArticleBtn();

    articlePage.bannerArticleCheck(article.title + 'newtitle');
    articlePage.bodyArticleCheck(article.body + 'newbody');
  });

  it('should be deleted using Delete button', () => {
    articlePage.deleteArticleBtn();
    articlePage.usernameLinkClick();
    articlePage.articlePreviewCheck(article.title);
    articlePage.articlePreviewCheck(article.body);
  });
});
