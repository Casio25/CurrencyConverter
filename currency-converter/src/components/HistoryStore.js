import { observable, action } from 'mobx';

class HistoryStore {
    historyArray = observable([]);

    constructor() {
        const storedHistory = localStorage.getItem('history');
        if (storedHistory) {
            this.historyArray.replace(JSON.parse(storedHistory));
        }
    }

    addToHistoryArray(item) {
        this.historyArray.push(item);
        localStorage.setItem('history', JSON.stringify(this.historyArray));
    }
}

const store = new HistoryStore();
export default store;