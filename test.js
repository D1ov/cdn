$(document).ready(function () {
    const cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8]; //указать через запятую кол. карточек

    const mediaQuery = window.matchMedia('(min-width: 480px)');

    cardNumbers.forEach(num => {

        $(`.img-card-${num}-main, .img-card-${num}-arrow`).addClass(`card-flip-content-face-${num}`);
        $(`.img-card-${num}${num}-arrow`).addClass(`card-flip-content-back-${num}`);


        setTimeout(() => {
            $(`.card-flip-content-back-${num}`).wrapAll(`<div class="card-flip-wrapper-back-${num}"></div>`);
            $(`.card-flip-content-face-${num}`).wrapAll(`<div class="card-flip-wrapper-face-${num}"></div>`);
            $(`.card-flip-wrapper-back-${num}, .card-flip-wrapper-face-${num}`).appendTo(`.card-flip-wrapper-main-${num} .tn-atom`);
        }, 0);


        $(`.card-flip-wrapper-main-${num}`).removeClass(`card-flip-wrapper-main-active-${num}`);


        const handler = function () {
            $(this).toggleClass(`card-flip-wrapper-main-active-${num}`);
        };

        if (mediaQuery.matches) {
            $(`.card-flip-wrapper-main-${num}`).hover(handler);
        } else {
            $(`.card-flip-wrapper-main-${num}`).on('click', handler);
        }
    });
});
