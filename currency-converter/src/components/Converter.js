import { useState, useEffect } from "react";
import HistoryStore from "./HistoryStore";
import { observer } from "mobx-react-lite";
import  exchange  from "../images/icon-arrows.png";
import arrow from "../images/Group 58.png"
import "../styles/Converter.css"

export const ConverterBlock = observer(() => {
    const [leftValue, setLeftValue] = useState(100);
    const [rightValue, setRightValue] = useState(100);
    const [leftCurrency, setLeftCurrency] = useState('EUR');
    const [rightCurrency, setRightCurrency] = useState('UAH');
    const [currencyDate, setCurrencyDate] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [rates, setRates] = useState([]);
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
             const rates = data.rates;
             console.log(rates);
             setRates(Object.entries(rates));
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

            <div className="convertor_main">
                <div className="convertor_content">
                    <h1 className="convertor_content_item">Конвертер валют</h1>
                    <div className="i_have">
                        <h5>В мене є:</h5>
                        <input type="string" onChange={handleLeftValueChange} className="i_have_input" value={leftValue} placeholder="1000" />
                        <select className="i_have_select" value={leftCurrency} onChange={handleLeftCurrencyChange}>
                            <option value="UAH" selected>UAH</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <img className="exchange_img" src={exchange} alt="exchange" />
                    <div className="want_have">
                        <h5>Хочу придбати:</h5>
                        <input type="string" className="want_have_input" value={rightValue} onChange={handleRightValueChange} />
                        <select className="want_have_select" value={rightCurrency} onChange={handleRightCurrencyChange}>
                            <option value="UAH">UAH</option>
                            <option value="USD" selected>USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <div>
                        <input type="date" value={endDate} onChange={searchHistory} />
                        <button className="convertor_story_btn" onChange={handleSaveToHistory}>Зберегти історію</button>
                    </div>
                </div>
            </div>
            <div className="convertor_story_content">
                <h3 className="convertor_story_item">Історія конвертації</h3>
                <div>
                    <button className="convertor_story_btn" >Очистити історію</button>
                </div>
                <div className="convertor_story_container">
                    <div className="convertor_story_operetion">
                        <ul>
                            {HistoryStore.historyArray.map((item, index) => (
                                <li key={index}>
                                    <h5 className="convertor_operetion_date">{item.date}</h5>
                                    <h5 className="convertor_operetion_sum">{item.leftValue} {item.leftCurrency}</h5>
                                    <img className="arrow_img" src={arrow} alt="arrow" />
                                    <h5 className="converted_operation_sum">{item.rightValue} {item.rightCurrency}</h5>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );


})
