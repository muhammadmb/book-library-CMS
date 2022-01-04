import React from 'react';
import Charts from '../Charts/Charts';
import './MainStyle.css';

const Main = () => {
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
                            <span className="font-bold text-title">4710</span>
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
                            <span className="font-bold text-title">578</span>
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
                            <span className="font-bold text-title">578</span>
                        </div>
                    </div>

                    <div className="card">
                        <i
                            className="fa fa-rocket fa-2x text-red"
                            aria-hidden="true"
                        ></i>
                        <div className="card-inner">
                            <p className="text-primary-p">
                                subscribers
                            </p>
                            <span className="font-bold text-title">7451</span>
                        </div>
                    </div>

                </div>

                <div className="charts">

                    <div className="charts-left">
                        <div className="charts-left-title">
                            <div>
                                <h1>Daily reports</h1>
                            </div>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                        </div>
                        <Charts />
                    </div>

                    <div className="charts-right">
                        <div className="charts-right-title">
                            <div>
                                <h1>Books States</h1>
                            </div>
                            <i className="fa fa-list" aria-hidden="true"></i>
                        </div>

                        <div className="charts-right-cards">
                            <div className="card1">
                                <h1>New</h1>
                                <p>555</p>
                            </div>

                            <div className="card2">
                                <h1>Wating</h1>
                                <p>22</p>
                            </div>

                            <div className="card3">
                                <h1>E-Books</h1>
                                <p>750</p>
                            </div>

                            <div className="card4">
                                <h1>orders</h1>
                                <p>450</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main;