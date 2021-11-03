const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {

    const visiblity = nav.getAttribute("data-visible");
    if (visiblity === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
})

// loading the JSON file
const filePath = "data.json"
let object = []
let data = {}

async function getData(req, res) {

    res = await fetch(filePath)

        .then(res => res.json())
        .then(data => {

            if (page === 'destination') {
                object = data.destinations
            } if (page === 'crew') {
                object = data.crew
            } if (page === 'technology') {
                object = data.technology
            }
        })
}

getData()

// global variables
const page = document.querySelector('body').className;
const image = document.querySelector('[data-set="img"]');
const title = document.querySelector('[data-set="title"]');
const sub = document.querySelector('[data-set="sub-title"]');
const info = document.querySelector('[data-set="info"]');
const distance = document.getElementById('distance');
const time = document.getElementById('time');
let focusedTab = 0;

// updating the UI function
const updateUI = () => {
    active = document.querySelector('[aria-selected="true"]').getAttribute('data-id');
    for (let i = 0; i < object.length; i++) {

        if (i == active - 1) {
            data = object[i]

            title.textContent = data.name
            info.textContent = data.description

            if (window.innerWidth > 1024 && page === "technology") {
                image.setAttribute('src', data.images.portrait)
            } else {
                image.setAttribute('src', data.images.webp)
            }
            if (page === 'destination') {
                distance.textContent = data.distance
                time.textContent = data.travel
            }

            if (page === 'crew') {
                sub.textContent = data.role
            }
        }
    }
}

// keyboard navigation support
const changeTab = (e) => {
    let left = 37;
    let right = 39;

    if (page === 'technology') {
        left = 38;
        right = 40;
    }

    let tab = document.querySelector('[aria-selected="true"]').getAttribute('data-id')

    if (e.keyCode === left || e.keyCode === right) {
        tabs[tab -1].setAttribute('aria-selected', false)
    }
    if (e.keyCode === left) {
        tab--;
        if (tab <= 0) {
            tab = tabs.length
        }
    }

    if (e.keyCode === right) {
        tab++;
        if (tab > tabs.length) {
            tab = 1
        }
    }

    tabs[tab -1].setAttribute('aria-selected', true)
    tabs[tab -1].focus()
    updateUI()
}

const tabClick = (e) => {
    // tab focus change
    let active = document.querySelector('[aria-selected="true"]')
    active.setAttribute('aria-selected', 'false')
    e.target.setAttribute('aria-selected', 'true')

    updateUI()
}

// keyboard navigation event listener
const tabs = document.querySelectorAll('[role="tab"]')
tabs.forEach((tab) => {
    tab.addEventListener('keydown', changeTab)
    tab.addEventListener('click', tabClick)
})

window.onload = function () {
    updateUI()
}