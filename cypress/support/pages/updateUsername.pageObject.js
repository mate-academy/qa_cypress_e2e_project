// // updateUsername.pageObject.js
// class UpdateUsernamePageObject {
//     // Locators
//     getUsernameInput() {
//       return cy.get('[data-cy=username-input]');
//     }

//     getUpdateSettingsButton() {
//       return cy.get('[data-cy=update-settings-btn]');
//     }

//     getUsernameDisplay() {
//       return cy.get('[data-cy=username-display]');
//     }

//     // Actions
//     updateUsername(newUsername) {
//       this.getUsernameInput().clear().type(newUsername);
//     }

//     clickUpdateSettings() {
//       this.getUpdateSettingsButton().click();
//     }
//   }

//   // Export the page object
//   export default new UpdateUsernamePageObject();
// updateUsername.pageObject.js
// updateUsername.pageObject.js
// updateUsername.pageObject.js
// class UpdateUsernamePageObject {
//   visit() {
//     cy.visit('/settings', { failOnStatusCode: false }); // Add failOnStatusCode: false here
//   }

//   getUsernameInput() {
//     return cy.findByPlaceholder('Username');
//   }

//   updateUsername(newUsername) {
//     this.getUsernameInput().clear().type(newUsername);
//     cy.contains('button', 'Update Settings').click();
//   }
// }

// export default UpdateUsernamePageObject;
// updateUsername.pageObject.js
// updateUsername.pageObject.js
class UpdateUsernamePageObject {
  visit() {
    cy.visit('/#/settings');
  }

  getUsernameInput() {
    return cy.findByPlaceholder('Your username');
  }

  updateUsername(newUsername) {
    this.getUsernameInput().clear().type(newUsername);
    cy.contains('button', 'Update Settings').click();
  }
}

export default UpdateUsernamePageObject;
