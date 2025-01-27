let w, p, bike
let music
var canSound = false

function preload() {
    music = loadSound("cycle.mp3")
}

function setup() {
    let cnvs = createCanvas(windowWidth-15, windowHeight*0.9)
    cnvs.parent("canvas")
    rectMode(CORNERS)
    ellipseMode(CENTER)
    textAlign(screenLeft, TOP)
    noStroke()
    colorMode(HSL, 100)

    w = 2
    p = 100
    bike = new Bike

    document.addEventListener("click", () => {canSound = true})
}

function draw() {
    background("#dcfaed")
    r = width/w
    for(i=0; i<width/w; i++) {
        fill(noise(0, p*10+i/25)*10+25, 20, 50)
        rect(w*i, noise(0, -p+r/(1000/w))*height*0.8-height/40, w*(i+1)+1, height)
        r--
    }
    for(i=0; i<width/w; i++) {
        fill(noise(0, p*10+i/50)*10+25, 30, 60)
        rect(w*i, noise(p+i/(1500/w), 0)*height*0.8+height/7.5, w*(i+1)+1, height)
    }
    for(i=0; i<width/w; i++) {
        fill(noise(p*10+i/100, 0)*10+25, 40, 70)
        rect(w*i, min(noise(0, p+i/(2000/w))*height*0.8+height/3, height*0.9), w*(i+1)+1, height)
    }
    bike.draw()
    //p += w/5000
    if(!music.isPlaying() && canSound) music.play()
}

class Bike {
    constructor() {
        this.wheel = 0
        this.v = 400
    }
    draw() {
        //wheels
        fill(90)
        this.w1 = min(noise(0, p+width/5/w/(2000/w))*height*0.8+height/3, height*0.9)-width/40
        ellipse(width/5, this.w1, width/20)
        this.w2 = min(noise(0, p+(width/5+width/10)/w/(2000/w))*height*0.8+height/3, height*0.9)-width/40
        ellipse(width/5+width/10, this.w2, width/20)

        this.v += (this.w1-this.w2)/4

        //frame
        push()
        strokeWeight(width/150)
        stroke("white")
        line(width/5, this.w1, width/5+width/20, (this.w1+this.w2)/2)
        line(width/5, this.w1, width/5+width/40, (this.w1*2+this.w2)/3-width/22)
        line(width/5+width/20, (this.w1+this.w2)/2, width/5+width/40, (this.w1*2+this.w2)/3-width/22)
        line(width/5+width/40, (this.w1*2+this.w2)/3-width/22-width/300, width/5+width/80, (this.w1*2+this.w2)/3-width/22-width/300)
        line(width/5+width/10, this.w2, width/5+width/10-width/30, (this.w1+this.w2*2)/3-width/17)
        line(width/5+width/40, (this.w1*2+this.w2)/3-width/22, width/5+width/10-width/40, (this.w1+this.w2*2)/3-width/25)
        line(width/5+width/20, (this.w1+this.w2)/2, width/5+width/10-width/40, (this.w1+this.w2*2)/3-width/25)
        pop()
        p += w/this.v
    }
}