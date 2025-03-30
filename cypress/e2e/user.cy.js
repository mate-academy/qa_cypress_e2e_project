/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('User', () => {
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

  it('should be able to follow the another user', () => {
    cy.createArticle(article.title, article.description,
      article.body, article.tag).then((response) => {
      cy.log(response);
      const title = response.body.article.title;
      signUpPage.visit();
      signUpPage.typeuserName(user.username);
      signUpPage.typeuserEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickOnSignUpBtn();
      cy.get('.swal-button.swal-button--confirm').click();
      cy.visit(`#/articles/${title}`);
      homePage.followUser.eq(1).click();
      homePage.followUser.eq(1).should('include.text', 'Unfollow');
    });
  });
});
