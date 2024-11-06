import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/#/settings';
  }

  navigateToSettingsPage() {
    cy.visit(this.url); // Перехід на сторінку редактора статей
    cy.url().should('include', '/#/settings'); // Перевірка, що URL правильний
  }

  updateUsername(newUsername) {
    cy.get('[data-cy="username-input"]').clear(); // Очистити поле введення
    cy.get('[data-cy="username-input"]').type(newUsername); // Вписати нове ім'я
    cy.get('[data-cy="save-setting-btn"]').click(); // Натиснути кнопку для збереження змін
    cy.get('.swal-modal').should('be.visible'); // Перевірити, що модальне вікно з'явилося
    cy.get('.swal-button--confirm').click(); // Натиснути "OK" у модальному вікні
    cy.get('[data-cy="username-link"]').should('contain', newUsername); // Перевірити, що ім'я оновлене
  }

  updateBio(newBio) {
    cy.get('[data-cy="shortbio-input"]').clear(); // Очистити поле біографії
    cy.get('[data-cy="shortbio-input"]').type(newBio); // Вписати нову біографію
    cy.get('[data-cy="save-setting-btn"]').click(); // Натиснути кнопку для збереження змін
    cy.get('.swal-modal').should('be.visible'); // Перевірити, що модальне вікно з'явилося
    cy.get('.swal-button--confirm').click(); // Натиснути "OK" у модальному вікні
    cy.contains('a', 'Home').click(); // Перейти на головну сторінку
    cy.url().should('include', '/'); // Перевірити, що ми на головній сторінці
    cy.contains('a', 'Settings').click(); // Повернутися на сторінку налаштувань
    cy.url().should('include', '/#/settings'); // Перевірити, що ми знову на сторінці налаштувань
    cy.get('[data-cy="shortbio-input"]').should('have.value', newBio); // Перевірити, що біографія збереглася
  }

  updateEmail(newEmail) {
    cy.get('[data-cy="useremail-input"]').clear(); // Очистити поле емейлу
    cy.get('[data-cy="useremail-input"]').type(newEmail); // Ввести новий емейл
    cy.get('[data-cy="save-setting-btn"]').click(); // Натиснути кнопку для збереження змін
    cy.get('.swal-modal').should('be.visible'); // Перевірити, що модальне вікно з'явилося
    cy.get('.swal-button--confirm').click(); // Натиснути "OK" у модальному вікні
  }

  logOut() {
    cy.contains('button', 'Or click here to logout.').click(); // Натискання на кнопку "Or click here to logout."
    cy.url().should('include', '/'); // Перевірка, що ми повернулися на головну сторінку
    cy.contains('.nav-link', 'Sign in').should('be.visible'); // Перевірка наявності посилань для входу і реєстрації
    cy.contains('.nav-link', 'Sign up').should('be.visible');
  }

  signInWithNewEmailAndOldPassword(newEmail, password) {
    cy.visit('/#/login'); // Перейти на сторінку входу
    cy.get('[data-cy="email-sign-in"]').type(newEmail); // Ввести новий емейл
    cy.get('[data-cy="password-sign-in"]').type(password); // Ввести старий пароль
    cy.get('[data-cy="sign-in-btn"]').click(); // Натиснути кнопку входу
  }

  updatePassword(newPassword) {
    cy.get('[data-cy="userpassword-input"]').clear(); // Очистити поле паролю
    cy.get('[data-cy="userpassword-input"]').type(newPassword); // Ввести новий пароль
    cy.get('[data-cy="save-setting-btn"]').click(); // Натиснути кнопку для збереження змін
    cy.get('.swal-modal').should('be.visible'); // Перевірити, що модальне вікно з'явилося
    cy.get('.swal-button--confirm').click(); // Натиснути "OK" у модальному вікні
  }

  signInWithNewPassword(username, newPassword) {
    cy.visit('/#/login'); // Перейти на сторінку входу
    cy.get('[data-cy="email-sign-in"]').type(username); // Ввести ім'я користувача
    cy.get('[data-cy="password-sign-in"]').type(newPassword); // Ввести новий пароль
    cy.get('[data-cy="sign-in-btn"]').click(); // Натиснути кнопку входу
  }

  verifyUserIsLoggedIn(username) {
    cy.get('.nav-link').should('contain', username); // Перевірити, що навігаційне посилання містить ім'я користувача
  }
};

export default SettingsPageObject;
