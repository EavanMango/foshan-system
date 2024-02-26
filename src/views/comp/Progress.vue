<template>
  <div class="progress-wrapper" ref="progress">
    <div class="progress-container" ref="container">
      <!-- 右侧 -->
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="596"
          height="882"
          viewBox="0 0 596 882"
        >
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="0.5"
              x2="0.5"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#2b35d1" />
              <stop
                v-for="(date, index) in date_arr"
                :key="index"
                :offset="(date_line_top[index] || 0) / 620"
                stop-color="#2b35d1"
              />
              <stop
                :offset="
                  (date_line_top[date_arr.length - 1] || 0) / 620 + 0.001
                "
                stop-color="#2b35d1"
              />
              <stop
                :offset="
                  (date_line_top[date_arr.length - 1] || 0) / 620 + 0.002
                "
                stop-color="#ccc"
              />
              <stop offset="1" stop-color="#ccc" />
            </linearGradient>
            <filter
              id="矩形_8762"
              x="144.5"
              y="58.5"
              width="234"
              height="41"
              filterUnits="userSpaceOnUse"
            >
              <feOffset input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feFlood flood-color="#2b35d1" flood-opacity="0.349" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="矩形_8763"
              x="150.5"
              y="192.5"
              width="133"
              height="41"
              filterUnits="userSpaceOnUse"
            >
              <feOffset input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1.5" result="blur-2" />
              <feFlood flood-color="#2b35d1" flood-opacity="0.349" />
              <feComposite operator="in" in2="blur-2" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="矩形_8768"
              x="399.5"
              y="322.5"
              width="133"
              height="41"
              filterUnits="userSpaceOnUse"
            >
              <feOffset input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1.5" result="blur-3" />
              <feFlood flood-color="#2b35d1" flood-opacity="0.349" />
              <feComposite operator="in" in2="blur-3" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="矩形_8771"
              x="399.5"
              y="430.5"
              width="133"
              height="41"
              filterUnits="userSpaceOnUse"
            >
              <feOffset input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1.5" result="blur-4" />
              <feFlood flood-color="#2b35d1" flood-opacity="0.349" />
              <feComposite operator="in" in2="blur-4" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="矩形_8773"
              x="424.5"
              y="749.5"
              width="83"
              height="41"
              filterUnits="userSpaceOnUse"
            >
              <feOffset input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1.5" result="blur-5" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur-5" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="矩形_8774"
              x="246.5"
              y="651.5"
              width="83"
              height="41"
              filterUnits="userSpaceOnUse"
            >
              <feOffset input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1.5" result="blur-6" />
              <feFlood flood-opacity="0.349" />
              <feComposite operator="in" in2="blur-6" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="矩形_8775"
              x="147.5"
              y="815.5"
              width="162"
              height="41"
              filterUnits="userSpaceOnUse"
            >
              <feOffset input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1.5" result="blur-7" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur-7" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="联合_1027"
              x="0"
              y="14"
              width="122.569"
              height="32"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="1" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1" result="blur-8" />
              <feFlood flood-opacity="0.102" />
              <feComposite operator="in" in2="blur-8" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="椭圆_68692"
              x="113"
              y="818"
              width="44"
              height="44"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="2" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur-9" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur-9" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="椭圆_68675"
              x="113"
              y="59"
              width="44"
              height="44"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="2" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur-10" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur-10" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="椭圆_68677"
              x="113"
              y="193"
              width="44"
              height="44"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="2" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur-11" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur-11" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="椭圆_68679"
              x="113"
              y="323"
              width="44"
              height="44"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="2" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur-12" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur-12" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="椭圆_68679-2"
              x="113"
              y="431"
              width="44"
              height="44"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="2" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur-13" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur-13" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="椭圆_68685"
              x="113"
              y="541"
              width="44"
              height="44"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="2" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur-14" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur-14" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="椭圆_68688"
              x="113"
              y="652"
              width="44"
              height="44"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="2" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur-15" />
              <feFlood flood-opacity="0.161" />
              <feComposite operator="in" in2="blur-15" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g id="aa" transform="translate(-534 -124)">
            <path
              id="矩形_8770"
              data-name="矩形 8770"
              d="M0,0H462a0,0,0,0,1,0,0V870a12,12,0,0,1-12,12H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
              transform="translate(668 124)"
              :fill="getThemeColor()"
            />
            <path
              id="路径_2796"
              data-name="路径 2796"
              d="M5,0H7l5,820a6,6,0,0,1-12,0Z"
              transform="translate(663 138)"
              fill="url(#linear-gradient)"
            />
            <path
              id="路径_2790"
              data-name="路径 2790"
              d="M-10475,11452h7"
              transform="translate(11157 -11115)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2791"
              data-name="路径 2791"
              d="M-10475,11452h440.933"
              transform="translate(11164.067 -10983)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2816"
              data-name="路径 2816"
              d="M-10475,11452h242.035"
              transform="translate(11170.965 -10877)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2793"
              data-name="路径 2793"
              d="M-10475,11452h240.774"
              transform="translate(11164.067 -10767)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2794"
              data-name="路径 2794"
              d="M-10475,11452h91.933"
              transform="translate(11164.067 -10655.882)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2797"
              data-name="路径 2797"
              d="M-10475,11452h21.287"
              transform="translate(11160.213 -10492)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <g
              transform="matrix(1, 0, 0, 1, 534, 124)"
              filter="url(#矩形_8762)"
            >
              <rect
                id="矩形_8762-2"
                data-name="矩形 8762"
                width="225"
                height="32"
                rx="10"
                transform="translate(149 63)"
                :fill="getRectColorByIndex(1)"
              />
            </g>
            <g
              transform="matrix(1, 0, 0, 1, 534, 124)"
              filter="url(#矩形_8763)"
            >
              <rect
                id="矩形_8763-2"
                data-name="矩形 8763"
                width="124"
                height="32"
                rx="10"
                transform="translate(155 197)"
                :fill="getRectColorByIndex(2)"
              />
            </g>
            <g
              transform="matrix(1, 0, 0, 1, 534, 124)"
              filter="url(#矩形_8768)"
            >
              <rect
                id="矩形_8768-2"
                data-name="矩形 8768"
                width="124"
                height="32"
                rx="10"
                transform="translate(404 327)"
                :fill="getRectColorByIndex(3)"
              />
            </g>
            <g
              transform="matrix(1, 0, 0, 1, 534, 124)"
              filter="url(#矩形_8771)"
            >
              <rect
                id="矩形_8771-2"
                data-name="矩形 8771"
                width="124"
                height="32"
                rx="10"
                transform="translate(404 435)"
                :fill="getRectColorByIndex(4)"
              />
            </g>
            <g
              transform="matrix(1, 0, 0, 1, 534, 124)"
              filter="url(#矩形_8773)"
            >
              <rect
                id="矩形_8773-2"
                data-name="矩形 8773"
                width="74"
                height="32"
                rx="10"
                transform="translate(429 754)"
                :fill="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
              />
            </g>
            <g
              transform="matrix(1, 0, 0, 1, 534, 124)"
              filter="url(#矩形_8774)"
            >
              <rect
                id="矩形_8774-2"
                data-name="矩形 8774"
                width="74"
                height="32"
                rx="10"
                transform="translate(251 656)"
                :fill="getSixRectColor('左')"
              />
            </g>
            <g
              id="组_26591"
              data-name="组 26591"
              transform="translate(11113 -11096)"
            >
              <g
                transform="matrix(1, 0, 0, 1, -10579, 11220)"
                filter="url(#矩形_8775)"
              >
                <rect
                  id="矩形_8775-2"
                  data-name="矩形 8775"
                  width="153"
                  height="32"
                  rx="10"
                  transform="translate(152 820)"
                  :fill="getRectColorByIndex(7)"
                />
              </g>
            </g>
            <g
              id="组_26585"
              data-name="组 26585"
              transform="translate(11120 -11249)"
            >
              <circle
                id="椭圆_68665"
                data-name="椭圆 68665"
                cx="9"
                cy="9"
                r="9"
                transform="translate(-10419 11443)"
                fill="rgba(255,255,255,0.86)"
              />
              <path
                id="路径_2718"
                data-name="路径 2718"
                d="M73.369,2.891H69.952a.768.768,0,0,0-.706.765v8.128a.7.7,0,0,0,.712.677h6.264a.824.824,0,0,0,.828-.7V6.459H77.9v5.325A1.656,1.656,0,0,1,76.222,13.3H69.958a1.533,1.533,0,0,1-1.566-1.5V3.638a1.6,1.6,0,0,1,1.56-1.586h3.417Zm1.3,4.368a.42.42,0,1,1,.007.84H70.966a.42.42,0,1,1-.006-.84h3.708Zm-.585-2.606a.42.42,0,1,1,.007.84H70.95a.42.42,0,1,1-.006-.84h3.139ZM72.409,9.621a.42.42,0,1,1,.006.84h-1.43a.42.42,0,1,1-.006-.84ZM75.526.744v1.4a.427.427,0,0,1-.854.006V.744a.427.427,0,0,1,.854,0Zm3.686,4.538H77.788a.42.42,0,1,1,0-.84h1.424a.42.42,0,1,1,0,.84ZM78.42,1.736a.415.415,0,0,1,0,.594l-1.008.99a.432.432,0,0,1-.6-.021.415.415,0,0,1,0-.572l1.006-.99a.432.432,0,0,1,.6,0h0Z"
                transform="translate(-10483.797 11445.188)"
                fill="#666ee8"
              />
            </g>
            <path
              id="多边形_240"
              data-name="多边形 240"
              d="M4.75,0,9.5,6H0Z"
              transform="translate(1130 332.25) rotate(90)"
              :fill="getStrokeColorByIndex(2)"
            />
            <g id="组_26749" data-name="组 26749">
              <text
                v-for="(top, index) in date_top"
                :key="index"
                :id="top"
                :data-name="date_arr[index]"
                :transform="`translate(${date_left} ${top})`"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">{{ date_arr[index] }}</tspan>
              </text>
              <!-- <text
          id="_09:00"
          data-name="09:00"
          transform="translate(533 209)"
          :fill="fontColor"
          font-size="14"
          font-family="SourceHanSansCN-Regular, Source Han Sans CN"
        >
          <tspan x="0" y="0">{{ date_arr[0] }}</tspan>
        </text>
        <text
          id="_10:00"
          data-name="10:00"
          transform="translate(533 343)"
          :fill="fontColor"
          font-size="14"
          font-family="SourceHanSansCN-Regular, Source Han Sans CN"
        >
          <tspan x="0" y="0">{{ date_arr[1] }}</tspan>
        </text>
        <text
          id="_10:15"
          data-name="10:15"
          transform="translate(533 473)"
          :fill="fontColor"
          font-size="14"
          font-family="SourceHanSansCN-Regular, Source Han Sans CN"
        >
          <tspan x="0" y="0">{{ date_arr[2] }}</tspan>
        </text>
        <text
          id="_10:30"
          data-name="10:30"
          transform="translate(533 581)"
          :fill="fontColor"
          font-size="14"
          font-family="SourceHanSansCN-Regular, Source Han Sans CN"
        >
          <tspan x="0" y="0">{{ date_arr[3] }}</tspan>
        </text>
        <text
          id="_11:00"
          data-name="11:00"
          transform="translate(533 691)"
          :fill="fontColor"
          font-size="14"
          font-family="SourceHanSansCN-Regular, Source Han Sans CN"
        >
          <tspan x="0" y="0">{{ date_arr[4] }}</tspan>
        </text>
        <text
          id="_12:00"
          data-name="12:00"
          transform="translate(533 802)"
          :fill="fontColor"
          font-size="14"
          font-family="SourceHanSansCN-Regular, Source Han Sans CN"
        >
          <tspan x="0" y="0">{{ date_arr[5] }}</tspan>
        </text>
        <text
          id="_15:00"
          data-name="15:00"
          transform="translate(533 968)"
          :fill="fontColor"
          font-size="14"
          font-family="SourceHanSansCN-Regular, Source Han Sans CN"
        >
          <tspan x="0" y="0">{{ date_arr[6] }}</tspan>
        </text> -->
            </g>
            <path
              id="多边形_241"
              data-name="多边形 241"
              d="M4.75,0,9.5,6H0Z"
              transform="translate(1130 464.25) rotate(90)"
              :fill="getStrokeColorByIndex(3)"
            />
            <path
              id="多边形_244"
              data-name="多边形 244"
              d="M4.75,0,9.5,6H0Z"
              transform="translate(1130 678.25) rotate(90)"
              :fill="getStrokeColorByIndex(5)"
            />
            <path
              id="路径_2735"
              data-name="路径 2735"
              d="M-10476,10374h302.895"
              transform="translate(11298.109 -10037)"
              fill="none"
              :stroke="getStrokeColorByIndex(2)"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2752"
              data-name="路径 2752"
              d="M-10476,10374h59.728"
              transform="translate(11543.274 -9905)"
              fill="none"
              :stroke="getStrokeColorByIndex(3)"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2812"
              data-name="路径 2812"
              d="M-10476,10374h96.154"
              transform="translate(11506.848 -9691)"
              fill="none"
              :stroke="getStrokeColorByIndex(5)"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <g
              transform="matrix(1, 0, 0, 1, 534, 124)"
              filter="url(#联合_1027)"
            >
              <path
                id="联合_1027-2"
                data-name="联合 1027"
                d="M-34,26a4,4,0,0,1-4-4V4a4,4,0,0,1,4-4H71a4,4,0,0,1,4,4V9.375a1.04,1.04,0,0,1,.168.123l3.069,2.758a1,1,0,0,1,0,1.488L75.168,16.5a1.041,1.041,0,0,1-.168.123V22a4,4,0,0,1-4,4Z"
                transform="translate(41 16)"
                fill="#666ee8"
              />
            </g>
            <text
              id="_2022-08"
              data-name="2022-08"
              transform="translate(579 159)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">{{ str_date }}</tspan>
            </text>
            <text
              id="需求响应平台发布响应邀约"
              transform="translate(725 209)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">需求响应平台发布响应邀约</tspan>
            </text>
            <text
              id="通知用户"
              transform="translate(735 343)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">通知用户</tspan>
            </text>
            <text
              id="参与信息"
              transform="translate(984 473)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">参与信息</tspan>
            </text>
            <text
              id="收集申报"
              transform="translate(984 581)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">收集申报</tspan>
            </text>
            <g
              transform="matrix(1, 0, 0, 1, 534, 124)"
              filter="url(#椭圆_68692)"
            >
              <circle
                id="椭圆_68692-2"
                data-name="椭圆 68692"
                cx="13"
                cy="13"
                r="13"
                transform="translate(122 825)"
                :fill="getCircleColorByIndex(7)"
              />
            </g>
            <g
              id="组_26584"
              data-name="组 26584"
              transform="translate(11143 -11249)"
            >
              <g
                transform="matrix(1, 0, 0, 1, -10609, 11373)"
                filter="url(#椭圆_68675)"
              >
                <circle
                  id="椭圆_68675-2"
                  data-name="椭圆 68675"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(122 66)"
                  fill="rgba(224,237,255,0.76)"
                />
              </g>
              <circle
                id="椭圆_68674"
                data-name="椭圆 68674"
                cx="6"
                cy="6"
                r="6"
                transform="translate(-10480 11446)"
                fill="#2b35d1"
              />
              <circle
                id="椭圆_68694"
                data-name="椭圆 68694"
                cx="6"
                cy="6"
                r="6"
                transform="translate(-10480 11446)"
                :fill="getCircleColorByIndex(1)"
              />
            </g>
            <g
              id="组_26586"
              data-name="组 26586"
              transform="translate(11120 -11249)"
            >
              <circle
                id="椭圆_68678"
                data-name="椭圆 68678"
                cx="9"
                cy="9"
                r="9"
                transform="translate(-10409 11577)"
                fill="rgba(255,255,255,0.87)"
              />
              <path
                id="联合_1028"
                data-name="联合 1028"
                d="M10549.365-11509.093a1.613,1.613,0,0,1-.234-.111c-.023-.017-.049-.029-.07-.047a1.552,1.552,0,0,1-.328-.272,1.645,1.645,0,0,1-.389-.715h.787a.935.935,0,0,0,.842.524.929.929,0,0,0,.838-.524h0a.929.929,0,0,1-.838.524.929.929,0,0,0,.838-.524h-1.68a.935.935,0,0,0,.842.524.935.935,0,0,1-.842-.524h-3.641a.53.53,0,0,1-.437-.233.509.509,0,0,1-.035-.487l.99-2.186v-2.932a3.921,3.921,0,0,1,3.092-3.806.941.941,0,0,1,.873-.779.942.942,0,0,1,.873.779,3.921,3.921,0,0,1,3.09,3.806v2.932l.99,2.186a.515.515,0,0,1-.039.487.524.524,0,0,1-.436.233h-2.854a1.681,1.681,0,0,1-1.625,1.258A1.671,1.671,0,0,1,10549.365-11509.093Zm.607.112a1.681,1.681,0,0,0,1.625-1.258A1.686,1.686,0,0,1,10549.973-11508.98Zm-.607-.112a2.158,2.158,0,0,1-.234-.111A1.613,1.613,0,0,0,10549.365-11509.093Zm-2.613-6.983v2.988a.513.513,0,0,1-.041.193l-.873,1.923h8.268l-.873-1.923a.447.447,0,0,1-.041-.193v-2.988a3.2,3.2,0,0,0-3.219-3.171A3.2,3.2,0,0,0,10546.752-11516.076Zm3.49-3.892a.331.331,0,0,0-.27-.167.331.331,0,0,0-.271.167c.092-.006.178-.013.271-.013S10550.152-11519.974,10550.242-11519.968Zm-1.324,10.618a1.637,1.637,0,0,0,.143.1A1.637,1.637,0,0,1,10548.918-11509.35Z"
                transform="translate(-20949.971 23100.82)"
                fill="#666ee8"
              />
            </g>
            <g
              id="组_26587"
              data-name="组 26587"
              transform="translate(11143 -11219)"
            >
              <rect
                id="矩形_8767"
                data-name="矩形 8767"
                width="39.38"
                height="39.38"
                rx="8"
                transform="translate(-10412.499 11686.846) rotate(-45)"
                fill="#e9e9e9"
              />
              <g
                id="矩形_8766"
                data-name="矩形 8766"
                transform="translate(-10418.346 11686) rotate(-45)"
                :fill="getJudgeBgColorByColor(3)"
                :stroke="getJudgeBgColorByColor(3, 'stroke')"
                stroke-width="1"
              >
                <rect width="39.38" height="39.38" rx="8" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="38.38"
                  height="38.38"
                  rx="7.5"
                  fill="none"
                />
              </g>
            </g>
            <g
              id="组_26603"
              data-name="组 26603"
              transform="translate(11390.576 -10888.771)"
            >
              <rect
                id="矩形_8767-2"
                data-name="矩形 8767"
                width="39.38"
                height="39.38"
                rx="8"
                transform="translate(-10412.499 11686.846) rotate(-45)"
                fill="#e9e9e9"
              />
              <g
                id="矩形_8766-2"
                data-name="矩形 8766"
                transform="translate(-10418.346 11686) rotate(-45)"
                :fill="getJudgeBgColorByColor(6)"
                :stroke="getJudgeBgColorByColor(6, 'stroke')"
                stroke-width="1"
              >
                <rect width="39.38" height="39.38" rx="8" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="38.38"
                  height="38.38"
                  rx="7.5"
                  fill="none"
                />
              </g>
            </g>
            <g
              id="组_26605"
              data-name="组 26605"
              transform="translate(11387.652 -11004.864)"
            >
              <rect
                id="矩形_8767-3"
                data-name="矩形 8767"
                width="39.38"
                height="39.38"
                rx="8"
                transform="translate(-10412.499 11686.846) rotate(-45)"
                fill="#e9e9e9"
              />
              <g
                id="矩形_8766-3"
                data-name="矩形 8766"
                transform="translate(-10418.346 11686) rotate(-45)"
                :fill="getJudgeBgColorByColor(5)"
                :stroke="getJudgeBgColorByColor(5, 'stroke')"
                stroke-width="1"
              >
                <rect width="39.38" height="39.38" rx="8" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="38.38"
                  height="38.38"
                  rx="7.5"
                  fill="none"
                />
              </g>
            </g>
            <text
              id="是否_参与"
              data-name="是否
参与"
              transform="translate(740.5 463.999)"
              :fill="getJudgeTextColorByIndex(3)"
              font-size="12"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">是否</tspan>
              <tspan x="0" y="17">参与</tspan>
            </text>
            <text
              id="是否_控制"
              data-name="是否
控制"
              transform="translate(988.076 794.228)"
              :fill="flag_arr[4] == '右' ? '#666ee8' : '#fff'"
              font-size="12"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">是否</tspan>
              <tspan x="0" y="17">控制</tspan>
            </text>
            <text
              id="用户_确认"
              data-name="用户
确认"
              transform="translate(985.152 678.135)"
              :fill="getJudgeTextColorByIndex(5)"
              font-size="12"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">用户</tspan>
              <tspan x="0" y="17">确认</tspan>
            </text>
            <text
              id="是"
              transform="translate(843 459)"
              :fill="getJudgeTextColorByIndex(3)"
              font-size="12"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">是</tspan>
            </text>
            <text
              id="否"
              transform="translate(733 726)"
              :fill="flag_arr[4] == '左' ? '#666ee8' : '#aaa'"
              font-size="12"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">否</tspan>
            </text>
            <text
              id="否-2"
              data-name="否"
              transform="translate(855 674)"
              :fill="flag_arr[4] == '左' ? '#666ee8' : '#aaa'"
              font-size="12"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">否</tspan>
            </text>
            <text
              id="自控"
              transform="translate(986 900)"
              :fill="flag_arr[5] == '右' ? '#fff' : '#666'"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">自控</tspan>
            </text>
            <text
              id="平台控制"
              transform="translate(794 802)"
              :fill="flag_arr[5] == '左' ? '#fff' : '#666'"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">平台控制</tspan>
            </text>
            <text
              id="结束"
              transform="translate(756 966)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">结束</tspan>
            </text>
            <text
              id="是-2"
              data-name="是"
              transform="translate(902 787)"
              :fill="getSixTextColor('左')"
              font-size="12"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">是</tspan>
            </text>
            <text
              id="是-3"
              data-name="是"
              transform="translate(1008 741)"
              :fill="flag_arr[4] == '右' ? '#666ee8' : '#aaa'"
              font-size="12"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">是</tspan>
            </text>
            <text
              id="否-3"
              data-name="否"
              transform="translate(1006 848)"
              :fill="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
              font-size="12"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">否</tspan>
            </text>
            <line
              id="直线_885"
              data-name="直线 885"
              y2="86"
              transform="translate(753 227.5)"
              fill="none"
              :stroke="getStrokeColorByIndex(2)"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_886"
              data-name="直线 886"
              y2="69"
              transform="translate(753 361.5)"
              fill="none"
              :stroke="getStrokeColorByIndex(3)"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_888"
              data-name="直线 888"
              y2="187"
              transform="translate(752.5 496.5)"
              fill="none"
              :stroke="getStrokeColorByIndexs([3, 7], [4, 5, 6])"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_888"
              data-name="直线 888"
              y2="234"
              transform="translate(752.5 689)"
              :fill="flag_arr[4] == '左' ? '#666ee8' : '#c6c6c6'"
              :stroke="flag_arr[4] == '左' ? '#666ee8' : '#c6c6c6'"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_yhqr"
              data-name="直线_yhqr"
              y2="240"
              transform="translate(752.5 685)"
              fill="none"
              v-show="isShowByIndexs([5, 7], [6])"
              :stroke="getStrokeColorByIndexs([5, 7], [6])"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_887"
              data-name="直线 887"
              x2="135"
              transform="translate(786 467)"
              fill="none"
              :stroke="getStrokeColorByIndex(3)"
              stroke-linecap="round"
              stroke-width="3"
            />
            <path
              id="路径_2736"
              data-name="路径 2736"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(745.289 307.317) rotate(-45)"
              :fill="getStrokeColorByIndex(2)"
            />
            <path
              id="路径_2778"
              data-name="路径 2778"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(745.289 425.943) rotate(-45)"
              :fill="getStrokeColorByIndex(3)"
            />
            <path
              id="路径_2780"
              data-name="路径 2780"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(992.289 545.289) rotate(-45)"
              :fill="getStrokeColorByIndex(4)"
            />
            <path
              id="路径_2781"
              data-name="路径 2781"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(992.289 757.407) rotate(-45)"
              :fill="flag_arr[4] == '右' ? '#666ee8' : '#aaa'"
            />
            <path
              id="路径_2807"
              data-name="路径 2807"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(990.289 641.314) rotate(-45)"
              :fill="getStrokeColorByIndex(5)"
            />
            <path
              id="路径_2782"
              data-name="路径 2782"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(870.143 787.789) rotate(45)"
              :fill="getSixStrokeColor('左')"
            />
            <path
              id="路径_2818"
              data-name="路径 2818"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(767.143 677) rotate(45)"
              :fill="flag_arr[4] == '左' ? '#666ee8' : '#aaa'"
              :stroke="flag_arr[4] == '左' ? '#666ee8' : '#aaa'"
            />
            <path
              id="路径_2817"
              data-name="路径 2817"
              d="M2.828,10.9l1.73-5.972,6.347-2.1L0,0Z"
              transform="translate(928 467.039) rotate(135)"
              :fill="getStrokeColorByIndex(3)"
            />
            <path
              id="路径_2799"
              data-name="路径 2799"
              d="M2.828,10.9l1.73-5.972,6.347-2.1L0,0Z"
              transform="translate(1000 873.593) rotate(-135)"
              :fill="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
              :stroke="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
            />
            <path
              id="路径_2801"
              data-name="路径 2801"
              d="M2.828,10.9l1.73-5.972,6.347-2.1L0,0Z"
              transform="translate(850 957.5) rotate(-45)"
              :fill="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
            />
            <path
              id="路径_2784"
              data-name="路径 2784"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(744.789 924.312) rotate(-45)"
              :fill="flag_arr[4] == '左' ? '#666ee8' : '#c6c6c6'"
            />
            <path
              id="路径_2785"
              data-name="路径 2785"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(817.432 924.312) rotate(-45)"
              :fill="getSixStrokeColor('左')"
            />
            <path
              id="路径_2764"
              data-name="路径 2764"
              d="M-10213,11739.748v-44.4"
              transform="translate(11213 -10869.428)"
              :fill="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
              :stroke="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
              stroke-linecap="round"
              stroke-width="3"
            />
            <path
              id="路径_2800"
              data-name="路径 2800"
              d="M-10213,11735.563v-40.215"
              transform="translate(11213 -10779.097)"
              :fill="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
              :stroke="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
              stroke-linecap="round"
              stroke-width="3"
            />
            <path
              id="路径_2754"
              data-name="路径 2754"
              d="M-10213,11752.068v-56.719"
              transform="translate(11213 -11203.778)"
              fill="none"
              :stroke="getStrokeColorByIndex(4)"
              stroke-linecap="round"
              stroke-width="3"
            />
            <path
              id="路径_2756"
              data-name="路径 2756"
              d="M-10213,11742.781v-47.434"
              transform="translate(11213 -10978.35)"
              :fill="flag_arr[4] == '右' ? '#666ee8' : '#aaa'"
              :stroke="flag_arr[4] == '右' ? '#666ee8' : '#aaa'"
              stroke-linecap="round"
              stroke-width="3"
            />
            <path
              id="路径_2806"
              data-name="路径 2806"
              d="M-10213,11742.781v-47.434"
              transform="translate(11211 -11094.442)"
              fill="none"
              :stroke="getStrokeColorByIndex(5)"
              stroke-linecap="round"
              stroke-width="3"
            />
            <path
              id="路径_2765"
              data-name="路径 2765"
              d="M-10213,11840.046v-144.7"
              transform="translate(-10840.047 -9255.955) rotate(-90)"
              :fill="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
              :stroke="flag_arr[6] == '右' ? '#666ee8' : '#aaa'"
              stroke-linecap="round"
              stroke-width="3"
            />
            <path
              id="路径_2763"
              data-name="路径 2763"
              d="M0,0V99.052"
              transform="translate(863.948 795.5) rotate(-90)"
              fill="none"
              :stroke="getSixStrokeColor('左')"
              stroke-linecap="round"
              stroke-width="3"
            />
            <path
              id="路径_2805"
              data-name="路径 2805"
              d="M0,0V197.672"
              transform="translate(762.328 685) rotate(-90)"
              :fill="flag_arr[4] == '左' ? '#666ee8' : '#aaa'"
              :stroke="flag_arr[4] == '左' ? '#666ee8' : '#aaa'"
              stroke-linecap="round"
              stroke-width="3"
            />
            <g
              id="组_26588"
              data-name="组 26588"
              transform="translate(11203 -11285)"
            >
              <circle
                id="椭圆_68681"
                data-name="椭圆 68681"
                cx="9"
                cy="9"
                r="9"
                transform="translate(-10243 11743)"
                fill="rgba(255,255,255,0.89)"
              />
              <g
                id="组_26580"
                data-name="组 26580"
                transform="translate(-10316.299 11711.189)"
              >
                <path
                  id="路径_2740"
                  data-name="路径 2740"
                  d="M85.274,46.393H79.322a2.214,2.214,0,0,1-2.212-2.211V37.441a2.214,2.214,0,0,1,2.212-2.212h5.952a2.214,2.214,0,0,1,2.212,2.211v6.741a2.215,2.215,0,0,1-2.212,2.211ZM79.322,35.861a1.581,1.581,0,0,0-1.58,1.58v6.741a1.581,1.581,0,0,0,1.58,1.578h5.952a1.581,1.581,0,0,0,1.58-1.578V37.441a1.581,1.581,0,0,0-1.58-1.58Z"
                  transform="translate(0)"
                  fill="#666ee8"
                />
                <path
                  id="路径_2741"
                  data-name="路径 2741"
                  d="M224.095,193.48h-1.333a1.265,1.265,0,0,0-1.262,1.263v.995A1.265,1.265,0,0,0,222.762,197h1.333a1.266,1.266,0,0,0,1.264-1.264v-.995A1.265,1.265,0,0,0,224.095,193.48Zm.632,2.258a.633.633,0,0,1-.632.632h-1.333a.633.633,0,0,1-.631-.632v-.995a.633.633,0,0,1,.631-.632h1.333a.632.632,0,0,1,.632.632Zm-4.808-1.627H218.7a.316.316,0,1,1,0-.632h1.22a.316.316,0,1,1,0,.632Zm0,2.264H218.7a.316.316,0,1,1,0-.632h1.22a.316.316,0,1,1,0,.632Zm5.123,2.265H218.7a.316.316,0,1,1,0-.633h6.344a.316.316,0,1,1,0,.633Zm-2.281,2.264H218.7a.316.316,0,1,1,0-.632h4.062a.316.316,0,1,1,0,.632Z"
                  transform="translate(-139.565 -156.356)"
                  fill="#666ee8"
                />
              </g>
            </g>
            <g
              id="组_26589"
              data-name="组 26589"
              transform="translate(11203 -11249)"
            >
              <path
                id="路径_2802"
                data-name="路径 2802"
                d="M9,0A9,9,0,1,1,0,9,9,9,0,0,1,9,0Z"
                transform="translate(-10243 11815)"
                fill="rgba(255,255,255,0.8)"
              />
              <g
                id="组_26609"
                data-name="组 26609"
                transform="translate(-10238.593 11819.442)"
              >
                <path
                  id="路径_2823"
                  data-name="路径 2823"
                  d="M3.639,9.791H.647A.568.568,0,0,1,.08,9.225V.624A.568.568,0,0,1,.647.057h7.1a.568.568,0,0,1,.567.567V3.6a.327.327,0,1,1-.654,0V.711H.733V9.137H3.639a.327.327,0,1,1,0,.654Z"
                  transform="translate(0)"
                  fill="#666ee8"
                />
                <path
                  id="路径_2824"
                  data-name="路径 2824"
                  d="M457.4,450.412l-1.106-1.106a.541.541,0,0,0-.763,0l-.571.571-.025.022-.022.025-2.66,2.661a.536.536,0,0,0-.158.382v1.106a.541.541,0,0,0,.54.54h1.106a.537.537,0,0,0,.382-.158l2.023-2.023a.3.3,0,1,0-.424-.424l-2.006,2.006h-1.02v-1.021l2.454-2.454,1.23,1.23a.3.3,0,0,0,.428,0l.594-.594a.54.54,0,0,0,0-.764Zm-.807.722-1.021-1.021.34-.34,1.021,1.021Z"
                  transform="translate(-447.717 -444.822)"
                  fill="#666ee8"
                />
                <path
                  id="路径_2825"
                  data-name="路径 2825"
                  d="M186.557,219.672m.3,0h4.091a.265.265,0,0,1,.3.3h0a.265.265,0,0,1-.3.3h-4.091a.265.265,0,0,1-.3-.3h0A.265.265,0,0,1,186.857,219.672Z"
                  transform="translate(-184.704 -217.527)"
                  fill="#666ee8"
                />
                <path
                  id="路径_2826"
                  data-name="路径 2826"
                  d="M186.557,407.96m.3,0h4.091a.265.265,0,0,1,.3.3h0a.265.265,0,0,1-.3.3h-4.091a.265.265,0,0,1-.3-.3h0A.265.265,0,0,1,186.857,407.96Z"
                  transform="translate(-184.704 -404.025)"
                  fill="#666ee8"
                />
                <path
                  id="路径_2827"
                  data-name="路径 2827"
                  d="M186.557,596.249m.3,0H189.6a.265.265,0,0,1,.3.3h0a.265.265,0,0,1-.3.3h-2.741a.265.265,0,0,1-.3-.3h0A.265.265,0,0,1,186.857,596.249Z"
                  transform="translate(-184.704 -590.524)"
                  fill="#666ee8"
                />
              </g>
            </g>
            <path
              id="路径_2766"
              data-name="路径 2766"
              d="M-10213,11801.078V11695.35"
              transform="translate(11038.143 -10873.577)"
              fill="none"
              :stroke="getSixStrokeColor('左')"
              stroke-linecap="round"
              stroke-width="3"
            />
            <g
              id="组_26592"
              data-name="组 26592"
              transform="translate(464.001 56.929)"
            >
              <path
                id="路径_2786"
                data-name="路径 2786"
                d="M102.19,100.86H96.952V96.1h9.757a.476.476,0,0,0,.476-.476v-3.27a1.124,1.124,0,0,0-1.121-1.124h-.987V90.5a.476.476,0,1,0-.953,0v.724H99.06V90.5a.476.476,0,1,0-.953,0v.724H96.793a.778.778,0,0,0-.794.781v9.03a.778.778,0,0,0,.794.775h5.4a.476.476,0,1,0,0-.952Zm-5.239-8.68h1.156v.73a.476.476,0,0,0,.952,0v-.73h5.08v.73a.476.476,0,0,0,.952,0v-.73h.972a.168.168,0,0,1,.168.168v2.791H96.952Z"
                fill="#fff"
              />
              <path
                id="路径_2787"
                data-name="路径 2787"
                d="M566.844,527.573a2.788,2.788,0,1,0,2.785,2.788,2.788,2.788,0,0,0-2.785-2.788Zm1.238,3.416h-1.238a.317.317,0,0,1-.317-.317v-1.54a.317.317,0,1,1,.635,0v1.238h.93a.317.317,0,1,1,0,.635Z"
                transform="translate(-461.088 -431.034)"
                fill="#fff"
              />
            </g>
            <g id="组_26597" data-name="组 26597" transform="translate(0 -25)">
              <g
                transform="matrix(1, 0, 0, 1, 534, 149)"
                filter="url(#椭圆_68677)"
              >
                <circle
                  id="椭圆_68677-2"
                  data-name="椭圆 68677"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(122 200)"
                  fill="rgba(224,237,255,0.76)"
                />
              </g>
              <circle
                id="椭圆_68676"
                data-name="椭圆 68676"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 356)"
                fill="#2b35d1"
              />
              <circle
                id="椭圆_68695"
                data-name="椭圆 68695"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 356)"
                :fill="getCircleColorByIndex(2)"
              />
            </g>
            <g id="组_26596" data-name="组 26596" transform="translate(0 -25)">
              <g
                transform="matrix(1, 0, 0, 1, 534, 149)"
                filter="url(#椭圆_68679)"
              >
                <circle
                  id="椭圆_68679-3"
                  data-name="椭圆 68679"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(122 330)"
                  fill="rgba(224,237,255,0.76)"
                />
              </g>
              <circle
                id="椭圆_68680"
                data-name="椭圆 68680"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                fill="#2b35d1"
              />
              <circle
                id="椭圆_68696"
                data-name="椭圆 68696"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                :fill="getCircleColorByIndex(3)"
              />
            </g>
            <g id="组_26607" data-name="组 26607" transform="translate(0 83)">
              <g
                transform="matrix(1, 0, 0, 1, 534, 41)"
                filter="url(#椭圆_68679-2)"
              >
                <circle
                  id="椭圆_68679-4"
                  data-name="椭圆 68679"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(122 438)"
                  fill="rgba(224,237,255,0.76)"
                />
              </g>
              <circle
                id="椭圆_68680-2"
                data-name="椭圆 68680"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                fill="#2b35d1"
              />
              <circle
                id="椭圆_68696-2"
                data-name="椭圆 68696"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                :fill="getCircleColorByIndex(4)"
              />
            </g>
            <g id="组_26595" data-name="组 26595" transform="translate(0 85)">
              <g
                transform="matrix(1, 0, 0, 1, 534, 39)"
                filter="url(#椭圆_68685)"
              >
                <circle
                  id="椭圆_68685-2"
                  data-name="椭圆 68685"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(122 548)"
                  fill="rgba(224,237,255,0.76)"
                />
              </g>
              <circle
                id="椭圆_68686"
                data-name="椭圆 68686"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 594)"
                fill="#2b35d1"
              />
              <circle
                id="椭圆_68698"
                data-name="椭圆 68698"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 594)"
                :fill="getCircleColorByIndex(5)"
              />
            </g>
            <g id="组_26594" data-name="组 26594" transform="translate(0 75)">
              <g
                transform="matrix(1, 0, 0, 1, 534, 49)"
                filter="url(#椭圆_68688)"
              >
                <circle
                  id="椭圆_68688-2"
                  data-name="椭圆 68688"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(122 659)"
                  fill="rgba(224,237,255,0.76)"
                />
              </g>
              <circle
                id="椭圆_68689"
                data-name="椭圆 68689"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 715)"
                fill="#2b35d1"
              />
              <circle
                id="椭圆_68699"
                data-name="椭圆 68699"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 715)"
                :fill="getCircleColorByIndex(6)"
              />
            </g>
            <path
              id="路径_2788"
              data-name="路径 2788"
              d="M230.7,277.341c-3.662-3.759-8.592-7.958-8.592-7.958l2.2-1.9s4.54,3.271,5.126,3.759c1.172-1.416,8.592-8.3,12.84-10.2a7.464,7.464,0,0,1,.537.635A45.359,45.359,0,0,0,230.7,277.341Z"
              transform="translate(436.543 692.812)"
              fill="#fff"
            />
          </g>
        </svg>
      </div>
      <!-- 左侧 -->
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="273"
          height="882"
          viewBox="0 0 273 882"
        >
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="0.012"
              y1="0.034"
              x2="0.977"
              y2="0.98"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#fff" />
              <stop offset="1" stop-color="#eef5ff" />
            </linearGradient>
            <filter
              id="矩形_8764"
              x="8"
              y="137"
              width="240"
              height="152"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="1" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feFlood flood-opacity="0.102" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="矩形_8769"
              x="8"
              y="305"
              width="240"
              height="82"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="1" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1" result="blur-2" />
              <feFlood flood-opacity="0.102" />
              <feComposite operator="in" in2="blur-2" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="矩形_8786"
              x="8"
              y="519"
              width="240"
              height="87"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="1" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="1" result="blur-3" />
              <feFlood flood-opacity="0.102" />
              <feComposite operator="in" in2="blur-3" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g
            id="组_28082"
            data-name="组 28082"
            transform="translate(-1130 -124)"
          >
            <path
              id="矩形_8846"
              data-name="矩形 8846"
              d="M0,0H273a0,0,0,0,1,0,0V870a12,12,0,0,1-12,12H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
              transform="translate(1130 124)"
              :fill="getThemeColor()"
            />
            <g id="组_26748" data-name="组 26748">
              <g
                transform="matrix(1, 0, 0, 1, 1130, 124)"
                filter="url(#矩形_8764)"
              >
                <g
                  v-show="isShowDescByIndex(2)"
                  id="矩形_8764-2"
                  data-name="矩形 8764"
                  transform="translate(11 139)"
                  stroke="#c4dcff"
                  stroke-width="1"
                  stroke-dasharray="6"
                  fill="none"
                >
                  <rect width="210" height="146" rx="12" stroke="none" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="222"
                    height="145"
                    rx="11.5"
                    fill="none"
                  />
                </g>
              </g>
              <g
                transform="matrix(1, 0, 0, 1, 1130, 124)"
                filter="url(#矩形_8769)"
              >
                <g
                  v-show="isShowDescByIndex(3)"
                  id="矩形_8769-2"
                  data-name="矩形 8769"
                  transform="translate(11 307)"
                  stroke="#c4dcff"
                  stroke-width="1"
                  stroke-dasharray="6"
                  fill="none"
                >
                  <rect width="210" height="76" rx="12" stroke="none" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="222"
                    height="75"
                    rx="11.5"
                    fill="none"
                  />
                </g>
              </g>
              <g
                transform="matrix(1, 0, 0, 1, 1130, 124)"
                filter="url(#矩形_8786)"
              >
                <g
                  v-show="isShowDescByIndex(5)"
                  id="矩形_8786-2"
                  data-name="矩形 8786"
                  transform="translate(11 521)"
                  stroke="#c4dcff"
                  stroke-width="1"
                  stroke-dasharray="6"
                  fill="none"
                >
                  <rect width="210" height="81" rx="12" stroke="none" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="222"
                    height="80"
                    rx="11.5"
                    fill="none"
                  />
                </g>
              </g>
              <text
                id="用户联系人"
                v-show="isShowDescByIndex(2)"
                transform="translate(1179 289)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">用户联系人</tspan>
              </text>
              <text
                id="参与量"
                v-show="isShowDescByIndex(3)"
                transform="translate(1179 457)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">参与量</tspan>
              </text>
              <text
                id="用户联系人-2"
                v-show="isShowDescByIndex(5)"
                data-name="用户联系人"
                transform="translate(1179 671)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">用户联系人</tspan>
              </text>
              <text
                id="王xx"
                v-show="isShowDescByIndex(2)"
                transform="translate(1261 289)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">{{ decsInfoArr[0].contracts || '-' }}</tspan>
              </text>
              <text
                id="_303kW"
                v-show="isShowDescByIndex(3)"
                data-name="303kW"
                transform="translate(1261 457)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">
                  {{ decsInfoArr[1].actualDemand || '-' }}
                </tspan>
              </text>
              <text
                id="赵xx"
                v-show="isShowDescByIndex(5)"
                transform="translate(1261 671)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">{{ decsInfoArr[2].contracts || '-' }}</tspan>
              </text>
              <text
                id="_132xxxxxxxx"
                v-show="isShowDescByIndex(2)"
                data-name="132xxxxxxxx"
                transform="translate(1261 325)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">{{ decsInfoArr[0].phone || '-' }}</tspan>
              </text>
              <text
                id="关停部分设备"
                v-show="isShowDescByIndex(3)"
                transform="translate(1261 493)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">
                  {{ decsInfoArr[1].adjustMeasures || '-' }}
                </tspan>
              </text>
              <text
                id="_177xxxxxxxx"
                v-show="isShowDescByIndex(5)"
                data-name="177xxxxxxxx"
                transform="translate(1261 707)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">{{ decsInfoArr[2].phone || '-' }}</tspan>
              </text>
              <text
                id="削峰"
                v-show="isShowDescByIndex(2)"
                transform="translate(1261 364)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">
                  {{ decsInfoArr[0].responseType || '-' }}
                </tspan>
              </text>
              <text
                id="_12:00_15:00"
                v-show="isShowDescByIndex(2)"
                data-name="12:00 ~15:00"
                transform="translate(1261 395)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">{{ decsInfoArr[0].start_end_time }}</tspan>
              </text>
              <text
                id="用户手机号"
                v-show="isShowDescByIndex(2)"
                transform="translate(1179 325)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">用户手机号</tspan>
              </text>
              <text
                id="措施"
                v-show="isShowDescByIndex(3)"
                transform="translate(1179 493)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">措施</tspan>
              </text>
              <text
                id="用户手机号-2"
                v-show="isShowDescByIndex(5)"
                data-name="用户手机号"
                transform="translate(1179 707)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">用户手机号</tspan>
              </text>
              <text
                id="响应类型"
                v-show="isShowDescByIndex(2)"
                transform="translate(1179 364)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">响应类型</tspan>
              </text>
              <path
                id="路径_2726"
                v-show="isShowDescByIndex(2)"
                data-name="路径 2726"
                d="M-10476,10374h170.8"
                transform="translate(11639 -10073)"
                fill="none"
                stroke="#c4c4c4"
                stroke-width="1"
                stroke-dasharray="3"
              />
              <path
                id="路径_2744"
                v-show="isShowDescByIndex(3)"
                data-name="路径 2744"
                d="M-10476,10374h170.8"
                transform="translate(11639 -9905)"
                fill="none"
                stroke="#c4c4c4"
                stroke-width="1"
                stroke-dasharray="3"
              />
              <path
                id="路径_2808"
                v-show="isShowDescByIndex(5)"
                data-name="路径 2808"
                d="M-10476,10374h170.8"
                transform="translate(11639 -9691)"
                fill="none"
                stroke="#c4c4c4"
                stroke-width="1"
                stroke-dasharray="3"
              />
              <path
                id="路径_2725"
                v-show="isShowDescByIndex(2)"
                data-name="路径 2725"
                d="M-10476,10374h170.795"
                transform="translate(11639.001 -10037)"
                fill="none"
                stroke="#c4c4c4"
                stroke-width="1"
                stroke-dasharray="3"
              />
              <path
                id="路径_2804"
                v-show="isShowDescByIndex(2)"
                data-name="路径 2804"
                d="M-10476,10374h170.795"
                transform="translate(11638.999 -10002.823)"
                fill="none"
                stroke="#c4c4c4"
                stroke-width="1"
                stroke-dasharray="3"
              />
              <path
                id="联合_1029"
                v-show="isShowDescByIndex(2)"
                data-name="联合 1029"
                d="M10692.054-10280.461a3.33,3.33,0,0,1,3.329-3.329,3.33,3.33,0,0,1,3.33,3.329,3.329,3.329,0,0,1-3.33,3.329A3.329,3.329,0,0,1,10692.054-10280.461Zm.741,0a2.589,2.589,0,0,0,2.588,2.591,2.591,2.591,0,0,0,2.589-2.591,2.59,2.59,0,0,0-2.589-2.589A2.588,2.588,0,0,0,10692.795-10280.461Zm-3.332,3.329a1.109,1.109,0,0,1-1.106-1.044l0-.064v-8.139a1.111,1.111,0,0,1,1.045-1.108h7.094a1.108,1.108,0,0,1,1.108,1.044l0,.064v2.264h-.741v-2.264a.372.372,0,0,0-.327-.368l-.043,0h-7.029a.368.368,0,0,0-.365.327l0,.043v8.139a.37.37,0,0,0,.325.367l.043,0h2.961v.738Zm5.553-1.807,0-.043v-.368h-.738a.373.373,0,0,1-.371-.349.372.372,0,0,1,.325-.39l.046,0h.738v-.37h-.738a.373.373,0,0,1-.371-.347.371.371,0,0,1,.325-.389l.046,0h.585l-.478-.479a.371.371,0,0,1-.032-.488.371.371,0,0,1,.483-.091l.037.023.035.032.478.479.479-.479a.372.372,0,0,1,.507-.016.37.37,0,0,1,.046.5l-.029.034-.479.479h.586a.373.373,0,0,1,.37.349.369.369,0,0,1-.327.387l-.043,0h-.738v.37h.738a.373.373,0,0,1,.37.35.374.374,0,0,1-.327.39l-.043,0h-.738v.368a.371.371,0,0,1-.35.37h-.021A.37.37,0,0,1,10695.016-10278.938Zm-5.183-2.261v-.741h1.479v.741Zm0-1.851v-.74h2.591v.74Zm0-1.85v-.738h5.918v.738Z"
                transform="translate(-9524.375 10644.309)"
                :fill="fontColor"
              />
              <g
                id="组_26583"
                v-show="isShowDescByIndex(2)"
                data-name="组 26583"
                transform="translate(1023.801 213.272)"
              >
                <path
                  id="路径_2770"
                  data-name="路径 2770"
                  d="M148.2,63.9H141.19a1.991,1.991,0,0,0-1.99,1.987v9.25a1.991,1.991,0,0,0,1.99,1.987H148.2a1.991,1.991,0,0,0,1.99-1.987v-9.25A1.991,1.991,0,0,0,148.2,63.9Zm1.194,2.641v8.593a1.2,1.2,0,0,1-1.194,1.193H141.19A1.2,1.2,0,0,1,140,75.134V74.086h.657v-.794H140V72.5h.657V71.7H140v-.794h.657v-.794H140V69.32h.657v-.8H140v-.794h.657v-.794H140V65.887a1.2,1.2,0,0,1,1.194-1.193h2.991s0,0,0,0,0-.015,0,0,0-.012.006,0,.007-.012.012,0,.009-.012.015,0,.012-.01.018,0,.015-.012.024,0,0,0,.007,0,.009,0,.013,0,.025-.012.04,0,.016-.006.025,0,.03-.009.046,0,.018,0,.027,0,.038-.006.059,0,.013,0,.021,0a.4.4,0,0,0,.084,0,.411.411,0,0,0,.074,0c.009,0,.016,0,.024,0s.031.006.046,0,.018,0,.027,0,.025.007.038,0,.018.006.027,0,.009,0,.015,0h2.511c.006.006.013-.006.021,0s.018-.006.028,0,.025-.006.037,0,.019,0,.028,0,.03,0,.046,0,.016,0,.025,0a.428.428,0,0,0,.075,0,.373.373,0,0,0,.081,0s.01,0,.015,0c.022-.006.043.009.062,0s.016,0,.024,0,.031.01.046,0,.016.007.024,0,.027.013.038,0,.006,0,.009,0,.009.006.013,0,.016.012.024,0,.012.012.018,0,.012.012.016,0,.009.013.012,0,.006.012.007,0,0,.015,0,0,0,.007,0,0h.2a1.2,1.2,0,0,1,1.194,1.193v.654Z"
                  transform="translate(0)"
                  :fill="fontColor"
                />
                <path
                  id="路径_2771"
                  data-name="路径 2771"
                  d="M328.837,272.745a2.26,2.26,0,1,0-2.749,0,3.06,3.06,0,0,0-1.688,2.73v.4h6.121v-.4A3.052,3.052,0,0,0,328.837,272.745ZM326,270.957a1.463,1.463,0,1,1,1.463,1.462A1.464,1.464,0,0,1,326,270.957Zm-.766,4.121a2.265,2.265,0,0,1,4.459,0Z"
                  transform="translate(-182.466 -201.776)"
                  :fill="fontColor"
                />
              </g>
              <path
                id="路径_2772"
                v-show="isShowDescByIndex(2)"
                data-name="路径 2772"
                d="M129.776.977a.8.8,0,0,0-.8.8V12.433a.8.8,0,0,0,.8.8h7.1a.8.8,0,0,0,.8-.8V1.776a.8.8,0,0,0-.8-.8Zm0-.977h7.1a1.776,1.776,0,0,1,1.776,1.776V12.433a1.776,1.776,0,0,1-1.776,1.776h-7.1A1.776,1.776,0,0,1,128,12.433V1.776A1.776,1.776,0,0,1,129.776,0Zm2.309,10.657h2.487a.533.533,0,1,1,0,1.066h-2.487a.533.533,0,1,1,0-1.066Zm0,0"
                transform="translate(1035.979 312.51)"
                :fill="fontColor"
              />
              <path
                id="联合_1030"
                v-show="isShowDescByIndex(3)"
                data-name="联合 1030"
                d="M3.015,11.2l.649-.784A5,5,0,1,0,1,6H0a6,6,0,1,1,3.015,5.2ZM5.9,7.046,3.449,6.714,7.89,2.369,6.511,5.355l2.04.417L4.275,10.048Z"
                transform="translate(1163 445.466)"
                :fill="fontColor"
              />
              <path
                id="路径_2775"
                v-show="isShowDescByIndex(3)"
                data-name="路径 2775"
                d="M76.683,54.495a2.016,2.016,0,0,1-2.016-2.016v-7.8a2.016,2.016,0,0,1,2.016-2.016h4.839a2.016,2.016,0,0,1,2.016,2.016v3.091h1.21a.941.941,0,0,1,.94.889v3.815a2.016,2.016,0,0,1-2.016,2.016Zm6.048-9.812a1.21,1.21,0,0,0-1.153-1.208h-4.9a1.21,1.21,0,0,0-1.21,1.21v7.8a1.21,1.21,0,0,0,1.21,1.21h6.048Zm2.016,3.9h-1.21v5.108h.134a1.21,1.21,0,0,0,1.21-1.21V48.715a.134.134,0,0,0-.134-.134Zm-4.973,0a.4.4,0,0,1,0,.806H76.818a.4.4,0,0,1,0-.806Zm1.613-2.957a.4.4,0,1,1,0,.806h-4.57a.4.4,0,0,1,0-.806Z"
                transform="translate(1089.312 439.203)"
                :fill="fontColor"
              />
              <text
                id="起止时间"
                v-show="isShowDescByIndex(2)"
                transform="translate(1180 395)"
                :fill="fontColor"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">起止时间</tspan>
              </text>
              <path
                id="路径_2686"
                v-show="isShowDescByIndex(2)"
                data-name="路径 2686"
                d="M96.481,94.417a.45.45,0,1,1-.772-.463,5.1,5.1,0,1,0-1.756,1.756.45.45,0,0,1,.463.772,6,6,0,1,1,2.065-2.065Zm-7.716-1.152,2.118-2.118V88.633a.45.45,0,1,1,.9,0v2.7a.45.45,0,0,1-.132.318L89.4,93.9a.45.45,0,1,1-.636-.636Z"
                transform="translate(1078.667 297.667)"
                fill="#808c9d"
              />
              <g
                id="组_26606"
                v-show="isShowDescByIndex(5)"
                data-name="组 26606"
                transform="translate(1024.801 596.272)"
              >
                <path
                  id="路径_2770-2"
                  data-name="路径 2770"
                  d="M148.2,63.9H141.19a1.991,1.991,0,0,0-1.99,1.987v9.25a1.991,1.991,0,0,0,1.99,1.987H148.2a1.991,1.991,0,0,0,1.99-1.987v-9.25A1.991,1.991,0,0,0,148.2,63.9Zm1.194,2.641v8.593a1.2,1.2,0,0,1-1.194,1.193H141.19A1.2,1.2,0,0,1,140,75.134V74.086h.657v-.794H140V72.5h.657V71.7H140v-.794h.657v-.794H140V69.32h.657v-.8H140v-.794h.657v-.794H140V65.887a1.2,1.2,0,0,1,1.194-1.193h2.991s0,0,0,0,0-.015,0,0,0-.012.006,0,.007-.012.012,0,.009-.012.015,0,.012-.01.018,0,.015-.012.024,0,0,0,.007,0,.009,0,.013,0,.025-.012.04,0,.016-.006.025,0,.03-.009.046,0,.018,0,.027,0,.038-.006.059,0,.013,0,.021,0a.4.4,0,0,0,.084,0,.411.411,0,0,0,.074,0c.009,0,.016,0,.024,0s.031.006.046,0,.018,0,.027,0,.025.007.038,0,.018.006.027,0,.009,0,.015,0h2.511c.006.006.013-.006.021,0s.018-.006.028,0,.025-.006.037,0,.019,0,.028,0,.03,0,.046,0,.016,0,.025,0a.428.428,0,0,0,.075,0,.373.373,0,0,0,.081,0s.01,0,.015,0c.022-.006.043.009.062,0s.016,0,.024,0,.031.01.046,0,.016.007.024,0,.027.013.038,0,.006,0,.009,0,.009.006.013,0,.016.012.024,0,.012.012.018,0,.012.012.016,0,.009.013.012,0,.006.012.007,0,0,.015,0,0,0,.007,0,0h.2a1.2,1.2,0,0,1,1.194,1.193v.654Z"
                  transform="translate(0)"
                  :fill="fontColor"
                />
                <path
                  id="路径_2771-2"
                  data-name="路径 2771"
                  d="M328.837,272.745a2.26,2.26,0,1,0-2.749,0,3.06,3.06,0,0,0-1.688,2.73v.4h6.121v-.4A3.052,3.052,0,0,0,328.837,272.745ZM326,270.957a1.463,1.463,0,1,1,1.463,1.462A1.464,1.464,0,0,1,326,270.957Zm-.766,4.121a2.265,2.265,0,0,1,4.459,0Z"
                  transform="translate(-182.466 -201.776)"
                  :fill="fontColor"
                />
              </g>
              <path
                id="路径_2815"
                v-show="isShowDescByIndex(5)"
                data-name="路径 2815"
                d="M129.776.977a.8.8,0,0,0-.8.8V12.433a.8.8,0,0,0,.8.8h7.1a.8.8,0,0,0,.8-.8V1.776a.8.8,0,0,0-.8-.8Zm0-.977h7.1a1.776,1.776,0,0,1,1.776,1.776V12.433a1.776,1.776,0,0,1-1.776,1.776h-7.1A1.776,1.776,0,0,1,128,12.433V1.776A1.776,1.776,0,0,1,129.776,0Zm2.309,10.657h2.487a.533.533,0,1,1,0,1.066h-2.487a.533.533,0,1,1,0-1.066Zm0,0"
                transform="translate(1036.979 695.51)"
                :fill="fontColor"
              />
            </g>
            <rect
              id="矩形_8787"
              data-name="矩形 8787"
              width="24"
              height="14"
              rx="2"
              transform="translate(1276 156)"
              fill="#2b35d1"
            />
            <text
              id="用户邀约"
              transform="translate(1200 169)"
              :fill="fontColor"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">用户邀约</tspan>
            </text>
            <text
              id="事件执行"
              transform="translate(1307 169)"
              :fill="fontColor"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">事件执行</tspan>
            </text>
            <rect
              id="矩形_8788"
              data-name="矩形 8788"
              width="24"
              height="14"
              rx="2"
              transform="translate(1166 156)"
              fill="#666ee8"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeLineData } from './progress';
// 日期文字居左的距离
const date_left = 533;
// 日期文字居顶的距离
const date_top = [209, 343, 473, 581, 691, 802, 968];
// 渐变色的比例
const date_line_top = [50, 151, 250, 329, 411, 495, 620];

const decsInfoArr = [
  {
    // 用户联系人
    contracts: '赵工',
    // 用户手机号
    phone: '15240325167',
    // 响应类型
    responseType: '削峰',
    // 起止时间
    start_end_time: '09:00~16:00',
  },
  {
    // 参与量
    actualDemand: '3390kW',
    // 措施
    adjustMeasures: '关停部分设备',
  },
  {
    // 用户联系人
    contracts: '赵工',
    // 用户手机号
    phone: '15240325167',
  },
];
export default {
  props: {
    params: {
      type: Object,
      default() {
        return {
          consId: '100000000186',
          eventId: 100000000123,
        };
      },
    },
  },
  data() {
    return {
      decsInfoArr,
      date_left,
      date_top,
      date_line_top,
      str_date: '2022-08',
      flag_arr: new Array(7).fill('右'),
      date_arr: [
        '2022-08-09 12:00',
        '2022-08-09 12:33',
        '2022-08-09 13:18',
        '2022-08-09 15:34',
        '2022-08-10 08:32',
        '2022-08-10 09:00',
        '2022-08-10 16:00',
      ],
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.handleScale();
  },
  methods: {
    async getData() {
      const { date_arr, flag_arr, value_arr, time_str } = await getTimeLineData(
        this.params
      );
      this.str_date = time_str;
      this.date_arr = date_arr;
      this.flag_arr = flag_arr;
      this.decsInfoArr = value_arr;
      console.log(date_arr);
      console.log(flag_arr);
    },
    handleScale() {
      const progressDom = this.$refs.progress;
      const containerDom = this.$refs.container;
      const pHeight = progressDom.getBoundingClientRect().height;
      const cHeight = containerDom.getBoundingClientRect().height;
      const scaleValue = pHeight / cHeight;
      // containerDom.style.transform = `scale(${scaleValue})`;
      containerDom.style.zoom = window.screen.width / 1980;
    },
    getCircleColorByIndex(index) {
      let activeColor = index > 5 ? '#2b35d1' : '#666ee8';
      return this.date_arr[index - 1] ? activeColor : '#ccc';
    },
    getRectColorByIndex(index) {
      let activeColor = index > 5 ? '#2b35d1' : '#666ee8';
      return this.date_arr[index - 1] ? activeColor : '#aaa';
    },
    getStrokeColorByIndex(index) {
      return this.date_arr[index - 1] ? '#666ee8' : '#aaa';
    },
    isShowByIndexs(activeIndexs = [], emptyIndexs = []) {
      let activeFlag = activeIndexs.every(index => this.date_arr[index - 1]);
      let emptyFlag = emptyIndexs.every(index => !this.date_arr[index - 1]);
      let finallyFlag = activeFlag && emptyFlag;
      return finallyFlag;
    },
    getStrokeColorByIndexs(activeIndexs = [], emptyIndexs = []) {
      let activeFlag = activeIndexs.every(index => this.date_arr[index - 1]);
      let emptyFlag = emptyIndexs.every(index => !this.date_arr[index - 1]);
      let finallyFlag = activeFlag && emptyFlag;
      return finallyFlag ? '#2b35d1' : '#c6c6c6';
    },
    getSixStrokeColor(flag) {
      if (!this.date_arr[5]) return '#c6c6c6';
      return flag == this.flag_arr[5] ? '#2b35d1' : '#c6c6c6';
    },
    getSixRectColor(flag) {
      if (!this.date_arr[5]) return '#c6c6c6';
      return flag == this.flag_arr[5] ? '#2b35d1' : '#c6c6c6';
    },
    getSixTextColor(flag) {
      if (!this.date_arr[5]) return '#c6c6c6';
      return flag == this.flag_arr[5] ? '#2b35d1' : '#c6c6c6';
    },
    getJudgeBgColorByColor(index, type = 'fill') {
      let activeFillColor = index > 5 ? '#cbe0ff' : '#ccefff';
      const fillColor = this.date_arr[index - 1] ? activeFillColor : '#ccc';
      let activeStrokeColor = index > 5 ? '#2b35d1' : '#666ee8';
      const strokeColor = this.date_arr[index - 1] ? activeStrokeColor : '#ccc';
      return type == 'fill' ? fillColor : strokeColor;
    },
    getJudgeTextColorByIndex(index) {
      let activeFillColor = index > 5 ? '#2b35d1' : '#666ee8';
      const fillColor = this.date_arr[index - 1] ? activeFillColor : '#fff';
      return fillColor;
    },
    isShowDescByIndex(index) {
      return this.date_arr[index - 1];
    },
    getThemeColor() {
      if (sessionStorage.getItem('themeColor') == 'blue') {
        return '#fff';
      } else {
        return '#09153B';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.progress-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress-container {
  display: flex;
  @include background_color('emphasizeColor');
  padding-left: 40px;
}
</style>
