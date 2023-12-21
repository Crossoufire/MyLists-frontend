import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Bar, BarChart, XAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend} from "recharts";

import {formatTime} from "@/stuff/utils/functions";
import HLine from "../primitives/HLine";


const BarGraph = ({ data, formatter, compareData }) => {
    try {
        if (compareData) {
            for (let i = 0; i < data.length; i++) {
                data[i].push(compareData[i][1]);
            }
        }
    } catch (e) {}

    const convertedData = data.map(([name, count, count2]) => ({ name, count, count2 }));

    console.log(convertedData);

    const customLabel = ({ x, y, width, height, value }) => {
        const labelYInside = y + 16;
        const labelYOnTop = y - 6;

        return (
            <text x={x + width / 2} y={(height > 20) ? labelYInside : labelYOnTop} textAnchor="middle" className="fw-5"
                  fill={(height > 20) ? "#000000" : "#e2e2e2"}>
                {value}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={convertedData} margin={{ bottom: -5 }}>
                <Bar dataKey="count" label={customLabel} isAnimationActive={false} radius={[7, 7, 0, 0]}>
                    {convertedData.map((entry, idx) => <Cell fill={graphColors[idx % graphColors.length]}/>)}
                </Bar>
                {compareData &&
                    <Bar dataKey="count2" label={customLabel} isAnimationActive={false} radius={[7, 7, 0, 0]}>
                        {convertedData.map((entry, idx) => <Cell fill={"gray"}/>)}
                    </Bar>
                }
                <XAxis
                    dataKey="name"
                    stroke="#e2e2e2"
                    scale="band"
                    tickFormatter={formatter}
                />
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
        const displayLabel = percent > 12 / 360;

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

const StatsCard = ({ name, data, graphType, fmt, compareData }) => {
    return (
        <Card className="bg-card text-light">
            <Card.Body>
                {name && <Card.Title><h5>{name}</h5><HLine/></Card.Title>}
                {graphType === "bar" ?
                    <BarGraph data={data} formatter={fmt} compareData={compareData}/>
                    :
                    <PieGraph data={data} formatter={fmt}/>
                }
            </Card.Body>
        </Card>
    );
};


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

const graphColorsCompare = [
    "#772525",
    "#7c4a32",
    "#59472d",
    "#595043",
    "#2c562c",
    "#314d31",
    "#3e543e",
    "#013b35",
    "#1c423f",
    "#294848",
];


const mediaStats = {
    series: {
        graphType: ["bar", "bar", "pie", "pie", "pie", "pie"],
        formatter: [null, null, null, null, null, null],
    },
    anime: {
        graphType: ["bar", "bar", "pie", "pie", "pie"],
        formatter: [null, null, null, null, null],
    },
    movies: {
        graphType: ["bar", "bar", "pie", "pie", "pie", "pie"],
        formatter: [(value) => formatTime(value), null, null, null, null, null],
    },
    books: {
        graphType: ["bar", "bar", "pie", "pie", "pie"],
        formatter: [null, null, null, null, null],
    },
    games: {
        graphType: ["bar", "bar", "pie", "pie", "pie", "pie"],
        formatter: [(value) => formatTime(value, true), null, null, null, null, null],
    },
}


const MediaListStats = ({ mediaType, graphData, compareData }) => {
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
                            fmt={stats.formatter[idx]}
                            compareData={compareData && compareData[idx].values}
                        />
                    </Col>
                )}
            </Row>
        </div>
    )
};


export default MediaListStats
