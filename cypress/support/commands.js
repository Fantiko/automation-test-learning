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
    cy.wrap(locator).clear().type(result + 'a')
    cy.wrap(locator).invoke('val').should('not.eq', result + 'a')


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
        } else if ($clusterFilter.find('h5').length > 0) {
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

Cypress.Commands.add("envioJsonPost", (json, url, statusCode = 400, erroText= '') => {
    const options = {
      method: 'POST',
      url: url,
      body: json,
      failOnStatusCode: false,
      headers: {
        'Authorization' : 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZTmdIYkEwUjY3Tjg5d05YSEN2a0tjdTVNUURUX21SY3FCQ09HcV9FUTIwIn0.eyJleHAiOjE3MTYzMTQ5NzMsImlhdCI6MTcxNjMxNDA3MywianRpIjoiNTJjZDJjYzEtMmQ2Zi00ZjBiLThlMzEtYTA3NTlmZGUzZDcyIiwiaXNzIjoiaHR0cHM6Ly94ZGstc2VjdXJpdHkuaG1sLWFwaS5kaWdpdGFsLXNlZ3Vyb3N1bmltZWQuY29tL2F1dGgvcmVhbG1zL3NlZ3Vyb3N1bmltZWRkZXYiLCJhdWQiOlsidmlkYS1iMmMtZGV2IiwiYWNjb3VudCJdLCJzdWIiOiJhZjIxMTFjNy1mZDI2LTQ5OTEtOWZiMy0zN2U0ZmY1ZDY1MTkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ2aWRhLWIyYy1kZXYiLCJzZXNzaW9uX3N0YXRlIjoiZjUwZjAwODAtNzQ2ZS00MTRmLWFjMjktYmMzMGZkMjY3NzgyIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNlZ3Vyb3N1bmltZWRkZXYiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsidmlkYS1iMmMtZGV2Ijp7InJvbGVzIjpbImNvbXVuaWNhZG8ucmVhYnJpciIsImNvbXVuaWNhZG8uZWRpdGFyIiwic2luaXN0cm8uYWJhLXJlc2VydmEiLCJzaW5pc3Ryby5qdWRpY2lhbC5jYWRhc3RyYXItZmF2b3JlY2lkbyIsInNpbmlzdHJvLmp1ZGljaWFsLmRhZG9zLXNpbmlzdHJvIiwic2luaXN0cm8uYWJhLWFuYWxpc2UtYm90YW8tcGFnYW1lbnRvIiwic2luaXN0cm8uYWJhLWRvY3VtZW50b3MtYWRpY2lvbmFyIiwic2luaXN0cm8uanVkaWNpYWwiLCJqdW50YS1wZXJpY2lhLW1lZGljYS5saXN0YXIiLCJzaW5pc3Ryby5hYmEtYW5hbGlzZS1ib3Rhby1yZWN1c2FyIiwic2luaXN0cm8uanVkaWNpYWwubGliZXJhci5wYWdhbWVudG8iLCJzaW5kaWNhbmNpYXMubGlzdGFyIiwic2luaXN0cm8uYWJhLWJlbmVmaWNpYXJpb3MtZWRpdGFyIiwic2luaXN0cm8uYWJhLWFuYWxpc2UiLCJlbWFpbC1zaW5pc3Ryby5kZWxldGUiLCJzaW5pc3Ryby5qdWRpY2lhbC5zaW5hbGl6YXItcHJvY2Vzc28iLCJjb211bmljYWRvLnZpc3VhbGl6YXIiLCJwcm9jZXNzYW1lbnRvLnZpc3VhbGl6YXJMb2dzIiwiam9rZXIuZG93bmxvYWRkb2N1bWVudG8iLCJzaW5pc3Ryby5qdWRpY2lhbC5kZXBvc2l0by1qdWRpY2lhbCIsInNpbmlzdHJvLmFiYS1tb3ZpbWVudG8tcmVzZXJ2YSIsInNpbmlzdHJvLmp1ZGljaWFsLmFqdXN0YXItcmVzZXJ2YSIsIm1vZGVsby1wYXJlY2VyLnNlYXJjaCIsImp1bnRhLXBlcmljaWEtbWVkaWNhLnZpc3VhbGl6YXIiLCJhcG9saWNlLnZpc3VhbGl6YXIiLCJwcm9jZXNzYW1lbnRvLmxpc3RhciIsImpva2VyLmJ1c2NhcmRvY3VtZW50b3MiLCJzaW5pc3Ryby5hYmEtYW5hbGlzZS1lZGl0YXIiLCJwcm9wb3N0YS52aXN1YWxpemFyIiwiY29tdW5pY2Fkby5saXN0YXIiLCJhZ2VuZGFtZW50by5wYWdhbWVudG9zIiwic2VndXJhZG8ubGlzdGFyIiwiY29tdW5pY2Fkby5pbmNsdWlyIiwic2luaXN0cm8uYW5hbGlzdGEiLCJzaW5pc3Ryby5qdWRpY2lhbC5mYXZvcmVjaWRvcyIsIm1vZGVsby1jYXJ0YS5yZWN1c2EubGlzdGFyIiwiZW1haWwtc2luaXN0cm8uaW5zZXJ0Iiwic2luaXN0cm9zLmxpc3RhciIsInNpbmlzdHJvLmp1ZGljaWFsLnN0YXR1cy1wYWdhbWVudG9zIiwic2luaXN0cm8uanVkaWNpYWwuZW5jZXJyYXItcHJvY2Vzc28iLCJzaW5pc3Ryby5hYmEtaGlzdG9yaWNvIiwiYXBvbGljZS52aXN1YWxpemFyUGFyY2VsYUFwb2xpY2UiLCJqdW50YS1wZXJpY2lhLW1lZGljYS5jYW5jZWxhciIsInNpbmlzdHJvLmFiYS1iZW5lZmljaWFyaW9zIiwicHJvY2Vzc2FtZW50by5yZXNwb25zZUxvZyIsInNpbmlzdHJvLmFiYS1qdXJpZGljbyIsInNpbmRpY2FuY2lhcy52aXN1YWxpemFyIiwic2luZGljYW5jaWFzLmNhbmNlbGFyIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtcHJlc2EgZW1haWwgcHJvZmlsZSIsInNpZCI6ImY1MGYwMDgwLTc0NmUtNDE0Zi1hYzI5LWJjMzBmZDI2Nzc4MiIsImVtcHJlc2FfaWQiOiIxIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJlbXByZXNhX25vbWUiOiJTZWd1cm9zIFVuaW1lZCIsIm5hbWUiOiJhbmFsaXN0YS4yIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYW5hbGlzdGEuMiIsImdpdmVuX25hbWUiOiJhbmFsaXN0YS4yIn0.r2ZZVsMwS5BX0kHmTjwuthM_XFBW9N5IOS-7R9PpvZ7jBwK7JTndyPcTCmu382fX8iBWO3DfSMNJehSCVOsD7Y1ZhZaGGHq1-e26vfr-qdrBWrX9NzK_5RsgvaGP2ncYonKCHcof-BbSkrGw-39buc5sfUJER541vNyFtCN63udpsTRwqt980gn0ZziliYirAW9YxILkDth969fj-9Ouy8cSZOfP-vmDLeUtyp6MU47HQOLsIFht4dMldQkZOWz_O8E9CZlGaGH_dg6XL7kyshvY6TO4c1Cda3vp1AVwqyWuAur1mNNMZKuntQgQM-7UvbpQyadRZVxCb1fMcxqvrA',
        'Content-Type': 'application/json',
      }
    };
    return cy
      .request(options).then(
        (response) => {
            //  cy.log('Response Body:', JSON.stringify(response.body, null, 2));

            expect(response.status).to.eq(statusCode)

            if(statusCode == 400){
                expect(response.body).to.contain(erroText)


            }else if(statusCode == 200){
                
                expect(response.body).to.have.property('nome', json.nome);
                expect(response.body).to.have.property('tipoRegistro', json.tipoRegistro);

                const documentoSemMascara = json.documento.replace(/[.\-]/g, '');
                expect(response.body).to.have.property('documento', documentoSemMascara);

                expect(response.body).to.have.property('tipoPessoa', json.tipoPessoa);


                if(json.tipoPessoa == 'FISICA'){
                    expect(response.body).to.have.property('dataNascimento', json.dataNascimento);
                    expect(response.body).to.have.property('sexo', json.sexo);

                }

            }

        });
  });

  Cypress.Commands.add('LoginAdm',()=>{
        cy.clearCookies()
		cy.getCookies().should('be.empty')
		cy.visit('https://app.dev.recrutamento.itixti-lab.com.br')
		cy.get('.btn-login').click()
		cy.get('#email').type('dj@gmail.com')
		cy.get('#password').type('Itix.123')
		cy.get('.btn').click()
        
  })