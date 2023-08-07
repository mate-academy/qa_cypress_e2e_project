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
    cy.register(user.email, user.username, user.password);
    cy.newArticle(article);
    createArticle.assertArticleTitleExists(article.title);
    createArticle.assertArticleBodyMatches(article.body);

    signUpPage.logoutUser();

    signUpPage.visit();
    signUpPage.typeUsername('SuperTester');
    signUpPage.typeEmail(user.email + '.ua');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertSuccesfulRegistration();
    signUpPage.clickOkBtn();

    followUnfollow.followUser();
    followUnfollow.unfollowUser(user.username);
  });
});
