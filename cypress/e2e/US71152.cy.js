describe('template spec', () => {
  beforeEach('passes', ()=>{
    cy.LoginAdm()


    cy.get('app-home > :nth-child(2)').click()

  })

  it('CT001 - Teste tela Busca de Vaga', () => {
    cy.get(':nth-child(1) > .inpunt-register').should('be.visible')
    cy.get(':nth-child(2) > .inpunt-register').should('be.visible')
    cy.get('.ng-select-container').should('be.visible')

    cy.get('app-vaga-card > .main').should('exist').and('be.visible')
    cy.get('app-vaga-card > .main > .action > .btn').should('exist').and('be.visible')

    cy.get('.nome-vaga').should('exist').and('be.visible')
    cy.get('.fixed-text').should('exist').and('be.visible')
    cy.get('.pages').children().should('exist').and('be.visible')

    cy.get('.curriculo-panel').should('exist').and('be.visible')
    cy.get('.curriculo-panel > .action > .btn').should('exist').and('be.visible')

  })

  it('CT002- Teste ordenação lista',()=>{
    cy.get('app-vaga-card').then(($card)=>{
      cy.wrap($card).should('have.length.at.most', 10)
    })

  })

  it('CT003 - Teste busca vazia', ()=>{
    cy.get('app-vaga-card').then(($card)=>{
      cy.wrap($card).should('have.length.at.most', 10)
    })

  })

  it('CT004 - Teste recurso like', ()=>{
    cy.get(':nth-child(1) > .inpunt-register').type('asdasd')
    cy.get('.main').each(($row)=>{
      cy.wrap($row).find('.nome-vaga').should('contain.text', 'asdasd')

    })
    

  })

  it('CT005 - Teste busca nome da vaga', ()=>{
    cy.get(':nth-child(1) > .inpunt-register').type('asdasd')
    cy.get('.main').each(($row)=>{
      cy.wrap($row).find('.nome-vaga').should('contain.text', 'asdasd')

    })
    

  })
  
  it('CT006 - Teste busca cidade', ()=>{
    cy.get(':nth-child(2) > .inpunt-register').type('Alegre')
    cy.get('.main').each(($row)=>{
      cy.wait(500)
      cy.wrap($row).find('.conteudo > :nth-child(2) > :nth-child(1)').should('contain.text', 'Alegre')

    })
    

  })

  it('CT007 - Teste busca regime ', ()=>{
    cy.get('.ng-select-container').click()
    cy.wait(500)
    cy.get(`div.ng-option:nth(2)`).click()
    cy.wait(500)
    cy.get('.main').each(($row)=>{
      cy.wait(500)
      cy.wrap($row).find('.conteudo > :nth-child(2) > :nth-child(2)').should('contain.text', 'Jovem aprendiz')
    })

  })
  
  it('CT008 - Teste combinar filtros', ()=>{

    cy.get(':nth-child(1) > .inpunt-register').type('Dev Backend Senior')
    cy.get('.main').each(($row)=>{
      cy.wrap($row).find('.nome-vaga').should('contain.text', 'Dev Backend Senior')

    })

    cy.get(':nth-child(2) > .inpunt-register').type('Alegre')
    cy.get('.main').each(($row)=>{
      cy.wait(500)
      cy.wrap($row).find('.conteudo > :nth-child(2) > :nth-child(1)').should('contain.text', 'Alegre')

    })

    cy.get('.ng-select-container').click()
    cy.wait(500)
    cy.get(`div.ng-option:nth(2)`).click()
    cy.wait(500)
    cy.get('.main').each(($row)=>{
      cy.wait(500)
      cy.wrap($row).find('.conteudo > :nth-child(2) > :nth-child(2)').should('contain.text', 'Jovem aprendiz')
    })


  })

  it('CT009 - Teste não encontrado',()=>{
    cy.get(':nth-child(1) > .inpunt-register').type('aaaaaaaaaaaaaaaa')
    cy.get('.no-results').should('exist').and('be.visible').and('contain.text', 'Nenhum resultado encontrado')

  })

  it.only('CT010 - Teste ver vaga',()=>{
    cy.get(':nth-child(1) > app-vaga-card > .main > .action > .btn').click()    
    

  })

  it.only('CT011 - Teste banco de talentos não logado', ()=>{



  })

  it.only('CT012 - Teste banco de talentos / cadastrar currículo ', ()=>{
    cy.get('.curriculo-panel > .action > .btn')


    })

    it.only('CT013 - Teste banco de talentos / currículo já cadastrado', ()=>{
    
      cy.get('.curriculo-panel > .action > .btn')

    })



})