/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
// eslint-disable-next-line max-len
import FollowUnfollowPageObject from '../support/pages/followUnfollow.pageObject';

const signUpPage = new SignUpPageObject();
const createArticle = new CreateArticlePageObject();
const followUnfollow = new FollowUnfollowPageObject();

describe('User', () => {
  let user;
  // eslint-disable-next-line no-unused-vars
  let article;
  before(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
    cy.register();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
      });
    });
  });

  it.only('should be able to follow and unfollow the another user', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.visit('/#/login');
    cy.signIn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    cy.newArticle(article);

    createArticle.assertArticleTitleExists(article.title);
    createArticle.assertArticleBodyMatches(article.body);
    signUpPage.logoutUser();

    signUpPage.visit();

    signUpPage.typeUsername('Kassandra');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    signUpPage.assertSuccesfulRegistration();
    signUpPage.clickOkBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    followUnfollow.followUser();
    followUnfollow.unfollowUser('riot');
  });
});
