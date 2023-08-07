import PageObject from '../PageObject';

class UserObject extends PageObject {
  visitUser(username) {
    cy.visit(`/#/@${username}`);
  }

  assertBio(bio) {
    cy.get('.user-info')
      .find('p')
      .should('contain', bio);
  }

  clickOnTheFollowBtn() {
    cy.get('button')
      .contains('Follow')
      .click();
  }

  clickOnTheUnfollowBtn() {
    cy.get('button.btn.btn-sm.btn-outline-secondary.action-btn')
      .should('be.visible')
      .click();
  }

  assertFollowBtn(username) {
    cy.contains('.btn', `Follow ${username}`).should('be.visible');
  }

  assertUnfollowBtn(username) {
    cy.contains('.btn', `Unfollow ${username}`).should('be.visible');
  }

  assertUsername(username) {
    cy.get('h4').should('contain.text', username);
  }
}

export default UserObject;
