import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Detaile = ({place, data, forestCount, handleIndex}) => {
    // 创建图表容器的引用
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const indexRef = useRef(0);

    const fortrun = () => {
        if(indexRef.current === 0) return;
        indexRef.current = indexRef.current - 1;
        handleIndex(indexRef.current);
    }

    const backtrun = () => {
        if(indexRef.current === 24/forestCount - 1) return;
        indexRef.current = indexRef.current + 1;
        handleIndex(indexRef.current);
    }


    useEffect(() => {
        // 初始化图表
        const now = new Date().getHours();
        if (chartRef.current) {
            chartInstance.current = echarts.init(chartRef.current);
            // 配置项
            const option = {
                title: {
                    text: `24H预测`
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        let result = `${params[0].axisValue}<br/>`;
                        params.forEach(function (param) {
                            result += `${param.seriesName}: ${param.value} ${
                                param.seriesIndex === 0 ? '°C' : param.seriesIndex === 1 ? '%' : '%'
                            }<br/>`;
                        });
                        return result;
                    }
                },
                legend: {
                    data: ["温度", "湿度", "降水概率"],
                    selectedMode: false,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: new Array(forestCount).fill(0).map((_, index) => {
                        const hour = (now + index + indexRef.current * forestCount) % 24;
                        return `${hour}:00`;
                    }),
                    axisLine: {
                        // onZero: false, // 不在零点显示
                        lineStyle: {
                            color: '#000000'
                        }
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true
                    },
                    axisLabel: {
                        show: true
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '°C',
                        position: 'left',
                        max: Math.max(...data[0])+ 2,
                        min: Math.min(...data[0]) - 3, // 设置Y轴的起始位置为-10
                        scale: false, // 设置为false，让min和max生效
                        axisTick: {
                            show: true,
                        },
                        axisLabel: {
                            formatter:  function(value) {
                                return value + '°C';
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgb(0,0,0)' // Y轴2的颜色
                            }
                        },
                        splitLine: {
                            show: false // 隐藏 Y 轴的基准线
                        }
                    },
                    {
                        type: 'value',
                        position: 'right',
                        name: '%',
                        max: Math.max(...data[1]) + 10,
                        min: Math.min(...data[1]),
                        axisTick: {
                            show: true,
                            alignWithLabel: true
                        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false // 隐藏 Y 轴的基准线
                        }
                    },
                    {
                        type: 'value',
                        name: '',
                        position: 'right',
                        max: Math.max(...data[2]) + 10,
                        min: Math.min(...data[2]),
                        axisLine: {
                            show: false // 隐藏 Y 轴线
                        },
                        axisTick: {
                            show: false // 隐藏刻度线
                        },
                        axisLabel: {
                            show: false // 隐藏刻度值
                        },
                        splitLine: {
                            show: false // 隐藏 Y 轴的基准线
                        }
                    }
                ],
                series: [
                    {
                        name: '温度',
                        type: 'line',
                        yAxisIndex: 0, // 使用第一个 Y 轴
                        data: data[0],
                        itemStyle: {
                            color: '#ff0000'
                        },
                        symbolSize: 0, // 节点大小
                        // areaStyle: {
                        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        //       {
                        //         offset: 0,
                        //         color: 'rgba(58,77,233,0.8)'
                        //       },
                        //       {
                        //         offset: 1,
                        //         color: 'rgba(58,77,233,0.3)'
                        //       }
                        //     ])
                        //   },
                        smooth: true,
                    },
                    {
                        name: '湿度',
                        type: 'line',
                        yAxisIndex: 1, // 使用第二个 Y 轴
                        data: data[1],
                        symbolSize: 0, // 节点大小
                        itemStyle: {
                            color: '#00ff00'
                        },
                        smooth: true,
                    },
                    {
                        name: '降水概率',
                        type: 'line',
                        yAxisIndex: 2, // 使用第三个 Y 轴
                        data: data[2],
                        symbolSize: 0, // 节点大小
                        itemStyle: {
                            color: '#0000ff'
                        },
                        smooth: true,
                    }
                ]
            };

            // 应用配置项
            chartInstance.current.setOption(option);

            // 窗口大小变化时调整图表大小
            window.addEventListener('resize', () => {
                chartInstance.current.resize();
            });

            // 组件卸载时销毁图表
            return () => {
                window.removeEventListener('resize', () => {
                    chartInstance.current.resize();
                });
                chartInstance.current.dispose();
            };
        }
    },[place,data]);



    return (
        <>
            <div ref={chartRef} className='w-full h-full'></div>
            <div onClick={fortrun} className='absolute z-10 top-1/3 left-5 cursor-pointer text-white text-3xl'>{'<'}</div>
            <div onClick={backtrun} className='absolute z-10 top-1/3 right-5 cursor-pointer text-white text-3xl'>{'>'}</div>
        </>
    );
};

export default Detaile;