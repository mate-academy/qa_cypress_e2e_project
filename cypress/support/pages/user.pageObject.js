import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserProfile(username) {
    cy.visit(`/#/@${username}`);
  }

  registerUser(user) {
    cy.visit('/#/register'); // Перейти на сторінку реєстрації
    cy.get('[data-cy="username-sign-up"]').type(user.username);
    cy.get('[data-cy="email-sign-up"]').type(user.email);
    cy.get('[data-cy="password-sign-up"]').type(user.password);
    cy.get('[data-cy="sign-up-btn"]').click();
  }

  loginUser(user) {
    cy.get('[data-cy="username-login"]').type(user.username);
    cy.get('[data-cy="password-login"]').type(user.password);
    cy.get('[data-cy="login-btn"]').click();
  }

  logoutUser() {
    cy.get('.nav-link').contains('Settings').click(); // Перейти в налаштування
    cy.get('[data-cy="logout-btn"]').click(); // Клікнути на кнопку виходу
  }

  followUser(username) {
    this.visitUserProfile(username);
    cy.contains('button', `Follow ${username}`)
      .should('be.visible')
      .click();
  }

  unfollowUser(username) {
    this.visitUserProfile(username);
    cy.contains('button', `Unfollow ${username}`)
      .should('be.visible')
      .click();
  }

  verifyRegistrationSuccess() {
    cy.contains('button', 'Or click here to logout.').should('be.visible');
  }

  verifyArticleVisible(author) {
    cy.contains('.article-preview', author).should('be.visible');
  }

  verifyArticleNotVisible(author) {
    cy.contains('.article-preview', author).should('not.exist');
  }

  goToYourFeed() {
    cy.get('.nav-link').contains('Your Feed').click(); // Перейти в "Your Feed"
  }
}

export default UserPageObject;
