/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import ArticlePage from '../support/pages/article.pageObject';

let user;
const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();
const articlePage = new ArticlePage();

// describe('Article tests', () => {
//   const user = {
//     userName: 'tester',
//     email: 'tester@tester.tester',
//     password: 'Qwer123!'
//   };

const article = {
  title: 'Test Article',
  description: 'This is a test article description',
  body: 'This is the body of the test article'
};

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.visit('/#/register');
      signUpPage.typeUserName(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      cy.visit('/settings');
    });
  });

  it('should be created using New Article form', () => {
    articlePage.login(user.email, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
        cy.url().should('include', `/article/${slug}`);
      });
  });

  it('should be created using New Article form', () => {

  });

  it('should be deleted using Delete button', () => {
    articlePage.login(user.email, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        articlePage.deleteArticle(slug);
        articlePage.verifyArticleNotFound(slug);
      });
  });
});
