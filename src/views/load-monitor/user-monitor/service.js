import { DateUtil } from '@/utils/date-util';
export const treeData = [
  {
    id: '320100',
    parentId: '320000',
    name: '顺德区',
    equipType: null,
    type: '1',
    label: null,
    children: [
      {
        id: '100000001308',
        parentId: '320100',
        name: '用户1',
        equipType: null,
        type: '3',
        label: null,
        children: [],
      },
      {
        id: '100000001345',
        parentId: '320100',
        name: '用户2',
        equipType: null,
        type: '3',
        label: null,
        children: [],
      },
      {
        id: '100000001377',
        parentId: '320100',
        name: '用户3',
        equipType: null,
        type: '3',
        label: null,
        children: [],
      },

    ],
  },
  {
    id: '320200',
    parentId: '320000',
    name: '禅城区',
    equipType: null,
    type: '1',
    label: null,
    children: [],
  },
  {
    id: '320300',
    parentId: '320000',
    name: '南海区',
    equipType: null,
    type: '1',
    label: null,
    children: [],
  },
  {
    id: '320400',
    parentId: '320000',
    name: '高明区',
    equipType: null,
    type: '1',
    label: null,
    children: [],
  },
  {
    id: '320500',
    parentId: '320000',
    name: '三水区',
    equipType: null,
    type: '1',
    label: null,
  },

];

export function generateLineOptions(_that, { values, timeTag }, start, end) {
  let arrayData = []
  for (let i = 0; i < values.length; i++) {
    arrayData.push([timeTag[i], values[i].toFixed(2)])
  }
  const series = [
    {
      name: '实时负荷',
      data: arrayData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 0,
      itemStyle: {
        color: '#026BDD',
        shadowBlur: 10,
        borderWidth: 2,
      },
      connectNulls: true,
      // 标注最大值最小值
      // markPoint: {
      //   symbol: 'circle',
      //   symbolSize: 10,
      //   label: {
      //     fontSize: 16,
      //     color: _that.fontColor,
      //     offset: [0, -15],
      //   },
      //   data: [
      //     {
      //       type: 'max',
      //       name: '最大值',
      //     },
      //     {
      //       type: 'min',
      //       name: '最小值',
      //     },
      //   ],
      // },
    },
  ];

  const option = {
    grid: {
      top: '7%',
      left: '3%',
      right: '3%',
      bottom: '1%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      confine: true,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderColor: '#026BDD',
      textStyle: {
        fontSize: 16,
        color: _that.fontColor,
        fontFamily: 'PangMenZhengDao',
      },
      formatter: function (params) {
        var relVal = params[0].name;
        for (var i = 0; i < params.length; i++) {
          params[i].value = params[i].value ?? '-';
          relVal +=
            params[i].axisValueLabel +
            '<br/>' +
            params[i].marker +
            params[i].seriesName +
            ': ' +
            params[i].value[1] +
            ' KW';
        }
        return relVal;
      },
      axisPointer: {
        type: 'line',
      },
    },
    legend: {
      // orient: "center",
      top: 10,
      itemWidth: 10,
      itemHeight: 10,
      icon: 'react',
      itemGap: 17,
      // align: "right",
      textStyle: {
        color: _that.fontColor,
        fontSize: 12,
        fontFamily: 'AlibabaPuHuiTi-Medium',
      },
    },
    // xAxis: {
    //   data: timeTag.map(t => {
    //     return DateUtil.transformData(new Date(t), 'HH:mm:ss');
    //   }),
    //   boundaryGap: true,
    //   axisLine: {
    //     show: true,
    //   },
    //   axisTick: {
    //     show: false,
    //   },
    //   nameTextStyle: {
    //     color: _that.fontColor,
    //   },
    //   axisLabel: {
    //     color: _that.fontColor,
    //     interval: index => {
    //       const gap = Math.round(values.length / 10);
    //       return index % gap == 0;
    //     },
    //   },
    //   splitLine: { show: false },
    // },
    xAxis: {
      type: 'time',
      min: new Date(start),
      max: new Date(end),
      minInterval: 60 * 1000,
      axisLabel: {
        formatter: {
          year: '{yyyy}',
          month: '{MMM}',
          day: '{dd}日',
          hour: '{HH}:{mm}',
          minute: '{HH}:{mm}',
          none: '{yyyy}-{MM}-{dd} {hh}:{mm}'
        }
      }
    },
    yAxis: {
      name: 'KW',
      nameTextStyle: {
        color: _that.fontColor,
      },
      axisLabel: {
        color: _that.fontColor,
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(83, 125, 170, 0.2)',
        },
      },
    },
    dataZoom: {
      type: 'inside',
    },
    series: series,
  };
  return option;
}
