/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from "../support/pages/article.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import ProfilePageObject from "../support/pages/profile.pageObject";
import SignUpPageObject from "../support/pages/signUp.pageObject";

const profilePage = new ProfilePageObject();
const signUpPage = new SignUpPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let user
  let article
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
    cy.login();
    articlePage.visit();

    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(article.tag);
    articlePage.clickPublishBtn();

    articlePage.assertArticleInfo(article.title);

    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('.swal-button')
      .click();

    homePage.clickClickableTitle();
    profilePage.clickFollowBtn();
    profilePage.assertFollowBtnExist();
  });
});
