describe('TS01', () => {
  beforeEach(function () {
    // runs before each test in this block
    cy.visit('/')

  });

  it('Home', () => {
    
    cy.get('h2').should('contain',"Catterina Vittorazzi Salvador")

    for(let i = 1; i < 7; i++){
      cy.get(`:nth-child(${i}) > .col > .card > a.ng-tns-c2007924471-1 > .card-content`)
        .should('be.visible')
    }
  })

  it('email', () => {
    
    cy.get(':nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content')
      .click()
    for (let index = 1; index < 4; index++) {
      cy.get(`.contact-form > :nth-child(${index})`)
        .should('be.visible')
  
    }

    cy.get('[type="submit"]')
      .should('be.visible')
    cy.get('.black')
      .should('be.visible')
    
  })
  
  
})

describe('TS02', () => {
  
  beforeEach(function () {
    // runs before each test in this block
    cy.visit('/')
    cy.get(':nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content')
      .click()

  })

  it('enviar email', () => {
    // cy.enviaEmail('kaio','kaio@email.com', 'kaio kaio kaio')
    cy.get(':nth-child(1) > .ng-untouched').testaCampo(500);


  })

})