
export class Seperator{
    constructor(_text, _container){
        this.text = _text
        this.container = _container
        this.letter = new Array()
        this.color = new Array()
        this.element = new Array()
        this.length = this.text.innerHTML.length
        this.increment = 0
        this.colors = new Array(0xEF476F,0xFFD166,0x06D6A0,0x118AB2,0x073B4C,0x264653,0x2A9D8F,0xE9C46A,0xF4A261,0xE76F51)
        this.seperateLetter()
        this.clearText()
        this.createSeperateDiv()
        
    }
    
    seperateLetter(){
        for (let index = 0 ; index < this.length ; index++) {
            this.letter.push(this.text.innerHTML[index])
        }
    }

    clearText(){
        this.text.innerHTML = ''
    }


    changeColor() {
        
            this.element.forEach(element => {
                element.style.color = "#" + this.colors[Math.floor(Math.random()* this.colors.length)].toString(16)
            });

    }

    resetColor() {
        this.element.forEach(element => {
            element.style.color = "#000"
        });

    }

    createSeperateDiv(){
        for (let index = 0; index < this.length; index++) {
            this.increment += 200
            let span = document.createElement("span")
            span.className = "colors_change"
            span.style.color = this.color[index]
            span.innerHTML = this.letter[index] 
            this.container.appendChild(span)   
        }
        this.element = document.querySelectorAll('.colors_change')
    }
}