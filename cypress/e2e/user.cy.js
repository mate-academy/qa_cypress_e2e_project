/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/userProfile.pageObject';
const userPage = new UserPageObject();
let user;
let user2;
let article;
describe('User', () => {
  before(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be able to follow the another user', () => {
    const btnText = 'Unfollow';
    userPage.addArticleWithDefinedUser(
      article.title,
      article.description,
      article.body,
      article.tags,
      user2.email,
      user2.username,
      user2.password
    );
    userPage.loginAnotherUser(user.email, user.username, user.password);
    userPage.visitDefinedUserPage(user2.username);
    userPage.clickFollowBtn();
    userPage.assertFollowBtn(btnText);
  });
});
