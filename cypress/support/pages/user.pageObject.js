import PageObject from '../PageObject';

class userPageObject extends PageObject {
  url = `/#/`;

  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  get userName() {
    return cy.get('h4');
  }

  get userBio() {
    return cy.get('p');
  }

  get unfollowBtn() {
    return cy.contains('.btn', 'Unfollow');
  }


  get followBtn() {
    return cy.contains('.btn', 'Follow');
  }
}

export default userPageObject;
