import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
	url = "/#/register";

	get userNameField() {
		return cy.getByDataCy("username-register");
	}

	get passwordField() {
		return cy.getByDataCy("password-register");
	}

	get emailField() {
		return cy.getByDataCy("email-register");
	}

	get signUpBtn() {
		return cy.getByDataCy("btn-register");
	}

	get okBtn() {
		return cy.get(".swal-button--confirm");
	}

	typeUserName(username) {
		this.userNameField.type(username);
	}

	typePassword(password) {
		this.passwordField.type(password);
	}

	typeEmail(email) {
		this.emailField.type(email);
	}

	clickSignUpBtn() {
		this.signUpBtn.click();
	}

	clickOkBtn() {
		this.okBtn.click();
	}

	assertModalContent(content) {
		cy.get(".swal-modal").should("contain", content);
	}
}

export default SignUpPageObject;
