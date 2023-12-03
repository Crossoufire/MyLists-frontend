import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Bar, BarChart, XAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend} from "recharts";
import HLine from "../primitives/HLine";


const BarGraph = ({ data, formatter }) => {
    const convertedData = data.map(([name, count]) => ({ name, count }));

    const customLabel = ({ x, y, width, height, value }) => {
        const labelYInside = y + 16;
        const labelYOnTop = y - 6;

        return (
            <text x={x+width/2} y={(height>20) ? labelYInside : labelYOnTop} textAnchor="middle" className="fw-5"
                  fill={(height>20) ? "#000000" : "#e2e2e2"}>
                {value}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={convertedData} margin={{ bottom: -5 }}>
                <Bar dataKey="count" label={customLabel} isAnimationActive={false}>
                    {convertedData.map((entry, idx) => <Cell fill={graphColors[idx % graphColors.length]}/>)}
                </Bar>
                <XAxis dataKey="name" stroke="#e2e2e2" tickFormatter={formatter}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

const PieGraph = ({ data }) => {
    const convertedData = data.map(([name, count]) => ({ name, count }));

    const customLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
        const displayLabel = percent > 15 / 360;

        return (
            <>
                {displayLabel &&
                    <text x={x} y={y} fill="black" className="fw-5" textAnchor="middle" dominantBaseline="middle">
                        {value}
                    </text>
                }
            </>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={convertedData} dataKey="count" stroke="black" isAnimationActive={false} label={customLabel}
                     labelLine={false}>
                    {convertedData.map((entry, idx) => <Cell fill={graphColors[idx % graphColors.length]}/>)}
                </Pie>
                {window.innerWidth <= 490 ?
                    <Legend align="center" layout="horizontal"/>
                    :
                    <Legend align="right" verticalAlign="middle" layout="vertical"/>
                }
            </PieChart>
        </ResponsiveContainer>
    )
};

const StatsCard = ({ name, data, graphType, formatter, leftVal=70 }) => (
    <Card className="bg-card text-light">
        <Card.Body>
            {name &&
                <Card.Title>
                    <h5>{name}</h5>
                    <HLine/>
                </Card.Title>
            }
            {graphType === "bar" ?
                <BarGraph
                    data={data}
                    formatter={formatter}
                />
                :
                <PieGraph
                    data={data}
                    formatter={formatter}
                    leftVal={leftVal}
                />
            }
        </Card.Body>
    </Card>
);

const graphColors = [
    "#ff4d4d",
    "#ff9966",
    "#ffcc80",
    "#eed6b5",
    "#5db85d",
    "#7fc67f",
    "#a0dca0",
    "#00796b",
    "#4db6ac",
    "#66b2b2",
];

const mediaStats = {
    movies: {
        graphType: ["bar", "bar", "pie", "pie", "pie", "pie"],
        formatter: [(value) => `${value} min`, null, null, null, null, null],
        lefVal: [null, null, 50, 50, 50, -10],
    },
    series: {
        graphType: ["bar", "bar", "pie", "pie", "pie", "pie"],
        formatter: [(value) => `${value}`, null, null, null, null, null],
        lefVal: [null, null, 50, 50, 50, -10],
    },
    anime: {
        graphType: ["bar", "bar", "pie", "pie", "pie"],
        formatter: [(value) => `${value} eps`, null, null, null, null],
        lefVal: [null, null, 50, 50, 50],
    },
    games: {
        graphType: ["bar", "bar", "pie", "pie", "pie", "pie"],
        formatter: [null, null, null, null, null, null],
        lefVal: [null, null, 50, 50, 40, 40],
    },
    books: {
        graphType: ["bar", "bar", "pie", "pie", "pie"],
        formatter: [(value) => `${value} p.`, null, null, null, null],
        lefVal: [null, null, 50, 50, 40],
    }
}

const MediaListStats = ({ mediaType, graphData }) => {
    const stats = mediaStats[mediaType]

    return (
        <div className="m-t-20">
            <Row className="m-b-50 gy-4">
                {graphData.map((graph, idx) =>
                    <Col key={graph.name} xs={12} sm={12} md={6}>
                        <StatsCard
                            name={graph.name}
                            data={graph.values}
                            graphType={stats.graphType[idx]}
                            formatter={stats.formatter[idx]}
                            leftVal={stats.lefVal[idx]}
                        />
                    </Col>
                )}
            </Row>
        </div>
    )
};


export default MediaListStats
