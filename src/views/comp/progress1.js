import HttpUrl from '@/api/remote-control/group-event';

export async function getTimeLineData(
  params = {
    consId: '100000000186',
    id: 100000000123,
  }
) {
  const res = await HttpUrl.queryMulCtrlEventTimeline(params);
  const time_str = res.data.time;
  const data = res.data.value;
  const date_arr = data.map(d => d.time);
  const flag_arr = data.map(d => {
    if (d.flag === 1) {
      return '左';
    }
    if (d.flag === 2) {
      return '右';
    }
    return '右';
  });
  return {
    date_arr,
    flag_arr,
    time_str,
  };
}
