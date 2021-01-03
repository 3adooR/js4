export class Parser {
    private static url: string;
    private static data: string;

    /**
     * Get DATA from URL
     * @param url
     */
    static getData(url: string) {
        this.url = url;
        let parser = document.createElement('a');
        parser.href = this.url;
        this.data = JSON.stringify({
            'protocol': parser.protocol,
            'host': parser.host,
            'pathname': parser.pathname,
            'hash': parser.hash
        });
        return this.data;
    }
}