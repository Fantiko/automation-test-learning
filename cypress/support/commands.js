// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// 
// Cypress.Commands.add('nome da funcionalidade', (variavel1, variavel2, ...) => {
//     cy.get(variavel1)
//         .should('contain', variavel2)
// })

//feito para o teste.cy.js
Cypress.Commands.add('enviaEmail',(nome, email, mensagem)=>{
    for(let i = 1; i<=3; i++){
        cy.get(`.contact-form > :nth-child(${i})`)
        .should('be.visible')
        .and('not.have.attr', 'readonly')

    }

    cy.get(':nth-child(1) > .ng-untouched').type(nome);
    cy.get('.contact-form > :nth-child(2)').type(email);
    cy.get('.contact-form > :nth-child(3) > .ng-untouched').type(mensagem);
    cy.get('[type="submit"]').click()

})

//testa o limite de caracteres em um campo
Cypress.Commands.add('testaCampo',{ prevSubject: true }, (locator, limiteCaracteres, semNumero = false) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersSemNumero = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const charactersLength = characters.length;
    const charactersSemNumeroLength = charactersSemNumero.length;
    let result = '';
    if(semNumero){
        for (let i = 0; i < limiteCaracteres; i++) {
            result += charactersSemNumero.charAt(Math.floor(Math.random() * charactersSemNumeroLength));
        }

    }else{   
        for (let i = 0; i < limiteCaracteres; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }

    cy.wrap(locator).clear().type(result)
    cy.wrap(locator).invoke('val').should('eq', result)

})

Cypress.Commands.add('testaCampoQuill', (locator, limiteCaracteres, semNumero = false) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersSemNumero = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const charactersLength = characters.length;
    const charactersSemNumeroLength = charactersSemNumero.length;
    let result = '';
    if(semNumero){
        for (let i = 0; i < limiteCaracteres; i++) {
            result += charactersSemNumero.charAt(Math.floor(Math.random() * charactersSemNumeroLength));
        }

    }else{   
        for (let i = 0; i < limiteCaracteres; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }

    cy.get(locator).clear().type(result)
    cy.get(locator).then(($quillcontainer)=>{
        cy.wrap($quillcontainer).should('have.text', result)
        cy.wrap($quillcontainer)
    })

})




Cypress.Commands.add('fazPesquisa', (locator, locatorBotao, textoPesquisa)=> {
    cy.get(locator).clear().type(textoPesquisa)
    cy.get(locatorBotao).click()
    cy.wait(2000)

    cy.get('.cluster-filter').then(($clusterFilter) => {
        // Check if the cluster filter contains a table
        if ($clusterFilter.find('table').length > 0) {
            cy.get('.cluster-filter table tbody tr').its('length').should('be.at.most', 11);
            cy.comparaNome(textoPesquisa)
        } 
        // Check if the cluster filter contains an h2
        else if ($clusterFilter.find('h2').length > 0) {
            cy.get('.no-results').should('be.visible');
        }
    });

})

Cypress.Commands.add('comparaNome', (textoPesquisa) => {
    cy.get('tbody > tr').each(($row) => {
        cy.wrap($row).find('.description').invoke('text').then((text) => {
            expect(text.trim().toLowerCase).to.include(textoPesquisa.toLowerCase);
        });
    });
});

Cypress.Commands.add('comparaFiltro', (Filtro, Opcao, Filtrado) => {
    cy.get('header > :nth-child(2) > span').click();
    cy.get(Filtro).click();	
    
    cy.get(Opcao).invoke("text").then($opcao => {
        cy.get(Opcao).click();
        cy.get('section').find('.primary').click();
        cy.wait(2000);

        cy.get('.cluster-filter').then(($clusterFilter) => {
            handleClusterFilter($clusterFilter, $opcao, Filtrado);
        });
    });
});

function handleClusterFilter($clusterFilter, $opcao, Filtrado) {
    if ($clusterFilter.find('table').length > 0) {
        checkTableResults($clusterFilter, $opcao, Filtrado);
    } else if ($clusterFilter.find('h2').length > 0) {
        cy.get('.no-results').should('be.visible');
    } 
}

function checkTableResults($clusterFilter, $opcao, Filtrado) {
    cy.get('.cluster-filter table tbody tr').its('length').should('be.at.most', 11);
    cy.get('tbody > tr').each(($row) => {
        cy.wrap($row).find(Filtrado).invoke('text').then((text) => {
            expect(text.trim()).to.equal($opcao.trim());
        });
    });
}
