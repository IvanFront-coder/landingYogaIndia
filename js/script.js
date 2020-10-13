window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    let infoBlock = document.querySelector('.info'),
        descrBtns = document.querySelectorAll('.description-btn');

    descrBtns.forEach(function(item) {
        item.addEventListener('click', showModal);
    });


    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer

    let deadline = '2020-10-11';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60)%60),
        hours = Math.floor((t/(1000*60*60)));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            if (t.hours < 10) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;
            }
            if (t.minutes < 10) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }
            if (t.seconds < 10) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }

            if (t.total <= 0) {
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);

    // Modal

    more.addEventListener('click', showModal);

    close.addEventListener('click', hideModal);

    function showModal() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    }

    // form отправка данных с формы через FormData

    // let message = {
    //     loading: 'Загрузка...',
    //     success: 'Спасибо! Скоро мы с вами свяжемся',
    //     failure: 'Что-то пошло не так...'
    // };

    // let form = document.querySelector('.main-form'),
    //     input = form.getElementsByTagName('input'),
    //     statusMessage = document.createElement('div');

    //     statusMessage.classList.add('status');

    //     form.addEventListener('submit', function(event) {
    //         event.preventDefault();
    //         form.appendChild(statusMessage);

    //         let request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');
    //         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //         let formData = new FormData(form);
    //         request.send(formData);

    //         request.addEventListener('readystatechange', function() {
    //             if (request.readyState < 4) {
    //                 statusMessage.innerHTML = message.loading;
    //             } else if (request.readyState === 4 && request.status === 200) {
    //                 statusMessage.innerHTML = message.success;
    //             } else {
    //                 statusMessage.innerHTML = message.failure;
    //             }
    //         });

    //         for (let i = 0; i < input.length; i++) {
    //             input[i].value = '';
    //         }
    //     });



    // form отправка данных с формы через JSON

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(form);

            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            request.send(json);

            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status === 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });

        let contactForm = document.querySelector('#form'),
        inputsCF = contactForm.getElementsByTagName('input'),
        statusMessageCF = document.createElement('div');

        statusMessageCF.classList.add('status');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            contactForm.appendChild(statusMessageCF);

            let requestCF = new XMLHttpRequest();
            requestCF.open('POST', 'server.php');
            requestCF.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formDataCF = new FormData(contactForm);

            let objCF = {};
            formDataCF.forEach(function (value, key) {
                objCF[key] = value;
            });

            let jsonCF = JSON.stringify(objCF);
            requestCF.send(jsonCF);

            requestCF.addEventListener('readystatechange', function() {
                if (requestCF.readyState < 4) {
                    statusMessageCF.innerHTML = message.loading;
                } else if (requestCF.readyState === 4 && requestCF.status === 200) {
                    statusMessageCF.innerHTML = message.success;
                } else {
                    statusMessageCF.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                inputsCF[i].value = '';
            }

        });
});

