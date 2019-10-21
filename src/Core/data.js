export class Reader {
    constructor(parent){
         this.json = require('../../static/info.json') 
         this.container = parent
         this.child 
         this.modal = document.querySelector('.modal-main-ctn')

         this.json.forEach(element => {
            this.createElement(element)
         }) 
         

    }

    createElement(el) {
        this.createChild(el)
        this.createNumber(el)
        this.createTitle(el)
        this.createDate(el)
        this.createDesc(el)
        el.media === "video" ? this.createVideo(el) : this.createImage(el)
        this.createReturn(el)
        
        this.appendModule()
           
    }


    createChild(element) {
        this.child = document.createElement("div") 
        this.child.classList.add("content-manager", element.type, "content-right")
    }

    createNumber(element) {
        let number = document.createElement("span") 
        number.classList.add("big-nb")
        number.innerHTML = "0" + (element.number + 1)
        this.child.appendChild(number) 
    }

    createTitle(element) {
        let title = document.createElement("h2") 
        title.innerHTML = element.title
        this.child.appendChild(title) 
    }

    createDate(element) {
        let date = document.createElement("span") 
        date.classList.add("date-content")
        date.innerHTML = element.date
        this.child.appendChild(date) 
    }

    createDesc(element) {
        let para = document.createElement("p") 
        para.classList.add("content-para")
        para.innerHTML = element.description
        this.child.appendChild(para) 
    } 

    createVideo(element) {
        let video_container = document.createElement("div") 
        video_container.classList.add("video-ctn-content") 

        let video = document.createElement("video")
        video.classList.add("video-modal", "01", "lazy") 

        video.setAttribute('data-src', element.url)
        video.setAttribute('autoplay', true)
        video.setAttribute('muted', true)
        video.setAttribute('loop', true)
        video.volume = 0
        video_container.appendChild(video)

        let loader = document.createElement("div") 
        loader.classList.add("video-loader") 

        let circle = document.createElement("div") 
        circle.classList.add("circle-ctn") 

        for (let index = 0 ; index < 3 ; index++) {
            let circle_sml = document.createElement("div") 
            circle_sml.classList.add("circle", "circle-1") 
            circle.appendChild(circle_sml)
        }

        let loading = document.createElement("span") 
        loading.innerHTML = "loading"

        
        loader.appendChild(circle)
        loader.appendChild(loading)
        video_container.appendChild(loader)

        this.child.appendChild(video_container) 

        this.createModale(element)
    }

    createImage(element) {

        if(element.slider) {
            let swiper_container = document.createElement("div") 
            swiper_container.classList.add("swiper-container", "img-holder") 

            let swiper_wrapper = document.createElement("div") 
            swiper_wrapper.classList.add("swiper-wrapper") 

            element.slider.forEach(el => {
                let swiper_slide = document.createElement("div") 
                swiper_slide.classList.add("swiper-slide") 

                let image = document.createElement("img")
                image.classList.add("img-content", "lazy") 
                image.setAttribute('src', el.url)
                image.setAttribute('alt', el.alt)
                swiper_slide.appendChild(image)
                swiper_wrapper.appendChild(swiper_slide)
            });

            let swiper_button_prev = document.createElement("div") 
            swiper_button_prev.classList.add("swiper-button-prev") 

            let swiper_button_next = document.createElement("div") 
            swiper_button_next.classList.add("swiper-button-next") 

            swiper_container.appendChild(swiper_wrapper)

            swiper_container.appendChild(swiper_button_prev)

            swiper_container.appendChild(swiper_button_next)

            this.child.appendChild(swiper_container) 
        
        }
        else {
            let image_container = document.createElement("div") 
            image_container.classList.add("img-holder") 
    
            let image = document.createElement("img")
            image.classList.add("img-content", "lazy") 
    
            image.setAttribute('src', element.url)
            image.setAttribute('alt', element.alt)
            image_container.appendChild(image)
    
            this.child.appendChild(image_container) 
        }

    }

    createReturn(element) {
        let return_container = document.createElement("div") 
        return_container.classList.add("bottom-btn-content") 

        let return_message = document.createElement("span")
        return_message.classList.add("return-home", "sml-btn") 
        return_message.innerHTML = "return"

        return_container.appendChild(return_message)

        if(element.link) {
            let link = document.createElement("a")
            link.classList.add("link_big") 
            link.setAttribute('href', element.link)
            link.setAttribute('target', "_blank")
            link.innerHTML = "See website"
            
            return_container.appendChild(link)
        }

        this.child.appendChild(return_container)

    }

    createModale(element) {
        let modal_container = document.createElement("div") 
        modal_container.classList.add("modal-container") 

        let modal_video_container = document.createElement("div") 
        modal_video_container.classList.add("video-ctn") 

        let cross = document.createElement("div") 
        cross.classList.add("cross-ctn") 

        let modal_video = document.createElement("video")
        modal_video.classList.add("modal-video", "01", "lazy") 

        modal_video.setAttribute('data-src', element.url)
        modal_video.setAttribute('autoplay', true)
        modal_video.setAttribute('muted', true)
        modal_video.setAttribute('loop', true)
        modal_video.volume = 0

        let close = document.createElement("div") 
        close.classList.add("modal-box") 


        
        modal_video_container.appendChild(modal_video)
        modal_video_container.appendChild(cross)
        modal_container.appendChild(modal_video_container)
        modal_container.appendChild(close)

        this.modal.appendChild(modal_container) 
    }

    appendModule() {
        this.container.appendChild(this.child) 
    }
  
}


/**
 * 
 * 
 *         <div class="modal-container">
            <div class="video-ctn">
                <div class="cross-ctn"></div>
                <video controls class="modal-video 01 lazy" data-src="videos/cartier.m4v" autoplay muted loop></video>
            </div>
            <div class="modal-box">
            </div>
        </div>
 */