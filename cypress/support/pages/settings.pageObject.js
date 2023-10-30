import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
	url = "/#/settings";

	get userNameField() {
		return cy.getByDataCy("username-settings");
	}

	get bioField() {
		return cy.getByDataCy("bio-settings");
	}

	get passwordField() {
		return cy.getByDataCy("password-settings");
	}

	get emailField() {
		return cy.getByDataCy("email-settings");
	}

	get updateSettingsBtn() {
		return cy.getByDataCy("update-settings-btn");
	}

	get logoutBtn() {
		return cy.getByDataCy("logout-settings-btn");
	}

	get modalBtn() {
		return cy.get(".swal-button--confirm");
	}

	get navBar() {
		return cy.getByDataCy("nav-bar-header");
	}

	typeUserName(username) {
		this.userNameField.clear().type(username);
	}

	typeBio(bio) {
		this.bioField.clear().type(bio);
	}

	typePassword(password) {
		this.passwordField.clear().type(password);
	}

	typeEmail(email) {
		this.emailField.clear().type(email);
	}

	clickUpdateBtn() {
		this.updateSettingsBtn.click();
	}

	clickLogoutBtn() {
		this.logoutBtn.click();
	}

	clickOkBtn() {
		this.modalBtn.click();
	}

	assertUpdatedUsername(username) {
		this.userNameField.should("have.value", username);
	}

	assertUpdatedBio(bio) {
		this.bioField.should("have.value", bio);
	}

	assertUpdatedEmail(email) {
		this.emailField.should("have.value", email);
	}

	assertHeaderNotContainUsername(username) {
		this.navBar.should("not.contain", username);
	}
}

export default SettingsPageObject;
