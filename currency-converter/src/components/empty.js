<div className="convertor_story_content">
    <h3 className="convertor_story_item">Історія конвертації</h3>
    <div>
        <button className="clear_story_btn" onClick={clearHistory}>Очистити історію</button>
    </div>
    {HistoryStore.historyArray.map((item, index) => (
        <div className="convertor_story_container">
            <div key={index} className="convertor_story_elem">
                <h5 className="convertor_operetion_date">{item.date}</h5>
                <h5 className="convertor_operetion_sum">{item.leftValue} {item.leftCurrency}</h5>
                <img className="arrow_img" src={arrow} alt="arrow" />
                <h5 className="converted_operation_sum">{item.rightValue} {item.rightCurrency}</h5>
            </div>
        </div>
    ))}
</div>
        </div >
    );