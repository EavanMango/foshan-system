<template>
  <div class="progress-wrapper" ref="progress">
    <div class="progress-container" ref="container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="860.517"
        height="789"
        viewBox="0 0 860.517 789"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#666ee8" />
            <stop
              v-for="(date, index) in date_arr"
              :key="index"
              :offset="(date_line_top[index] || 0) / 866"
              stop-color="#666ee8"
            />
            <stop
              :offset="(date_line_top[date_arr.length - 1] || 0) / 866 + 0.001"
              stop-color="#666ee8"
            />
            <stop
              :offset="(date_line_top[date_arr.length - 1] || 0) / 866 + 0.002"
              stop-color="#dcdeff"
            />
            <stop offset="1" stop-color="#dcdeff" />
          </linearGradient>
          <filter
            id="矩形_8762"
            x="364.017"
            y="58.5"
            width="159"
            height="41"
            filterUnits="userSpaceOnUse"
          >
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feFlood flood-color="#666ee8" flood-opacity="0.349" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="矩形_8763"
            x="364.017"
            y="152.5"
            width="159"
            height="41"
            filterUnits="userSpaceOnUse"
          >
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1.5" result="blur-2" />
            <feFlood flood-color="#666ee8" flood-opacity="0.349" />
            <feComposite operator="in" in2="blur-2" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="矩形_8799"
            x="364.017"
            y="243.5"
            width="159"
            height="41"
            filterUnits="userSpaceOnUse"
          >
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1.5" result="blur-3" />
            <feFlood flood-color="#666ee8" flood-opacity="0.349" />
            <feComposite operator="in" in2="blur-3" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="矩形_8810"
            x="364.017"
            y="335.5"
            width="159"
            height="41"
            filterUnits="userSpaceOnUse"
          >
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1.5" result="blur-4" />
            <feFlood flood-color="#666ee8" flood-opacity="0.349" />
            <feComposite operator="in" in2="blur-4" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="矩形_8775"
            x="364.017"
            y="722.5"
            width="159"
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
            id="矩形_8811"
            x="364.017"
            y="430.5"
            width="159"
            height="41"
            filterUnits="userSpaceOnUse"
          >
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1.5" result="blur-6" />
            <feFlood flood-color="#666ee8" flood-opacity="0.349" />
            <feComposite operator="in" in2="blur-6" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="矩形_8812"
            x="364.017"
            y="530.5"
            width="159"
            height="41"
            filterUnits="userSpaceOnUse"
          >
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1.5" result="blur-7" />
            <feFlood flood-color="#666ee8" flood-opacity="0.349" />
            <feComposite operator="in" in2="blur-7" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="矩形_8813"
            x="364.017"
            y="625.5"
            width="159"
            height="41"
            filterUnits="userSpaceOnUse"
          >
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1.5" result="blur-8" />
            <feFlood flood-color="#666ee8" flood-opacity="0.349" />
            <feComposite operator="in" in2="blur-8" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="椭圆_68692"
            x="104.517"
            y="723"
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
            id="椭圆_68679"
            x="103.517"
            y="626"
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
            id="椭圆_68679-2"
            x="103.783"
            y="529.844"
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
            id="椭圆_68675"
            x="105.517"
            y="59"
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
            id="椭圆_68677"
            x="105.517"
            y="153"
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
            id="椭圆_68679-3"
            x="105.517"
            y="244"
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
            id="椭圆_68679-4"
            x="104.517"
            y="333"
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
          <filter
            id="椭圆_68679-5"
            x="103.284"
            y="432.789"
            width="44"
            height="44"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="2" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="blur-16" />
            <feFlood flood-opacity="0.161" />
            <feComposite operator="in" in2="blur-16" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="联合_1027"
            x="0"
            y="22"
            width="122.569"
            height="32"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="1" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1" result="blur-17" />
            <feFlood flood-opacity="0.102" />
            <feComposite operator="in" in2="blur-17" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g
          id="组_26759"
          data-name="组 26759"
          transform="translate(-542.483 -221)"
        >
          <g id="bb">
            <path
              id="矩形_8770"
              data-name="矩形 8770"
              d="M0,0H735a0,0,0,0,1,0,0V777a12,12,0,0,1-12,12H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
              transform="translate(668 221)"
              :fill="getThemeColor()"
            />
            <g
              id="矩形_8821"
              data-name="矩形 8821"
              transform="translate(884 542)"
              :fill="rectBg()"
              :stroke="getStrokeColorByIndexs(4)"
              stroke-width="2"
              stroke-dasharray="6"
            >
              <rect width="205" height="362" rx="12" stroke="none" />
              <rect x="1" y="1" width="203" height="360" rx="11" fill="none" />
            </g>
            <path
              id="路径_2790"
              data-name="路径 2790"
              d="M-10475,11452h7"
              transform="translate(11157 -11018)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2791"
              data-name="路径 2791"
              d="M-10475,11452h35.587"
              transform="translate(11398.067 -10962)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2847"
              data-name="路径 2847"
              d="M-10475,11452h35.587"
              transform="translate(11398.067 -10870)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2850"
              data-name="路径 2850"
              d="M-10475,11452h35.587"
              transform="translate(11386.067 -10781.5)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2797"
              data-name="路径 2797"
              d="M-10475,11452h219.266"
              transform="translate(11160.213 -10585)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2862"
              data-name="路径 2862"
              d="M-10475,11452h232.234"
              transform="translate(11150 -10681.078)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2863"
              data-name="路径 2863"
              d="M-10475,11452h230.219"
              transform="translate(11149.784 -10778.5)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2864"
              data-name="路径 2864"
              d="M-10475,11452h221.734"
              transform="translate(11160.5 -10967)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2867"
              data-name="路径 2867"
              d="M-10475,11452h221.734"
              transform="translate(11158.267 -10878.211)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2865"
              data-name="路径 2865"
              d="M-10475,11452h221.734"
              transform="translate(11163.134 -11058)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <path
              id="路径_2866"
              data-name="路径 2866"
              d="M-10475,11452h221.734"
              transform="translate(11158.267 -11152)"
              fill="none"
              stroke="#d6d6d6"
              stroke-width="1"
              stroke-dasharray="2"
            />
            <g
              transform="matrix(1, 0, 0, 1, 542.48, 221)"
              filter="url(#矩形_8762)"
            >
              <rect
                id="矩形_8762-2"
                data-name="矩形 8762"
                width="150"
                height="32"
                rx="10"
                transform="translate(368.52 63)"
                :fill="getRectColorByIndex(1)"
              />
            </g>
            <g
              transform="matrix(1, 0, 0, 1, 542.48, 221)"
              filter="url(#矩形_8763)"
            >
              <rect
                id="矩形_8763-2"
                data-name="矩形 8763"
                width="150"
                height="32"
                rx="10"
                transform="translate(368.52 157)"
                :fill="getRectColorByIndex(2)"
              />
            </g>
            <g
              transform="matrix(1, 0, 0, 1, 542.48, 221)"
              filter="url(#矩形_8799)"
            >
              <rect
                id="矩形_8799-2"
                data-name="矩形 8799"
                width="150"
                height="32"
                rx="10"
                transform="translate(368.52 248)"
                :fill="getRectColorByIndex(3)"
              />
            </g>
            <g
              transform="matrix(1, 0, 0, 1, 542.48, 221)"
              filter="url(#矩形_8810)"
            >
              <rect
                id="矩形_8810-2"
                data-name="矩形 8810"
                width="150"
                height="32"
                rx="10"
                transform="translate(368.52 340)"
                :fill="getRectColorByIndex(4)"
              />
            </g>
            <g
              transform="matrix(1, 0, 0, 1, 542.48, 221)"
              filter="url(#矩形_8775)"
            >
              <rect
                id="矩形_8775-2"
                data-name="矩形 8775"
                width="150"
                height="32"
                rx="10"
                transform="translate(368.52 727)"
                :fill="getRectColorByIndex(8)"
              />
            </g>
            <g
              id="组_26585"
              data-name="组 26585"
              transform="translate(11360 -11152)"
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
              <g
                id="组_26732"
                data-name="组 26732"
                transform="translate(-10485.815 11375.185)"
              >
                <path
                  id="路径_2868"
                  data-name="路径 2868"
                  d="M223.848,76.192a2.908,2.908,0,1,0-3.6,0,4.848,4.848,0,0,0-3.046,4.5v1.454a.485.485,0,0,0,.485.485h8.723a.485.485,0,0,0,.485-.485V80.692a4.848,4.848,0,0,0-3.047-4.5Zm-3.738-2.284a1.938,1.938,0,1,1,1.939,1.938,1.939,1.939,0,0,1-1.939-1.938Zm5.815,7.269a.485.485,0,0,1-.485.485h-6.785a.485.485,0,0,1-.485-.485v-.485a3.877,3.877,0,0,1,7.754,0v.485Zm0,0"
                  transform="translate(-145.263)"
                  fill="#666ee8"
                />
                <path
                  id="路径_2869"
                  data-name="路径 2869"
                  d="M73.877,148.962a.485.485,0,0,0-.485-.485h0a1.454,1.454,0,0,1,0-2.908h0a.485.485,0,0,0,0-.969h0a2.423,2.423,0,0,0-1.575,4.264,3.392,3.392,0,0,0-1.817,3,.485.485,0,0,0,.969,0,2.423,2.423,0,0,1,2.423-2.423.485.485,0,0,0,.485-.485Zm0,0"
                  transform="translate(0 -72.631)"
                  fill="#666ee8"
                />
              </g>
            </g>
            <text
              id="群组选择"
              transform="translate(965 306)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">群组选择</tspan>
            </text>
            <text
              id="需求分解"
              transform="translate(969 400)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">需求分解</tspan>
            </text>
            <text
              id="事件生成"
              transform="translate(969 491)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">事件生成</tspan>
            </text>
            <text
              id="事件下发"
              transform="translate(969 583)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">事件下发</tspan>
            </text>
            <g
              id="组_26586"
              data-name="组 26586"
              transform="translate(11354 -11192)"
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
                id="联合_1034"
                data-name="联合 1034"
                d="M9730.615-14406.491l-1.259-1.057-.941,1a.487.487,0,0,1-.55.12.486.486,0,0,1-.311-.453v-9.382a1.1,1.1,0,0,1,1.1-1.1h7.653a1.1,1.1,0,0,1,1.1,1.1v9.36a.493.493,0,0,1-.314.475.489.489,0,0,1-.547-.138l-.887-.98-1.233,1.038a.477.477,0,0,1-.354.138.462.462,0,0,1-.333-.138l-1.256-1.061-1.18,1.079a.467.467,0,0,1-.351.137A.546.546,0,0,1,9730.615-14406.491Zm2.179-1.589,1.273,1.078,1.277-1.078a.494.494,0,0,1,.688.04l.785.861v-9.086a.508.508,0,0,0-.514-.51h-7.653a.506.506,0,0,0-.51.51v9.147l.843-.905a.493.493,0,0,1,.354-.155.5.5,0,0,1,.354.138l1.274,1.038,1.215-1.1a.476.476,0,0,1,.3-.1A.453.453,0,0,1,9732.794-14408.08Zm-3.437-1.237a.3.3,0,0,1-.293-.293.3.3,0,0,1,.293-.293h5.891a.3.3,0,0,1,.293.293.289.289,0,0,1-.293.293Zm2.377-.963a.419.419,0,0,1-.217-.075.3.3,0,0,1-.08-.275l.257-1.256a.372.372,0,0,1,.08-.159l2.666-2.648a.29.29,0,0,1,.413,0l1.021,1.021a.282.282,0,0,1,0,.412l-2.667,2.648a.251.251,0,0,1-.159.08l-1.256.253Zm.528-1.411-.155.746.745-.156,2.4-2.395-.59-.59Zm-2.905-.372a.3.3,0,0,1-.293-.293.3.3,0,0,1,.293-.3h1.454a.3.3,0,0,1,.293.3.3.3,0,0,1-.293.293Zm0-2.179a.3.3,0,0,1-.293-.3.3.3,0,0,1,.293-.293h2.377a.3.3,0,0,1,.293.293.288.288,0,0,1-.293.3Z"
                transform="translate(-20132.479 25997.859)"
                fill="#666ee8"
              />
            </g>
            <g
              id="组_26706"
              data-name="组 26706"
              transform="translate(11354 -11101)"
            >
              <circle
                id="椭圆_68678-2"
                data-name="椭圆 68678"
                cx="9"
                cy="9"
                r="9"
                transform="translate(-10409 11577)"
                fill="rgba(255,255,255,0.87)"
              />
              <path
                id="路径_2873"
                data-name="路径 2873"
                d="M76.063,4.465a.391.391,0,0,1,0,.781H71.618a.391.391,0,0,1,0-.781h4.445Zm0,2.227a.391.391,0,0,1,0,.781H71.618a.391.391,0,0,1,0-.781h4.445ZM77.54,0A1.133,1.133,0,0,1,78.67,1.133v8.91a1.133,1.133,0,0,1-1.131,1.133H70.131A1.133,1.133,0,0,1,69,10.043V1.133A1.133,1.133,0,0,1,70.131,0ZM71.632.782V1.856h4.406V.782Zm-.78,0h-.721a.352.352,0,0,0-.351.352v8.91a.352.352,0,0,0,.351.352H77.54a.351.351,0,0,0,.351-.352V1.133A.352.352,0,0,0,77.54.782h-.721V1.876a.762.762,0,0,1-.76.762H71.613a.762.762,0,0,1-.76-.762V.782Z"
                transform="translate(-10473.836 11580.412)"
                fill="#666ee8"
              />
            </g>
            <g
              id="组_26721"
              data-name="组 26721"
              transform="translate(11354 -11009)"
            >
              <circle
                id="椭圆_68678-3"
                data-name="椭圆 68678"
                cx="9"
                cy="9"
                r="9"
                transform="translate(-10409 11577)"
                fill="rgba(255,255,255,0.87)"
              />
              <path
                id="路径_2874"
                data-name="路径 2874"
                d="M202.476,233.925H195.86a.551.551,0,1,1,0-1.1h6.065V225.1H195.86a.551.551,0,1,1,0-1.1h6.617a.551.551,0,0,1,.551.551v8.822A.551.551,0,0,1,202.476,233.925Zm-4.411-2.757a.551.551,0,0,1-.391-.16l-1.1-1.1a.551.551,0,0,1,.777-.777l.711.711,1.814-1.814a.551.551,0,0,1,.777.777l-2.206,2.206A.551.551,0,0,1,198.065,231.168Zm-3.86-1.654h-1.654a.551.551,0,0,1,0-1.1h1.654a.551.551,0,1,1,0,1.1Zm1.1,2.206h-1.654a.551.551,0,0,1,0-1.1h1.654a.551.551,0,1,1,0,1.1Zm0-4.411h-1.654a.551.551,0,1,1,0-1.1h1.654a.551.551,0,1,1,0,1.1Z"
                transform="translate(-10597.983 11357.037)"
                fill="#666ee8"
              />
            </g>
            <g id="组_26739" data-name="组 26739" transform="translate(205 1)">
              <g
                transform="matrix(1, 0, 0, 1, 337.48, 220)"
                filter="url(#矩形_8811)"
              >
                <rect
                  id="矩形_8811-2"
                  data-name="矩形 8811"
                  width="150"
                  height="32"
                  rx="10"
                  transform="translate(368.52 435)"
                  :fill="getRectColorByIndex(5)"
                />
              </g>
              <text
                id="交互终端响应"
                transform="translate(752 677)"
                fill="#fff"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">交互终端响应</tspan>
              </text>
              <g
                id="组_26722"
                data-name="组 26722"
                transform="translate(11137 -10915)"
              >
                <circle
                  id="椭圆_68678-4"
                  data-name="椭圆 68678"
                  cx="9"
                  cy="9"
                  r="9"
                  transform="translate(-10409 11577)"
                  fill="rgba(255,255,255,0.87)"
                />
                <path
                  id="路径_2876"
                  data-name="路径 2876"
                  d="M81.228,35.513H83.34A1.037,1.037,0,0,0,84.4,34.457V32.345a1.037,1.037,0,0,0-1.056-1.056H81.228a1.037,1.037,0,0,0-1.056,1.056v2.112A1.059,1.059,0,0,0,81.228,35.513Zm-.352-3.168a.333.333,0,0,1,.352-.352H83.34a.333.333,0,0,1,.352.352v2.112a.333.333,0,0,1-.352.352H81.228a.333.333,0,0,1-.352-.352Zm8.308,6.689H86.65a.857.857,0,0,0-.845.845v2.535a.857.857,0,0,0,.845.845h2.535a.857.857,0,0,0,.845-.845V39.878A.857.857,0,0,0,89.184,39.033Zm.106-2.253H88.8l.88,1.514.88-1.514h-.563A4.926,4.926,0,0,0,85.1,32.345v.7A4.254,4.254,0,0,1,89.29,36.78ZM80.911,37.8H81.4l-.88-1.514-.88,1.514h.563A4.924,4.924,0,0,0,85.1,42.2v-.7A4.224,4.224,0,0,1,80.911,37.8Z"
                  transform="translate(-10485.101 11548.727)"
                  fill="#666ee8"
                />
              </g>
            </g>
            <g id="组_26738" data-name="组 26738" transform="translate(55 65)">
              <g
                transform="matrix(1, 0, 0, 1, 487.48, 156)"
                filter="url(#矩形_8812)"
              >
                <rect
                  id="矩形_8812-2"
                  data-name="矩形 8812"
                  width="150"
                  height="32"
                  rx="10"
                  transform="translate(368.52 535)"
                  :fill="getRectColorByIndex(6)"
                />
              </g>
              <text
                id="控制终端响应"
                transform="translate(902 713)"
                fill="#fff"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">控制终端响应</tspan>
              </text>
              <g
                id="组_26723"
                data-name="组 26723"
                transform="translate(11287 -10879)"
              >
                <circle
                  id="椭圆_68678-5"
                  data-name="椭圆 68678"
                  cx="9"
                  cy="9"
                  r="9"
                  transform="translate(-10409 11577)"
                  fill="rgba(255,255,255,0.87)"
                />
                <path
                  id="路径_2875"
                  data-name="路径 2875"
                  d="M73.84,70.263v3.985a.407.407,0,0,1-.814,0V70.263a.407.407,0,1,1,.814,0Zm-.407-3.81a.407.407,0,0,0,.407-.407V65.7a.407.407,0,0,0-.814,0v.348A.407.407,0,0,0,73.433,66.453Zm-5.714,3.52A1.215,1.215,0,1,1,66.5,68.748,1.221,1.221,0,0,1,67.72,69.973Zm-.814,0a.4.4,0,1,0-.4.411A.406.406,0,0,0,66.905,69.973Zm4.282,2a1.215,1.215,0,1,1-1.215-1.225A1.221,1.221,0,0,1,71.187,71.975Zm-.814,0a.4.4,0,1,0-.4.411A.406.406,0,0,0,70.373,71.975ZM74.655,68.2A1.215,1.215,0,1,1,73.44,66.98,1.221,1.221,0,0,1,74.655,68.2Zm-.814,0a.4.4,0,1,0-.4.411A.406.406,0,0,0,73.841,68.2Zm-3.868,5.4a.407.407,0,0,0-.407.407v.234a.407.407,0,0,0,.814,0v-.234A.407.407,0,0,0,69.972,73.607Zm0-3.359a.407.407,0,0,0,.407-.407V65.7a.407.407,0,0,0-.814,0v4.144A.407.407,0,0,0,69.972,70.248Zm-3.461,1.483a.407.407,0,0,0-.407.407v2.109a.407.407,0,0,0,.814,0V72.139A.407.407,0,0,0,66.511,71.731Zm0-3.5a.407.407,0,0,0,.407-.407V65.7a.407.407,0,0,0-.814,0v2.13A.407.407,0,0,0,66.511,68.234Z"
                  transform="translate(-10469.973 11516.027)"
                  fill="#666ee8"
                />
              </g>
            </g>
            <g id="组_26740" data-name="组 26740" transform="translate(0 97)">
              <g
                transform="matrix(1, 0, 0, 1, 542.48, 124)"
                filter="url(#矩形_8813)"
              >
                <rect
                  id="矩形_8813-2"
                  data-name="矩形 8813"
                  width="150"
                  height="32"
                  rx="10"
                  transform="translate(368.52 630)"
                  :fill="getRectColorByIndex(7)"
                />
              </g>
              <text
                id="可调设备响应"
                transform="translate(957 776)"
                fill="#fff"
                font-size="14"
                font-family="SourceHanSansCN-Regular, Source Han Sans CN"
              >
                <tspan x="0" y="0">可调设备响应</tspan>
              </text>
              <g
                id="组_26724"
                data-name="组 26724"
                transform="translate(11342 -10816)"
              >
                <circle
                  id="椭圆_68678-6"
                  data-name="椭圆 68678"
                  cx="9"
                  cy="9"
                  r="9"
                  transform="translate(-10409 11577)"
                  fill="rgba(255,255,255,0.87)"
                />
                <g
                  id="组_26733"
                  data-name="组 26733"
                  transform="translate(-10553.719 11537.658)"
                >
                  <path
                    id="路径_2877"
                    data-name="路径 2877"
                    d="M157.588,42.667a.516.516,0,0,1,.516.516V53.5a.516.516,0,0,1-.516.516h-7.739a.516.516,0,0,1-.516-.516V43.183a.516.516,0,0,1,.516-.516h7.739Zm-.258.774h-7.223v9.8h7.223v-9.8Z"
                    fill="#666ee8"
                  />
                  <path
                    id="路径_2878"
                    data-name="路径 2878"
                    d="M341.333,810.667m.387,0h3.353a.342.342,0,0,1,.387.387h0a.342.342,0,0,1-.387.387H341.72a.342.342,0,0,1-.387-.387h0A.342.342,0,0,1,341.72,810.667Z"
                    transform="translate(-189.678 -758.714)"
                    fill="#666ee8"
                  />
                  <path
                    id="路径_2879"
                    data-name="路径 2879"
                    d="M344.75,301.089a.532.532,0,0,0-.384.276.587.587,0,0,0-.036.488,1.32,1.32,0,0,1-.474.288.52.52,0,0,0-.838,0,1.322,1.322,0,0,1-.474-.288.587.587,0,0,0-.035-.488.532.532,0,0,0-.384-.276,1.5,1.5,0,0,1,0-.576.531.531,0,0,0,.384-.276.587.587,0,0,0,.035-.488,1.323,1.323,0,0,1,.474-.288.52.52,0,0,0,.838,0,1.318,1.318,0,0,1,.474.289.588.588,0,0,0,.036.488.532.532,0,0,0,.384.276,1.49,1.49,0,0,1,0,.577m.714-.921a.174.174,0,0,0-.18-.127.352.352,0,0,1-.315-.545.175.175,0,0,0-.02-.219,2.1,2.1,0,0,0-1-.576.175.175,0,0,0-.2.092.351.351,0,0,1-.629,0,.175.175,0,0,0-.2-.092,2.1,2.1,0,0,0-1,.575.175.175,0,0,0-.02.219.351.351,0,0,1-.315.545.173.173,0,0,0-.18.127,2.114,2.114,0,0,0,0,1.15.175.175,0,0,0,.18.127.351.351,0,0,1,.315.545.175.175,0,0,0,.02.219,2.1,2.1,0,0,0,1,.575.175.175,0,0,0,.2-.092.351.351,0,0,1,.629,0,.175.175,0,0,0,.2.092,2.1,2.1,0,0,0,1-.575.175.175,0,0,0,.02-.22.351.351,0,0,1,.315-.545.176.176,0,0,0,.18-.127,2.109,2.109,0,0,0,0-1.15m-2.361.58a.383.383,0,1,1,.383.383A.383.383,0,0,1,343.1,300.748Zm-.542,0a.877.877,0,1,0,.877-.877A.878.878,0,0,0,342.561,300.743Z"
                    transform="translate(-189.678 -252.934)"
                    fill="#666ee8"
                  />
                </g>
              </g>
            </g>
            <text
              id="结束"
              transform="translate(972 970)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">结束</tspan>
            </text>
            <line
              id="直线_885"
              data-name="直线 885"
              y2="44"
              transform="translate(985.5 324.5)"
              fill="none"
              :stroke="getStrokeColorByIndex(2)"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_886"
              data-name="直线 886"
              y2="44"
              transform="translate(985.5 417.5)"
              fill="none"
              :stroke="getStrokeColorByIndex(3)"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_891"
              data-name="直线 891"
              y2="44"
              transform="translate(985.5 510.5)"
              fill="none"
              :stroke="getStrokeColorByIndex(4)"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_896"
              data-name="直线 896"
              x1="139.288"
              transform="translate(761.5 573.789)"
              fill="none"
              :stroke="getPTZKcolor('左')"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_901"
              data-name="直线 901"
              x1="62.656"
              transform="translate(837.5 673.5)"
              fill="none"
              :stroke="getStrokeColorByGroups([5, 7], [6])"
              stroke-linecap="round"
              stroke-width="3"
              stroke-dasharray="6"
            />
            <line
              id="直线_899"
              data-name="直线 899"
              x1="139.288"
              transform="translate(761.5 866.211)"
              fill="none"
              :stroke="getPTZKcolor('左')"
              stroke-linecap="round"
              stroke-width="3"
            />

            <line
              v-show="isShowDCQR()"
              id="直线_903"
              data-name="直线 903"
              x2="62"
              transform="translate(834.5 866.365)"
              fill="none"
              :stroke="getStrokeColorByIndexs(5, 6, 7)"
              stroke-linecap="round"
              stroke-width="3"
              stroke-dasharray="6"
            />
            <line
              id="直线_892"
              data-name="直线 892"
              y2="44"
              transform="translate(985.5 602.5)"
              fill="none"
              :stroke="getStrokeColorByIndex(5)"
              stroke-linecap="round"
              stroke-width="3"
              stroke-dasharray="6"
            />
            <line
              id="直线_902"
              data-name="直线 902"
              y2="192"
              transform="translate(834.868 673.5)"
              fill="none"
              :stroke="getStrokeColorByGroups([5, 7], [6])"
              stroke-linecap="round"
              stroke-width="3"
              stroke-dasharray="6"
            />
            <line
              v-show="isShowDCQR()"
              id="直1线1_90221"
              data-name="直1线 9021"
              x1="62.656"
              transform="translate(837.5 866)"
              fill="none"
              :stroke="getStrokeColorByGroups([5, 7], [6])"
              stroke-linecap="round"
              stroke-width="3"
              stroke-dasharray="6"
            />
            <line
              id="直线_900"
              data-name="直线 900"
              y1="294"
              transform="translate(761.5 573.5)"
              fill="none"
              :stroke="getPTZKcolor('左')"
              stroke-linecap="round"
              stroke-width="3"
            />
            <line
              id="直线_894"
              data-name="直线 894"
              y2="44"
              transform="translate(985.789 700.5)"
              fill="none"
              :stroke="getStrokeColorByIndex(6)"
              stroke-linecap="round"
              stroke-width="3"
              stroke-dasharray="6"
            />
            <line
              id="直线_895"
              data-name="直线 895"
              y2="44"
              transform="translate(985.789 796.5)"
              fill="none"
              :stroke="getStrokeColorByIndexs(5, 6, 7)"
              stroke-linecap="round"
              stroke-width="3"
              stroke-dasharray="6"
            />
            <line
              id="直线_904"
              data-name="直线 904"
              y2="44"
              transform="translate(985.789 895.5)"
              fill="none"
              :stroke="getStrokeColorByIndex(8)"
              stroke-linecap="round"
              stroke-width="3"
            />
            <path
              id="路径_2736"
              data-name="路径 2736"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(978 363.317) rotate(-45)"
              :fill="getStrokeColorByIndex(2)"
            />
            <path
              id="路径_2778"
              data-name="路径 2778"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(978 454.943) rotate(-45)"
              :fill="getStrokeColorByIndex(3)"
            />
            <path
              id="路径_2846"
              data-name="路径 2846"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(978 547.943) rotate(-45)"
              :fill="getStrokeColorByIndex(4)"
            />
            <path
              id="路径_2858"
              data-name="路径 2858"
              d="M2.828,0l1.73,5.972,6.347,2.1L0,10.9Z"
              transform="translate(896.867 874.076) rotate(-135)"
              fill="#666ee8"
            />
            <path
              id="路径_2859"
              data-name="路径 2859"
              d="M2.828,10.9l1.73-5.972,6.347-2.1L0,0Z"
              transform="translate(904.477 866.211) rotate(135)"
              :fill="getArrowColor()"
            />
            <path
              id="路径_2849"
              data-name="路径 2849"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(978 642.943) rotate(-45)"
              :fill="getStrokeColorByIndex(5)"
            />
            <path
              id="路径_2853"
              data-name="路径 2853"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(978.289 737.943) rotate(-45)"
              :fill="getStrokeColorByIndex(6)"
            />
            <path
              id="路径_2854"
              data-name="路径 2854"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(978.289 834.943) rotate(-45)"
              :fill="getStrokeColorByIndexs(5, 6, 7)"
            />
            <path
              id="路径_2880"
              data-name="路径 2880"
              d="M1.414,1.414l1.73,5.972,6.347,2.1-10.9,2.828Z"
              transform="translate(978.289 933.943) rotate(-45)"
              :fill="getStrokeColorByIndex(8)"
            />
            <g
              id="组_26592"
              data-name="组 26592"
              transform="translate(464.001 153.929)"
            >
              <path
                id="路径_2786"
                data-name="路径 2786"
                d="M102.19,100.86H96.952V96.1h9.757a.476.476,0,0,0,.476-.476v-3.27a1.124,1.124,0,0,0-1.121-1.124h-.987V90.5a.476.476,0,1,0-.953,0v.724H99.06V90.5a.476.476,0,1,0-.953,0v.724H96.793a.778.778,0,0,0-.794.781v9.03a.778.778,0,0,0,.794.775h5.4a.476.476,0,1,0,0-.952Zm-5.239-8.68h1.156v.73a.476.476,0,0,0,.952,0v-.73h5.08v.73a.476.476,0,0,0,.952,0v-.73h.972a.168.168,0,0,1,.168.168v2.791H96.952Z"
                fill="none"
              />
              <path
                id="路径_2787"
                data-name="路径 2787"
                d="M566.844,527.573a2.788,2.788,0,1,0,2.785,2.788,2.788,2.788,0,0,0-2.785-2.788Zm1.238,3.416h-1.238a.317.317,0,0,1-.317-.317v-1.54a.317.317,0,1,1,.635,0v1.238h.93a.317.317,0,1,1,0,.635Z"
                transform="translate(-461.088 -431.034)"
                fill="none"
              />
            </g>
            <g id="组_26741" data-name="组 26741" transform="translate(0 97)">
              <g
                transform="matrix(1, 0, 0, 1, 542.48, 124)"
                filter="url(#椭圆_68692)"
              >
                <circle
                  id="椭圆_68692-2"
                  data-name="椭圆 68692"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(113.52 730)"
                  :fill="getCircleColorByIndex(8)"
                />
              </g>
              <path
                id="路径_2788"
                data-name="路径 2788"
                d="M230.7,277.341c-3.662-3.759-8.592-7.958-8.592-7.958l2.2-1.9s4.54,3.271,5.126,3.759c1.172-1.416,8.592-8.3,12.84-10.2a7.464,7.464,0,0,1,.537.635A45.359,45.359,0,0,0,230.7,277.341Z"
                transform="translate(436.543 597.812)"
                fill="#fff"
              />
            </g>
            <g
              id="矩形_8817"
              data-name="矩形 8817"
              transform="translate(1211.5 668)"
              :fill="getPTZKRectcolor('右', 'fill')"
              :stroke="getPTZKRectcolor('右')"
              stroke-width="1"
            >
              <rect width="32" height="84" rx="16" stroke="none" />
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="83"
                rx="15.5"
                fill="none"
              />
            </g>
            <g
              id="矩形_8819"
              data-name="矩形 8819"
              transform="translate(796.366 723)"
              :fill="getStrokeColorByGroups([5, 7], [6])"
              :stroke="getStrokeColorByGroups([5, 7], [6])"
              stroke-width="1"
            >
              <rect width="32" height="84" rx="16" stroke="none" />
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="83"
                rx="15.5"
                fill="none"
              />
            </g>
            <g
              id="矩形_8820"
              data-name="矩形 8820"
              transform="translate(1099.933 668)"
              :fill="getRectBgColorByIndexs(4, 'fill')"
              :stroke="getRectBgColorByIndexs(4, 'stroke')"
              stroke-width="1"
            >
              <rect width="32" height="84" rx="16" stroke="none" />
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="83"
                rx="15.5"
                fill="none"
              />
            </g>
            <g
              id="矩形_8818"
              data-name="矩形 8818"
              transform="translate(713.998 668)"
              :fill="getPTZKRectcolor('左', 'fill')"
              :stroke="getPTZKRectcolor('左')"
              stroke-width="1"
            >
              <rect width="32" height="84" rx="16" stroke="none" />
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="83"
                rx="15.5"
                fill="none"
              />
            </g>
            <text
              id="用_户_自_控"
              data-name="用
户
自
控"
              transform="translate(1220.5 689)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">用</tspan>
              <tspan x="0" y="18">户</tspan>
              <tspan x="0" y="36">自</tspan>
              <tspan x="0" y="54">控</tspan>
            </text>
            <text
              id="单_次_确_认"
              data-name="单
次
确
认"
              transform="translate(805.366 744)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">单</tspan>
              <tspan x="0" y="18">次</tspan>
              <tspan x="0" y="36">确</tspan>
              <tspan x="0" y="54">认</tspan>
            </text>
            <text
              id="多_轮_确_认"
              data-name="多
轮
确
认"
              transform="translate(1108.933 689)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">多</tspan>
              <tspan x="0" y="18">轮</tspan>
              <tspan x="0" y="36">确</tspan>
              <tspan x="0" y="54">认</tspan>
            </text>
            <text
              id="平_台_直_控"
              data-name="平
台
直
控"
              transform="translate(722.998 689)"
              fill="#fff"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">平</tspan>
              <tspan x="0" y="18">台</tspan>
              <tspan x="0" y="36">直</tspan>
              <tspan x="0" y="54">控</tspan>
            </text>
            <path
              id="多边形_245"
              data-name="多边形 245"
              d="M4.75,0,9.5,6H0Z"
              transform="translate(1066.095 870.14) rotate(-90)"
              :fill="getPTZKcolor('右')"
            />
            <path
              id="路径_2861"
              data-name="路径 2861"
              d="M-9520.062,14637.233H-9388.9v291.157h-136.475"
              transform="translate(10593 -14063)"
              fill="none"
              :stroke="getPTZKcolor('右')"
              stroke-width="1"
              stroke-dasharray="2 2"
            />
            <path
              id="路径_2796"
              data-name="路径 2796"
              d="M5,0H7l5,720a6,6,0,0,1-12,0Z"
              transform="translate(663 235)"
              fill="url(#linear-gradient)"
            />
            <g id="组_26727" data-name="组 26727" transform="translate(-1 375)">
              <g
                transform="matrix(1, 0, 0, 1, 543.48, -154)"
                filter="url(#椭圆_68679)"
              >
                <circle
                  id="椭圆_68679-6"
                  data-name="椭圆 68679"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(112.52 633)"
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
                fill="#666ee8"
              />
              <circle
                id="椭圆_68696"
                data-name="椭圆 68696"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                :fill="getCircleColorByIndex(7)"
              />
            </g>
            <g
              id="组_26726"
              data-name="组 26726"
              transform="translate(-0.734 278.844)"
            >
              <g
                transform="matrix(1, 0, 0, 1, 543.22, -57.84)"
                filter="url(#椭圆_68679-2)"
              >
                <circle
                  id="椭圆_68679-7"
                  data-name="椭圆 68679"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(112.78 536.84)"
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
                fill="#666ee8"
              />
              <circle
                id="椭圆_68696-2"
                data-name="椭圆 68696"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                :fill="getCircleColorByIndex(6)"
              />
            </g>
            <g
              id="组_26584"
              data-name="组 26584"
              transform="translate(11144 -11152)"
            >
              <g
                transform="matrix(1, 0, 0, 1, -10601.52, 11373)"
                filter="url(#椭圆_68675)"
              >
                <circle
                  id="椭圆_68675-2"
                  data-name="椭圆 68675"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(114.52 66)"
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
                fill="#666ee8"
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
            <g id="组_26597" data-name="组 26597" transform="translate(1 32)">
              <g
                transform="matrix(1, 0, 0, 1, 541.48, 189)"
                filter="url(#椭圆_68677)"
              >
                <circle
                  id="椭圆_68677-2"
                  data-name="椭圆 68677"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(114.52 160)"
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
                fill="#666ee8"
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
            <g id="组_26596" data-name="组 26596" transform="translate(1 -7)">
              <g
                transform="matrix(1, 0, 0, 1, 541.48, 228)"
                filter="url(#椭圆_68679-3)"
              >
                <circle
                  id="椭圆_68679-8"
                  data-name="椭圆 68679"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(114.52 251)"
                  fill="rgba(224,237,255,0.76)"
                />
              </g>
              <circle
                id="椭圆_68680-3"
                data-name="椭圆 68680"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                fill="#666ee8"
              />
              <circle
                id="椭圆_68696-3"
                data-name="椭圆 68696"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                :fill="getCircleColorByIndex(3)"
              />
            </g>
            <g id="组_28148" data-name="组 28148" transform="translate(0 82)">
              <g
                transform="matrix(1, 0, 0, 1, 542.48, 139)"
                filter="url(#椭圆_68679-4)"
              >
                <circle
                  id="椭圆_68679-9"
                  data-name="椭圆 68679"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(113.52 340)"
                  fill="rgba(224,237,255,0.76)"
                />
              </g>
              <circle
                id="椭圆_68680-4"
                data-name="椭圆 68680"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                fill="#666ee8"
              />
              <circle
                id="椭圆_68696-4"
                data-name="椭圆 68696"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                :fill="getCircleColorByIndex(4)"
              />
            </g>
            <g
              id="组_26725"
              data-name="组 26725"
              transform="translate(-1.233 181.789)"
            >
              <g
                transform="matrix(1, 0, 0, 1, 543.72, 39.21)"
                filter="url(#椭圆_68679-5)"
              >
                <circle
                  id="椭圆_68679-10"
                  data-name="椭圆 68679"
                  cx="13"
                  cy="13"
                  r="13"
                  transform="translate(112.28 439.79)"
                  fill="rgba(224,237,255,0.76)"
                />
              </g>
              <circle
                id="椭圆_68680-5"
                data-name="椭圆 68680"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                fill="#666ee8"
              />
              <circle
                id="椭圆_68696-5"
                data-name="椭圆 68696"
                cx="6"
                cy="6"
                r="6"
                transform="translate(663 486)"
                :fill="getCircleColorByIndex(5)"
              />
            </g>
          </g>
          <g id="组_26742" data-name="组 26742">
            <text
              v-for="(top, index) in date_top"
              :key="index"
              :id="top"
              :data-name="date_arr[index]"
              :transform="`translate(${date_left} ${top})`"
              :fill="fontColor"
              font-size="13"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">{{ date_arr[index] }}</tspan>
            </text>
            <!-- <text
              id="_09:00"
              data-name="09:00"
              transform="translate(605 306)"
              fill="#666"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">09:00</tspan>
            </text>
            <text
              id="_10:00"
              data-name="10:00"
              transform="translate(605 397)"
              fill="#666"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">10:00</tspan>
            </text>
            <text
              id="_10:15"
              data-name="10:15"
              transform="translate(605 491)"
              fill="#666"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">10:15</tspan>
            </text>
            <text
              id="_10:15-2"
              data-name="10:15"
              transform="translate(605 572)"
              fill="#666"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">10:15</tspan>
            </text>
            <text
              id="_10:30"
              data-name="10:30"
              transform="translate(605 677.789)"
              fill="#666"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">10:30</tspan>
            </text>
            <text
              id="_11:00"
              data-name="11:00"
              transform="translate(605 776.844)"
              fill="#666"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">11:00</tspan>
            </text>
            <text
              id="_12:00"
              data-name="12:00"
              transform="translate(605 873)"
              fill="#666"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">12:00</tspan>
            </text>
            <text
              id="_15:00"
              data-name="15:00"
              transform="translate(605 967)"
              fill="#666"
              font-size="14"
              font-family="SourceHanSansCN-Regular, Source Han Sans CN"
            >
              <tspan x="0" y="0">15:00</tspan>
            </text> -->
          </g>
          <g
            transform="matrix(1, 0, 0, 1, 542.48, 221)"
            filter="url(#联合_1027)"
          >
            <path
              id="联合_1027-2"
              data-name="联合 1027"
              d="M-34,26a4,4,0,0,1-4-4V4a4,4,0,0,1,4-4H71a4,4,0,0,1,4,4V9.375a1.04,1.04,0,0,1,.168.123l3.069,2.758a1,1,0,0,1,0,1.488L75.168,16.5a1.041,1.041,0,0,1-.168.123V22a4,4,0,0,1-4,4Z"
              transform="translate(41 24)"
              fill="#666ee8"
            />
          </g>
          <text
            id="_2022-08"
            data-name="2022-08"
            transform="translate(587.482 264)"
            fill="#fff"
            font-size="14"
            font-family="SourceHanSansCN-Regular, Source Han Sans CN"
          >
            <tspan x="0" y="0">{{ str_date }}</tspan>
          </text>
          <g
            id="组_26592-2"
            data-name="组 26592"
            transform="translate(472.482 161.929)"
          >
            <path
              id="路径_2786-2"
              data-name="路径 2786"
              d="M102.19,100.86H96.952V96.1h9.757a.476.476,0,0,0,.476-.476v-3.27a1.124,1.124,0,0,0-1.121-1.124h-.987V90.5a.476.476,0,1,0-.953,0v.724H99.06V90.5a.476.476,0,1,0-.953,0v.724H96.793a.778.778,0,0,0-.794.781v9.03a.778.778,0,0,0,.794.775h5.4a.476.476,0,1,0,0-.952Zm-5.239-8.68h1.156v.73a.476.476,0,0,0,.952,0v-.73h5.08v.73a.476.476,0,0,0,.952,0v-.73h.972a.168.168,0,0,1,.168.168v2.791H96.952Z"
              fill="#fff"
            />
            <path
              id="路径_2787-2"
              data-name="路径 2787"
              d="M566.844,527.573a2.788,2.788,0,1,0,2.785,2.788,2.788,2.788,0,0,0-2.785-2.788Zm1.238,3.416h-1.238a.317.317,0,0,1-.317-.317v-1.54a.317.317,0,1,1,.635,0v1.238h.93a.317.317,0,1,1,0,.635Z"
              transform="translate(-461.088 -431.034)"
              fill="#fff"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { getTimeLineData } from './progress1';
// 日期文字居左的距离
const date_left = 544;
// 日期文字居顶的距离
const date_top = [306, 397, 491, 572, 678, 777, 873, 967];
// 渐变色的比例
const date_line_top = [78, 189, 297, 402, 520, 636, 750, 866];

export default {
  props: {
    params: {
      type: Object,
      default() {
        return {
          consId: '100000000186',
          id: 100000000123,
        };
      },
    },
  },
  data() {
    return {
      date_left,
      date_top,
      date_line_top,
      str_date: '2022-08',
      flag_arr: new Array(7).fill('左'),
      date_arr: [
        '2022-08-09 12:00',
        '2022-08-09 12:33',
        '2022-08-09 13:18',
        '2022-08-09 15:34',
        '2022-08-10 08:32',
        '2022-08-10 09:00',
        '2022-08-10 16:00',
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
      const { date_arr, flag_arr, time_str } = await getTimeLineData(
        this.params
      );
      this.date_arr = date_arr;
      this.flag_arr = flag_arr;
      this.str_date = time_str;
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
      return this.date_arr[index - 1] ? '#666ee8' : '#dcdeff';
    },
    getRectColorByIndex(index) {
      return this.date_arr[index - 1] ? '#666ee8' : '#aaa';
    },
    getStrokeColorByIndex(index) {
      return this.date_arr[index - 1] ? '#666ee8' : '#aaa';
    },
    // 通过传入的参数控制是否渲染
    getStrokeColorByIndexs() {
      let indexArr = [...arguments];
      let flag = indexArr.every(index => this.date_arr[index - 1]);
      return flag ? '#666ee8' : '#aaa';
    },
    // 通过组合形式控制
    getStrokeColorByGroups(activeIndexs = [], emptyIndexs = []) {
      let activeFlag = activeIndexs.every(index => this.date_arr[index - 1]);
      let emptyFlag = emptyIndexs.every(index => !this.date_arr[index - 1]);
      let finallyFlag = activeFlag && emptyFlag;
      return finallyFlag ? '#666ee8' : '#aaa';
    },
    // 通过传入的参数控制是否渲染
    // 最后一个参数为类型
    getRectBgColorByIndexs() {
      let args = [...arguments];
      const type = args.at(-1);
      let indexArr = args.slice(0, -1);
      let flag = indexArr.every(index => this.date_arr[index - 1]);
      const fillColor = flag ? '#666ee8' : '#aaa';
      const strokeColor = flag ? '#666ee8' : '#aaa';
      return type == 'fill' ? fillColor : strokeColor;
    },
    getPTZKcolor(flag) {
      const activeIndexs = [4, 7];
      const emptyIndexs = [5, 6];
      let activeFlag = activeIndexs.every(index => this.date_arr[index - 1]);
      let emptyFlag = emptyIndexs.every(index => !this.date_arr[index - 1]);
      let rlFlag = this.flag_arr[4] == flag;
      let finallyFlag = activeFlag && emptyFlag && rlFlag;
      return finallyFlag ? '#666ee8' : '#aaa';
    },
    getPTZKRectcolor(flag, type) {
      const activeIndexs = [4, 7];
      const emptyIndexs = [5, 6];
      let activeFlag = activeIndexs.every(index => this.date_arr[index - 1]);
      let emptyFlag = emptyIndexs.every(index => !this.date_arr[index - 1]);
      let rlFlag = this.flag_arr[4] == flag;
      let finallyFlag = activeFlag && emptyFlag && rlFlag;
      const fillColor = finallyFlag ? '#666ee8' : '#aaa';
      const strokeColor = finallyFlag ? '#666ee8' : '#aaa';
      return type == 'fill' ? fillColor : strokeColor;
    },
    isShowDCQR() {
      let flag =
        !this.date_arr[4] && !this.date_arr[5] && this.flag_arr[3] == '左';
      return !flag;
    },
    getArrowColor() {
      let flag =
        this.date_arr[6] && !this.date_arr[5] && this.flag_arr[3] != '右';
      return flag ? '#666ee8' : '#aaa';
    },
    rectBg() {
      const activeIndexs = [3, 4, 5, 6];
      let activeFlag = activeIndexs.every(index => this.date_arr[index - 1]);
      return activeFlag ? '#080c27' : 'none';
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
  padding-left: 60px;
}
</style>
