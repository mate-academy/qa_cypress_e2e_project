import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`/@${username}`);
  }

  get followBtn() {
    return cy.getByDataQa('follow-btn');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  assertBtnUnfollow(username) {
    this.followBtn
      .invoke('text')
      .should('match', new RegExp(`^\\s*Unfollow\\s*${username}\\s*$`));
  }

  assertBtnFollow(username) {
    this.followBtn
      .invoke('text')
      .should('match', new RegExp(`^\\s*Follow\\s*${username}\\s*$`));
  }
}

export default UserPageObject;

// class UserPageObject {
//   get profilePicture() {
//     return cy.getByDataQa('user-img');
//   }

//   get userName() {
//     return cy.getByDataQa('user-name');
//   }

//   get userBio() {
//     return cy.getByDataQa('user-bio');
//   }

//   assertUsernameIsChanged(username) {
//     this.userName.should('contain', username);
//   }

//   assertBioIsChanged(bio) {
//     this.userBio.should('contain', bio);
//   }
// }

// export default UserPageObject;
