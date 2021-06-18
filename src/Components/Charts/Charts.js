import '../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';
import React from 'react';

const Charts = () => {

    const data = [
        { x: 0, y: 8 },
        { x: 1, y: 7 },
        { x: 2, y: 6 },
        { x: 3, y: 4 },
        { x: 4, y: 0 },
        { x: 5, y: 9 },
        { x: 6, y: 2 },
        { x: 7, y: 2 },
        { x: 8, y: 8 },
        { x: 9, y: 7 }

    ]

    return (
        <div style={{ marginTop: '15px' }}>
            <XYPlot height={300} width={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries data={data} color="red" />
            </XYPlot>
        </div>
    )
}

export default Charts;
