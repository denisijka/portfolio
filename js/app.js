(() => {
    "use strict";
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            const overlay = document.querySelector(".overlay");
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
                if (overlay) {
                    bodyLockToggle();
                    overlay.classList.toggle("open");
                }
            }
        }));
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    function FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = document.querySelector(targetBlock);
        if (targetBlockElement) {
            let headerItem = "";
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = "header.header";
                headerItemHeight = document.querySelector(headerItem).offsetHeight;
            }
            let options = {
                speedAsDuration: true,
                speed,
                header: headerItem,
                offset: offsetTop,
                easing: "easeOutQuad"
            };
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
            if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                window.scrollTo({
                    top: targetBlockElementPosition,
                    behavior: "smooth"
                });
            }
            FLS(`[gotoBlock]: ????????...???????? ?? ${targetBlock}`);
        } else FLS(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${targetBlock}`);
    };
    let addWindowScrollEvent = false;
    function pageNavigation() {
        document.addEventListener("click", pageNavigationAction);
        document.addEventListener("watcherCallback", pageNavigationAction);
        function pageNavigationAction(e) {
            if ("click" === e.type) {
                const targetElement = e.target;
                if (targetElement.closest("[data-goto]")) {
                    const gotoLink = targetElement.closest("[data-goto]");
                    const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                    const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                    const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                    const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                    gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    e.preventDefault();
                }
            } else if ("watcherCallback" === e.type && e.detail) {
                const entry = e.detail.entry;
                const targetElement = entry.target;
                if ("navigator" === targetElement.dataset.watch) {
                    document.querySelector(`[data-goto]._navigator-active`);
                    let navigatorCurrentItem;
                    if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                        const element = targetElement.classList[index];
                        if (document.querySelector(`[data-goto=".${element}"]`)) {
                            navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                            break;
                        }
                    }
                    if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                }
            }
        }
        if (getHash()) {
            let goToHash;
            if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
            goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
        }
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function DynamicAdapt(type) {
        this.type = type;
    }
    DynamicAdapt.prototype.init = function() {
        const _this = this;
        this.??bjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const ??bject = {};
            ??bject.element = node;
            ??bject.parent = node.parentNode;
            ??bject.destination = document.querySelector(dataArray[0].trim());
            ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            ??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
            ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
            this.??bjects.push(??bject);
        }
        this.arraySort(this.??bjects);
        this.mediaQueries = Array.prototype.map.call(this.??bjects, (function(item) {
            return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }), this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        }));
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ",");
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
            const ??bjectsFilter = Array.prototype.filter.call(this.??bjects, (function(item) {
                return item.breakpoint === mediaBreakpoint;
            }));
            matchMedia.addListener((function() {
                _this.mediaHandler(matchMedia, ??bjectsFilter);
            }));
            this.mediaHandler(matchMedia, ??bjectsFilter);
        }
    };
    DynamicAdapt.prototype.mediaHandler = function(matchMedia, ??bjects) {
        if (matchMedia.matches) for (let i = 0; i < ??bjects.length; i++) {
            const ??bject = ??bjects[i];
            ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
            this.moveTo(??bject.place, ??bject.element, ??bject.destination);
        } else for (let i = ??bjects.length - 1; i >= 0; i--) {
            const ??bject = ??bjects[i];
            if (??bject.element.classList.contains(this.daClassname)) this.moveBack(??bject.parent, ??bject.element, ??bject.index);
        }
    };
    DynamicAdapt.prototype.moveTo = function(place, element, destination) {
        element.classList.add(this.daClassname);
        if ("last" === place || place >= destination.children.length) {
            destination.insertAdjacentElement("beforeend", element);
            return;
        }
        if ("first" === place) {
            destination.insertAdjacentElement("afterbegin", element);
            return;
        }
        destination.children[place].insertAdjacentElement("beforebegin", element);
    };
    DynamicAdapt.prototype.moveBack = function(parent, element, index) {
        element.classList.remove(this.daClassname);
        if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
    };
    DynamicAdapt.prototype.indexInParent = function(parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    DynamicAdapt.prototype.arraySort = function(arr) {
        if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) return 0;
                if ("first" === a.place || "last" === b.place) return -1;
                if ("last" === a.place || "first" === b.place) return 1;
                return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
        })); else {
            Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return 1;
                    if ("last" === a.place || "first" === b.place) return -1;
                    return b.place - a.place;
                }
                return b.breakpoint - a.breakpoint;
            }));
            return;
        }
    };
    const da = new DynamicAdapt("max");
    da.init();
    window.onload = function() {
        const tll = gsap.timeline({
            paused: "true"
        });
        tll.to("#percent, #bar", {
            duration: .2,
            opacity: 0,
            zIndex: -1
        });
        tll.to("#preloader", {
            duration: .7,
            width: "0%"
        });
        tll.from(".wrapper", {
            display: "none",
            opacity: 0
        }, "-=.7");
        tll.to(".wrapper", {
            display: "block",
            opacity: 1
        });
        var width = 1;
        var bar = document.getElementById("barconfrm");
        var id;
        function move() {
            id = setInterval(frame, 10);
        }
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                tll.play();
            } else {
                width++;
                bar.style.width = width + "%";
                document.getElementById("percent").innerHTML = width + "%";
            }
        }
        move();
        const headerElement = document.querySelector(".header");
        const callback = function(entries, observer) {
            if (entries[0].isIntersecting) headerElement.classList.remove("_scroll"); else headerElement.classList.add("_scroll");
        };
        const headerObserver = new IntersectionObserver(callback);
        headerObserver.observe(headerElement);
        let link = document.querySelectorAll(".menu__body>ul>li>a");
        console.log(link);
        let url = document.location.href;
        for (let i = 0; i < link.length; i++) if (url == link[i].href) link[i].classList.add("_active");
        const animItems = document.querySelectorAll("._anim-items");
        if (animItems.length > 0) {
            console.log("anim");
            window.addEventListener("scroll", animOnScroll);
            function animOnScroll() {
                for (let index = 0; index < animItems.length; index++) {
                    const animItem = animItems[index];
                    const animItemHeight = animItem.offsetHeight;
                    const animItemOffset = offset(animItem).top;
                    const animStart = 4;
                    let animItemPoint = window.innerHeight - animItemHeight / animStart;
                    if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) animItem.classList.add("_active"); else if (!animItem.classList.contains("_anim-no-hide")) animItem.classList.remove("_active");
                }
            }
            function offset(el) {
                const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return {
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft
                };
            }
            setTimeout((() => {
                animOnScroll();
            }), 300);
        }
        const tl = gsap.timeline();
        const tl2 = gsap.timeline();
        const tl3 = gsap.timeline();
        const tl4 = gsap.timeline();
        const tl5 = gsap.timeline();
        const tl6 = gsap.timeline();
        const tl7 = gsap.timeline();
        const tl8 = gsap.timeline();
        const tl9 = gsap.timeline();
        const tl10 = gsap.timeline();
        const tl11 = gsap.timeline();
        const tl12 = gsap.timeline();
        tl.from(" header li a", 1.2, {
            y: 100,
            ease: "power4.out",
            delay: 2,
            stagger: {
                amount: .3
            }
        });
        tl2.from("h1 span span", 1, {
            y: 160,
            ease: "power4.out",
            delay: 2.8,
            stagger: {
                amount: .3
            }
        });
        tl3.from(".introduce__list .introduce__item", 1, {
            y: 100,
            ease: "power4.out",
            delay: 3,
            stagger: {
                amount: .2
            }
        });
        tl4.from(".introduce__last span", 1, {
            y: 150,
            ease: "power4.out",
            delay: 3.4,
            stagger: {
                amount: 1.5
            }
        });
        tl5.from(".top-list .top-list__item", .7, {
            y: 40,
            ease: "power4.out",
            delay: 2.8,
            stagger: {
                amount: .2
            }
        });
        tl6.from(".main-list__item_first .main-list__1", .7, {
            y: 180,
            ease: "power4.out",
            delay: 3.5,
            stagger: {
                amount: .7
            }
        });
        tl7.from(".main-list__item_second .main-list__2", .7, {
            y: 280,
            ease: "power4.out",
            delay: 4,
            stagger: {
                amount: .7
            }
        });
        tl8.from(".main-list__item_bottom .main-list__3", .7, {
            y: 380,
            ease: "power4.out",
            delay: 4.5,
            stagger: {
                amount: .7
            }
        });
        tl9.from(".feedback__main .feedback__item", 1.2, {
            y: 133,
            ease: "power4.out",
            delay: 3,
            stagger: {
                amount: .4
            }
        });
        tl10.from(".feedback__soc  ul>li", 1, {
            y: 108,
            ease: "power4.out",
            delay: 3.8,
            stagger: {
                amount: .4
            }
        });
        tl11.from(".feedback__text  ul>li", 1, {
            y: 130,
            ease: "power4.out",
            delay: 4,
            stagger: {
                amount: .4
            }
        });
        tl12.from(".footer__copy  span", 1, {
            y: 40,
            ease: "power4.out",
            delay: 4.5,
            stagger: {
                amount: .4
            }
        });
    };
    window["FLS"] = true;
    addLoadedClass();
    menuInit();
    pageNavigation();
})();
