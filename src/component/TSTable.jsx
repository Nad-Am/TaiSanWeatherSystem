import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Detaile = () => {

    // 创建图表容器的引用
    const chartRef = useRef(null);
    const chartInstance = useRef(null);


    useEffect(() => {
        // 初始化图表
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
                                param.seriesIndex === 0 ? '单位1' : param.seriesIndex === 1 ? '单位2' : '单位3'
                            }<br/>`;
                        });
                        return result;
                    }
                },
                legend: {
                    data: ['数据1', '数据2', '数据3']
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五'],
                    axisLine: {
                        // show: true,
                        onZero: true, // 不在零点显示
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
                        axisTick: {
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}'
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
                        axisTick: {
                            show: false,
                            alignWithLabel: true
                        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            show: false // 隐藏 Y 轴的基准线
                        }
                    },
                    {
                        type: 'value',
                        name: '',
                        position: 'right',
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
                        name: '数据1',
                        type: 'line',
                        yAxisIndex: 0, // 使用第一个 Y 轴
                        data: [120, 132, 101, 134, 90],
                        itemStyle: {
                            color: '#ff0000'
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              {
                                offset: 0,
                                color: 'rgba(58,77,233,0.8)'
                              },
                              {
                                offset: 1,
                                color: 'rgba(58,77,233,0.3)'
                              }
                            ])
                          },
                        smooth: true,
                    },
                    {
                        name: '数据2',
                        type: 'line',
                        yAxisIndex: 1, // 使用第二个 Y 轴
                        data: [20, 40, 60, 80, 100],
                        itemStyle: {
                            color: '#00ff00'
                        }
                    },
                    {
                        name: '数据3',
                        type: 'line',
                        yAxisIndex: 2, // 使用第三个 Y 轴
                        data: [100, 200, 100, 400, 500],
                        itemStyle: {
                            color: '#0000ff'
                        }
                    }
                ]
            }

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
    });



    return (
        <>
            <div ref={chartRef} className='w-full h-full'></div>
        </>
    );
};

export default Detaile;