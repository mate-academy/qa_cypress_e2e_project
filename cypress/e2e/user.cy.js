/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;
  let anotherUser;

  beforeEach(() => {
    cy.task('db:clear');

    // Генерация и регистрация основного пользователя
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password).then(() => {
        // Генерация и регистрация второго пользователя после регистрации первого
        cy.task('generateUser').then((generatedAnotherUser) => {
          anotherUser = generatedAnotherUser;
          cy.register(anotherUser.email, anotherUser.username, anotherUser.password);
        });
      });
    });
  });

  it('should be able to follow and unfollow another user', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    profilePage.visitProfile(anotherUser.username);

    // Подписка
    profilePage.clickFollowBtn();
    profilePage.assertFollowing(true);

    // Отписка
    profilePage.clickFollowBtn();
    profilePage.assertFollowing(false);
  });
});
