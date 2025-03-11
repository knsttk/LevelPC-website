document.addEventListener("DOMContentLoaded", function () {
    const catalogueMenu = document.querySelector(".catalogue-menu");
    const mainCatalogueButton = document.querySelector(".main-catalogue-button");
    const burgerCatalogueButton = document.querySelector(".burger-catalogue-button");
    const burgerMenu = document.querySelector(".burger-menu-wrapper");
    
    function positionCatalogue(button, isBurger) {
        const buttonRect = button.getBoundingClientRect();
        
        if (isBurger) {
            // В бургере каталог должен примыкать к правому краю меню
            catalogueMenu.style.left = `${burgerMenu.getBoundingClientRect().right}px`;
            catalogueMenu.style.top = `${burgerMenu.getBoundingClientRect().top}px`;
            catalogueMenu.style.marginLeft = "0px";
            catalogueMenu.classList.add("burger-active");
        } else {
            // На полном разрешении каталог позиционируется относительно кнопки "КАТАЛОГ"
            catalogueMenu.style.left = `${buttonRect.left}px`;
            catalogueMenu.style.top = `${buttonRect.bottom}px`;
            catalogueMenu.style.marginLeft = "0px";
            catalogueMenu.classList.remove("burger-active");
        }
    }
    
    mainCatalogueButton.addEventListener("mouseenter", function () {
        positionCatalogue(mainCatalogueButton, false);
        showCatalogueMenu();
    });
    
    mainCatalogueButton.addEventListener("mouseleave", function (event) {
        if (!catalogueMenu.contains(event.relatedTarget)) {
            hideCatalogueMenu();
        }
    });
    
    catalogueMenu.addEventListener("mouseleave", function (event) {
        if (!mainCatalogueButton.contains(event.relatedTarget)) {
            hideCatalogueMenu();
        }
    });
    
    burgerCatalogueButton.addEventListener("click", function () {
        if (catalogueMenu.classList.contains("burger-active")) {
            hideCatalogueMenu();
        } else {
            positionCatalogue(burgerCatalogueButton, true);
            showCatalogueMenu();
        }
    });
    
    document.addEventListener("click", function (event) {
        if (!catalogueMenu.contains(event.target) && !mainCatalogueButton.contains(event.target) && !burgerCatalogueButton.contains(event.target)) {
            hideCatalogueMenu();
        }
    });
    
    function showCatalogueMenu() {
        catalogueMenu.style.display = "flex";
        setTimeout(() => {
            catalogueMenu.style.opacity = "1";
            catalogueMenu.style.visibility = "visible";
        }, 10); // Небольшая задержка, чтобы исключить конфликт со скрытием
    }
    
    function hideCatalogueMenu() {
        catalogueMenu.style.opacity = "0";
        catalogueMenu.style.visibility = "hidden";
        setTimeout(() => {
            if (catalogueMenu.style.opacity === "0") {
                catalogueMenu.style.display = "none";
                catalogueMenu.classList.remove("burger-active");
            }
        }, 200);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const categoryItems = document.querySelectorAll(".catalogue-menu-left li");
    const categoryContents = document.querySelectorAll(".catalogue-menu-right .category-content");

    categoryItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            const category = item.getAttribute("data-category");

            // Убираем активный класс у всех категорий
            categoryContents.forEach(content => {
                content.classList.remove("active");
            });

            // Показываем нужную категорию
            const activeCategory = document.getElementById(category);
            if (activeCategory) {
                activeCategory.classList.add("active");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Выбираем все слайдеры
    const sliders = document.querySelectorAll('.slider-wrapper');

    sliders.forEach(slider => {
        const sliderImages = slider.querySelector('.slider-images');
        const slides = slider.querySelectorAll('.slide');
        const indicators = slider.querySelectorAll('.indicator');
        let currentSlide = 0;

        function showSlide(index) {
            // Проверяем границы индекса
            if (index < 0) {
                index = slides.length - 1; // Переход к последнему слайду
            } else if (index >= slides.length) {
                index = 0; // Переход к первому слайду
            }

            const offset = -index * 100; // Сдвигаем слайды на 100% ширины
            sliderImages.style.transform = `translateX(${offset}%)`;

            // Обновляем индикаторы
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });

            currentSlide = index; // Обновляем текущий слайд
        }

        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0; // Переход к первому слайду, если достигнут конец
            }
            showSlide(nextIndex);
        }

        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1; // Переход к последнему слайду, если достигнуто начало
            }
            showSlide(prevIndex);
        }

        // Обработчики для кнопок навигации
        slider.querySelector('.slider-nav.next').addEventListener('click', nextSlide);
        slider.querySelector('.slider-nav.prev').addEventListener('click', prevSlide);

        // Обработчики для индикаторов
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index); // Переход к слайду по индексу
            });
        });

        // Автоматическое переключение слайдов
        setInterval(nextSlide, 5000); // Переключение каждые 5 секунд
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fullWidthSliderImages = document.querySelector('.second-slider-wrapper .slider-images');
    const fullWidthSlides = document.querySelectorAll('.second-slider-wrapper .slide');
    const fullWidthIndicators = document.querySelectorAll('.second-slider-wrapper .indicator');
    let currentFullWidthSlide = 0;

    function showFullWidthSlide(index) {
        const offset = -index * 100; // Сдвигаем слайды на 100% ширины
        fullWidthSliderImages.style.transform = `translateX(${offset}%)`;

        // Обновляем индикаторы
        fullWidthIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function nextFullWidthSlide() {
        currentFullWidthSlide = (currentFullWidthSlide + 1) % fullWidthSlides.length;
        showFullWidthSlide(currentFullWidthSlide);
    }

    function prevFullWidthSlide() {
        currentFullWidthSlide = (currentFullWidthSlide - 1 + fullWidthSlides.length) % fullWidthSlides.length;
        showFullWidthSlide(currentFullWidthSlide);
    }

    document.querySelector('.second-slider-wrapper .slider-nav.next').addEventListener('click', nextFullWidthSlide);
    document.querySelector('.second-slider-wrapper .slider-nav.prev').addEventListener('click', prevFullWidthSlide);

    fullWidthIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentFullWidthSlide = index;
            showFullWidthSlide(currentFullWidthSlide);
        });
    });

    // Автоматическое переключение слайдов
    setInterval(nextFullWidthSlide, 5000);
});



document.addEventListener("DOMContentLoaded", function() {
    const moreButton = document.querySelector('.header-more-button');
    const moreMenu = document.querySelector('.header-more-menu');

    let menuTimeout; // Для отмены таймера, если курсор вернется на кнопку или меню

    // Показываем меню при наведении на кнопку "ЕЩЁ"
    moreButton.addEventListener('mouseenter', function() {
        const buttonLoc = moreButton.getBoundingClientRect();
        // Устанавливаем левый край меню на уровень левого края кнопки
        moreMenu.style.left = `${buttonLoc.left}px`;
        // Показываем меню
        moreMenu.style.display = 'flex';
    });

    // Скрываем меню, если курсор уходит с кнопки или меню
    moreButton.addEventListener('mouseleave', function() {
        menuTimeout = setTimeout(function() {
            moreMenu.style.display = 'none'; // Скрываем меню
        }, 100); // Задержка 100 мс
    });

    moreMenu.addEventListener('mouseenter', function() {
        clearTimeout(menuTimeout); // Останавливаем таймер, если курсор на меню
    });

    moreMenu.addEventListener('mouseleave', function() {
        moreMenu.style.display = 'none'; // Скрываем меню, если курсор ушел с меню
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const burgerButton = document.querySelector(".burger-menu-button");
    const burgerMenu = document.querySelector(".burger-menu-wrapper");
    const overlay = document.querySelector(".burger-menu-overlay");

    // Функция для открытия меню
    function openMenu() {
        burgerMenu.classList.add("active");
        overlay.classList.add("active");
    }

    // Функция для закрытия меню
    function closeMenu() {
        burgerMenu.classList.remove("active");
        overlay.classList.remove("active");
    }

    // Клик по кнопке меню
    burgerButton.addEventListener("click", openMenu);

    // Клик по затемненной области закрывает меню
    overlay.addEventListener("click", closeMenu);

    // Закрытие при нажатии на ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const catalogueButtonBurger = document.querySelector('.burger-catalogue-button'); // Кнопка в бургер-меню
    const catalogueMenu = document.querySelector('.catalogue-menu');

    if (!catalogueButtonBurger || !catalogueMenu) return;

    catalogueButtonBurger.addEventListener('click', function() {
        if (catalogueMenu.classList.contains('burger-active')) {
            hideCatalogueMenu(); // Если каталог уже открыт, скрываем
        } else {
            showCatalogueMenu();
        }
    });

    function showCatalogueMenu() {
        catalogueMenu.style.display = 'flex';
        catalogueMenu.style.opacity = '1';
        catalogueMenu.style.visibility = 'visible';
        catalogueMenu.style.zIndex = '15';

        // Добавляем класс для изменения стилей
        catalogueMenu.classList.add('burger-active');
    }

    function hideCatalogueMenu() {
        catalogueMenu.style.opacity = '0';
        catalogueMenu.style.visibility = 'hidden';
        setTimeout(() => {
            if (catalogueMenu.style.opacity === '0') {
                catalogueMenu.style.display = 'none';
                catalogueMenu.classList.remove('burger-active'); // Убираем класс, когда скрываем
            }
        }, 200);
    }

    // Закрываем каталог, если кликнули вне него
    document.addEventListener('click', function(event) {
        if (!catalogueMenu.contains(event.target) && !catalogueButtonBurger.contains(event.target)) {
            hideCatalogueMenu();
        }
    });
});
