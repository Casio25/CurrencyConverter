import { useState } from "react"

export function ConverterBlock() {

    const [leftValue, setLeftValue] = useState(100);
    const [rightValue, setRightValue] = useState(100);
    const [leftCurrency, setLeftCurrency] = useState('EUR');
    const [rightCurrency, setRightCurrency] = useState('UAH');
    const [historyArray, setHistoryArray] = useState([]);

    const handleLeftValueChange = async (e) => {
        const value = e.target.value;
        setLeftValue(value)
        try {
            const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${rightCurrency}&from=${leftCurrency}&amount=${value}`, requestOptions);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
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
            rightCurrency: rightCurrency
        }
        setHistoryArray([...historyArray, newItem]);
    }
/* Documentation code */
    var myHeaders = new Headers();
    myHeaders.append("apikey", "JqhLq4ohxkJaCICuLhFCGkjycGnQMaWd");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
/*End of documentation code */
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
                <h2>History</h2>
                <ul>
                    {historyArray.map((item, index) => (
                        <li key={index}>{item.leftValue} {item.leftCurrency} = {item.rightValue} {item.rightCurrency}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
