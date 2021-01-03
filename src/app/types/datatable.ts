export class Datatable {
    private readonly data: object;
    private readonly elemContainer: HTMLInputElement;
    private readonly key: string | undefined;
    private readonly val: any | undefined;

    /**
     * Constructor
     * @param container
     * @param data
     */
    constructor(container: string, data: string) {
        this.data = JSON.parse(data);
        this.elemContainer = (document.getElementById(container) as HTMLInputElement);
        this.elemContainer.innerHTML = '';
        for (let k in this.data) {
            this.key = k;
            // @ts-ignore
            this.val = this.data[this.key];
            Datatable.showDataLine(this.elemContainer, this.key, this.val);
        }
    }

    /**
     * Show DATA line in HTML-table
     * @param elem
     * @param key
     * @param value
     */
    private static showDataLine(elem: HTMLInputElement, key: string, value: string) {
        elem.insertAdjacentHTML('beforeend', `<div class="row">
            <div class="col">${key}</div>
            <div class="col">${value}</div>
        </div>`);
    }
}