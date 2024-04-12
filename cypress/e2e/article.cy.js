/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then((user) => {
      cy.login(user.email, user.username, user.password);
      articlePage.visit();
    });
  });

  it('should be created using New Article form', () => {
    articlePage.assertUsernameAfterLogin(user.username);
    articlePage.typeIntoTitleField(article.title);
    articlePage.typeIntoDescriptionField(article.description);
    articlePage.typeIntoBodyField(article.body);
    articlePage.clickOnSubmit();
    articlePage.assertUrl(article.title.toLowerCase());
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleContent(article.body);
  });

  it('should be edited using Edit button', () => {
    const userId = window.localStorage.getItem('userId');
    cy.addArticle(article.title, article.description, article.body, article.tag, userId);
    cy.intercept(`/articles/${article.title}?user_id=${userId}`)
      .as('loginUser');
    articlePage.visit(`/#/articles/${article.title}`);
    articlePage.clickOnEditArticleButton();
    articlePage.typeIntoTitleField(article.title);
    articlePage.typeIntoDescriptionField(article.description);
    articlePage.typeIntoBodyField(article.body);
    articlePage.clickOnSubmit();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleContent(article.body);
  });

  it('should be deleted using Delete button', () => {
    const userId = window.localStorage.getItem('userId');
    cy.addArticle(article.title, article.description, article.body, article.tag, userId);
    cy.intercept(`/articles/${article.title}?user_id=${userId}`).as('loginUser');
    articlePage.visit(`/#/articles/${article.title}`);
    articlePage.clickOnDeleteArticleButton();
    cy.intercept(`/articles?user_id=${userId}`).as('getArticles');
    articlePage.assertUrlNotContain(article.title);
    cy.wait('@getArticles');
    articlePage.assertGlobalFeedAfterDeleting(article.title);
  });
});
