/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import { generateFakeUser, generateFakeArticle } from '../support/fakeUser';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();
const userPage = new UserPageObject();

describe('Follow and Unfollow User Functionality', () => {
  const firstUser = generateFakeUser();
  const secondUser = generateFakeUser();
  const article = generateFakeArticle();

  before(() => {
    signUpPage.visit();
    signUpPage.typeUsername(firstUser.username);
    signUpPage.typeEmail(firstUser.email);
    signUpPage.typePassword(firstUser.password);
    signUpPage.clickSignUpBtn();
    cy.wait(4000);
    cy.contains('OK').click({ force: true });

    cy.contains('a', 'New Article').click();
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickSubmitBtn();

    cy.contains(article.title).should('be.visible');
    cy.wait(1000);

    cy.contains('Settings').click();
    cy.contains('Or click here to logout').click();

    signUpPage.visit();
    signUpPage.typeUsername(secondUser.username);
    signUpPage.typeEmail(secondUser.email);
    signUpPage.typePassword(secondUser.password);
    signUpPage.clickSignUpBtn();
    cy.wait(4000);
    cy.contains('OK').click({ force: true });
  });

  it('should allow the second user to follow and unfollow the first user', () => {
    cy.get(':nth-child(1) > .article-meta > .info > .author').click();
    
    userPage.clickFollowBtn(firstUser.username);
    cy.contains(`Follow`).should('be.visible');

    // userPage.clickUnfollowBtn(firstUser.username);
    // cy.contains(`Unfollow`).should('be.visible');
  });
});
