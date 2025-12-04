/* eslint-disable no-trailing-spaces */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;
  let anotherUser;

  before(() => {
    cy.task('db:clear');
    // Генерируем двух пользователей: текущего и того, на кого будем подписываться
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.task('generateUser').then((generatedAnotherUser) => {
        anotherUser = generatedAnotherUser;
      });
    });
  });

  it('should be able to follow and unfollow another user', () => {
    // Вход в аккаунт
    signInPage.visit();
    cy.register(user.email, user.username, user.password); 
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    // Переход на профиль другого пользователя
    profilePage.visitProfile(anotherUser.username);

    // Подписка
    profilePage.clickFollowBtn();
    profilePage.assertFollowing(true);

    // Отписка
    profilePage.clickFollowBtn();
    profilePage.assertFollowing(false);
  });
});
