import { observable } from 'mobx';

class HistoryStore {
    historyArray = observable([]);

    constructor() {
        const storedHistory = localStorage.getItem('history');
        if (storedHistory) {
            this.historyArray.replace(JSON.parse(storedHistory));
        }
    }

    addToHistoryArray(item) {
        if (this.historyArray.length >= 10) {
            this.historyArray = this.historyArray.slice(-9);
        }
        this.historyArray.push(item);
        localStorage.setItem('history', JSON.stringify(this.historyArray));
    }
}

const store = new HistoryStore();
export default store;

