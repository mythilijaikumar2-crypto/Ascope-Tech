import React from 'react';
import { motion } from 'framer-motion';

import {
  TrendingUp,
  Award,
  Quote,
  Building2,
  DollarSign,
  Globe,
  Zap,
  CheckCircle2
} from 'lucide-react';

// Sleek, high-quality, color-accurate inline SVG brand icons for Placements Marquee
const TcsIcon: React.FC = () => (
  <svg className="h-8 w-auto shrink-0" viewBox="0 0 145 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tcsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f58220" />
        <stop offset="35%" stopColor="#e01b84" />
        <stop offset="70%" stopColor="#7a2583" />
        <stop offset="100%" stopColor="#0072bc" />
      </linearGradient>
    </defs>
    {/* High-fidelity fluid ribbon lowercase tcs */}
    <path d="M 12 7 L 12 25 C 12 29 17 29 19 27 M 6 12 L 18 12" stroke="url(#tcsGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 37 14 C 34 11 26 11 26 18.5 C 26 26 34 26 37 23" stroke="url(#tcsGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 52 13.5 C 50 11.5 45 10.5 45 14.5 C 45 18 53 17 53 22.5 C 53 26.5 47 26.5 44 24.5" stroke="url(#tcsGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    
    {/* TATA official geometric logo path with open A chevrons */}
    <g stroke="#0258a5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M 68 8 H 78 M 73 8 V 18" />
      <path d="M 80 18 L 86 8 L 92 18" />
      <path d="M 94 8 H 104 M 99 8 V 18" />
      <path d="M 106 18 L 112 8 L 118 18" />
    </g>
    
    {/* Subtext */}
    <text x="68" y="25" fill="#0258a5" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.08em">CONSULTANCY</text>
    <text x="68" y="32" fill="#0258a5" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.08em">SERVICES</text>
  </svg>
);

const InfosysIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="16" fill="#007cc3" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.03em">Infosys</text>
  </svg>
);

const WiproIcon: React.FC = () => (
  <svg className="h-7 w-auto shrink-0" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="5" y="20" fill="#250e62" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.02em">wipro</text>
    <g transform="translate(75, 14)">
      <circle cx="-10" cy="0" r="1.5" fill="#009fda" />
      <circle cx="-8.6" cy="5" r="1.5" fill="#78248c" />
      <circle cx="-5" cy="8.6" r="1.5" fill="#e01b84" />
      <circle cx="0" cy="10" r="1.5" fill="#f48120" />
      <circle cx="5" cy="8.6" r="1.5" fill="#fdd000" />
      <circle cx="8.6" cy="5" r="1.5" fill="#13a89e" />
      <circle cx="10" cy="0" r="1.5" fill="#009fda" />
      <circle cx="8.6" cy="-5" r="1.5" fill="#78248c" />
      <circle cx="5" cy="-8.6" r="1.5" fill="#e01b84" />
      <circle cx="0" cy="-10" r="1.5" fill="#f48120" />
      <circle cx="-5" cy="-8.6" r="1.5" fill="#fdd000" />
      <circle cx="-8.6" cy="-5" r="1.5" fill="#13a89e" />
      <circle cx="-7" cy="0" r="1.2" fill="#f48120" />
      <circle cx="-5" cy="5" r="1.2" fill="#fdd000" />
      <circle cx="0" cy="7" r="1.2" fill="#13a89e" />
      <circle cx="5" cy="5" r="1.2" fill="#009fda" />
      <circle cx="7" cy="0" r="1.2" fill="#78248c" />
      <circle cx="5" cy="-5" r="1.2" fill="#e01b84" />
      <circle cx="0" cy="-7" r="1.2" fill="#f48120" />
      <circle cx="-5" cy="-5" r="1.2" fill="#fdd000" />
      <circle cx="-3.5" cy="0" r="0.9" fill="#13a89e" />
      <circle cx="0" cy="3.5" r="0.9" fill="#009fda" />
      <circle cx="3.5" cy="0" r="0.9" fill="#78248c" />
      <circle cx="0" cy="-3.5" r="0.9" fill="#f48120" />
    </g>
  </svg>
);

const HclTechIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 120 28" fill="#0056b3" xmlns="http://www.w3.org/2000/svg">
    <g transform="skewX(-20)">
      <path d="M12 2h8v8h10V2h8v24h-8v-9H20v9h-8V2z" />
      <path d="M68 2c-12 0-20 5-20 12s8 12 20 12c8 0 14-3 17-7l-6-4.5c-2.5 3-6.5 4.5-11 4.5-7.5 0-12-3.5-12-5s4.5-5 12-5c4.5 0 8.5 1.5 11 4.5l6-4.5C82 5 76 2 68 2z" />
      <path d="M94 2h8v16h14v6H94V2z" />
    </g>
  </svg>
);

const CognizantIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 245.8 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <path id="cog_1" d="M59.2 2.7h186.7v40.8H59.2z" />
      <clipPath id="cog_clip_1">
        <use xlinkHref="#cog_1" overflow="visible" />
      </clipPath>
      <path id="cog_2" d="M59.2 2.7h186.7v40.8H59.2z" />
      <clipPath id="cog_clip_2">
        <use xlinkHref="#cog_2" overflow="visible" />
      </clipPath>
      <path id="cog_3" d="M0 0h52.1v44H0z" />
      <clipPath id="cog_clip_3">
        <use xlinkHref="#cog_3" overflow="visible" />
      </clipPath>
      <path id="cog_4" d="m0 22 15.3 22 15.8-9.5L22.2 22z" />
      <clipPath id="cog_clip_4">
        <use xlinkHref="#cog_4" overflow="visible" />
      </clipPath>
      <linearGradient id="cog_grad_1" gradientUnits="userSpaceOnUse" x1="-391.039" y1="277.815" x2="-390.039" y2="277.815" gradientTransform="matrix(31.1065 0 0 -21.9795 12163.862 6139.21)">
        <stop offset="0" stopColor="#3d54ce" />
        <stop offset="1" stopColor="#35cacf" />
      </linearGradient>
      <path id="cog_5" d="M15.3 44h21.8l15-22z" />
      <clipPath id="cog_clip_5">
        <use xlinkHref="#cog_5" overflow="visible" />
      </clipPath>
      <linearGradient id="cog_grad_2" gradientUnits="userSpaceOnUse" x1="-393.062" y1="277.815" x2="-392.062" y2="277.815" gradientTransform="matrix(36.8476 0 0 -21.9795 14498.684 6139.21)">
        <stop offset="0" stopColor="#13457d" />
        <stop offset="1" stopColor="#279698" />
      </linearGradient>
      <path id="cog_6" d="M15.3 0 0 22h22.2l8.9-12.5z" />
      <clipPath id="cog_clip_6">
        <use xlinkHref="#cog_6" overflow="visible" />
      </clipPath>
      <linearGradient id="cog_grad_3" gradientUnits="userSpaceOnUse" x1="-391.049" y1="277.815" x2="-390.049" y2="277.815" gradientTransform="matrix(31.1316 0 0 -21.9796 12173.976 6117.246)">
        <stop offset="0" stopColor="#090086" />
        <stop offset="1" stopColor="#2f96a9" />
      </linearGradient>
      <path id="cog_7" d="m15.3 0 36.8 22-15-22z" />
      <clipPath id="cog_clip_7">
        <use xlinkHref="#cog_7" overflow="visible" />
      </clipPath>
      <linearGradient id="cog_grad_4" gradientUnits="userSpaceOnUse" x1="-393.062" y1="277.815" x2="-392.062" y2="277.815" gradientTransform="matrix(36.8476 0 0 -21.9796 14498.684 6117.246)">
        <stop offset="0" stopColor="#3b62ca" />
        <stop offset="1" stopColor="#93dfe3" />
      </linearGradient>
    </defs>
    <g clipPath="url(#cog_clip_1)">
      <g clipPath="url(#cog_clip_2)">
        <path fill="#000048" d="M158.7 10.7h3.7v22.1h-3.7V10.7zm-13.5-.5c-2.4 0-4.6.8-6.4 2.3v-1.8h-3.7v22.1h3.7V20.3c0-3.6 2.9-6.4 6.4-6.4s6.4 2.9 6.4 6.4v12.5h3.7V20.3c0-5.6-4.5-10.1-10.1-10.1m-17.5.4h3.7v21.3c-.1 6.3-5.2 11.4-11.5 11.5-5 .1-9.6-3.2-11-8h4c1.3 2.7 4 4.4 7 4.3 4.3-.1 7.7-3.6 7.9-7.9V30c-4.7 4.3-12 4.1-16.3-.6-4.3-4.7-4.1-12 .6-16.3 4.4-4.1 11.3-4.1 15.7 0l-.1-2.5zm0 11.1c0-4.3-3.5-7.9-7.8-7.9s-7.9 3.5-7.9 7.8 3.5 7.9 7.9 7.9c4.3 0 7.8-3.5 7.8-7.8m-57-7.9c3 0 5.8 1.8 7.1 4.5h3.9c-1.8-6.1-8.3-9.6-14.4-7.7-6.1 1.8-9.6 8.3-7.7 14.4s8.3 9.6 14.4 7.7c3.7-1.1 6.6-4 7.7-7.7h-3.9c-1.8 3.9-6.5 5.6-10.4 3.8-3.9-1.8-5.6-6.5-3.8-10.4 1.3-2.8 4-4.6 7.1-4.6m35.9 7.9c0 6.4-5.2 11.5-11.5 11.5-6.4 0-11.5-5.2-11.5-11.5s5-11.5 11.4-11.5 11.6 5.1 11.6 11.5m-3.7 0c0-4.3-3.5-7.9-7.8-7.9s-7.9 3.5-7.9 7.8 3.5 7.9 7.8 7.9c4.4 0 7.9-3.5 7.9-7.8m120.5-11.5c-2.4 0-4.6.8-6.4 2.3v-1.8h-3.7v22.1h3.7V20.3c0-3.6 2.9-6.5 6.4-6.5 3.6 0 6.5 2.9 6.5 6.4v12.5h3.7V20.3c-.1-5.6-4.6-10.1-10.2-10.1m-17.5.5h3.7v22.1h-3.7v-2.6c-4.7 4.3-12 4.1-16.3-.6-4.3-4.7-4.1-12 .6-16.3 2.1-2 4.9-3.1 7.8-3.1 2.9 0 5.7 1.1 7.9 3.1v-2.6zm0 11c0-4.3-3.5-7.8-7.9-7.8-4.3 0-7.8 3.5-7.8 7.9 0 4.3 3.5 7.8 7.8 7.8 4.4-.1 7.9-3.6 7.9-7.9m39.9-7.4v-3.7h-5.5v-6h-3.7v20.8c0 4.1 3.3 7.4 7.4 7.4h1.8v-3.7H244c-2 0-3.7-1.7-3.7-3.7V14.3h5.5zM160.5 2.7c-1.4 0-2.4 1.1-2.4 2.4 0 1.4 1.1 2.4 2.4 2.4 1.4 0 2.4-1.1 2.4-2.4.1-1.3-1-2.4-2.4-2.4.1 0 .1 0 0 0m24 8h-18.4v3.7h13.6l-13.6 14.7v3.7h18.4v-3.7h-13.7l13.6-14.7.1-3.7z" />
      </g>
    </g>
    <g clipPath="url(#cog_clip_3)">
      <g clipPath="url(#cog_clip_4)">
        <path fill="url(#cog_grad_1)" d="M0 22h31.1v22H0z" />
      </g>
      <g clipPath="url(#cog_clip_5)">
        <path fill="url(#cog_grad_2)" d="M15.3 22h36.8v22H15.3z" />
      </g>
      <g clipPath="url(#cog_clip_6)">
        <path fill="url(#cog_grad_3)" d="M0 0h31.1v22H0z" />
      </g>
      <g clipPath="url(#cog_clip_7)">
        <path fill="url(#cog_grad_4)" d="M15.3 0h36.8v22H15.3z" />
      </g>
    </g>
  </svg>
);

const ZohoIcon: React.FC = () => (
  <svg className="h-8 w-auto shrink-0" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="22" width="38" height="38" rx="8" stroke="#f21c24" strokeWidth="6" transform="rotate(-6 44 41)" />
    <rect x="62" y="16" width="38" height="38" rx="8" stroke="#00a65a" strokeWidth="6" transform="rotate(14 81 35)" />
    <rect x="99" y="18" width="38" height="38" rx="8" stroke="#0071bc" strokeWidth="6" transform="rotate(-8 118 37)" />
    <rect x="136" y="22" width="38" height="38" rx="8" stroke="#f9b217" strokeWidth="6" transform="rotate(4 155 41)" />
    <text x="100" y="85" textAnchor="middle" fill="#000000" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.2em">ZOHO</text>
  </svg>
);

const HexawareIcon: React.FC = () => (
  <svg className="h-8 w-auto shrink-0" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(42, 2)">
      <path d="M4 14V8h4V4h4v4h4v4h-4v6c0 1.5 0.5 2 2 2h2v4h-3.5C8 24 8 20 8 18v-6H4z" fill="#004b87" />
      <rect x="20" y="8" width="4" height="16" rx="1" fill="#004b87" />
      <circle cx="22" cy="3" r="2.5" fill="#e31b23" />
      <circle cx="30" cy="21" r="2.5" fill="#ffc20e" />
    </g>
    <text x="60" y="44" textAnchor="middle" fill="#1f2937" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.15em">HEXAWARE</text>
  </svg>
);

const CapgeminiIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="-1 -1 162 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#12abdb"
      fillRule="evenodd"
      stroke="none"
      d="m 153.2175,21.2782 c 3.4962,0 6.1962,-2.8462 6.2312,-6.225 -0.245,-1.475 -0.7625,-4.2037 -4.585,-4.2037 -4.19,0 -5.5762,5.8487 -8.985,9.6237 -0.2737,2.1438 -2.305,4.0625 -4.8387,4.385 0.62,0.6488 2.0025,1.0013 3.6525,1.0013 3.0175,0 6.67,-0.9088 8.5837,-2.7988 -2.5537,0.035 -4.1937,-1.6062 -4.355,-3.8762 1.245,1.5087 2.6513,2.0937 4.2963,2.0937"
    />
    <path
      fill="#0070ad"
      fillRule="evenodd"
      stroke="none"
      d="m 126.3725,11.972 c 0,-1.86 -0.1125,-3.1 -1.3288,-3.1 -0.5562,0 -0.825,0.1125 -1.3087,0.2725 0.43,6.28 -0.9913,11.8125 -2.7238,11.8125 -2.2712,0 -1.1387,-13.4625 -5.9475,-13.4625 -4.4387,0 -5.0787,10.7475 -5.5812,10.7475 -0.3425,0 -0.395,-2.8225 -0.3763,-4.9763 0.1863,-1.03 0.2888,-1.9575 0.2888,-2.6612 0,-1 -0.41,-2.7288 -2.6813,-1.865 0.079,7.6862 -1.46,12.3287 -3.1937,12.3287 -2.5388,0 -2.5675,-6.9675 -2.5675,-8.8862 0,-1.875 0.1362,-4.38 -2.6513,-3.4913 -0.415,6.7038 -2.1737,11.7625 -3.2812,11.7625 -1.6513,0 -1.3188,-11.5812 -4.8888,-11.5812 -3.2125,0 -4.2037,10.9712 -4.8725,10.9712 -1.1962,0 0.3763,-12.3487 -4.2625,-12.3487 -2.4312,0 -3.3987,4.1212 -4.3512,8.735 -0.185,0.8937 -0.375,0.9237 -0.41,-0.087 -0.024,-0.8588 -0.029,-1.7238 -0.019,-2.5825 1.1663,-4.6388 -0.2587,-6.3525 -2.4075,-5.1175 0.6938,8.56 -3.2375,12.7437 -6.25,12.7437 -1.0887,0 -1.9487,-0.4637 -2.5875,-1.1962 3.6125,-2.2163 5.2188,-4.76 5.2188,-7.2463 0,-2.69 -1.5475,-4.2425 -4.1163,-4.2425 -3.5837,0 -5.59,3.6913 -5.59,6.8313 0,1.6887 0.3175,3.125 0.835,4.3062 -1.2312,0.5863 -2.3925,1.0938 -3.4725,1.5863 -0.098,-3.2275 -0.4587,-6.615 -0.7362,-9.745 -1.91,-0.5275 -2.4663,0.39 -2.6125,2.0887 -0.3425,3.8775 -1.7775,6.285 -3.0475,6.285 -0.9525,0 -1.5375,-1.1625 -1.6063,-2.3975 -0.3562,-6.2162 4.6875,-7.945 7.3288,-7.0412 0.5475,-1.3725 -0.054,-2.3588 -2.4363,-2.3588 -2.8862,0 -5.0437,1.7538 -6.6262,4.0038 -1.0538,1.5 -2.275,2.5637 -3.8963,3.8487 0.044,-0.3662 0.064,-0.7375 0.064,-1.1037 0,-4.38 -2.3738,-6.3038 -4.6388,-6.3038 -1.875,0 -3.0562,1.1225 -3.74,2.8513 -0.1662,-1.7338 -0.5125,-2.48 -1.5187,-2.48 -0.43,0 -1.03,0.1212 -1.67,0.4337 0.2925,0.9675 0.405,3.1113 0.405,4.5175 0,5.2675 -1.5088,7.6313 -2.9588,7.6313 -1.66,0 -1.9237,-6.25 -2.065,-8.6813 -0.2587,-0.098 -0.5325,-0.1512 -0.8112,-0.1512 -1.5038,0 -1.6988,2.0162 -2.07,3.8712 -0.41,2.0563 -1.5913,4.6388 -3.345,4.6388 -1.0588,0 -1.7238,-1.02 -1.8063,-2.8563 -0.1712,-3.725 2.93,-8.14 7.7788,-6.7675 0.6337,-1.4837 -0.3625,-2.6125 -2.3738,-2.6125 -3.545,0 -6.475,2.6513 -7.7537,5.7913 -1.2988,2.8812 -3.57,7.11 -8.1888,7.11 C 6.26,21.7975 3.76,18.95 3.76,12.9787 c 0,-5.1462 3.2462,-10.035 6.7087,-10.035 2.4213,0 2.9838,2.3838 2.7688,4.62 1.255,1.005 3.31,0.067 3.31,-2.4462 0,-1.7338 -1.4063,-4.6738 -5.9513,-4.6738 C 4.9712,0.4437 0,6.055 0,13.4225 0,20.5612 3.6225,24.78 8.75,24.78 c 3.2375,0 6.2887,-1.845 8.3937,-5.2538 0.5325,2.9838 2.5638,4.2388 4.0863,4.2388 2.4662,0 4.0775,-1.5975 4.9562,-3.755 0.5475,2.1625 1.7038,3.765 3.6288,3.765 1.3525,0 2.4112,-0.6888 3.2075,-1.7875 -0.3175,7.5187 -0.7125,12.3137 3.73,11.3725 -0.6875,-2.1388 -0.9075,-6.0313 -0.9075,-9.5275 0,-9.565 1.5775,-12.7138 3.555,-12.7138 1.435,0 1.8987,1.825 1.8987,3.7738 0,1.045 -0.1025,2.2462 -0.3662,3.325 -2.4313,1.5337 -4.37,2.745 -4.37,4.2825 0,1.2162 0.9037,1.3275 1.685,1.3275 1.865,0 4.1112,-1.83 5.3512,-5.2825 1.0838,-0.6588 2.1725,-1.4113 3.2125,-2.4363 -0.034,0.3513 -0.054,0.7025 -0.054,1.0638 0,3.4275 1.4987,5.5037 3.8962,5.5037 1.88,0 3.2863,-1.3337 4.2825,-3.33 0.064,1.1513 0.1025,2.2113 0.1175,3.1825 -3.8087,1.7638 -8.0225,3.55 -8.0225,8.5213 0,2.5725 1.855,4.5062 4.2725,4.5062 5.3075,0 6.5188,-5.6 6.5675,-12.1087 1.7288,-0.7475 3.0125,-1.3238 4.4975,-2.0613 1.2688,1.5925 2.9975,2.3888 4.58,2.3888 2.9925,0 5.2438,-1.5875 7.05,-4.805 0.3175,2.4462 0.9525,4.805 2.2563,4.805 2.3725,0 2.8562,-12.4125 4.6187,-12.4125 1.3525,0 0.245,13.4275 3.8138,13.4275 3.0562,0 3.6275,-11.8163 5.1175,-11.8163 1.055,0 1.1325,10.8013 4.4625,10.8013 1.6362,0 3.4137,-1.9688 4.3012,-6.09 0.42,2.745 1.8025,6.09 4.5075,6.09 1.5775,0 2.935,-1.5975 3.9838,-3.7163 0.2887,2.1825 0.9037,3.7163 2.1,3.7163 3.11,0 3.0075,-12.3838 5.4687,-12.3838 1.9188,0 1.3288,12.3838 5.8988,12.3838 2.1725,0 3.2025,-1.8513 3.8187,-4.18 0.8388,3.4225 2.2013,4.18 3.315,4.18 0.7075,0 1.245,-0.25 1.9488,-1.085 -3.5363,-1.5325 -3.2375,-7.1138 -3.2375,-10.7175 m -74.8438,21.27 c -1.0987,0 -1.68,-1.045 -1.68,-2.2225 0,-3.1788 2.3338,-4.8625 5.205,-6.3125 -0.1275,6.9425 -1.7437,8.535 -3.525,8.535 m 14.2775,-22.51 c 1.0688,0 1.6788,0.9812 1.5713,2.3925 -0.1213,1.655 -1.3275,3.555 -3.4275,5.0437 -1.0938,-3.115 -0.2775,-7.4362 1.8562,-7.4362 M 99.6722,6.035 c 1.0162,-0.034 1.7287,-0.9075 1.7337,-1.9475 0.01,-1.04 -0.6987,-1.8613 -1.7187,-1.8225 -1.02,0.035 -1.85,0.9087 -1.855,1.9487 -0.01,1.04 0.82,1.855 1.84,1.8213 m 25.3325,0.5275 c 0.9275,-0.034 1.685,-0.8638 1.685,-1.855 0,-0.9913 -0.7425,-1.7675 -1.67,-1.7388 -0.9288,0.034 -1.685,0.8688 -1.69,1.86 -0.01,0.9913 0.7475,1.7675 1.675,1.7338 m 34.4387,8.2425 c -0.079,-3.9263 -1.9437,-7.2363 -4.825,-9.8788 -2.1875,-1.9962 -4.785,-3.515 -7.5087,-4.6575 -0.215,-0.092 -0.44,-0.1812 -0.66,-0.2687 -3.3538,4.0187 -14.965,7.0162 -14.965,15.44 0,3.29 2.08,6.3712 5.1312,7.6075 1.7725,0.6687 3.54,0.7025 5.3125,0.1062 1.5775,-0.5175 2.8713,-1.4937 3.95,-2.68 3.4088,-3.775 4.795,-9.6187 8.98,-9.6187 3.8275,0 4.345,2.7237 4.59,4.1987 0,-0.01 0,-0.1075 -0.01,-0.2487"
    />
  </svg>
);

const AccentureIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M66 2l5 3.5-5 3.5" stroke="#a100ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <text x="5" y="24" fill="#000000" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" letterSpacing="-0.04em">accenture</text>
  </svg>
);

const LtiMindtreeIcon: React.FC = () => (
  <svg className="h-7 w-auto shrink-0" viewBox="0 0 170 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ltiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e01b84" />
        <stop offset="100%" stopColor="#78248c" />
      </linearGradient>
    </defs>
    {/* Concentric Tree Circuit Emblem */}
    <circle cx="18" cy="18" r="14" stroke="url(#ltiGrad)" strokeWidth="2" fill="none" />
    <g stroke="url(#ltiGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M 18,28 L 18,12" />
      <path d="M 18,23 C 15,22 13,22 12,22" />
      <path d="M 18,18 C 14,17 11,16 10,15" />
      <path d="M 18,13 L 14,9" />
      <path d="M 18,23 C 21,22 23,22 24,22" />
      <path d="M 18,18 C 22,17 25,16 26,15" />
      <path d="M 18,13 L 22,9" />
      
      {/* Root flare */}
      <path d="M 15,28 C 17,28 18,27.5 18,26" />
      <path d="M 21,28 C 19,28 18,27.5 18,26" />
    </g>
    <g fill="url(#ltiGrad)">
      <circle cx="18" cy="11.5" r="1.5" />
      <circle cx="11" cy="22" r="1.5" />
      <circle cx="9.5" cy="15" r="1.5" />
      <circle cx="13.5" cy="8.5" r="1.5" />
      <circle cx="25" cy="22" r="1.5" />
      <circle cx="26.5" cy="15" r="1.5" />
      <circle cx="22.5" cy="8.5" r="1.5" />
    </g>
    
    {/* Italicized, bold LTIMindtree sans-serif text */}
    <text x="42" y="24" fill="#002d62" fontFamily="Inter, sans-serif" fontStyle="italic" fontWeight="900" fontSize="18" letterSpacing="-0.04em">LTIMindtree</text>
  </svg>
);

const Placements: React.FC = () => {
  const stats = [
    { label: "Placement Rate", value: "95%", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
    { label: "Highest Package", value: "₹12 LPA", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Hiring Partners", value: "20+", icon: Building2, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Avg Salary", value: "₹3.5 LPA", icon: Award, color: "text-accent", bg: "bg-accent/10" },
  ];

  const partners = [
    { name: "TCS", icon: <TcsIcon /> },
    { name: "Infosys", icon: <InfosysIcon /> },
    { name: "Wipro", icon: <WiproIcon /> },
    { name: "HCLTech", icon: <HclTechIcon /> },
    { name: "Cognizant", icon: <CognizantIcon /> },
    { name: "Zoho", icon: <ZohoIcon /> },
    { name: "Hexaware", icon: <HexawareIcon /> },
    { name: "Capgemini", icon: <CapgeminiIcon /> },
    { name: "Accenture", icon: <AccentureIcon /> },
    { name: "LTIMindtree", icon: <LtiMindtreeIcon /> }
  ];

  const salaryBenchmarks = [
    { role: "Full Stack", value: 6, max: 12, color: "bg-primary" },
    { role: "Data Science", value: 8, max: 15, color: "bg-emerald-500" },
    { role: "UI/UX Design", value: 5, max: 10, color: "bg-pink-500" },
    { role: "Cyber Security", value: 7, max: 14, color: "bg-orange-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  // Helper to get matching beautiful gradient theme matching testimonials page
  const getGradient = (idx: number) => {
    const gradients = [
      "from-primary to-accent",
      "from-accent to-secondary",
      "from-secondary to-primary",
      "from-primary to-secondary"
    ];
    return gradients[idx % gradients.length];
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-navy/10 overflow-x-hidden pt-20">

      {/* 1. Compact Brand-Dominant Hero Section */}
      <section className="relative py-20 lg:py-24 flex items-center justify-center overflow-hidden bg-cream/20 border-b border-border/20">
        {/* Decorative Success Wall Background */}
        <div className="absolute inset-0 z-0 opacity-[0.015] select-none pointer-events-none rotate-[-4deg] scale-110">
          <div className="flex flex-col gap-8">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className={`flex gap-16 whitespace-nowrap ${row % 2 === 0 ? 'translate-x-[-50px]' : 'translate-x-[50px]'}`}>
                {["GOOGLE", "META", "AMAZON", "NETFLIX", "APPLE", "MICROSOFT", "ADOBE", "TESLA"].map((brand) => (
                  <span key={brand} className="text-7xl font-black italic">{brand}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy text-white mb-6 shadow-md"
            >
              <Zap size={12} className="text-orange-400 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">The Elite Placement Hub</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-navy leading-tight mb-6 tracking-tighter">
              BEYOND <br />
              <span className="text-gradient">EMPLOYMENT.</span>
            </h1>

            <p className="text-sm sm:text-base text-text/80 max-w-xl mx-auto leading-relaxed font-medium mb-8">
              We don't just place students; we launch careers at the world's most innovative technology companies through structured preparation and direct industry pipelines.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-8 py-3.5 bg-navy text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-md active:scale-95">
                Start Your Journey
              </button>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr ${getGradient(i)} text-white flex items-center justify-center text-[10px] font-black shadow-sm`}
                    >
                      {["AP", "PN", "KS", "DR"][i]}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-lg font-black text-navy leading-none">200+</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-navy/40">Hired Alumni</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Decorative Stats (Compact & Sleek) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          className="absolute top-16 right-10 lg:right-24 bg-white p-4 px-5 rounded-2xl shadow-soft border border-border/40 hidden md:block"
        >
          <div className="text-xl font-black text-navy mb-0.5">95%</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-navy/40">Placement Rate</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          className="absolute bottom-16 left-10 lg:left-24 bg-white p-4 px-5 rounded-2xl shadow-soft border border-border/40 hidden md:block"
        >
          <div className="text-xl font-black text-navy mb-0.5">₹12 LPA</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-navy/40">Highest Package</div>
        </motion.div>
      </section>

      {/* 2. Success Statistics (Compact padding & spacing) */}
      <section className="py-16 border-y border-border/10 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="text-center group"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-105`}>
                  <stat.icon size={22} />
                </div>
                <div className="text-2xl font-black text-navy mb-1 tracking-tight">{stat.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-navy/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Success Stories Bento Grid (Completely refined and sized) */}
      <section className="py-24 px-6 bg-white relative z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="space-y-3">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.35em]">Testimonials</span>
              <h2 className="text-3xl lg:text-4xl font-heading font-black text-navy tracking-tight">
                Stories of <span className="text-gradient">Transformation</span>
              </h2>
            </div>
            <p className="text-navy/55 max-w-xs text-xs font-medium leading-relaxed">
              From non-tech backgrounds to top-tier developer positions. Learn how Ascope Tech paved the roadmap.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Bento Card 1: Highlighted Large Card (Row 1, Cols 1-2) */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 bg-sky/30 rounded-3xl p-8 text-navy relative overflow-hidden group border border-border/40 shadow-soft flex flex-col justify-between h-[340px]"
            >
              <Quote className="text-primary/5 absolute bottom-6 right-6 select-none pointer-events-none" size={90} />

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center text-lg font-black shadow-sm group-hover:scale-105 transition-transform duration-300">
                    AP
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight text-navy leading-tight">Arun Prakash</h4>
                    <p className="text-navy/40 uppercase tracking-widest text-[9px] font-bold">Full Stack Architect @ TCS</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base font-medium leading-relaxed max-w-xl text-navy/70 italic my-4">
                  "The intensive 20+ mock interview sessions and structural grooming at Ascope Tech transformed my confidence. I went from being extremely nervous to confidently leading complex architectural rounds!"
                </p>

                <div className="flex items-center justify-between w-full pt-2 border-t border-navy/5">
                  <div className="flex items-center gap-2">
                    <p className="text-[9px] text-navy/40 font-bold uppercase">Final Package:</p>
                    <p className="text-sm font-black text-primary">₹6.5 LPA</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="text-emerald-500" size={14} />
                    <span>Verified Hire</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 2: Regular Card (Row 1, Col 3) */}
            <motion.div
              variants={itemVariants}
              className="bg-sky/20 rounded-3xl p-6 flex flex-col justify-between border border-border/30 hover:border-primary/40 transition-all duration-300 group h-[340px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-accent to-secondary text-white flex items-center justify-center text-sm font-black shadow-sm">
                  PN
                </div>
                <Globe size={18} className="text-navy/30" />
              </div>
              <div>
                <p className="text-navy/40 text-[9px] font-black uppercase tracking-widest mb-1">Priya Nair</p>
                <p className="text-base font-black text-navy leading-tight">Data Analyst @ Cognizant</p>
                <p className="text-primary text-xs font-black mt-1">₹8.2 LPA</p>
              </div>
              <p className="text-xs text-navy/60 font-medium italic border-t border-navy/5 pt-3">
                "Transitioning from zero programming skills to a confident Data Analyst in 5 months felt seamless."
              </p>
            </motion.div>

            {/* Bento Card 3: Regular Card (Row 2, Col 1) */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-6 flex flex-col justify-between border border-border/40 shadow-soft hover:border-primary/40 transition-all duration-300 h-[340px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-secondary to-primary text-white flex items-center justify-center text-sm font-black shadow-sm">
                  KS
                </div>
                <Zap size={18} className="text-primary/40 animate-pulse" />
              </div>
              <div>
                <p className="text-primary/40 text-[9px] font-black uppercase tracking-widest mb-1">Karthik Sundar</p>
                <p className="text-base font-black text-navy leading-tight">Java Developer @ Wipro / Support Engineer @ Cognizant</p>
                <p className="text-primary text-xs font-black mt-1">₹4.8 LPA</p>
              </div>
              <p className="text-xs text-navy/60 font-medium italic border-t border-navy/5 pt-3">
                "The switch from Mechanical engineering to a high-paying IT developer role was perfectly mapped."
              </p>
            </motion.div>

            {/* Bento Card 4: Regular Card (Row 2, Col 2) */}
            <motion.div
              variants={itemVariants}
              className="bg-sky/20 rounded-3xl p-6 flex flex-col justify-between border border-border/30 hover:border-primary/40 transition-all duration-300 group h-[340px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center text-sm font-black shadow-sm group-hover:scale-105 transition-transform duration-300">
                  DR
                </div>
                <Award size={18} className="text-navy/30" />
              </div>
              <div>
                <p className="text-navy/40 text-[9px] font-black uppercase tracking-widest mb-1">Dinesh Raj</p>
                <p className="text-base font-black text-navy leading-tight">UI/UX Designer @ Freshworks</p>
                <p className="text-primary text-xs font-black mt-1">₹7.2 LPA</p>
              </div>
              <p className="text-xs text-navy/60 font-medium italic border-t border-navy/5 pt-3">
                "The UX process training built a professional portfolio that wowed every interviewer I met. Highly recommended!"
              </p>
            </motion.div>

            {/* Bento Card 5: Regular Card (Row 2, Col 3) */}
            <motion.div
              variants={itemVariants}
              className="bg-emerald-50/50 rounded-3xl p-6 flex flex-col justify-between border border-emerald-100/60 hover:border-emerald-500/40 transition-all duration-300 group h-[340px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-sm font-black shadow-sm group-hover:scale-105 transition-transform duration-300">
                  SK
                </div>
                <CheckCircle2 size={18} className="text-emerald-600/50" />
              </div>
              <div>
                <p className="text-emerald-700/50 text-[9px] font-black uppercase tracking-widest mb-1">Saranya Kumar</p>
                <p className="text-base font-black text-navy leading-tight">ML Engineer @ Zoho</p>
                <p className="text-emerald-600 text-xs font-black mt-1">₹8.2 LPA</p>
              </div>
              <p className="text-xs text-navy/60 font-medium italic border-t border-emerald-100/30 pt-3">
                "The portfolio projects made the difference and helped me land the ML role seamlessly."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Partners Marquee (Fully optimized and GPU hardware accelerated) */}
      <section className="py-14 bg-sky/20 overflow-hidden border-y border-border/30">
         <div className="max-w-7xl mx-auto px-6 mb-8">
            <h3 className="text-navy/20 font-black uppercase tracking-[0.4em] text-[9px] text-center">Global Hiring Partners</h3>
         </div>
         <div 
           className="flex gap-8 whitespace-nowrap animate-marquee items-center"
           style={{ 
             willChange: "transform",
             WebkitBackfaceVisibility: "hidden",
             backfaceVisibility: "hidden"
           }}
         >
            {[...partners, ...partners, ...partners].map((p, i) => (
              <div 
                key={i} 
                className="h-14 min-w-[140px] inline-flex items-center justify-center bg-white px-6 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium transition-all duration-300 select-none cursor-default group"
              >
                 <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {p.icon}
                 </div>
              </div>
            ))}
         </div>

      </section>

      {/* 5. Salary Benchmarks (Sleek sizing & thin ROI bars) */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.35em]">Career Path ROI</span>
              <h2 className="text-3xl lg:text-5xl font-heading font-black text-navy leading-tight tracking-tight">
                Your Career. <br />
                <span className="text-gradient">Engineered</span> for Growth.
              </h2>
            </div>

            <p className="text-text/75 text-sm sm:text-base leading-relaxed font-medium">
              At Ascope Tech, we design professional roadmaps that consistently bypass entry-level limits. Our hands-on tracks deliver high-performance skills that translate directly into unmatched market value and accelerated promotion cycles.
            </p>

            {/* Premium Interactive Metrics Grid (Replaces the removed button) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-cream/20 p-5 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium hover:border-primary/20 transition-all duration-300 group select-none">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <TrendingUp size={14} />
                  </div>
                  <span className="text-[9px] font-black text-navy/40 uppercase tracking-widest">Growth Multiplier</span>
                </div>
                <div className="text-3xl font-black text-navy tracking-tight mb-1 group-hover:text-primary transition-colors">3.5x</div>
                <p className="text-[10px] text-muted font-semibold leading-normal">Average salary increase vs local baseline packages.</p>
              </div>

              <div className="bg-cream/20 p-5 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium hover:border-accent/20 transition-all duration-300 group select-none">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                    <Zap size={14} />
                  </div>
                  <span className="text-[9px] font-black text-navy/40 uppercase tracking-widest">Payback Rate</span>
                </div>
                <div className="text-3xl font-black text-navy tracking-tight mb-1 group-hover:text-accent transition-colors">&lt; 90 Days</div>
                <p className="text-[10px] text-muted font-semibold leading-normal">Full educational investment recovery period post graduation.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-br from-cream/30 via-sky/10 to-sky/20 rounded-[32px] p-8 sm:p-10 shadow-premium border border-border/40 space-y-6"
          >
            <div className="space-y-1">
              <h4 className="text-sm font-black text-navy uppercase tracking-wider">Salary Benchmarks</h4>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Domain range & placement averages</p>
            </div>

            <div className="space-y-5 pt-2">
              {salaryBenchmarks.map((bench, i) => (
                <div key={i} className="space-y-2 hover:translate-x-1 transition-transform duration-300">
                  <div className="flex justify-between items-end text-xs">
                    <p className="font-black text-navy uppercase tracking-wider">{bench.role}</p>
                    <p className="font-black text-primary">{bench.value}-{bench.max} LPA</p>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden p-0.5 shadow-inner border border-border/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(bench.value / 15) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                      className={`h-full ${bench.color} rounded-full relative group`}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full m-0.5 shadow-sm" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-border/30 flex items-center gap-3 text-navy/35 font-bold text-[9px] uppercase tracking-widest">
              <CheckCircle2 className="text-emerald-500" size={14} />
              <span>Based on 2,000+ placements in 2025-26</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Compact Final CTA */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto rounded-3xl bg-sky/40 py-16 px-6 text-center border border-border/30 shadow-soft relative overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full pointer-events-none"
          />
          <div className="relative z-10 space-y-6">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-heading font-black text-navy tracking-tight"
            >
              Ready to be our next <br />
              <span className="text-gradient">success story?</span>
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 bg-navy text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-md active:scale-95"
            >
              Apply for Next Batch
            </motion.button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 bg-white border-t border-border/40 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-navy/20 text-[9px] font-black uppercase tracking-widest">© 2026 Ascope Tech. Global placement division.</p>
          <div className="flex gap-6">
            {['Success Reports', 'Hiring Portal', 'Alumni Network'].map(t => (
              <a key={t} href="#" className="text-navy/20 text-[9px] font-black uppercase tracking-widest hover:text-navy transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Global Marquee Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Placements;
