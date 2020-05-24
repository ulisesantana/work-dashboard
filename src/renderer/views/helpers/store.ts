export const Store = Object.freeze({
    USER: 'user',
    CLIENTS: 'clients'
})

export const BrowserStore = Object.freeze({
    get(itemName: string) {
        const item = localStorage.getItem(itemName);
        const numPatt = new RegExp(/^\d+$/);
        const jsonPatt = new RegExp(/[\[\{].*[\}\]]/);

        if (item) {
            if (jsonPatt.test(item)) {
                return JSON.parse(item);
            } else if (numPatt.test(item)) {
                return parseFloat(item);
            } else {
                return item;
            }
        } else {
            return null;
        }
    },

    set(itemName: string, item: any): void {
        if (typeof item === "object") {
            localStorage.setItem(itemName, JSON.stringify(item));
        } else {
            localStorage.setItem(itemName, item);
        }
    },

    remove(itemName: string): void {
        localStorage.removeItem(itemName);
    },

    reset: function () {
        for (const key of Object.values(Store)) {
            this.remove(key)
        }
    }
});
