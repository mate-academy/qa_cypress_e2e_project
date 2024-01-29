import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUser(username) {
    cy.visit(`/#/@${username}`);
  };

  clickOnTheFollowBtn(username) {
    cy.contains('.btn', `Follow ${username}`)
      .click();
  }

  clickOnTheUnfollowBtn (username) {
    cy.contains('.btn', `Unfollow ${username}`)
      .click();
  }

  assertFollowBtn(username) {
    cy.contains('.btn', `Follow ${username}`).should('be.visible');
  }

  assertUnfollowBtn(username) {
    cy.contains('.btn', `Unfollow ${username}`).should('be.visible');
  }

  assertUsername (username) {
    cy.get('h4').should('contain.text', username);
  }

  assertNewBio(bio) {
    cy.get('.user-info')
      .find('p')
      .should('contain', bio);
  };
};

export default UserPageObject;