'use strict'
import {HeaderPage} from "./Header.js" ;
import {DetailsPage} from "./DetailsPage.js";


class Main {

    #HeaderObject ;

    #DetailsObject ;

    constructor() {
        this.#HeaderObject = new HeaderPage(document
                .getElementsByClassName("HeaderPage").item(0) ,
            document.getElementsByClassName("MenuMobile").item(0));
        if(document.getElementsByClassName("DetailsPage").length === 1)
            this.#DetailsObject = new DetailsPage(
                document.getElementsByClassName("DetailsPage").item(0)) ;
    }
}

const MainProgram = new Main() ;

