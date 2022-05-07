import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookStatistics, getStatistics } from '../../Store/StatisticsSlice';
import Chart from '../Chart/Chart';
import './MainStyle.css';

const Main = () => {

    const dispatch = useDispatch();
    const { statistics } = useSelector((state) => state.statistics);

    useEffect(() => {
        dispatch(getStatistics());
        dispatch(getBookStatistics());
    }, [dispatch]);

    return (
        <main>
            <div className="main-container">

                <div className="main-title">
                    <div className="main-greeting">
                        <h1>Hello BOOKER</h1>
                        <p>Welcome to your Dashboard</p>
                    </div>
                </div>

                <div className="main-cards">

                    <div className="card">
                        <i
                            className="fa fa-book fa-2x text-yellow"
                            aria-hidden="true"
                        ></i>
                        <div className="card-inner">
                            <p className="text-primary-p">
                                books
                            </p>
                            <span className="font-bold text-title">{statistics.books}</span>
                        </div>
                    </div>

                    <div className="card">
                        <i
                            className="fa fa-thumbs-up fa-2x text-green"
                            aria-hidden="true"
                        ></i>
                        <div className="card-inner">
                            <p className="text-primary-p">
                                reviews
                            </p>
                            <span className="font-bold text-title">{statistics.reviews}</span>
                        </div>
                    </div>

                    <div className="card">
                        <i
                            className="fa fa-user-o fa-2x text-lightblue"
                            aria-hidden="true"
                        ></i>
                        <div className="card-inner">
                            <p className="text-primary-p">
                                Authors
                            </p>
                            <span className="font-bold text-title">{statistics.authors}</span>
                        </div>
                    </div>

                    <div className="card">
                        <i
                            className="fa fa-list-ul fa-2x text-red"
                            aria-hidden="true"
                        ></i>
                        <div className="card-inner">
                            <p className="text-primary-p">
                                genres
                            </p>
                            <span className="font-bold text-title">{statistics.genres}</span>
                        </div>
                    </div>

                    <div className="card">
                        <i
                            className="fa fa-comments fa-2x text-lightblue"
                            aria-hidden="true"
                        ></i>
                        <div className="card-inner">
                            <p className="text-primary-p">
                                feedbacks
                            </p>
                            <span className="font-bold text-title">{statistics.feedbacks}</span>
                        </div>
                    </div>

                    <div className="card">
                        <i
                            className="fa fa-question fa-2x text-red"
                            aria-hidden="true"
                        ></i>
                        <div className="card-inner">
                            <p className="text-primary-p">
                                suggestions
                            </p>
                            <span className="font-bold text-title">{statistics.suggestions}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Chart />
        </main>
    )
}

export default Main;