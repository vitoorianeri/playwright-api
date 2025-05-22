import { expect, type Locator, type Page } from '@playwright/test';

export class Google {
    
    readonly page: Page
    readonly searchBar: Locator
    readonly identifier: Locator
    //readonly pesquisar: Locator


    constructor(page: Page) {

        this.page = page;
        this.searchBar = page.locator('#APjFqb');
        this.identifier = page.locator('#rso');
        //this.searchBar = page.getByRole('textbox', { name: 'Pesquisar'});
        //this.pesquisar = page.getByText('Pesquisa Google');
        
    }

    async navegatTo() {
        await this.page.goto('https://www.google.com/imghp')
    
    }

    async clickSearchBar(){
        await this.searchBar.fill('cachorro');
        await this.page.keyboard.press('Enter');
        await this.identifier.isVisible();
        
    }


}








