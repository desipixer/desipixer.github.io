export class Blog {
    constructor(url, pageNum = 1, perPage = 10) {
        this.url = url;
        this.pageNum = pageNum;
        this.perPage = perPage;
    }

    getPageNum() {
        return this.pageNum;
    }

    setPageNum(pageNum) {
        this.pageNum = pageNum;
    }

    getUrl() {
        return this.url;
    }

    setUrl(url) {
        this.url = url;
    }


}