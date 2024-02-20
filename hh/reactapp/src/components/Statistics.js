import { useState, useEffect } from "react";
import Loading from "./Loading";
import { API_URL } from "../common/GlobalConstants";
import axios from "axios";
import {Table, ConfigProvider } from 'antd';
import "../styles/Table.css"

const Statistics = () => {
    const [statisticsData, setStatisticsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const config = {
        token: {
            colorPrimary: "#b02c2a",
            colorSecondary: '#ee4542',
            colorInfo: "#ee4542",
            colorTextBase: "#e4e4e4",
            colorBgBase: "#101010",
            colorBgContainer: "#101010",
        },
    };

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
        <div className="test-results">
            <ConfigProvider theme={config}>
            <Table style={{ padding: 0, background: config.token.colorSecondary }}
            pagination ={false}
                dataSource={statisticsData}
                columns={[
                    { title: 'Име', dataIndex: 'userName', key: 'userName' },
                    { title: 'Общо точки', dataIndex: 'totalPoints', key: 'totalPoints' },
                ]}
            />
            </ConfigProvider>
        </div>);
}

export default Statistics;