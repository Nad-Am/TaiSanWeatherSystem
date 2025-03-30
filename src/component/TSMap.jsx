import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { placeMap } from '../utils/Config';

const TSMap = ({place}) => {
  const chartRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    myChart.current = echarts.init(chartRef.current);

    const nodes = [
        { name: '岱庙', x: 45, y: 90 },
        { name: '红门', x: 40, y: 80 },
        { name: '中天门', x: 50, y: 70 },
        { name: '五松亭', x: 60, y: 60 },
        { name: '南天门', x: 45, y: 50 },
        { name: '月望峰', x: 30, y: 45 },
        { name: '天街', x: 55, y: 50 },
        { name: '碧霞祠', x: 65, y: 37 },
        { name: '玉皇顶', x: 53, y: 27 },
    ]

    const linksmap = [
        { source: '岱庙', target: '红门' },
        { source: '红门', target: '中天门' },
        { source: '中天门', target: '五松亭' },
        { source: '中天门', target: '月望峰' },
        { source: '五松亭', target: '南天门' },
        { source: '月望峰', target: '南天门' },
        { source: '南天门', target: '天街' },
        { source: '天街', target: '碧霞祠' },
        { source: '碧霞祠', target: '玉皇顶' },
    ]

    const data = nodes.map(node => ({
        name: node.name,
        x: node.x,
        y: node.y,
        itemStyle: node.name === placeMap[place] ? {
          color: 'rgb(28,229,132)',
          borderColor: '#fff',
          borderWidth: 1
          }: {
              color: 'rgb(137,179,202)',
              borderColor: '#fff',
              borderWidth: 1
          }
    }))

    const links = linksmap.map(link => ({
        source: link.source,
        target: link.target,
        lineStyle: link.source === '中天门' && link.target === '月望峰' ? {
          color: 'rgb(250,27,6)',
          width: 1,
          curveness: 0
        }
        : {
          color: 'rgb(98,137,169)',
          width: 1,
          curveness: 0.2
        }
    }))

    // 节点点击事件处理函数
    // const handleNodeClick = (params) => {
    //   console.log('节点被点击:', params);
    //   alert(`你点击了节点: ${params.name}`);
    // };

    const option = {
      title: {
        text: '景区简图',
        textStyle: {
            fontSize: 24, // 设置字体大小
            fontWeight: 'bold', // 设置字体加粗
            color: '#333333', // 设置字体颜色
            fontStyle: 'normal', // 设置字体风格，如 'italic' 表示斜体
            fontFamily: 'Arial, sans-serif' // 设置字体系列
        },
        padding: [10, 10, 10, 10], // 设置标题的内边距，顺序为上、右、下、左
        left: 'left', // 设置标题的水平位置，可选 'left', 'center', 'right'
        top: 'top' // 设置标题的垂直位置，可选 'top', 'middle', 'bottom'
      },
      tooltip: {
        trigger: 'item',
        formatter: (e) => {
          return e.name;
        }
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 20,
          roam: false, // 允许平移和缩放
          label: {
            show: true,
            position: 'top',
            color: '#000',
            fontSize: 12
          },
          data,
          links
        }
      ]
    };

    myChart.current.setOption(option);

    // 为节点添加点击事件监听器
    // myChart.current.on('click', 'series', handleNodeClick);
    
    //  监听视口改变
    window.addEventListener('resize', () => {
      myChart.current.resize();
    })

    return () => {
      // myChart.current.off('click', handleNodeClick); // 移除事件监听器
      window.removeEventListener('resize', () => {
        myChart.current.resize();
      })
      myChart.current.dispose();
    };
  },[place]);

  return (
    <>
      <div className='bg-cardBg rounded-2xl h-full' ref={chartRef}></div>
    </>
  );
};

export default TSMap;