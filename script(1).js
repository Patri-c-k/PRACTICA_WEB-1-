document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ЛОГИКА БУРГЕР-МЕНЮ И КАТАЛОГА
    // ==========================================
    const catalogBtn = document.getElementById('catalogBtn');
    const catalogDropdown = document.getElementById('catalogDropdown');
    const categoryItems = document.querySelectorAll('.catalog-dropdown__item');
    const subpanelContents = document.querySelectorAll('.subpanel-content');

    if (catalogBtn && catalogDropdown) {

        catalogBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            catalogDropdown.classList.toggle('open');
            catalogBtn.classList.toggle('catalog-btn--active');
        });

        categoryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const targetCategory = item.getAttribute('data-category');
                const targetPanel = document.getElementById(`cat-${targetCategory}`);

                if (targetPanel) {
                    categoryItems.forEach(el => el.classList.remove('active'));
                    subpanelContents.forEach(el => el.classList.remove('active'));

                    item.classList.add('active');
                    targetPanel.classList.add('active');
                }
            });
        });

        document.addEventListener('click', () => {
            catalogDropdown.classList.remove('open');
            catalogBtn.classList.remove('catalog-btn--active');
        });
    }

    // ==========================================
    // 2. УНИВЕРСАЛЬНАЯ ЛОГИКА СЛАЙДЕРОВ
    // ==========================================
    const initSlider = (sectionId, prevBtnClass, nextBtnClass) => {

        const section = document.getElementById(sectionId);
        if (!section) return;

        const sliderWindow = section.querySelector('.slider-window');
        const grid = section.querySelector('.products-grid');

        const prevBtn = section.querySelector('.' + prevBtnClass);
        const nextBtn = section.querySelector('.' + nextBtnClass);

        if (!sliderWindow || !grid || !prevBtn || !nextBtn) return;

        const getScrollStep = () => {
            const firstCard = grid.querySelector('.product-card');

            if (firstCard) {
                const gap = parseFloat(window.getComputedStyle(grid).gap) || 20;
                return firstCard.offsetWidth + gap;
            }

            return 300;
        };

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();

            sliderWindow.scrollBy({
                left: getScrollStep(),
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();

            sliderWindow.scrollBy({
                left: -getScrollStep(),
                behavior: 'smooth'
            });
        });
    };

    // Слайдеры
    initSlider('slider-months', 'month-prev', 'month-next');
    initSlider('slider-news', 'news-prev', 'news-next');
    initSlider('slider-promo', 'promo-prev', 'promo-next');


    // 3. МОБИЛЬНЫЙ БУРГЕР-ДРОВЕР
    // ==========================================
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const mobileClose = document.getElementById('mobileNavClose');
    const mobileSubpanel = document.getElementById('mobileSubpanel');
    const mobileSubBack = document.getElementById('mobileSubBack');
    const mobileSubItems = document.getElementById('mobileSubItems');

    const subCategories = {
        'accumulators': {
            title: 'Аккумуляторы',
            groups: [
                { title: 'Автомобильные АКБ', items: ['Кальциевые (Ca/Ca)', 'Гибридные (Sb/Ca)', 'Гелевые (GEL)'] },
                { title: 'Промышленные АКБ', items: ['Для ИБП', 'Для солнечных батарей'] },
                { title: 'Зарядные устройства', items: [] },
                { title: 'Клеммы и провода', items: [] },
                { title: 'Аксессуары', items: [] },
            ]
        },
        'control-blocks': {
            title: 'Блоки контроля',
            groups: [
                { title: 'Контроллеры напряжения', items: [] },
                { title: 'Модули управления АВР', items: [] },
                { title: 'Датчики и реле', items: [] },
            ]
        },
        'generators': {
            title: 'Генераторы',
            groups: [
                { title: 'Бензиновые генераторы', items: [] },
                { title: 'Дизельные электростанции', items: [] },
                { title: 'Инверторные модели', items: [] },
            ]
        },
        'climate': {
            title: 'Климатическая техника',
            groups: [
                { title: 'Кондиционеры', items: [] },
                { title: 'Обогреватели', items: [] },
                { title: 'Очистители воздуха', items: [] },
            ]
        },
        'heating': {
            title: 'Отопление',
            groups: [
                { title: 'Котлы', items: [] },
                { title: 'Радиаторы', items: [] },
            ]
        },
        'perforators': {
            title: 'Перфораторы',
            groups: [
                { title: 'Электрические', items: [] },
                { title: 'Аккумуляторные', items: [] },
            ]
        },
        'wires': {
            title: 'Провода',
            groups: [
                { title: 'Силовые кабели', items: [] },
                { title: 'Сигнальные кабели', items: [] },
            ]
        },
    };

    function openDrawer() {
        mobileDrawer && mobileDrawer.classList.add('open');
        mobileOverlay && mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer && mobileDrawer.classList.remove('open');
        mobileOverlay && mobileOverlay.classList.remove('open');
        mobileSubpanel && mobileSubpanel.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openDrawer();
        });
    }
    if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);
    if (mobileSubBack) mobileSubBack.addEventListener('click', () => {
        mobileSubpanel && mobileSubpanel.classList.remove('open');
    });

    document.querySelectorAll('.mobile-nav-item[data-sub]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const key = item.getAttribute('data-sub');
            const data = subCategories[key];
            if (!data || !mobileSubItems || !mobileSubpanel) return;

            mobileSubBack.textContent = '← ' + data.title;
            let html = '';
            data.groups.forEach(g => {
                html += `<div class="mobile-subcat-group">`;
                html += `<a href="#" class="mobile-subcat-group__title"><span class="toggle-icon">+</span> ${g.title}</a>`;
                g.items.forEach(it => {
                    html += `<a href="#" class="mobile-subcat-item">${it}</a>`;
                });
                html += `</div>`;
            });
            mobileSubItems.innerHTML = html;
            mobileSubpanel.classList.add('open');
        });
    });

});