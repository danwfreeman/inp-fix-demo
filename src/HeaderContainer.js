
HeaderContainer.js

// current implementation:
handleDropDownMenuPosition() {
    if (window.ResizeObserver) {
        "relative" === $("#root").css("position") && $("#root").css("position", "");
        const e = document.getElementById("menu_wrapper");
        if (e) {
            const t = document.getElementById("header_icons");
            e.style.paddingTop = t.getBoundingClientRect().bottom + "px",
                e.style.overflow = "scroll",
                window.dropdownResizeHandler = function () {
                    if ($("#mobile_title_bar").length > 0) {
                        var a = document.getElementById("mobile_title_bar");
                        e.style.paddingTop = a.getBoundingClientRect().bottom + "px"
                    } else
                        e.style.paddingTop = t.getBoundingClientRect().bottom + "px";
                    e.style.overflow = "scroll"
                }
        }
    } else
        console.log("Resize observer not supported!")
}


// proposed implementation:
handleDropDownMenuPosition() {
    // just exit early to keep code cleaner
    if (!window.ResizeObserver) {
        console.log("Resize observer not supported!");
        return;
    }

    const rootEl = $("#root");
    if (rootEl.css("position") === "relative") {
        rootEl.css("position", "");
    }

    const menuWrapper = document.getElementById("menu_wrapper");
    const headerIcons = document.getElementById("header_icons");

    // the original code assumes if we have 'menu_wrapper' then we have 'header_icons', but safe to say we need both, so extra check ok
    if (!menuWrapper || !headerIcons) return;

    // to avoid layout thrashing we want to do our reads first, then all writes and also deferred
    const headerBottom = headerIcons.getBoundingClientRect().bottom;

    // defer DOM writes to avoid thrashing
    requestAnimationFrame(() => {
        menuWrapper.style.paddingTop = `${headerBottom}px`;
        menuWrapper.style.overflow = "scroll";
    });

    window.dropdownResizeHandler = () => {
        const mobileTitleBar = document.getElementById("mobile_title_bar");

        // do our reads first
        const paddingTop = mobileTitleBar
            ? mobileTitleBar.getBoundingClientRect().bottom
            : headerIcons.getBoundingClientRect().bottom;

        // then writes using requestAnimationFrame, so they are defered until the time before a frame is rendered, which is more optimal
        requestAnimationFrame(() => {
            menuWrapper.style.paddingTop = `${paddingTop}px`;
            menuWrapper.style.overflow = "scroll";
        });
    };
}
