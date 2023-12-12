import * as React from "react";
const TrashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    id="svg2"
    width={128}
    height={128}
    {...props}
  >
    <defs id="defs4">
      <linearGradient
        xlinkHref="#BlackTransparent"
        id="linearGradient2299"
        x1={76}
        x2={76}
        y1={105.3}
        y2={86}
        gradientTransform="matrix(.9 0 0 .9 3.5 9)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient id="BlackTransparent">
        <stop
          id="stop8"
          offset={0}
          style={{
            stopColor: "black",
            stopOpacity: 1,
          }}
        />
        <stop
          id="stop10"
          offset={1}
          style={{
            stopColor: "black",
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <linearGradient id="WhiteTransparent">
        <stop
          id="stop13"
          offset={0}
          style={{
            stopColor: "white",
            stopOpacity: 1,
          }}
        />
        <stop
          id="stop15"
          offset={1}
          style={{
            stopColor: "white",
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <linearGradient
        xlinkHref="#WhiteTransparent"
        id="linearGradient6182"
        x1={0}
        x2={0}
        y1={21}
        y2={30}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#WhiteTransparent"
        id="linearGradient6185"
        x1={0}
        x2={0}
        y1={71}
        y2={59}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#WhiteTransparent"
        id="linearGradient6188"
        x1={0}
        x2={0}
        y1={52}
        y2={16}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#BlackTransparent"
        id="linearGradient6192"
        x1={0}
        x2={0}
        y1={35}
        y2={48}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#BlackTransparent"
        id="linearGradient6197"
        x1={13}
        x2={13}
        y1={56}
        y2={102}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#WhiteTransparent"
        id="linearGradient6200"
        x1={0}
        x2={0}
        y1={78}
        y2={13.5}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#WhiteTransparent"
        id="linearGradient6206"
        x1={0}
        x2={0}
        y1={66}
        y2={58}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#WhiteTransparent"
        id="linearGradient6213"
        x1={22}
        x2={46}
        y1={0}
        y2={0}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#WhiteTransparent"
        id="linearGradient6216"
        x1={96}
        x2={60}
        y1={0}
        y2={0}
        gradientUnits="userSpaceOnUse"
      />
      <clipPath id="clipoutline1" clipPathUnits="userSpaceOnUse">
        <path
          id="outline1"
          d="M60.3 27.4C40.4 27.4 24.4 35 24.4 44v56.8c0 9.2 16 16.5 35.9 16.5C80 117.3 96 110 96 100.8V44c0-9-16-16.6-35.7-16.6z"
        />
      </clipPath>
      <clipPath id="clipoutline2" clipPathUnits="userSpaceOnUse">
        <path
          id="outline2"
          d="M59.6 18c-23.3 0-42 9.8-42.6 21.7v9.8C17 62 36.5 72 60.7 72c24.3 0 43.7-10 43.7-22.5v-9.7c0-12.2-19.8-21.8-43.7-21.8h-1.1z"
        />
      </clipPath>
      <filter id="ShadowBlur" x={0} y={0} filterUnits="userSpaceOnUse">
        <feGaussianBlur
          id="feGaussianBlur31"
          in="SourceAlpha"
          result="blur"
          stdDeviation={3}
        />
      </filter>
    </defs>
    <style id="style33" type="text/css">
      {
        ".shade,.specularity{opacity:.5}.outline-big{stroke-width:16;stroke:none;opacity:0.;fill:none}.outline-small{stroke-width:8px;stroke:#000;opacity:1;fill:none}.stroke-highlight{fill:none;stroke:#fff;opacity:.3;stroke-width:9px;stroke-linejoin:round}.stroke-aluminium5{stroke:#555753}"
      }
    </style>
    <g id="g35">
      <g id="g37">
        <path
          id="path39"
          d="M105.871 105.003c0 10.757-20.022 19.487-44.691 19.487-24.67 0-44.692-8.73-44.692-19.487 0-10.756 20.022-19.486 44.692-19.486s44.691 8.73 44.691 19.486z"
          className="filter"
          filter="url(#ShadowBlur)"
          style={{
            fill: "#000",
            opacity: 0.4,
          }}
        />
        <g id="g41">
          <use xlinkHref="#outline1" id="use43" className="outline-big" />
          <use
            xlinkHref="#outline1"
            id="use45"
            className="outline-small stroke-aluminium5"
          />
        </g>
        <path
          id="path47"
          d="M60.4 30c-19.8 0-35.7 7.6-35.7 16.7v54c0 9.1 15.9 16.3 35.7 16.3C80 117 96 109.8 96 100.7v-54C96 37.6 80 30 60.4 30z"
          style={{
            fill: "#888a85",
          }}
        />
        <path
          id="path49"
          d="M60.4 27.6c-19.9 0-19.9 89.4 0 89.4C80 117 96 109.9 96 100.7V44c0-9-16-16.4-35.6-16.4z"
          className="specularity"
          style={{
            fill: "url(#linearGradient6216)",
          }}
        />
        <path
          id="path51"
          d="m42.4 58-17.7-8.3V101c0 5 7.3 11.7 17.8 13.7L42.4 58z"
          style={{
            fill: "url(#linearGradient6213)",
            opacity: 0.75,
          }}
        />
        <path
          id="path53"
          d="M24.6 57.7v17.7C45.5 90.5 75.5 91 96 75.4V57.7c-20 16.3-51 14.8-71.4 0z"
          className="shade"
          style={{
            fill: "url(#linearGradient6197)",
          }}
        />
        <use
          xlinkHref="#outline1"
          id="use55"
          className="stroke-highlight"
          clipPath="url(#clipoutline1)"
        />
      </g>
      <g id="g57">
        <g id="g59">
          <use xlinkHref="#outline2" id="use61" className="outline-big" />
          <use
            xlinkHref="#outline2"
            id="use63"
            className="outline-small stroke-aluminium5"
          />
        </g>
        <path
          id="path65"
          d="M60.7 18c24.3 0 43.7 10 43.7 22v3.5C104.4 56 85 66 60.7 66 36.5 66 17 56 17 43.5V40c0-12 19.5-22 43.7-22z"
          style={{
            fill: "#d3d7cf",
          }}
        />
        <path
          id="path67"
          d="M60.7 59c24.3 0 43.7-6.4 43.7-19.6v10.1C104.4 62 85 72 60.7 72 36.5 72 17 62 17 49.5V39.4C17 47.3 36.5 59 60.7 59z"
          style={{
            fill: "#888a85",
          }}
        />
        <path
          id="path69"
          d="M16.473 36.525c0 11.4 27.282 17.545 44.227 17.545 17.652 0 43.696-3.745 43.696-17.545l.004 3.359c0 16.05-29.4 19.25-43.7 19.25-13.8 0-44.319-8.339-44.319-20.339"
          style={{
            opacity: 0.5,
            fill: "url(#linearGradient6188)",
          }}
        />
        <path
          id="path71"
          d="M61 59c-27.3 0-56.5-12.4-34.5 3.7 8.2 6 20.2 9 34.5 9 14.4 0 26-3 34.7-9C117 47.5 88 59 61 59z"
          className="specularity"
          style={{
            fill: "url(#linearGradient6185)",
          }}
        />
        <use
          xlinkHref="#outline2"
          id="use73"
          className="stroke-highlight"
          clipPath="url(#clipoutline2)"
        />
        <g id="g75">
          <path
            id="path77"
            d="M41.4 35.6h40.1c4.5 0 4.5 6.9 0 6.9H41.4c-4.4 0-4.6-6.9 0-6.9z"
            className="shade"
            style={{
              fill: "url(#linearGradient6192)",
            }}
          />
          <path
            id="path79"
            d="M61.6 19.3c-18.6 0-20.1 6-20.1 12.3v6.8c0 2.9 7.5 2.3 7.5 0V36c0-4.4 4.5-5.5 12.6-5.5S74 31.6 74 36v2.4c0 2.3 7.6 2.3 7.6 0v-6.8c0-6.3-1.6-12.3-20-12.3z"
            style={{
              fill: "#000",
            }}
          />
          <path
            id="path81"
            d="M61.6 21.3c-8.2 0-14.6 1.2-14.6 6.1h29c0-4.9-6.3-6.1-14.4-6.1z"
            className="specularity"
            style={{
              fill: "url(#linearGradient6182)",
            }}
          />
        </g>
      </g>
      <g id="g83">
        <path
          id="path85"
          d="M32 83.6V99c0 6.9 8 7 8 0V83.6c0-5.3-8-5.7-8 0zm48 0V99c1.9 5.9 7.5 4.7 8 0V83.6c0-5-7.8-4.9-8 0zm-32.6 4.1V106c0 6.3 8.5 5.7 8.6 0V87.7c0-5.4-8.5-5.7-8.6 0zm16.6 0V106c0 6.5 8.9 5.8 9 0V87.7c-1.4-6.1-8.2-5.5-9 0z"
          style={{
            opacity: 0.5,
            fill: "#000",
          }}
        />
        <path
          id="path87"
          d="M88 91c0 4.2-8 4-8 0v7.4c0 5.6 8 6.3 8 0V91zm-56 0v7.4c0 8 8 7.6 8 0V91c0 4.9-8 4.6-8 0zm24 6.8c0 5.1-8.6 4.2-8.6 0v7.9c0 6.9 8.5 5.9 8.6 0v-7.9zm17 0c0 5.8-9 4.9-9 0v7.9c0 7.1 9 6.3 9 0v-7.9z"
          style={{
            opacity: 0.5,
            fill: "url(#linearGradient2299)",
          }}
        />
      </g>
    </g>
  </svg>
);
export default TrashIcon;
