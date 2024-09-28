document.getElementById("currentYear").innerHTML=new Date().getFullYear();
let backgroundOption = true;
let backgroundInterval;
let mainColor = localStorage.getItem("color_option");
if(mainColor!==null){
let backgroundLocalItem= localStorage.getItem("background_option")
if(backgroundLocalItem!==null){
document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active")
})
if(backgroundLocalItem==='true'){
    document.querySelector(".random-backgrounds .yes").classList.add("active");
}
else{
    document.querySelector(".random-backgrounds .no").classList.add("active");
}
}
    document.documentElement.style.setProperty('--main-color',localStorage.getItem("color_option"));
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
        if(element.dataset.color === mainColor){
            element.classList.add("active")
        }
    })
}
// Toggle Spin Class on icon
document.querySelector(".toggle-settings i").onclick= function () {
this.classList.toggle("fa-spin");
// toggle open on the window
document.querySelector(".settings-box").classList.toggle("open");
}
// this is where we control the color side settings
const colorsLi =document.querySelectorAll(".colors-list li");
colorsLi.forEach(li =>{
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        localStorage.setItem("color_option", e.target.dataset.color)
        e.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active");
        })
        e.target.classList.add("active");
    })
})
// random Background
const randomBackEl =document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(span =>{
    span.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active");
        })
        e.target.classList.add("active");
        if(e.target.dataset.background === 'yes'){
            backgroundOption=true;
            randomizeImgs();
            localStorage.setItem("background_option",true)
        }
        else{
            backgroundOption=false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option",false)
        }
    })
})
// select landing class
let landing= document.querySelector(".landing-page");
//get array of images
let imgArry = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"]
function randomizeImgs(){
if(backgroundOption === true){
    backgroundInterval=setInterval(() => {
    let randomNumber= Math.floor(Math.random()*imgArry.length)
    landing.style.backgroundImage=`url(Imgs/${randomNumber+1}.jpg)`
},1000)
}}

let ourSkills = document.querySelector(".skills");

window.onscroll = ()=>{
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if(windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight - 200)){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress
        });}
    else if (windowScrollTop < (skillsOffsetTop + skillsOuterHeight - windowHeight)){
            let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
            allSkills.forEach(skill =>{
                skill.style.width = 0
            });
        }
};
// create popup with the image 

let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img =>{
    img.addEventListener('click',(e) =>{
        // create overlay element
        let overlay =document.createElement("div");
        // add class to overlay
        overlay.className = 'popup-overlay';
        // append overlay to the body
        document.body.appendChild(overlay);
        // create the popup box
        let popupBox = document.createElement("div");
        // Add Class To The Popup Box
        popupBox.className = 'popup-box'
        if(img.alt !== null){
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        // create the image
        let popupImage =document.createElement("img")
        // set image source
        popupImage.src = img.src;
        // add image to the popup box
        popupBox.appendChild(popupImage);
        // appennd the popup box to the body
        document.body.appendChild(popupBox);
        let closeButton = document.createElement("span")
        let closeButtonText = document.createTextNode("X")
        closeButton.appendChild(closeButtonText);
        closeButton.className='close-button';
        popupBox.appendChild(closeButton);
    });
});
// Close Popup
document.addEventListener("click",(e)=>{
    if (e.target.className== 'close-button'){
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
})
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach(bullet=>{
    bullet.addEventListener("click",(e)=>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior : 'smooth'
        })
    } )

})
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    });
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => { 
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
        }
handleActive(e);
}
)});
document.querySelector(".reset-options").onclick = function () {
localStorage.removeItem("color_option");
localStorage.removeItem("background_option");
localStorage.removeItem("bullets_option");
window.location.reload();
};
// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e){
    e.stopPropagation(); 
    this.classList.toggle("menu-active")
    tLinks.classList.toggle("open")
}
// click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
    if(e.target!==toggleBtn && e.target!==tLinks){
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active")
            tLinks.classList.toggle("open")        
        }
    }
})
tLinks.onclick = function (e) {
    e.stopPropagation()
}