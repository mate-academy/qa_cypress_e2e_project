/* eslint-disable max-len */
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

  beforeEach(() => {
    // Очищаем базу перед каждым тестом
    cy.task('db:clear');

    // Генерация и регистрация основного пользователя
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
    });

    // Генерация и регистрация другого пользователя
    cy.task('generateUser').then((generatedAnotherUser) => {
      anotherUser = generatedAnotherUser;
      cy.register(anotherUser.email, anotherUser.username, anotherUser.password);
    });
  });

  it('should be able to follow and unfollow another user', () => {
    // Вход в аккаунт основного пользователя
    signInPage.visit();
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
