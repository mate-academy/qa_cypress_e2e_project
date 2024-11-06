/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signup.pageObject';

describe('Settings page', () => {
  let signUpPage;
  let homePage;
  let settingsPage;
  let user;

  before(() => {
    cy.task('db:clear');

    signUpPage = new SignUpPageObject();
    homePage = new HomePageObject();
    settingsPage = new SettingsPageObject();
  });

  beforeEach(() => {
    cy.task('db:clear');

    signUpPage.visit();
    user = signUpPage.registerUser();
    homePage.assertHeaderContainUsername(user.username);
    signUpPage.verifyRegistrationSuccess(); // Перевірка успішної реєстрації
  });

  it('should provide an ability to update username', () => {
    const newUsername = 'UpdatedUsername'; // Нове ім'я користувача
    settingsPage.navigateToSettingsPage(); // Перейти на сторінку налаштувань
    settingsPage.updateUsername(newUsername); // Оновити ім'я користувача
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'This is my updated bio!'; // Нова біографія
    settingsPage.navigateToSettingsPage(); // Перейти на сторінку налаштувань
    settingsPage.updateBio(newBio); // Оновити біографію
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'newemail@new.email'; // Новий емейл
    settingsPage.navigateToSettingsPage(); // Перейти на сторінку налаштувань
    settingsPage.updateEmail(newEmail); // Оновити емейл
    settingsPage.logOut(); // Вийти з системи
    settingsPage.signInWithNewEmailAndOldPassword(newEmail, user.password); // Увійти з новим емейлом і старим паролем
    settingsPage.verifyUserIsLoggedIn(user.username); // Передаємо ім'я користувача для перевірки
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'NewPassword123!'; // Новий пароль
    settingsPage.navigateToSettingsPage(); // Перейти на сторінку налаштувань
    settingsPage.updatePassword(newPassword); // Оновити пароль
    settingsPage.logOut(); // Вийти з системи
    // Увійти з новим паролем
    settingsPage.signInWithNewPassword(user.email, newPassword); // Використовуємо старий емейл
    settingsPage.verifyUserIsLoggedIn(user.username); // Передаємо ім'я користувача для перевірки
  });

  it('should provide an ability to log out', () => {
    settingsPage.navigateToSettingsPage();
    settingsPage.logOut();
  });
});
