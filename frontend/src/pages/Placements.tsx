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
  <svg className="h-8 w-auto shrink-0" viewBox="0 0 376.8 296.5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path id="path999" d="m341.1 116.4c2.1 8 10.3 12.8 18.4 10.6 8-2.1 12.8-10.3 10.6-18.4-2.1-8-10.3-12.8-18.4-10.6-7.9 2.2-12.7 10.4-10.6 18.4z" fill="#2A4C87" />
  <path id="path1001" d="m320.8 132.4c5.4-1.5 8.7-7.1 7.2-12.5s-7.1-8.7-12.5-7.2-8.7 7.1-7.2 12.5c1.4 5.4 7 8.6 12.5 7.2z" fill="#2A4C87" />
  <path id="path1003" d="m290.8 137.6c4-1.1 6.4-5.2 5.3-9.2s-5.2-6.4-9.2-5.3-6.4 5.2-5.3 9.2 5.2 6.4 9.2 5.3z" fill="#2A4C87" />
  <path id="path1005" d="m267.5 141.1c2.5-0.7 4-3.3 3.4-5.8s-3.3-4-5.8-3.4c-2.5 0.7-4 3.3-3.4 5.8s3.2 4 5.8 3.4z" fill="#2E4E88" />
  <path id="path1007" d="m330 86c3.8 6.5 12.1 8.8 18.6 5s8.8-12.1 5-18.6-12.1-8.8-18.6-5-8.8 12.1-5 18.6z" fill="#1F3D70" />
  <path id="path1009" d="m299.9 103.3c2.6 4.6 8.4 6.1 13 3.5s6.1-8.4 3.5-13-8.4-6.1-13-3.5c-4.5 2.6-6.1 8.4-3.5 13z" fill="#1F3D70" />
  <path id="path1011" d="m278.5 107.8c-3.3 1.9-4.4 6-2.5 9.3s6 4.4 9.3 2.5 4.4-6 2.5-9.3c-1.8-3.2-6-4.3-9.3-2.5z" fill="#1F3D70" />
  <path id="path1013" d="m259.4 121.6c-2.1 1.2-2.9 3.9-1.7 6s3.9 2.9 6 1.7 2.9-3.9 1.7-6-3.9-2.9-6-1.7z" fill="#1F3D70" />
  <path id="path1015" d="m328.5 59.3c4.8-4.8 4.8-12.5 0-17.3s-12.5-4.8-17.3 0-4.8 12.5 0 17.3c4.7 4.8 12.5 4.8 17.3 0z" fill="#194C88" />
  <path id="path1017" d="m298.6 71.8c-3.5-3.5-9.1-3.5-12.5 0-3.5 3.5-3.5 9.1 0 12.5 3.5 3.5 9.1 3.5 12.5 0 3.5-3.5 3.5-9.1 0-12.5z" fill="#194C88" />
  <path id="path1019" d="m266.6 95.1c-2.4 2.4-2.4 6.3 0 8.7s6.3 2.4 8.7 0 2.4-6.3 0-8.6c-2.4-2.5-6.3-2.5-8.7-0.1z" fill="#194C88" />
  <path id="path1021" d="m251.5 118.9c1.6 1.6 4.2 1.6 5.8 0s1.6-4.2 0-5.8-4.2-1.6-5.8 0-1.6 4.2 0 5.8z" fill="#194C88" />
  <path id="path1023" d="m285.4 38.7c5.5 3.2 12.6 1.3 15.8-4.2s1.3-12.6-4.2-15.8-12.6-1.3-15.8 4.2c-3.3 5.5-1.4 12.6 4.2 15.8-0.1 0 0 0 0 0z" fill="#3468A3" />
  <path id="path1025" d="m264.7 58.2c-2.3 3.9-0.9 8.9 3 11.2s8.9 0.9 11.2-3 0.9-8.9-3-11.2c-4-2.3-9-0.9-11.2 3z" fill="#3468A3" />
  <path id="path1027" d="m259.3 83.8c-2.6-1.5-5.9-0.6-7.4 2s-0.6 5.9 2 7.4 5.9 0.6 7.4-2 0.6-5.9-2-7.4z" fill="#3468A3" />
  <path id="path1029" d="m246.7 105.6c-1.8-1-4.1-0.4-5.1 1.4s-0.4 4.1 1.4 5.1 4.1 0.4 5.1-1.4 0.4-4.1-1.4-5.1z" fill="#3468A3" />
  <path id="path1031" d="m255 25.4c5.8 1.6 11.8-1.9 13.3-7.7 1.6-5.8-1.9-11.8-7.7-13.3s-11.8 1.9-13.3 7.7c-1.6 5.8 1.9 11.8 7.7 13.3z" fill="#4C8DCB" />
  <path id="path1033" d="m245.8 59.6c4 1.1 8.1-1.3 9.2-5.3s-1.3-8.1-5.3-9.2-8.1 1.3-9.2 5.3c-1 4 1.3 8.1 5.3 9.2z" fill="#4C8DCB" />
  <path id="path1035" d="m238.6 86.6c2.7 0.7 5.5-0.9 6.2-3.6s-0.9-5.5-3.6-6.2-5.5 0.9-6.2 3.6c-0.7 2.6 0.9 5.4 3.6 6.2z" fill="#4C8DCB" />
  <path id="path1037" d="m230.6 103.4c-0.5 1.8 0.6 3.7 2.4 4.2s3.7-0.6 4.2-2.4-0.6-3.7-2.4-4.2c-1.9-0.5-3.8 0.6-4.2 2.4z" fill="#4C8DCB" />
  <path id="path1039" d="m222 20.4c5.6 0 10.2-4.6 10.2-10.2s-4.6-10.2-10.2-10.2-10.2 4.6-10.2 10.2c0 5.7 4.6 10.2 10.2 10.2z" fill="#3498B3" />
  <path id="path1041" d="m222 42.2c-3.8 0-6.8 3-6.8 6.8s3 6.8 6.8 6.8 6.8-3 6.8-6.8c0-3.7-3-6.8-6.8-6.8z" fill="#3498B3" />
  <path id="path1043" d="m226.8 79.3c0-2.6-2.1-4.8-4.8-4.8s-4.8 2.1-4.8 4.8 2.1 4.8 4.8 4.8 4.8-2.2 4.8-4.8z" fill="#3498B3" />
  <path id="path1045" d="m222 99.7c-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1-1.4-3.1-3.1-3.1z" fill="#3498B3" />
  <path id="path1047" d="m188.7 24.2c5.1-1.4 8.1-6.6 6.7-11.7s-6.6-8.1-11.7-6.7-8.1 6.6-6.7 11.7c1.4 5 6.7 8 11.7 6.7z" fill="#0AA496" />
  <path id="path1049" d="m190.4 54c0.9 3.3 4.2 5.2 7.5 4.3s5.2-4.2 4.3-7.5-4.2-5.2-7.5-4.3c-3.2 0.9-5.2 4.3-4.3 7.5z" fill="#0AA496" />
  <path id="path1051" d="m199.9 82.9c0.6 2.4 3.1 3.8 5.4 3.1 2.4-0.6 3.8-3.1 3.1-5.4-0.6-2.4-3.1-3.8-5.4-3.1-2.4 0.6-3.7 3-3.1 5.4v0z" fill="#0AA496" />
  <path id="path1053" d="m207.6 105.1c0.4 1.5 1.9 2.3 3.3 1.9 1.5-0.4 2.3-1.9 1.9-3.3-0.4-1.5-1.9-2.3-3.3-1.9s-2.3 1.8-1.9 3.3z" fill="#0AA496" />
  <path id="path1055" d="m157.4 36.5c4.2-2.4 5.7-7.9 3.3-12.1s-7.9-5.7-12.1-3.3-5.7 7.9-3.3 12.1c2.5 4.3 7.9 5.7 12.1 3.3z" fill="#00AA75" />
  <path id="path1057" d="m175.1 67.1c2.6-1.5 3.5-4.8 2-7.4s-4.8-3.5-7.4-2-3.5 4.8-2 7.4c1.4 2.6 4.8 3.5 7.4 2z" fill="#00AA75" />
  <path id="path1059" d="m189.5 92.2c2-1.1 2.6-3.6 1.5-5.6s-3.6-2.6-5.6-1.5-2.6 3.6-1.5 5.6c1.2 1.9 3.7 2.6 5.6 1.5z" fill="#00AA75" />
  <path id="path1061" d="m201.3 107.8c-0.7-1.1-2.1-1.5-3.3-0.9-1.1 0.7-1.5 2.1-0.9 3.3 0.7 1.1 2.1 1.5 3.2 0.9 1.3-0.7 1.7-2.2 1-3.3z" fill="#00AA75" />
  <path id="path1063" d="m130.1 56.6c3.2-3.2 3.2-8.4 0-11.6s-8.4-3.2-11.6 0-3.2 8.4 0 11.6c3.3 3.2 8.5 3.2 11.6 0z" fill="#4FBA6A" />
  <path id="path1065" d="m155.2 74.9c-1.9-1.9-4.9-1.9-6.7 0-1.9 1.9-1.9 4.9 0 6.7 1.9 1.9 4.9 1.9 6.7 0s1.8-4.9 0-6.7z" fill="#4FBA6A" />
  <path id="path1067" d="m175.9 97c-1.5-1.5-3.8-1.5-5.3 0s-1.5 3.8 0 5.3 3.8 1.5 5.3 0c1.4-1.5 1.4-3.8 0-5.3z" fill="#4FBA6A" />
  <path id="path1069" d="m191.3 114.8c-0.8-0.8-2.1-0.7-2.8 0.1-0.8 0.8-0.7 2.1 0.1 2.8s2 0.7 2.8 0c0.7-0.8 0.7-2.1-0.1-2.9z" fill="#4FBA6A" />
  <path id="path1071" d="m98.5 85.7c3.6 2.1 8.2 0.8 10.2-2.7 2.1-3.6 0.8-8.2-2.7-10.2-3.6-2.1-8.2-0.8-10.2 2.7-2.1 3.5-0.9 8.1 2.7 10.2z" fill="#7EC45F" />
  <path id="path1073" d="m138.1 95.3c-2-1.1-4.4-0.4-5.6 1.5-1.1 2-0.4 4.4 1.5 5.6 2 1.1 4.4 0.5 5.6-1.5 1.1-2 0.4-4.5-1.5-5.6z" fill="#7EC45F" />
  <path id="path1075" d="m164 111c-1.6-0.9-3.7-0.4-4.6 1.3-0.9 1.6-0.4 3.7 1.3 4.6 1.6 0.9 3.7 0.4 4.6-1.2s0.3-3.7-1.3-4.7z" fill="#7EC45F" />
  <path id="path1077" d="m360.4 131.9c-9 0-16.4 7.3-16.4 16.4 0 9 7.3 16.4 16.4 16.4 9 0 16.3-7.3 16.4-16.3-0.1-9.1-7.4-16.5-16.4-16.5z" fill="#4C609B" />
  <path id="path1079" d="m333.3 148.3c0-6.5-5.2-11.7-11.7-11.7s-11.7 5.2-11.7 11.7 5.2 11.7 11.7 11.7c6.4 0 11.7-5.2 11.7-11.7z" fill="#4C609B" />
  <path id="path1081" d="m291.3 140.3c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" fill="#4C609B" />
  <path id="path1083" d="m273 148.3c0-2.9-2.3-5.2-5.2-5.2s-5.2 2.3-5.2 5.2 2.3 5.2 5.2 5.2 5.2-2.3 5.2-5.2z" fill="#54669F" />
  <path id="path1085" d="m359.5 169.5c-8-2.2-16.2 2.6-18.4 10.6s2.6 16.2 10.6 18.4 16.2-2.6 18.4-10.6v-0.1c2.1-7.9-2.7-16.1-10.6-18.3z" fill="#746FA7" />
  <path id="path1087" d="m315.5 183.8c5.4 1.5 11-1.8 12.5-7.2s-1.8-11-7.2-12.5-11 1.8-12.5 7.2 1.7 11 7.2 12.5z" fill="#746FA7" />
  <path id="path1089" d="m286.9 173.4c4 1.1 8.1-1.3 9.2-5.3s-1.3-8.1-5.3-9.2-8.1 1.3-9.2 5.3c-1 4 1.3 8.1 5.3 9.2z" fill="#746FA7" />
  <path id="path1091" d="m265 164.7c2.5 0.7 5.1-0.8 5.8-3.4 0.7-2.5-0.8-5.1-3.4-5.8-2.5-0.7-5.1 0.8-5.8 3.4-0.7 2.4 0.8 5.1 3.4 5.8v0z" fill="#746FA7" />
  <path id="path1093" d="m348.6 205.5c-6.5-3.8-14.8-1.5-18.6 5s-1.5 14.8 5 18.6 14.8 1.5 18.6-5c3.7-6.5 1.5-14.8-5-18.6z" fill="#99558E" />
  <path id="path1095" d="m316.5 202.7c2.6-4.6 1.1-10.4-3.5-13s-10.4-1.1-13 3.5-1.1 10.4 3.5 13c4.5 2.6 10.3 1 13-3.5z" fill="#99558E" />
  <path id="path1097" d="m287.8 186.2c1.9-3.3 0.8-7.4-2.5-9.3s-7.4-0.8-9.3 2.5-0.8 7.4 2.5 9.3c3.3 1.8 7.4 0.7 9.3-2.5z" fill="#99558E" />
  <path id="path1099" d="m265.5 173.2c1.2-2.1 0.5-4.8-1.6-6.1-2.1-1.2-4.8-0.5-6.1 1.6s-0.5 4.8 1.6 6.1h0.1c2.1 1.2 4.8 0.5 6-1.6z" fill="#99558E" />
  <path id="path1101" d="m311.1 237.2c-4.8 4.8-4.8 12.5 0 17.3s12.5 4.8 17.3 0 4.8-12.5 0-17.3c-4.7-4.7-12.5-4.7-17.3 0z" fill="#AF3379" />
  <path id="path1103" d="m298.6 224.7c3.5-3.5 3.5-9.1 0-12.5-3.5-3.5-9.1-3.5-12.5 0-3.5 3.5-3.5 9.1 0 12.5 3.4 3.5 9 3.5 12.5 0z" fill="#AF3379" />
  <path id="path1105" d="m275.3 201.4c2.4-2.4 2.4-6.3 0-8.7s-6.3-2.4-8.7 0-2.4 6.3 0 8.6c2.4 2.5 6.3 2.5 8.7 0.1z" fill="#AF3379" />
  <path id="path1107" d="m251.5 183.3c1.6 1.6 4.2 1.6 5.8 0s1.6-4.2 0-5.8-4.2-1.6-5.8 0-1.6 4.2 0 5.8z" fill="#AF3379" />
  <path id="path1109" d="m285.4 257.8c-5.5 3.2-7.4 10.3-4.2 15.8s10.3 7.4 15.8 4.2 7.4-10.3 4.2-15.8-10.3-7.4-15.8-4.2z" fill="#BE266A" />
  <path id="path1111" d="m278.8 230.2c-2.3-3.9-7.2-5.3-11.2-3-3.9 2.3-5.3 7.2-3 11.2 2.3 3.9 7.2 5.3 11.2 3 3.9-2.3 5.3-7.3 3-11.2z" fill="#BE266A" />
  <path id="path1113" d="m259.3 212.7c2.6-1.5 3.5-4.8 2-7.4s-4.8-3.5-7.4-2-3.5 4.8-2 7.4 4.8 3.5 7.4 2z" fill="#BE266A" />
  <path id="path1115" d="m243 184.4c-1.8 1-2.4 3.3-1.4 5.1s3.3 2.4 5.1 1.4 2.4-3.3 1.4-5.1-3.3-2.4-5.1-1.4z" fill="#BE266A" />
  <path id="path1117" d="m255 271.1c-5.8 1.6-9.3 7.5-7.7 13.3s7.5 9.3 13.3 7.7 9.3-7.5 7.7-13.3c-1.5-5.8-7.5-9.3-13.3-7.7z" fill="#D4525C" />
  <path id="path1119" d="m249.7 251.3c4-1.1 6.4-5.2 5.3-9.2s-5.2-6.4-9.2-5.3-6.3 5.2-5.3 9.2c1.1 4.1 5.2 6.4 9.2 5.3v0z" fill="#D4525C" />
  <path id="path1121" d="m244.8 213.5c-0.7-2.7-3.5-4.3-6.2-3.6s-4.3 3.5-3.6 6.2 3.5 4.3 6.2 3.6c2.8-0.6 4.4-3.4 3.6-6.2v0z" fill="#D4525C" />
  <path id="path1123" d="m237.1 191.3c-0.5-1.8-2.4-2.9-4.2-2.4s-2.9 2.4-2.4 4.2 2.3 2.9 4.2 2.4c1.8-0.5 2.9-2.4 2.4-4.2z" fill="#D4525C" />
  <path id="path1125" d="m222 276.1c-5.6 0-10.2 4.6-10.2 10.2s4.6 10.2 10.2 10.2 10.2-4.5 10.2-10.2c0-5.6-4.5-10.2-10.2-10.2z" fill="#E0654F" />
  <path id="path1127" d="m215.2 247.5c0 3.8 3 6.8 6.8 6.8s6.8-3 6.8-6.8-3-6.8-6.8-6.8c-3.7 0-6.8 3-6.8 6.8z" fill="#E0654F" />
  <path id="path1129" d="m222 221.9c2.6 0 4.8-2.1 4.8-4.8s-2.1-4.8-4.8-4.8c-2.6 0-4.8 2.1-4.8 4.8 0.1 2.7 2.2 4.8 4.8 4.8v0z" fill="#E0654F" />
  <path id="path1131" d="m222 190.6c-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1-1.4-3.1-3.1-3.1z" fill="#E0654F" />
  <path id="path1133" d="m188.7 272.3c-5.1-1.4-10.3 1.7-11.7 6.7-1.4 5.1 1.7 10.3 6.7 11.7 5.1 1.4 10.3-1.7 11.7-6.7 1.4-5.1-1.6-10.3-6.7-11.7z" fill="#F57F2A" />
  <path id="path1135" d="m197.9 238.1c-3.3-0.9-6.6 1.1-7.5 4.3-0.9 3.3 1.1 6.6 4.3 7.5 3.3 0.9 6.6-1.1 7.5-4.3s-1-6.6-4.3-7.5z" fill="#F57F2A" />
  <path id="path1137" d="m205.3 210.5c-2.4-0.6-4.8 0.8-5.4 3.1-0.6 2.4 0.8 4.8 3.1 5.4 2.4 0.6 4.8-0.8 5.4-3.1 0.7-2.3-0.7-4.7-3.1-5.4z" fill="#F57F2A" />
  <path id="path1139" d="m212.9 192.8c0.4-1.5-0.5-3-1.9-3.3s-3 0.5-3.3 1.9 0.5 3 1.9 3.3c1.4 0.4 2.9-0.4 3.3-1.9z" fill="#F57F2A" />
  <path id="path1141" d="m157.4 260c-4.2-2.4-9.6-1-12.1 3.2-2.4 4.2-1 9.6 3.2 12.1 4.2 2.4 9.6 1 12.1-3.2s1-9.6-3.2-12.1z" fill="#F89828" />
  <path id="path1143" d="m175.1 229.4c-2.6-1.5-5.9-0.6-7.4 2s-0.6 5.9 2 7.4 5.9 0.6 7.4-2 0.6-5.9-2-7.4z" fill="#F89828" />
  <path id="path1145" d="m185.5 211.4c2 1.1 4.5 0.5 5.6-1.5s0.5-4.5-1.5-5.6-4.5-0.5-5.6 1.5-0.5 4.5 1.5 5.6z" fill="#F89828" />
  <path id="path1147" d="m200.5 185.4c-1.1-0.7-2.6-0.3-3.2 0.9-0.7 1.1-0.3 2.6 0.9 3.2 1.1 0.7 2.6 0.3 3.2-0.9 0.6-1 0.2-2.5-0.9-3.2v0z" fill="#F89828" />
  <path id="path1149" d="m118.6 239.9c-3.2 3.2-3.2 8.4 0 11.6s8.4 3.2 11.6 0 3.2-8.4 0-11.6-8.4-3.2-11.6 0z" fill="#FEC127" />
  <path id="path1151" d="m148.5 214.9c-1.9 1.9-1.9 4.9 0 6.7 1.9 1.9 4.9 1.9 6.7 0s1.9-4.9 0-6.7c-1.8-1.9-4.9-1.9-6.7 0z" fill="#FEC127" />
  <path id="path1153" d="m170.6 194.2c-1.5 1.5-1.5 3.8 0 5.3s3.8 1.5 5.3 0 1.5-3.8 0-5.3-3.9-1.5-5.3 0z" fill="#FEC127" />
  <path id="path1155" d="m191.3 178.8c-0.8-0.8-2.1-0.7-2.8 0.1-0.8 0.8-0.7 2.1 0.1 2.8s2 0.7 2.8 0c0.7-0.8 0.7-2.1-0.1-2.9z" fill="#FEC127" />
  <path id="path1157" d="m98.7 210.6c-3.6 2.1-4.8 6.6-2.7 10.2s6.6 4.8 10.2 2.7 4.8-6.6 2.7-10.2c-2-3.6-6.6-4.8-10.2-2.7z" fill="#FED627" />
  <path id="path1159" d="m134 194.1c-1.9 1.1-2.6 3.6-1.5 5.6 1.1 1.9 3.6 2.6 5.6 1.5 1.9-1.1 2.6-3.6 1.5-5.6-1.1-1.9-3.6-2.6-5.6-1.5z" fill="#FED627" />
  <path id="path1161" d="m160.6 179.6c-1.6 0.9-2.2 3-1.2 4.6 0.9 1.6 3 2.2 4.6 1.2 1.6-0.9 2.2-3 1.2-4.6-0.9-1.6-3-2.2-4.6-1.2z" fill="#FED627" />
  <path id="path1163" d="m83.5 124.5h12v46.2h-12zm7.3-20.6c-3.7-1-7.5 1.2-8.5 4.9s1.2 7.5 4.9 8.5 7.5-1.2 8.5-4.9-1.2-7.6-4.9-8.5zm41.8 67.8c-2.9 0-5.8-0.5-8.5-1.7-2.4-1.1-4.5-2.8-6.1-4.9v28.7h-11.7v-69.3h11.6v6.4c1.5-2.3 3.6-4.1 6.1-5.4 2.6-1.3 5.5-2 8.5-2 2.9 0 5.7 0.6 8.4 1.7s5.1 2.8 7.1 4.8c2.1 2.2 3.8 4.8 4.9 7.6 1.3 3.2 1.9 6.5 1.8 9.9 0.1 3.4-0.6 6.8-1.9 10-1.2 2.8-2.9 5.4-5 7.6-3.9 4.2-9.5 6.6-15.2 6.6zm-2.4-11.2c1.7 0 3.4-0.3 5-1 1.5-0.7 2.9-1.6 4.1-2.8s2.1-2.6 2.7-4.1c1.3-3.3 1.3-6.9 0-10.2-0.6-1.5-1.6-2.9-2.7-4.1-1.2-1.2-2.6-2.1-4.1-2.8-1.6-0.7-3.3-1-5-1-3.4 0-6.7 1.4-9.2 3.8-1.2 1.2-2.1 2.6-2.7 4.1-1.3 3.3-1.3 6.9 0 10.1 0.6 1.5 1.5 2.9 2.7 4.1 2.5 2.6 5.8 4 9.2 3.9zm33.1-36h11.6v7.1c1-2.5 2.7-4.6 5-6 2.4-1.3 5-2 7.8-1.9 1.5 0 2.9 0.2 4.3 0.5 1.2 0.3 2.4 0.7 3.5 1.3l-4.3 11.6c-0.8-0.5-1.7-0.9-2.6-1.2-1.2-0.3-2.4-0.5-3.6-0.5-2.7-0.1-5.3 0.8-7.3 2.5-1.8 1.7-2.7 4.5-2.7 8.3v24.4h-11.7zm58.3 47.2c-3.3 0-6.6-0.6-9.7-1.9-2.9-1.2-5.5-3-7.8-5.2-4.5-4.5-7-10.6-7-17 0-3.2 0.6-6.4 1.8-9.4 1.2-2.9 2.9-5.5 5.1-7.7 9.7-9.4 25.1-9.4 34.8 0 4.5 4.5 7.1 10.6 7.1 17 0 3.2-0.6 6.4-1.9 9.3-1.2 2.9-3 5.5-5.1 7.7-2.2 2.2-4.8 4-7.8 5.2-2.9 1.3-6.2 2-9.5 2zm0.1-11.2c1.7 0 3.4-0.3 5-1 1.5-0.7 2.8-1.6 4-2.7 1.2-1.2 2.1-2.6 2.7-4.1 1.3-3.3 1.3-6.9 0-10.1-0.6-1.5-1.5-2.9-2.7-4.1s-2.5-2.1-4-2.7c-3.2-1.4-6.8-1.4-9.9 0-1.5 0.7-2.8 1.6-4 2.7-1.2 1.2-2.1 2.6-2.7 4.1-1.3 3.3-1.3 6.9 0 10.1 0.6 1.5 1.5 2.9 2.7 4.1s2.5 2.1 4 2.7 3.2 1 4.9 1zm-221.7-36h12l9.3 29.5 11-29.5h10.4l10.8 29.5 9.7-29.5h12l-15.7 46.2h-11.1l-11-30.1-11.1 30.1h-11.3z" fill="#351A55" />
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
  <svg className="h-6 w-auto shrink-0" viewBox="0 0 114 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 12 5 L 12 25 L 30 25" stroke="#ff5a4e" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 40 5 L 64 5 M 52 5 L 52 25" stroke="#ff5a4e" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 74 25 L 74 5 L 88 16 L 102 5 L 102 25" stroke="#ff5a4e" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
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
