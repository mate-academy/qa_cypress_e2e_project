import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUser(username) {
    cy.visit(`/#/@${username}`);
  };

  clickOnFollowBtn(username) {
    cy.contains('.btn', `Follow ${username}`)
      .click();
  }

  clickOnUnfollowBtn (username) {
    cy.contains('.btn', `Unfollow ${username}`)
      .click();
  }

  assertUsername (username) {
    cy.get('h4').should('contain', username);
  }

  assertUnfollowBtn(username) {
    cy.contains('.btn', `Unfollow ${username}`).should('be.visible');
  }

  assertFollowBtn(username) {
    cy.contains('.btn', `Follow ${username}`).should('be.visible');
  }
};

export default UserPageObject;
