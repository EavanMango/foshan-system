<template>
  <div class="flex_row_c" style="color: #fff">
    <div class="margin-right-10" style="height: 25px">
      <img
        id="myImage"
        class="img-item"
        :src="currentWeather.weather_imgurl"
        :alt="currentWeather.weather_name"
      />
    </div>
    <div class="title margin-right-10">{{ currentWeather.city }}</div>
    <div class="w-tem">{{ currentWeather.weather_tem }}°C</div>
    <div class="w-tem" style="margin-left: 10px">
      {{ currentWeather.weather_name }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import API from '@/api/load-monitor';
const requireComponent = require.context('@/assets/weather', true);
const weatherList = requireComponent.keys().map(fileName => {
  const imgUrl = requireComponent(fileName);
  return {
    fileName: fileName.split('/').pop().split('.').shift(),
    imgUrl: imgUrl,
  };
});
let index = 0;
let timer1;
let timer2;
const cityList = [
  '南京',
  '无锡',
  '徐州',
  '常州',
  '苏州',
  '南通',
  '连云港',
  '淮安',
  '盐城',
  '扬州',
  '镇江',
  '泰州',
  '宿迁',
];
export default {
  name: 'weatherItem',
  data() {
    return {
      weatherList,
      cityWeatherList: [],
      currentWeather: {
        city: '佛山',
        weather_imgurl: weatherList[4].imgUrl,
        weather_tem: '24',
        weather_name: '多云',
      },
    };
  },
  async created() {
    // this.getWeatherByCityName(cityList[index % 13]);
    await this.getAllCityWeather();
    this.loopShowWeather();
    this.loopQueryCityWeather();
  },
  methods: {
    async getWeatherByCityName(cityName = '南京') {
      const res = await axios.get(
        `https://v0.yiketianqi.com/api?unescape=1&city=${cityName}&version=v61&appid=38625838&appsecret=hT2ovYEx`
      );
      const { wea, tem, city } = res.data;
      const currentWeather = {};
      currentWeather.city = city;
      currentWeather.weather_tem = tem;
      currentWeather.weather_name = wea;
      const option = await weatherList.find(wl => wl.fileName == wea);
      currentWeather.weather_imgurl = option
        ? option.imgUrl
        : weatherList[4].imgUrl;
      return currentWeather;
    },
    async getAllCityWeather() {
      // const resAtt = await Promise.all(
      //   cityList.map(name => {
      //     return this.getWeatherByCityName(name);
      //   })
      // );
      const res = await API.getWeather();
      if (res.code !== 200) return;
      this.cityWeatherList = res.data.map(e => {
        const weatherIcon = this.weatherList.find(wl => wl.fileName == e.wea);
        return {
          city: e.city,
          weather_tem: e.tem,
          weather_name: e.wea,
          weather_imgurl: weatherIcon
            ? weatherIcon.imgUrl
            : this.weatherList[4].imgUrl,
        };
      });
      this.currentWeather = this.cityWeatherList[0];
      // this.cityWeatherList = resAtt;
    },
    loopQueryCityWeather() {
      timer2 = setInterval(() => {
        this.getAllCityWeather();
      }, 2 * 60 * 60 * 1000);
    },
    loopShowWeather() {
      if (!this.cityWeatherList.length) return;
      timer1 = setInterval(() => {
        index++;
        this.currentWeather = this.cityWeatherList[index % 13];
      }, 5000);
    },
    // 将所有蓝色替换为白色
    transformColor() {
      const image = document.getElementById('myImage');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        for (let i = 0; i < imageData.data.length; i += 4) {
          // 检查蓝色通道是否接近100（根据需要调整）
          if (
            imageData.data[i] < 150 &&
            imageData.data[i + 1] < 150 &&
            imageData.data[i + 2] > 150
          ) {
            // 将蓝色通道替换为白色
            imageData.data[i] = 255; // 红色
            imageData.data[i + 1] = 255; // 绿色
            imageData.data[i + 2] = 255; // 蓝色
          }
        }
        context.putImageData(imageData, 0, 0);
        image.src = canvas.toDataURL();
      };
    },
  },
  beforeDestroy() {
    timer1 && clearInterval(timer1);
    timer2 && clearInterval(timer2);
  },
};
</script>

<style scoped lang="scss">
.img-item {
  height: 100%;
  width: auto;
  display: block;
  filter: brightness(0%) grayscale(100%) invert(100%);
}
</style>
