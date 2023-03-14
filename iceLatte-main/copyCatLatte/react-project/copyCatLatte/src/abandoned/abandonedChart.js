/*eslint-disable*/

import styled from 'styled-components';
import React from 'react';
import Chart from 'chart.js/auto';
// eslint-disable-next-line import/no-unresolved
import {Line} from 'react-chartjs-2';
import Accordion from 'react-bootstrap/Accordion';

const data = {
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [
                { x: '강남구', y: 4 },
                { x: '강동구', y: 6 },
                { x: '강북구', y: 5 },
                { x: '강서구', y: 1 },
                { x: '관악구', y: 9 },
                { x: '광진구', y: 7 },
                { x: '구로구', y: 7 },
                { x: '금천구', y: 4 },
                { x: '노원구', y: 10 },
                { x: '도봉구', y: 4 },
                { x: '동대문구', y: 5 },
                { x: '동작구', y: 4 },
                { x: '마포구', y: 9 },
                { x: '서대문구', y: 2 },
                { x: '서초구', y: 5 },
                { x: '성북구', y: 1 },
                { x: '성동구', y: 2 },
                { x: '송파구', y: 3 },
                { x: '양천구', y: 2 },
                { x: '영등포구', y: 3 },
                { x: '용산구', y: 16 },
                { x: '은평구', y: 3 },
                { x: '종로구', y: 1 },
                { x: '중구', y: 2 },
                { x: '중랑구', y: 3 }
            ],
            yAxisID: 'y_sub',
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(255, 99, 132)',
            data: [
                { x: '강남구', y: 4 },
                { x: '강동구', y: 6 },
                { x: '강북구', y: 5 },
                { x: '강서구', y: 1 },
                { x: '관악구', y: 9 },
                { x: '광진구', y: 7 },
                { x: '구로구', y: 7 },
                { x: '금천구', y: 4 },
                { x: '노원구', y: 10 },
                { x: '도봉구', y: 4 },
                { x: '동대문구', y: 5 },
                { x: '동작구', y: 4 },
                { x: '마포구', y: 9 },
                { x: '서대문구', y: 2 },
                { x: '서초구', y: 5 },
                { x: '성북구', y: 1 },
                { x: '성동구', y: 2 },
                { x: '송파구', y: 3 },
                { x: '양천구', y: 2 },
                { x: '영등포구', y: 3 },
                { x: '용산구', y: 16 },
                { x: '은평구', y: 3 },
                { x: '종로구', y: 1 },
                { x: '중구', y: 2 },
                { x: '중랑구', y: 3 }
            ],
            borderColor: 'red',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(75, 192, 192)',
            data: [
                { x: '강남구', y: null },
                { x: '강동구', y: 4 },
                { x: '강북구', y: 3 },
                { x: '강서구', y: 1 },
                { x: '관악구', y: 1 },
                { x: '광진구', y: 4 },
                { x: '구로구', y: 3 },
                { x: '금천구', y: 1 },
                { x: '노원구', y: 3 },
                { x: '도봉구', y: null },
                { x: '동대문구', y: 1 },
                { x: '동작구', y: 1 },
                { x: '마포구', y: 5 },
                { x: '서대문구', y: 1 },
                { x: '서초구', y: 3 },
                { x: '성북구', y: 1 },
                { x: '성동구', y: 1 },
                { x: '송파구', y: 1 },
                { x: '양천구', y: 1 },
                { x: '영등포구', y: null },
                { x: '용산구', y: null },
                { x: '은평구', y: 2 },
                { x: '종로구', y: 1 },
                { x: '중구', y: 1 },
                { x: '중랑구', y: 1 }
            ],
            yAxisID: 'y_sub',
        },
    ],
};

const options = {
    spanGaps: true,
    maxBarThickness: 30,
    grouped: true,
    interaction: {
        mode: 'index',
    },
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                padding: 10,
                font: {
                    family: "'Noto Sans KR', 'serif'",
                    lineHeight: 1,
                },
            }
        },
        tooltip: {
            backgroundColor: 'rgba(124, 35, 35, 0.4)',
            padding: 10,
            bodySpacing: 5,
            bodyFont: {
                font: {
                    family: "'Noto Sans KR', sans-serif",
                }
            },
            usePointStyle: true,
            filter: (item) => item.parsed.y !== null,
            callbacks: {
                title: (context) => `${context[0].label  }`,
                label: (context) => {
                    const label = `${context.dataset.label  }` || '';

                    return context.parsed.y !== null
                        ? `${label  }: ${  context.parsed.y  }배`
                        : null;
                },
            },
        },
    },
    scales: {
        x: {
            afterTickToLabelConversion (scaleInstance) {
                const ticks = scaleInstance.ticks;

                const newTicks = ticks.map((tick) => {
                    return {
                        ...tick,
                        label: `${tick.label  }`
                    //    여기에 x축 데이터를 씁니다
                    };
                });

                scaleInstance.ticks = newTicks;
            },
            grid: {
                display: false,
                drawTicks: true,
                tickLength: 4,
                color: '#E2E2E230'
            },
            axis: 'x',
            position: 'bottom',
            ticks: {
                minRotation: 45,
                padding: 5,
            },
        },
        y: {
            type: 'linear',
            grid: {
                color: '#E2E2E230',
            },
            afterDataLimits: (scale) => {
                scale.max *= 1.2;
            },
            axis: 'y',
            display: true,
            position: 'left',
            title: {
                display: true,
                align: 'end',
                color: '#808080',
                font: {
                    size: 12,
                    family: "'Noto Sans KR', sans-serif",
                    weight: 300,
                },
                text: '단위: 개'
            }
        },
        y_sub: {
            position: 'right',
            title: {
                display: true,
                align: 'end',
                color: '#808080',
                font: {
                    size: 12,
                    family: "'Noto Sans KR', sans-serif",
                    weight: 300,
                },
                text: '단위: 배'
            },
            afterDataLimits: (scale) => {
                scale.max *= 1.2;
            },
        },
    }
};



const data2 = {
    labels: ["Scatter"],
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",

            pointBackgroundColor: "#000",
            pointBorderWidth: 0,
            pointHoverRadius: 9,
            pointHoverBackgroundColor: "rgba(233, 120, 100, 1)",
            pointHoverBorderColor: "rgba(233, 120, 100, 1)",
            pointHoverBorderWidth: 0,
            pointRadius: 7,
            pointHitRadius: 10,
            data: [
                { x: -65, y: 75, label: "label 1" },
                { x: 59, y: 49, label: "label 2" },
                { x: 80, y: -90, label: "label 3" },
                { x: -81, y: 29, label: "label 4" },
                { x: 56, y: 36, label: "label 5" },
                { x: -55, y: 25, label: "label 6" },
                { x: 40, y: 100, label: "label 7" }
            ]
        }
    ]
};

const options2 = {
    width: 500,
    legend: {
        display: false
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    drawBorder: true,
                    lineWidth: 0
                },
                ticks: {
                    // for debugging
                    display: false,
                    suggestedMin: -100,
                    suggestedMax: 100
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    drawBorder: true,
                    lineWidth: 0
                },
                ticks: {
                    display: false
                }
            }
        ]
    },
    plugins: {
        datalabels: {
            align: "left",
            anchor: "right",
            color: "black",
            padding: { right: 20 }
        }
    },
    tooltips: {
        position: "nearest",
        mode: "point",
        intersect: true,
        yPadding: 10,
        xPadding: 10,
        caretSize: 18,
        caretPadding: 10,
        backgroundColor: "white",
        titleFontColor: "#000",
        bodyFontColor: "#000",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        yAlign: "bottom"
    }
};


const abandonedChart = () => {
    return (
        <Container>

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>서울시 보호소 현황(막대, 선)</Accordion.Header>
                    <Accordion.Body>
                        <Line type="line" data={data} options={options} />
                        <br/>

                        <span>
                            라인 그래프, 빨간 막대 그래프: 서울시 구별 보호소 현황<br/>
                            초록 막대 그래프: 실제 존재하는 보호소 현황<br/>
                            * 결론: 위치정보 개선이 필요함
                        </span>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>


    );
};

export default abandonedChart;

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;