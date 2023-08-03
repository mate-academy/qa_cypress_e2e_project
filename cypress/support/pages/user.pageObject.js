import PageObject from "../PageObject";

class UserPageObject extends PageObject {
  visit(username) {
    cy.visit(`/#/@${username}`)
  };

  assertArticleDeleted(title) {
    cy.getByDataQa('user-articles-list')
      .should('not.contain', title);
  };

  assertBio(bio) {
    cy.get('.user-info')
      .find('p')
      .should('contain', bio);
  };

  clickFollowBtn() {
    cy.getByDataQa('follow-btn')
      .click();
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-btn');
  }
};

export default UserPageObject;