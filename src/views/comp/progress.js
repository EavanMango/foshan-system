import HttpUrl from '@/api/demand-response/eventCalendar';

export async function getTimeLineData(
  params = {
    consId: '100000000186',
    eventId: 100000000123,
  }
) {
  const res = await HttpUrl.queryEventTimeline(params);
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
  const value_List = data.map(d => {
    if (!d?.value?.startTime || !d?.value?.endTime) {
      return { start_end_time: '~', ...d.value };
    }
    let start_end_time = `${d?.value?.startTime}~${d?.value?.endTime}`;
    return { start_end_time, ...d.value };
  });
  const value_arr = [
    value_List[1] || {},
    value_List[2] || {},
    value_List[4] || {},
  ];
  return {
    date_arr,
    flag_arr,
    value_arr,
    time_str,
  };
}
