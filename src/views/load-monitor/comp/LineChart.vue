<template>
  <div class="w-h-100" style="padding: 0.3rem">
    <EchartsChart :option="option" ref="chart"></EchartsChart>
  </div>
</template>

<script>
import EchartsChart from '@/components/EchartsChart';

export default {
  components: { EchartsChart },
  props: {
    // 多y轴
    muilYAxis: {
      type: Boolean,
      default: false,
    },
    colorFlag: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    xData: {
      type: Array,
      default() {
        return ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30'];
      },
    },
    data: {
      type: [Array, Object],
      default() {
        return [
          {
            name: '基线负荷',
            unit: '',
            data: [100, 100, 100, 100, 100, 100, 100],
          },
          {
            name: '昨日负荷',
            unit: '',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '今日负荷',
            unit: '',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ];
      },
    },
  },
  computed: {
    option() {
      const dataCopy = JSON.parse(JSON.stringify(this.data));
      const type = Object.prototype.toString.call(dataCopy).slice(8, -1);
      let data = null;
      if (type == 'Object') {
        data = [dataCopy];
      } else {
        data = dataCopy || [];
      }
      let unitMap = {};
      data
        .map(d => {
          let min = Math.min(...(d.data || []));
          return {
            name: d.name,
            unit: d.unit,
            max: Math.max(...(d.data || [])),
            min: min > 0 ? 0 : min,
          };
        })
        .forEach(v => {
          if (!unitMap[v.unit]) {
            unitMap[v.unit] = v;
            return;
          }
          const { max: nmax, min: nmin, name, unit } = v;
          const { max: omax, min: omin } = unitMap[v.unit];
          unitMap[v.unit] = {
            unit,
            name,
            max: Math.max(nmax, omax),
            min: Math.min(nmin, omin),
          };
        });
      // 标注最大值最小值
      const markPoint = {
        symbol: 'none',

        // symbolSize: (e, e1) =>
        //   e ? (e.toString().length <= 4 ? 40 : e.toString().length * 8) : 40,
        symbolSize: this.echartFontSize(16),
        label: {
          color: this.fontColor,
          // fontWeight: 'bolder',
          fontFamily: 'ysbth',
          // offset: [50, 0],
          fontSize: this.echartFontSize(16),
        },
        data: [
          {
            type: 'max',
            name: '最大值',
            label: {
              offset: [0, -15],
            },
          },
          {
            type: 'min',
            name: '最小值',
            label: {
              offset: [0, 15],
              // position: 'bottom',
            },
          },
        ],
      };

      const series = data.map(d => {
        d.type = 'line';
        d.connectNulls = true;
        d.smooth = true;
        d.symbolSize = 0;
        d.markPoint = markPoint;
        d.itemStyle = {
          lineStyle: {
            width: this.echartFontSize(2), // 0.1的线条是非常细的了
          },
        };
        if (d.data) {
          d.data = d.data.map(x => {
            return x ? (+x).toFixed(2) : x;
          });
        }
        return d;
      });
      const yAxis = Object.values(unitMap).map((d, i) => {
        return {
          type: 'value',
          name: 'kW',
          nameTextStyle: {
            fontSize: this.echartFontSize(12),
            color: this.fontColor,
          },
          // min: d.min,
          // max: Math.floor(d.max + d.max / 4),
          position: i == 0 ? 'left' : 'right',
          offset: i == 0 ? 0 : (i - 1) * 40,
          // axisLabel: {
          //   formatter: `{value} ${d.unit || ''}`,
          // },
          axisLabel: {
            fontSize: this.echartFontSize(12),
            color: this.fontColor,
          },
          // axisLine: {
          //   show: true,
          // },
          splitLine: {
            show: true,
            lineStyle: {
              width: this.echartFontSize(1),
            },
          },
        };
      });
      return {
        color: this.colorFlag
          ? ['#425AED', '#53C429', '#429EED', '#A349A4', '#15796A', '#583c87']
          : [
              '#F4A651',
              '#425AED',
              '#53C429',

              '#429EED',

              '#A349A4',
              '#15796A',
              '#583c87',
            ],
        dataZoom: {
          type: 'inside',
        },
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            let seriesNameStr = `<div style="font-size: 1rem;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #000;margin-bottom:12px;">${params[0].axisValue}</div>`;
            return (
              seriesNameStr +
              params
                .map(p => {
                  const { seriesName, seriesIndex, data, color } = p;
                  const unit = dataCopy[seriesIndex]?.unit;
                  return `
                <div style="font-size: 0.75rem;font-family: Source Han Sans CN-Medium;font-weight: 500;color: ${color};margin-top:0.75rem;">${seriesName}:${
                    data ?? '-'
                  } ${unit ?? 'kW'}</div>
         `;
                })
                .join('')
            );
          },
        },
        legend: {
          icon: 'rect',
          itemHeight: this.echartFontSize(5), //修改icon图形大小
          itemWidth: this.echartFontSize(16), //修改icon图形大小
          show: true,
          textStyle: {
            color: this.fontColor,
            fontSize: this.echartFontSize(14),
          },
          itemGap: 50,
          tooltip: {
            show: true, // 显示图例的tooltip
            textStyle: {
              // width: this.echartFontSize(300), // 提示框宽度300
              overflow: 'breakAll', // 文字太长时换行
            },
            formatter: val => {
              if (val.name == '基线负荷') {
                return `<p >前五日历史负荷平均值</p>`;
              }
            },
          },
        },
        grid: {
          top: '10%',
          left: '1%',
          right: '4%',
          bottom: '1%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData,
          name: '时间',
          nameTextStyle: {
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },
          axisLabel: {
            interval: index => {
              const gap = Math.round(this.xData.length / 8);
              return index % gap == 0;
            },
            fontSize: this.echartFontSize(12),
            margin: this.echartFontSize(15),
            color: this.fontColor,
          },
          axisLine: {
            color: this.fontColor,
          },
          splitLine: {
            show: false,
            lineStyle: {
              width: this.echartFontSize(1),
            },
          },
        },
        yAxis: this.muilYAxis
          ? yAxis
          : {
              type: 'value',
              name: 'kW',
              nameTextStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
              axisLabel: {
                fontSize: this.echartFontSize(12),
                color: this.fontColor,
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: this.fontColor,
                  width: this.echartFontSize(1),
                },
              },
            },
        series: series,
      };
    },
  },
  methods: {
    getChartInstance() {
      return this.$refs.chart.getChartInstance();
    },
  },
};
</script>

<style></style>
