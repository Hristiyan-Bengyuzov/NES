import { useState, useEffect } from "react";
import Loading from "./Loading";
import { API_URL } from "../common/GlobalConstants";
import axios from "axios";
import { Table } from "antd";

const Statistics = () => {
    const [statisticsData, setStatisticsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(API_URL + `/api/TestResult/getStatistics`);
                setStatisticsData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Table
                dataSource={statisticsData}
                columns={[
                    { title: 'Име', dataIndex: 'userName', key: 'userName' },
                    { title: 'Общо точки', dataIndex: 'totalPoints', key: 'totalPoints' },
                ]}
            />
        </>);
}

export default Statistics;