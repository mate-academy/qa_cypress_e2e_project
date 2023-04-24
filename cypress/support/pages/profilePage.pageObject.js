class ProfilePagebject {
  get userImg() {
    return cy.getByDataQA('user-img');
  }

  get username() {
    return cy.getByDataQA('username');
  }

  get userBio() {
    return cy.getByDataQA('user-bio');
  }

  get editProfileBtn() {
    return cy.getByDataQA('edit-profile-btn');
  }
}

export default ProfilePagebject;
