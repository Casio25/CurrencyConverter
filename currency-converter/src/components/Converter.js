import { useState, useEffect } from "react";
import HistoryStore from "./HistoryStore";
import { observer } from "mobx-react-lite";

export const ConverterBlock = observer(() => {
    const [leftValue, setLeftValue] = useState(100);
    const [rightValue, setRightValue] = useState(100);
    const [leftCurrency, setLeftCurrency] = useState('EUR');
    const [rightCurrency, setRightCurrency] = useState('UAH');
    const [currencyDate, setCurrencyDate] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState(() => {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // add leading zero to month if necessary
        const day = date.getDate().toString().padStart(2, '0'); // add leading zero to day if necessary
        return `${year}-${month}-${day}`;
    });
    console.log(endDate);


    const searchHistory = async (e) => {
        const date = e.target.value;
        setStartDate(date)
        console.log(startDate)
         try {
             const response = await fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${date}&end_date=${endDate}&base=${leftCurrency}&symbols=${rightCurrency}`, requestOptions);

             if (!response.ok) {
                 throw new Error("Network response was not ok");
             }

             const data = await response.json();
            console.log(data);
         } catch (error) {
             console.log("Fetch error:", error);
        }
    }
    console.log(startDate)

    const handleLeftValueChange = async (e) => {
        const value = e.target.value;
        setLeftValue(value)
        try {
            const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${rightCurrency}&from=${leftCurrency}&amount=${value}`, requestOptions);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const date = data.date
            setCurrencyDate(date);
            console.log(data);
            setRightValue(data.result);
        } catch (error) {
            console.log("Fetch error:", error);
        }
    }
    const handleRightValueChange = async (e) => {
        const value = e.target.value;
        setRightValue(value)
        try {
            const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${leftCurrency}&from=${rightCurrency}&amount=${value}`, requestOptions);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const date = data.date;
            setCurrencyDate(date);
            console.log(data);
            setLeftValue(data.result);
        } catch (error) {
            console.log("Fetch error:", error);
        }
    }

    const handleLeftCurrencyChange = (e) => {
        const value = e.target.value;
        setLeftCurrency(value)
    }

    const handleRightCurrencyChange = (e) => {
        const value = e.target.value;
        setRightCurrency(value)
    }

    const handleSaveToHistory = () => {
        const newItem = {
            leftValue: leftValue,
            rightValue: rightValue,
            leftCurrency: leftCurrency,
            rightCurrency: rightCurrency,
            date: currencyDate
            
        }
        HistoryStore.addToHistoryArray(newItem);
        setIsSaved(true);
    }
    useEffect(() => {
        if (isSaved) {
            localStorage.setItem('history', JSON.stringify(HistoryStore.historyArray));
            setIsSaved(false);
        }
    }, [isSaved]);

    /* Documentation code */
    var myHeaders = new Headers();
    myHeaders.append("apikey", "JqhLq4ohxkJaCICuLhFCGkjycGnQMaWd");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    /* End of documentation code */

    return (
        <div className="ConvertBlock">
            <input type="string" value={leftValue} onChange={handleLeftValueChange} />
            <select value={leftCurrency} onChange={handleLeftCurrencyChange}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
            </select>
            <input type="string" value={rightValue} onChange={handleRightValueChange} />
            <select value={rightCurrency} onChange={handleRightCurrencyChange}>
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>
            <button onClick={handleSaveToHistory}>Save to History</button>
            <div>
                <input type="date" value={endDate} onChange={searchHistory} />
            </div>
            <div>
                <h2>History</h2>
                <ul>
                    {HistoryStore.historyArray.map((item, index) => (
                        <li key={index}> {item.date} | {item.leftValue} {item.leftCurrency} = {item.rightValue} {item.rightCurrency}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

})
