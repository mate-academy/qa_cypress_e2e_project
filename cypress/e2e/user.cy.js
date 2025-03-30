/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const homePage = new HomePageObject();
const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let anotherUser;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateAnotherUser').then((generateAnotherUser) => {
      anotherUser = generateAnotherUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    cy.register(anotherUser.email, anotherUser.username, anotherUser.password);
  });

  it('should be able to follow the another user', () => {
    // зайшли на сторінку першого user на якого хочемо підписатися
    cy.visit(`/#/@${user.username}/`);
    // зареєстровані ми як anotherUser.username
    homePage.assertHeaderContainUsername(anotherUser.username);
    userPage.assertPageContainUsername(user.username);

    userPage.assertFollowingBtnExist('Follow');
    // bug
    userPage.clickFollowBtn();
    userPage.assertUnfollowingBtnExist('Unfollow');
    userPage.clickUnfollowBtn();
  });
});
