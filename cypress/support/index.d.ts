/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByDataQa(selector: string): Chainable<any>;
    register(
      email: string,
      username: string,
      password: string
    ): Chainable<any>;
  }
}
