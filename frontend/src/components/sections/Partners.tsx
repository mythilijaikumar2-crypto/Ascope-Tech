import React from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Exact Brand SVGs from your design specification
───────────────────────────────────────────── */

const TCSIcon: React.FC = () => (
  <svg className="h-7 w-auto shrink-0" viewBox="0 5 38 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tcsGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f58220" />
        <stop offset="35%" stopColor="#e01b84" />
        <stop offset="70%" stopColor="#7a2583" />
        <stop offset="100%" stopColor="#0072bc" />
      </linearGradient>
    </defs>
    <path d="M7 6v5H3.5c-.3 0-.5.2-.5.5v1.5c0 .3.2.5.5.5H7v8c0 1.7 1.3 3 3 3h2c.3 0 .5-.2.5-.5v-1.5c0-.3-.2-.5-.5-.5h-1c-.6 0-1-.4-1-1v-7.5h3.5c.3 0 .5-.2.5-.5v-1.5c0-.3-.2-.5-.5-.5H10V6c0-.3-.2-.5-.5-.5H7.5c-.3 0-.5.2-.5.5z" fill="url(#tcsGrad2)" />
    <path d="M23.5 11.5c-1.2-1.2-2.8-2-4.8-2-3.5 0-6.5 2.8-6.5 6.5s3 6.5 6.5 6.5c2 0 3.6-.8 4.8-2 .3-.3.3-.8 0-1.1l-1.2-1.2c-.3-.3-.8-.3-1.1 0-.8.6-1.6 1.1-2.5 1.1-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2c.9 0 1.7.5 2.5 1.1.3.3.8.3 1.1 0l1.2-1.2c.3-.3.3-.8 0-1.1z" fill="url(#tcsGrad2)" />
    <path d="M29.5 11c-1.8 0-3.2 1-3.2 2.5v.5c0 1.2 1 2 2.8 2.4h.8c1.2.3 1.6.6 1.6 1.2v.4c0 .6-.6 1.2-1.6 1.2h-2.8c-.5 0-.8.3-.8.8v1.5c0 .5.3.8.8.8H30.5c2.6 0 4.8-1.6 4.8-3.6v-.4c0-1.6-1.2-2.4-3.2-2.8h-.8c-1.2-.3-1.6-.6-1.6-1.2v-.4c0-.6.6-1.2 1.6-1.2h2.4c.5 0 .8-.3.8-.8v-1.5c0-.5-.3-.8-.8-.8h-2z" fill="url(#tcsGrad2)" />
  </svg>
);

const InfosysIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="16" fill="#007cc3" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.03em">Infosys</text>
  </svg>
);

const WiproIcon: React.FC = () => (
  <svg className="h-7 w-auto shrink-0" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(14, 14)">
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
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="18" fill="#0056b3" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="18" letterSpacing="-0.03em">HCL<tspan fill="#007bff">Tech</tspan></text>
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
  <div className="flex items-center gap-0.5 shrink-0 font-sans font-black text-white text-[11px] select-none">
    <div className="w-[20px] h-[20px] bg-[#e11d48] rounded-[2px] flex items-center justify-center shadow-md transform rotate-[-4deg]">Z</div>
    <div className="w-[20px] h-[20px] bg-[#16a34a] rounded-[2px] flex items-center justify-center shadow-md transform rotate-[2deg] -translate-y-[1px]">O</div>
    <div className="w-[20px] h-[20px] bg-[#2563eb] rounded-[2px] flex items-center justify-center shadow-md transform rotate-[-3deg]">H</div>
    <div className="w-[20px] h-[20px] bg-[#ca8a04] rounded-[2px] flex items-center justify-center shadow-md transform rotate-[4deg]">O</div>
  </div>
);

const HexawareIcon: React.FC = () => (
  <svg className="h-7 w-auto shrink-0" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 2)">
      <rect x="8" y="2" width="3.5" height="15" rx="1.5" fill="#004b87" />
      <rect x="3" y="7" width="13.5" height="3.5" rx="1.5" fill="#e31b23" />
      <circle cx="17.5" cy="14" r="2.2" fill="#ffc20e" />
    </g>
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
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6l5 4.5-5 4.5" stroke="#a100ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const LtiMindtreeIcon: React.FC = () => (
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 1)">
      <circle cx="10" cy="10" r="9" stroke="#003566" strokeWidth="1.8" fill="none" />
      <path d="M4 10h12M10 4l-3.5 3.5 3.5 3.5" stroke="#003566" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  </svg>
);

/* ─────────────────────────────────────────────
   Exact array of requested companies
───────────────────────────────────────────── */
const partners = [
  { name: "TCS",           icon: <TCSIcon /> },
  { name: "Infosys",       icon: <InfosysIcon /> },
  { name: "Wipro",         icon: <WiproIcon /> },
  { name: "HCLTech",       icon: <HclTechIcon /> },
  { name: "Cognizant",     icon: <CognizantIcon /> },
  { name: "Zoho",          icon: <ZohoIcon /> },
  { name: "Hexaware",      icon: <HexawareIcon /> },
  { name: "Capgemini",     icon: <CapgeminiIcon /> },
  { name: "Accenture",     icon: <AccentureIcon /> },
  { name: "LTIMindtree",   icon: <LtiMindtreeIcon /> }
];

const Partners: React.FC = () => {
  // Triple the array to ensure ultra-smooth seamless carousel loops without jumps
  const doubled = [...partners, ...partners, ...partners];

  return (
    <section className="py-20 bg-cream overflow-hidden border-y border-border/50 select-none">
      <div className="w-full">
        <p className="text-center text-muted font-black uppercase tracking-[0.3em] text-xs mb-10">
          Our Graduates Work At
        </p>

        {/* Infinite scrolling marquee wrapper */}
        <div className="relative w-full flex items-center overflow-hidden">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-cream to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-cream to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
            style={{
              width: "fit-content",
              willChange: "transform",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            {doubled.map((partner, idx) => (
              <div
                key={idx}
                className="h-14 min-w-[140px] inline-flex items-center justify-center bg-white px-6 rounded-2xl border border-border/40 shadow-soft hover:shadow-premium transition-all duration-300 select-none cursor-default group"
              >
                <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {partner.icon}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
