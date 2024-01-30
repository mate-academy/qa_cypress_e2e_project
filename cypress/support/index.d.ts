/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataQa(selector: string): Chainable<any>
    registerAndLogin(email: string, username: string, password: string): Chainable<any>
    getByPlaceholder(placeholder: string): Chainable<any>
    login(email:string, password: string): Chainable<any>
  }
}
