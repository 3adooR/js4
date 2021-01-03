import {errors} from "./errors";
import {Parser} from "./parse";
import {Datatable} from "./datatable";

export class Form {
    private static elemInputUrl: HTMLInputElement;
    private static elemButtonParse: HTMLButtonElement;

    /**
     * Инициализация
     * @param elemUrlId
     * @param elemButtonId
     * @param elemDataId
     */
    static init(elemUrlId: string, elemButtonId: string, elemDataId: string): void {
        this.elemInputUrl = (document.getElementById(elemUrlId) as HTMLInputElement);
        this.elemButtonParse = (document.getElementById(elemButtonId) as HTMLButtonElement);
        this.elemButtonParse.addEventListener('click', (e) => {
            e.preventDefault();
            let url = this.elemInputUrl.value;
            if (this.validateURL(url)) {
                let data = Parser.getData(url);
                new Datatable(elemDataId, data)
            }
        });
    }

    /**
     * Валидация URL
     * @param url
     */
    static validateURL(url: string): boolean {
        let result = true;
        let errorMessage = '';
        if (!url.length) {
            errorMessage = errors.EmptyURL;
        } else {
            let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            if (!pattern.test(url)) {
                errorMessage = errors.IncorrectURL;
            }
        }
        if (errorMessage) {
            result = false;
            this.showError(errorMessage);
        }
        return result;
    }

    /**
     * Отображение ошибки
     * @param message
     */
    static showError(message: string): void {
        console.error(`Ошибочка: ${message}`);
    }
}