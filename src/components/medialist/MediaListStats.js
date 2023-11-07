import {Card, Col, Row} from "react-bootstrap";
import {Bar, BarChart, YAxis, XAxis, ResponsiveContainer} from "recharts";
import HLine from "../primitives/HLine";


function HistogramsGraph({ data, fillColor, formatter }) {
    const convertedData = data.map(([name, count]) => ({ name, count }));

    const customLabel = ({ x, y, width, value }) => (
        <text x={x+width/2} y={y} fill="#c7c6c6" textAnchor="middle" dy={-6}>{value}</text>
    );

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={convertedData} margin={{ top: 25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#c7c6c6" tickFormatter={formatter} />
                <YAxis stroke="#c7c6c6" width={40}/>
                <Bar dataKey="count" fill={fillColor} label={customLabel} />
            </BarChart>
        </ResponsiveContainer>
    );
}

function Top10Graphs({ data, fillColor, leftVal=70 }) {
    const convertedData = data.map(([name, count]) => ({ name, count }));

    const customLabel = ({ x, y, width, height, value }) => (
        <text x={x + width - 30} y={y+height/2} fill="#c7c6c6" textAnchor="middle" dx={10} dy={5}>{value}</text>
    );

    return (
        <ResponsiveContainer width="100%" height={550}>
            <BarChart data={convertedData} layout="vertical" margin={{ top: 25, left: leftVal, bottom: -10 }}>
                <XAxis type="number" stroke="#c7c6c6" allowDecimals={false}/>
                <YAxis type="category" dataKey="name" stroke="#c7c6c6"/>
                <Bar dataKey="count" fill={fillColor} label={customLabel}/>
            </BarChart>
        </ResponsiveContainer>
    )
}

function StatsCard({ name, graphType, data, fillColor, formatter, leftVal=70 }) {
    return (
        <Card className="bg-card text-light">
            <Card.Body>
                <Card.Title><h4>{name}</h4></Card.Title>
                <HLine/>
                {graphType === "top" ?
                    <Top10Graphs
                        data={data}
                        fillColor={fillColor}
                        formatter={formatter}
                        leftVal={leftVal}
                    />
                    :
                    <HistogramsGraph
                        data={data}
                        fillColor={fillColor}
                        formatter={formatter}
                    />
                }
            </Card.Body>
        </Card>
    )
}


const mediaStats = {
    movies: {
        graphType: ["hist", "hist", "top", "top", "top", "top"],
        fillColor: "#8c7821",
        formatter: [(value) => `${value} min`, null, null, null, null, null],
        lefVal: [null, null, 50, 50, 50, -10],
    },
    series: {
        graphType: ["hist", "hist", "top", "top", "top", "top"],
        fillColor: "#216e7d",
        formatter: [(value) => `${value} eps`, null, null, null, null, null],
        lefVal: [null, null, 50, 50, 50, -10],
    },
    anime: {
        graphType: ["hist", "hist", "top", "top", "top"],
        fillColor: "#945141",
        formatter: [(value) => `${value} eps`, null, null, null, null],
        lefVal: [null, null, 50, 50, 50],
    },
    games: {
        graphType: ["hist", "hist", "top", "top", "top", "top"],
        fillColor: "#196219",
        formatter: [null, null, null, null, null, null],
        lefVal: [null, null, 50, 50, 40, 40],
    },
    books: {
        graphType: ["hist", "hist", "top", "top", "top"],
        fillColor: "#584c6e",
        formatter: [(value) => `${value} p.`, null, null, null, null],
        lefVal: [null, null, 50, 50, 40],
    }
}


export default function MediaListStats({ mediaType, graphData }) {
    const stats = mediaStats[mediaType]

    return (
        <div className="m-t-20">
            <Row className="m-b-50" style={{gap: "20px 0"}}>
                {graphData.map((graph, idx) =>
                    <Col key={graph.name} xs={12} sm={12} md={6}>
                        <StatsCard
                            name={graph.name}
                            graphType={stats.graphType[idx]}
                            data={graph.values}
                            fillColor={stats.fillColor}
                            formatter={stats.formatter[idx]}
                            leftVal={stats.lefVal[idx]}
                        />
                    </Col>
                )}
            </Row>
        </div>
    )
}
