"use strict";

const DIRECTIONS = {
    right: "RIGHT",
    left: "LEFT"
}
const PIXEL_IN_REM = 10;
const SLIDER_ITEMS_GAP = 20;
const MAX_SLIDER_ITEMS = 6;

const MEMBERS_SLIDER = document.querySelector(".members__list");
const LEFT_MEMBERS_BUTTON = document.querySelector("#left-members-button");
const RIGHT_MEMBERS_BUTTON = document.querySelector("#right-members-button");
const START_VISIBLE_SLIDES_NUMBER = getStartVisibleSlidesNumber();

let currentPosition = 0;
let visibleSlidesNumber = START_VISIBLE_SLIDES_NUMBER;

LEFT_MEMBERS_BUTTON.addEventListener("click", () => moveSlider(DIRECTIONS.left));
RIGHT_MEMBERS_BUTTON.addEventListener("click", () => moveSlider(DIRECTIONS.right));

(function init() {
    setVisibleSlidesNumber(START_VISIBLE_SLIDES_NUMBER)
})()

function moveSlider(direction) {
    let viewSliderWidth = getSliderVisibleWidth();

    if (viewSliderWidth === undefined) {
        return;
    }

    if (direction === DIRECTIONS.left) {
        let value = START_VISIBLE_SLIDES_NUMBER;

        if (visibleSlidesNumber > START_VISIBLE_SLIDES_NUMBER) {
            currentPosition += viewSliderWidth + SLIDER_ITEMS_GAP;
            value = Number(visibleSlidesNumber) - START_VISIBLE_SLIDES_NUMBER;
        } else {
            value = MAX_SLIDER_ITEMS;
            currentPosition = -viewSliderWidth * (Math.floor(MAX_SLIDER_ITEMS / visibleSlidesNumber) - 1);
        }

        setVisibleSlidesNumber(value);
        visibleSlidesNumber = value;
    }

    if (direction === DIRECTIONS.right) {
        let value = START_VISIBLE_SLIDES_NUMBER;

        if (visibleSlidesNumber < MAX_SLIDER_ITEMS) {
            currentPosition -= viewSliderWidth + SLIDER_ITEMS_GAP;
            value += Number(visibleSlidesNumber);
        } else {
            value = START_VISIBLE_SLIDES_NUMBER;
            currentPosition = 0;
        }

        setVisibleSlidesNumber(value);
        visibleSlidesNumber = value;
    }

    MEMBERS_SLIDER.style.left = getRemValue(currentPosition) + "rem";
}

function getRemValue(pixels) {
    return pixels / PIXEL_IN_REM;
}

function getSliderVisibleWidth() {
    return MEMBERS_SLIDER?.getBoundingClientRect()?.width
}

function getStartVisibleSlidesNumber() {
    let slides = document.querySelectorAll(".members__item");
    let slideWidth = slides[0].getBoundingClientRect().width;

    return Math.floor(getSliderVisibleWidth() / slideWidth);
}

function setVisibleSlidesNumber(value) {
    let membersVisibleSlides = document.querySelector("#members-visible-slides");
    membersVisibleSlides.textContent = String(value);
}