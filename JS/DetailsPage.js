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

    #SliderGallery ;

    #GalleryImageElements ;

    #VenoboxList ;

    #ImageIndex ;

    constructor(GalleryElement) {
        if(GalleryElement instanceof HTMLElement) {
            this.#GalleryElement = GalleryElement ;
            this.#InitialElement() ;
        }
    }

    #InitialElement() {
        const ImageScroll = this.#GalleryElement
            .getElementsByClassName("Gallery__OtherImages").item(0) ;
        this.#GalleryImageElements = ImageScroll
            .getElementsByClassName("Gallery__SliderImage") ;
        const ArrowRight = ImageScroll
            .getElementsByClassName("Arrow_Right").item(0);
        const ArrowLeft = ImageScroll
            .getElementsByClassName("Arrow_Left").item(0);
        this.#SliderGallery = this.#GalleryElement
            .getElementsByClassName("Gallery__SliderImages").item(0) ;
        if(this.#GalleryImageElements.length > 0) {
            // this.#InitialVenobox() ;
            this.#ImageIndex = 0 ;
            this.#ChangeImage(this.#ImageIndex);
            if(this.#GalleryImageElements.length > 1) {
                ArrowRight.addEventListener("click" , () => {
                    this.#MoveSlide("Right") ;
                });
                ArrowLeft.addEventListener("click" , () => {
                    this.#MoveSlide("Left") ;
                });
            } else {
                ArrowRight.style.display = "none" ;
                ArrowLeft.style.display = "none" ;
            }
        } else {
            this.#ImageIndex = -1 ;
            ArrowRight.style.display = "none" ;
            ArrowLeft.style.display = "none" ;
        }
    }

    #InitialVenobox() {
        const ImageMainContainer = this.#GalleryElement
            .getElementsByClassName("Gallery__MainImage").item(0) ;
        const Clones = ImageMainContainer.getElementsByTagName("a").item(0).cloneNode(false) ;
        const frag = document.createDocumentFragment();
        frag.append(Clones) ;
        // for (let ImageItem of this.#GalleryImageElements) {
        //     const SourceImage = ImageItem.querySelector("img").src ;
        //     const AnchorElement = document.createElement("a") ;
        //     AnchorElement.classList.add("venobox") ;
        //     AnchorElement.setAttribute("data-gall" , "gallery_1") ;
        //     AnchorElement.setAttribute("data-maxwidth" , "100%") ;
        //     AnchorElement.setAttribute("title" , "ImageNews") ;
        //     AnchorElement.setAttribute("href" , SourceImage) ;
        //     if(this.#GalleryImageElements[0] === ImageItem)
        //         AnchorElement.innerHTML = `<img src="${SourceImage}" alt="ImageNews" />`
        //     frag.append(AnchorElement) ;
        // }
        ImageMainContainer.append(frag) ;
        this.#VenoboxList = frag ;
    }

    #MoveSlide(Direction = String) {
        const ViewWidth = this.#SliderGallery.offsetWidth ;
        const ActuallyWidth = this.#SliderGallery.scrollWidth ;
        const CurrentPosition = this.#SliderGallery.scrollLeft + ViewWidth ;
        const PrevImage = this.#ImageIndex ;
        const ImageWidth = this.#GalleryImageElements
            .item(this.#ImageIndex).offsetWidth + this.#CalcSpaceImage() ;
        if(Direction === "Left") this.#ImageIndex -- ;
        else if(Direction === "Right") this.#ImageIndex ++ ;
        if(this.#ImageIndex < 0)
            this.#ImageIndex = this.#GalleryImageElements.length - 1 ;
        else if(this.#ImageIndex >= this.#GalleryImageElements.length)
            this.#ImageIndex = 0 ;
        const CalcImageArea = ImageWidth * (this.#ImageIndex + 1) ;
        if(CalcImageArea / CurrentPosition > 1) {
            // Last Left
            this.#SliderGallery.scrollLeft = (ImageWidth * (this.#ImageIndex + 1))
                - ViewWidth ;
        } else {
            // Last Right
            if(Direction === "Left") {
                const ImageArea =  ActuallyWidth - (ImageWidth * (this.#ImageIndex)) ;
                const CurrentPositionRight = ActuallyWidth - CurrentPosition + ViewWidth ;
                if(CurrentPositionRight < ImageArea) {
                    this.#SliderGallery.scrollLeft = (ImageWidth * (this.#ImageIndex + 1))
                        - ImageWidth;
                }
            }
            else if(Direction === "Right") {
                const ImageArea = ImageWidth * (this.#ImageIndex) + ViewWidth - ImageWidth ;
                if(CurrentPosition - ImageArea > 0) {
                    this.#SliderGallery.scrollLeft = (ImageWidth * (this.#ImageIndex + 1))
                        - ImageWidth ;
                }
            }
        }
        this.#ChangeImage(this.#ImageIndex , PrevImage) ;
    }

    #CalcSpaceImage() {
        const ImageOne = this.#SliderGallery.children[0] ;
        const ImageTwo = this.#SliderGallery.children[1] ;
        return Math.abs(ImageOne.offsetLeft
            + ImageOne.offsetWidth - ImageTwo.offsetLeft) ;
    }

    #ChangeImage(NextIndexImage , PrevIndexImage) {
        if(PrevIndexImage !== undefined) {
            this.#GalleryImageElements.item(PrevIndexImage)
                .classList.remove("SelectImage")
        }
        this.#GalleryElement.querySelector(".Gallery__MainImage a img")
            .src = this.#GalleryImageElements.item(NextIndexImage)
            .getElementsByTagName("img").item(0).src ;
        this.#GalleryImageElements.item(NextIndexImage)
            .classList.add("SelectImage");
    }
}