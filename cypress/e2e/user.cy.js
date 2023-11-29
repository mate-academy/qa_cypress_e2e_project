/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import otherUserProfilePageObject from '../support/pages/otherUser.pageObject';


const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const otherUserPage = new otherUserProfilePageObject();

describe('User', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    
  });

  it('should be able to follow and unfollow the another user', () => {
    cy.createArticle(
      user.username, 
      user.email, 
      user.password, 
      article.title, 
      article.description, 
      article.body,
      article.tag)
      cy.login(user.updateUsername, user.updatedEmail, user.updatedPassword);
      otherUserPage.visitOtherUserPage(user.username);
      otherUserPage.clickFollowUnfollowBtn();
      otherUserPage.assertFollowBtnChahgedUnfollow(user.username);
      otherUserPage.clickFollowUnfollowBtn();
      otherUserPage.assertUnfollowBtnChahgedFollow(user.username);
  });
});
