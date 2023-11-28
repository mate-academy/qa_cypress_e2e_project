/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from "../support/pages/article.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

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
    cy.login(user.username, user.email, user.password);
    articlePage.visit();
    articlePage.typeTitle(article.title);
   
  });

  it('should be edited using Edit button', () => {

  });

  it('should be deleted using Delete button', () => {

  });
});
