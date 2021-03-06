class SearchPanel extends HTMLElement {
    constructor() {
        super();

        this.content = "";
        this.opened = false;
    }

    connectedCallback() {
        console.log("Adding search panel");
        this.render = hyperHTML.bind(this);
        this.update();

        window.addEventListener("open-search", event => {
            let content = (event.detail && event.detail.content) || "";
            this.target = (event.detail && event.detail.target) || null;
            this.open(content);
        });

        window.addEventListener("close-search", event => {
            this.close();
        });
    }

    handleEvent(event) {
        if (event.key == "Enter") {
            // Open a new page.
            let url = Utils.fixup_url(event.target.value.trim());
            this.close();
            if (this.target) {
                this.target.setAttribute("src", url);
            } else {
                let window_manager = document.getElementById("windows");
                let frame_id = window_manager.add_frame(url);
                window_manager.select_frame(frame_id);
            }
        }
    }

    update() {
        this.render`
        <ul class="search-results">
        </ul>
        <input type="text" placeholder="Search or enter address..." value=${this.content} onkeydown=${this}>
        `;
    }

    close() {
        console.log("Close search panel");
        this.classList.remove("open");
        this.content = "";
        this.opened = false;
    }

    open(initial_content) {
        console.log("Open search panel");
        this.content = initial_content;
        this.update();
        this.classList.add("open");
        this.opened = true;
    }

    is_open() {
        return this.opened;
    }
}

customElements.define("search-panel", SearchPanel);
