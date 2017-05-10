class ResourceManager {

    constructor() {
        this.resourceCache = [];
    }

    get(url) {
        return this.resourceCache[url];
    }

    load(urls) {
        for (let url of urls) {
            let image = new Image();
            image.src = url;
            this.resourceCache[url] = image;
        }
    }
}
