import HttpUrl from "@/api/resource-business/gallery.js"

// export const barOptions = {
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       lineStyle: {
//         color: '#ddd'
//       }
//     },
//     backgroundColor: 'rgba(255,255,255,1)',
//     padding: [5, 10],
//     textStyle: {
//       color: '#7588E4',
//     },
//     extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
//   },
//   grid: {
//     x: 80,
//     y: 50,
//     x2: 50,
//     y2: 60,
//     borderWidth: 0
//   },
//   legend: {
//     data: ["数量", "容量"],
//     textStyle: {
//       color: '#000000',
//     }
//   },
//   color: ['#666EE8', '#F9A34C'],
//   xAxis: {
//     type: 'category',
//     data: ['楼宇-照明', '工业-钢铁', '工业-水泥', '楼宇-空调', '楼宇-其他', '光伏', '充电桩',
//       '储能', '数据中心'],
//     boundaryGap: true,
//     axisTick: {
//       show: false
//     },
//     axisLine: {
//       lineStyle: {
//         // color: ''
//       }
//     },
//     axisLabel: {
//       fontSize: this.echartFontSize(10),
//       textStyle: {
//         fontSize: this.echartFontSize(14),
//       }
//     }
//   },
//   yAxis: [
//     {
//       type: 'value',
//       name: '单位/个',
//       min: 0,
//       max: 50,
//       interval: 10,
//       axisLabel: {
//         formatter: '{value}',
//         textStyle: {
//           fontSize: this.echartFontSize(14),
//         }
//       }
//     },
//     {
//       type: 'value',
//       name: '单位/kW',
//       min: 0,
//       max: 50,
//       interval: 10,
//       axisLabel: {
//         formatter: '{value}',
//         textStyle: {
//           fontSize: this.echartFontSize(14),
//         }
//       }
//     }
//   ],
//   series: [
//     {
//       type: "bar",
//       data: [23, 24, 18, 25, 27, 28, 25],
//       name: "数量",
//       barWidth: '25%',
//       label: {
//         show: true,
//         position: "top"
//       }
//     },
//     {
//       type: "bar",
//       data: [3, 34, 58, 25, 27, 28, 25],
//       name: "容量",
//       barWidth: '25%',
//       label: {
//         show: true,
//         position: "top"
//       }
//     }
//   ],
// }

// export const barOptionsTransverse = {
//   grid: {
//     x: 80,
//     y: 10,
//     x2: 50,
//     y2: 60,
//     borderWidth: 0
//   },
//   title: {
//     text: ''
//   },
//   tooltip: {},
//   legend: {
//     data: [],
//     right: '25%',
//   },
//   yAxis: {
//     data: ['分体式', 'VRV', '风冷热泉', '水冷机组']
//   },
//   xAxis: {},
//   color: ['#666EE8'],
//   series: [{
//     name: '一月销量',
//     type: 'bar',
//     stack: '业务',
//     data: [100, 200, 300, 400, 500]
//   },
//   ]
// }

export async function getAllData() {
  const res = await HttpUrl.queryRsInfo()
  const data = res.data
  return data
}