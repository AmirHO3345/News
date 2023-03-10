'use strict'

export class HeaderPage {

    #HeaderElement ;

    #MenuMobileObject ;

    #IsMenuMobile ;

    constructor(HeaderPage , MenuMobile) {
        this.#IsMenuMobile = false ;

        if(MenuMobile instanceof HTMLElement) {
            this.#MenuMobileObject = new MobileMenu(MenuMobile) ;
        }

        if(HeaderPage instanceof HTMLElement) {
            this.#HeaderElement = HeaderPage ;
            const IconsHeader = this.#HeaderElement.getElementsByClassName("HeaderPage__Icon") ;
            IconsHeader.item(1).addEventListener('click' , () => {
                this.#OpenSearchField() ;
                IconsHeader.item(1).style.display = "none" ;
                IconsHeader.item(2).style.display = "inherit" ;
            }) ;
            IconsHeader.item(2).addEventListener('click' , () => {
                IconsHeader.item(2).style.display = "none" ;
                IconsHeader.item(1).style.display = "inherit" ;
                this.#CloseSearchField() ;
            });
            IconsHeader.item(3).addEventListener('click' , () => {
                this.#MenuMobileObject.OpenMenuMobile() ;
            });
        }
    }

    #OpenSearchField() {
        const SearchField = this.#HeaderElement
            .getElementsByClassName("HeaderPage__HeaderSearch").item(0) ;
        if(!SearchField.classList.contains("Open")) {
            SearchField.classList.add("Open") ;
        }
    }

    #CloseSearchField() {
        const SearchField = this.#HeaderElement
            .getElementsByClassName("HeaderPage__HeaderSearch").item(0) ;
        if(SearchField.classList.contains("Open")) {
            SearchField.classList.remove("Open") ;
        }
    }
}

class MobileMenu {

    #MenuMobileElement ;

    constructor(MenuElement) {

        if(MenuElement instanceof HTMLElement) {
            this.#MenuMobileElement = MenuElement ;
            this.#InitialUI() ;
        }
    }

    #InitialUI() {
        const NavsElements = this.#MenuMobileElement
            .getElementsByClassName("MenuMobile__Nav");
        for (const navsElement of NavsElements) {
            if(navsElement.getElementsByClassName("MenuMobile__Nav").length > 0) {
                const AnchorNav = navsElement
                    .getElementsByTagName("a").item(0) ;
                AnchorNav.addEventListener('click' , () => {
                    if(AnchorNav.classList.contains("Show"))
                        AnchorNav.classList.remove("Show") ;
                    else
                        AnchorNav.classList.add("Show") ;
                });
            }
        }
    }

    OpenMenuMobile() {
        const IconClose = this.#MenuMobileElement
            .getElementsByClassName("MenuMobile__Close").item(0)
            .getElementsByTagName("i").item(0);
        if(!this.#MenuMobileElement.classList.contains("Open")) {
            this.#MenuMobileElement.classList.add("Open") ;
            IconClose.addEventListener('click' , () => {
                this.CloseMenuMobile() ;
            }) ;
        }
    }

    CloseMenuMobile() {
        const IconClose = this.#MenuMobileElement
            .getElementsByClassName("MenuMobile__Close").item(0)
            .getElementsByTagName("i").item(0);
        if(this.#MenuMobileElement.classList.contains("Open")) {
            this.#MenuMobileElement.classList.remove("Open") ;
            const CloneElement = IconClose.cloneNode(true);
            IconClose.replaceWith(CloneElement) ;
        }
    }

}