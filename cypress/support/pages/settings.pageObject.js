
import PageObject from '../PageObject';
 

class SettingsPageObject extends PageObject {
   
    newUser(){
    
    cy.get(':nth-child(2) > .form-control').clear().type('Abrakadabra')
    }

    newBio(){
        cy.get(':nth-child(3) > .form-control').type('You are so beautiful!')
    }

    newEmail(){
        cy.get(':nth-child(4) > .form-control').clear().type('dusya@i.ua')
    }

    newPassword(){
        cy.get(':nth-child(5) > .form-control').clear().type('Qwerty123@')
    }

    settingsLink(){
        cy.get(':nth-child(3) > .nav-link').click()
    }

    updateBtn(){
        cy.get('form > :nth-child(1) > .btn').click()
    }

    logOutBtn(){
        cy.get('.btn-outline-danger').click()
    }
 
}



export default SettingsPageObject;