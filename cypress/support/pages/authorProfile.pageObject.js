import PageObject from '../PageObject';

class AuthorProfile extends PageObject {
  clickOnFollowBtn() {
    cy.getByDataCy('follow-author-btn')
      .click();
  }

  assertFollow(username) {
    cy.getByDataCy('author-name')
      .should('contain', username);
  }
}

export default AuthorProfile;
