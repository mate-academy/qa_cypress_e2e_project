import PageObject from '../PageObject';

class UserPagePageObject extends PageObject {
    url = `/#/`;

    visitUserPage(username) {
        cy.visit(`/#/@${username}`);
    }

    get userName() {
        return cy.get('h4');
    }

    get userBio(){
        return cy.get('p');
    }

    get followBtn() {
        return cy.contains('.btn', 'Follow');
    }

    get unfollowBtn() {
        return cy.contains('.btn', 'Unfollow');
    }
  }

export default UserPagePageObject;