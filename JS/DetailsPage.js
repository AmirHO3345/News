'use strict'

export class DetailsPage {

    #DetailsPageElement ;

    #SocialMediaObject ;

    #GalleryObject ;

    constructor(DetailsElement) {
        if(DetailsElement instanceof HTMLElement) {
            this.#DetailsPageElement = DetailsElement ;
            this.#InitialUI() ;
        }
    }

    #InitialUI() {
        const DetailsNewsElement = this.#DetailsPageElement
            .getElementsByClassName("DetailsPage__Section--DetailsNews").item(0) ;
        this.#SocialMediaObject = new SocialMedia(DetailsNewsElement
            .getElementsByClassName("ArticleSharing").item(0));
        this.#GalleryObject = new Gallery(DetailsNewsElement
            .getElementsByClassName("Gallery").item(0))
    }
}

class SocialMedia {

    #SocialMediaElement ;

    constructor(SocialElement) {
        if(SocialElement instanceof HTMLElement) {
            this.#SocialMediaElement = SocialElement ;
            this.#InitialElement() ;
        }
    }

    #InitialElement() {
    }

}

class Gallery {

    #GalleryElement ;

    constructor(GalleryElement) {
        if(GalleryElement instanceof HTMLElement) {
            this.#GalleryElement = GalleryElement ;
            this.#InitialElement() ;
        }
    }

    #InitialElement() {
        const ImageScroll = this.#GalleryElement
            .getElementsByClassName("Gallery__SliderImages").item(0) ;
        ImageScroll.addEventListener("scroll" , (event) => {
            this.#ProcessSlider(event) ;
        });
    }

    #ProcessSlider(EventScroll) {
        const ParentWidth = EventScroll.target.offsetWidth ;
        const ChildWidth = EventScroll.target.scrollWidth ;
        const CurrentPosition = EventScroll.target.scrollLeft + ParentWidth ;
        const PartParent = ChildWidth / ParentWidth ;
        console.log("ParentWidth : " , ParentWidth) ;
        console.log("ChildWidth : " , ChildWidth) ;
        console.log("CurrentPosition : " , CurrentPosition) ;
        this.#ViewArrowRight(false) ;
        this.#ViewArrowLeft(false) ;
        for (let i = 1; i <= Math.round(PartParent) ; i++)
            if(ParentWidth * (i-1) <= CurrentPosition &&
                CurrentPosition < ParentWidth * (i+1)) {
                if(i > 1 && i < PartParent) {
                    this.#ViewArrowRight(true) ;
                    this.#ViewArrowLeft(true) ;
                } else if(i === 1 && PartParent > 1) {
                    this.#ViewArrowRight(true) ;
                    this.#ViewArrowLeft(false) ;
                } else if(i === PartParent && i > 1) {
                    this.#ViewArrowRight(false) ;
                    this.#ViewArrowLeft(true) ;
                }
            }
    }

    #ViewArrowLeft(IsView) {
        const ArrowElement = this.#GalleryElement
            .getElementsByClassName("Arrow_Left").item(0) ;
        if(IsView)
            ArrowElement.style.opacity = 1 ;
        else
            ArrowElement.style.opacity = 0 ;
    }

    #ViewArrowRight(IsView) {
        const ArrowElement = this.#GalleryElement
            .getElementsByClassName("Arrow_Right").item(0) ;
        if(IsView)
            ArrowElement.style.opacity = 1 ;
        else
            ArrowElement.style.opacity = 0 ;
    }
}