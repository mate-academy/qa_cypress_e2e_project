import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  createNewUserWithArticle(username, email, password, body, description, tags, title) {
    cy.register(email, username, password);
    cy.login(email, password);
    cy.getUser().then((user) => {
      cy.createArticle(user.id, body, description, tags, title);
    });
  }

  confirmSuccessReg() {
    cy.get('.swal-button--confirm')
      .click();
  }

  clickOnUAuthor(username) {
    cy.getByDataCy('author-name')
      .should('contain', username)
      .click();
  }
}

export default HomePageObject;
