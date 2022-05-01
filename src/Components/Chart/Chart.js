import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './ChartStyle.css';

const Chart = () => {

    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [selected, setSelected] = useState(-1);
    const { statistics, bookStatistics } = useSelector((state) => state.statistics);
    const books = statistics.books;

    return (
        <>
            <h2 className='books-state'>Books Statistics - {new Date().getFullYear()}</h2>
            <div className="chart-container">
                <div className="year-stats">

                    {
                        bookStatistics.map((state, index) => (
                            <div
                                key={index}
                                className={selected === index ? "month-group selected" : "month-group"}
                                onClick={() => setSelected(index)}
                                title={state.books}
                            >
                                <div
                                    className={selected === index ? 'books-number' : "books-number hide"}
                                >
                                    {state.books}
                                </div>
                                <div
                                    className="bar"
                                    style={{ height: isNaN((state.books / books) * 100) ? 0 : (state.books / books) * 100 }}
                                ></div>

                                <p className="month"> {Months[state.month - 1]} </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Chart;