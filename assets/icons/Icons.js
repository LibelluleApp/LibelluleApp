import * as React from "react";
import Svg, {
  Path,
  G,
  Defs,
  ClipPath,
  Circle,
  Rect,
  Line,
} from "react-native-svg";

// Login / Inputs

// Eye - Lucide
function Eye(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-eye"
      {...props}
    >
      <Path d="M2.062 12.348a1 1 0 010-.696 10.75 10.75 0 0119.876 0 1 1 0 010 .696 10.75 10.75 0 01-19.876 0" />
      <Circle cx={12} cy={12} r={3} />
    </Svg>
  );
}

// EyeSlash - Lucide
function EyeSlash(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-eye-off"
      {...props}
    >
      <Path d="M10.733 5.076a10.744 10.744 0 0111.205 6.575 1 1 0 010 .696 10.747 10.747 0 01-1.444 2.49M14.084 14.158a3 3 0 01-4.242-4.242" />
      <Path d="M17.479 17.499a10.75 10.75 0 01-15.417-5.151 1 1 0 010-.696 10.75 10.75 0 014.446-5.143M2 2l20 20" />
    </Svg>
  );
}

// Icône NavBar

function Home(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-house"
      {...props}
    >
      <Path d="M15 21v-8a1 1 0 00-1-1h-4a1 1 0 00-1 1v8" />
      <Path d="M3 10a2 2 0 01.709-1.528l7-5.999a2 2 0 012.582 0l7 5.999A2 2 0 0121 10v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </Svg>
  );
}
function Calendar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-calendar"
      {...props}
    >
      <Path d="M8 2v4M16 2v4" />
      <Rect width={18} height={18} x={3} y={4} rx={2} />
      <Path d="M3 10h18" />
    </Svg>
  );
}
function Check(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-check"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M9 12l2 2 4-4" />
    </Svg>
  );
}

function Envelope(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-mail"
      {...props}
    >
      <Rect width={20} height={16} x={2} y={4} rx={2} />
      <Path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </Svg>
  );
}
function User(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-user"
      {...props}
    >
      <Path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
      <Circle cx={12} cy={7} r={4} />
    </Svg>
  );
}

// -----

// Bell - Lucide
function Bell(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-bell"
      {...props}
    >
      <Path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 003.4 0" />
    </Svg>
  );
}

// MapPin - Lucide
function MapPin(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-map-pin"
      {...props}
    >
      <Path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 01-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0116 0" />
      <Circle cx={12} cy={10} r={3} />
    </Svg>
  );
}

// UserRound - Lucide
function UserRound(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-user-round"
      {...props}
    >
      <Circle cx={12} cy={8} r={5} />
      <Path d="M20 21a8 8 0 00-16 0" />
    </Svg>
  );
}

// UsersRound - Lucide

function UsersRound(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-users-round"
      {...props}
    >
      <Path d="M18 21a8 8 0 00-16 0" />
      <Circle cx={10} cy={8} r={5} />
      <Path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 00-.45-8.3" />
    </Svg>
  );
}

// Clock - Lucide
function Clock(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-clock"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 6L12 12 16 14" />
    </Svg>
  );
}

// CircleAlert - Lucide
function CircleAlert(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-alert"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 8L12 12" />
      <Path d="M12 16L12.01 16" />
    </Svg>
  );
}

// ThumbsUp - Flaticon
function ThumbsUp(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-thumbs-up"
      {...props}
    >
      <Path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2a3.13 3.13 0 013 3.88z" />
    </Svg>
  );
}

// ChevronRight - Lucide
function ChevronRight(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-right"
      {...props}
    >
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  );
}

// Link - Lucide
function Link(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-link"
      {...props}
    >
      <Path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <Path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </Svg>
  );
}

// Ustensils - Lucide
function Utensils(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-utensils"
      {...props}
    >
      <Path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </Svg>
  );
}

// BookOpen - Lucide
function BookOpen(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-book-open"
      {...props}
    >
      <Path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </Svg>
  );
}

// Mortarboard01 - HugeIcon
function Student(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color="#000"
      fill="none"
      {...props}
    >
      <Path
        d="M1.998 8c0 1.341 8.096 5 9.988 5 1.891 0 9.987-3.659 9.987-5 0-1.343-8.096-5.001-9.987-5.001-1.892 0-9.988 3.658-9.988 5z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
      <Path
        d="M5.992 11l1.251 5.8c.086.398.284.769.614 1.005 2.222 1.595 6.034 1.595 8.256 0 .33-.236.527-.607.613-1.005l1.251-5.8M20.477 9.5v7m0 0c-.79 1.447-1.14 2.222-1.496 3.501-.077.455-.016.684.298.888.127.083.28.112.431.112h1.519a.798.798 0 00.457-.125c.291-.201.366-.422.287-.875-.311-1.188-.708-2-1.496-3.5z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
    </Svg>
  );
}

// SquareArrowOutUpRight - Lucide
function RedirectTo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-square-arrow-out-up-right"
      {...props}
    >
      <Path d="M21 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6M21 3l-9 9M15 3h6v6" />
    </Svg>
  );
}

// Phone - Lucide
function Phone(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-phone"
      {...props}
    >
      <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </Svg>
  );
}

// Info - Lucide
function Info(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-info"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 16v-4M12 8h.01" />
    </Svg>
  );
}

// ArrowRight - Lucide
function ArrowRight(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-right"
      {...props}
    >
      <Path d="M5 12h14M12 5l7 7-7 7" />
    </Svg>
  );
}

// ArrowLeft - Lucide
function ArrowLeft(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-left"
      {...props}
    >
      <Path d="M12 19l-7-7 7-7M19 12H5" />
    </Svg>
  );
}

// ChevronUpDown - Lucide
function ChevronUpDown(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevrons-up-down"
      {...props}
    >
      <Path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
    </Svg>
  );
}

// ChevronDown - Lucide
function ChevronDown(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-down"
      {...props}
    >
      <Path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

// LayoutList - Lucide
function LayoutList(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-layout-list"
      {...props}
    >
      <Rect width={7} height={7} x={3} y={3} rx={1} />
      <Rect width={7} height={7} x={3} y={14} rx={1} />
      <Path d="M14 4h7M14 9h7M14 15h7M14 20h7" />
    </Svg>
  );
}

// DoorOpen - Lucide
function DoorOpen(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-door-open"
      {...props}
    >
      <Path d="M13 4h3a2 2 0 012 2v14M2 20h3M13 20h9M10 12v.01M13 4.562v16.157a1 1 0 01-1.242.97L5 20V5.562a2 2 0 011.515-1.94l4-1A2 2 0 0113 4.561z" />
    </Svg>
  );
}

// Hourglass - Lucide
function Hourglass(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-hourglass"
      {...props}
    >
      <Path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 00-.586-1.414L12 12l-4.414 4.414A2 2 0 007 17.828V22M7 2v4.172a2 2 0 00.586 1.414L12 12l4.414-4.414A2 2 0 0017 6.172V2" />
    </Svg>
  );
}

// Clock2 - Lucide
function Clock2(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-clock-2"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 6L12 12 16 10" />
    </Svg>
  );
}

// Clock8 - Lucide
function Clock8(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-clock-8"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 6L12 12 8 14" />
    </Svg>
  );
}

// ImageUp - Lucide
function ImageUp(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-image-up"
      {...props}
    >
      <Path d="M10.3 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10l-3.1-3.1a2 2 0 00-2.814.014L6 21" />
      <Path d="M14 19.5l3-3 3 3M17 22v-5.5" />
      <Circle cx={9} cy={9} r={2} />
    </Svg>
  );
}

// IdCard - Lucide
function IdCard(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-id-card"
      {...props}
    >
      <Path d="M16 10h2M16 14h2M6.17 15a3 3 0 015.66 0" />
      <Circle cx={9} cy={11} r={2} />
      <Rect x={2} y={5} width={20} height={14} rx={2} />
    </Svg>
  );
}

// Lock - Lucide
function Lock(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-lock"
      {...props}
    >
      <Rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
      <Path d="M7 11V7a5 5 0 0110 0v4" />
    </Svg>
  );
}

// UserRoundPen - Lucide
function UserRoundPen(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-user-round-pen"
      {...props}
    >
      <Path d="M2 21a8 8 0 0110.821-7.487M21.378 16.626a1 1 0 00-3.004-3.004l-4.01 4.012a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506z" />
      <Circle cx={10} cy={8} r={5} />
    </Svg>
  );
}

// Instagram - Lucide
function InstaIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-instagram"
      {...props}
    >
      <Rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
      <Path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <Path d="M17.5 6.5L17.51 6.5" />
    </Svg>
  );
}

// Settings - Lucide

function Settings(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-settings"
      {...props}
    >
      <Path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
      <Circle cx={12} cy={12} r={3} />
    </Svg>
  );
}

// NotepadText - Lucide
function NotepadText(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-notepad-text"
      {...props}
    >
      <Path d="M8 2v4M12 2v4M16 2v4" />
      <Rect width={16} height={18} x={4} y={4} rx={2} />
      <Path d="M8 10h6M8 14h8M8 18h5" />
    </Svg>
  );
}

// Landmark - Lucide
function Landmark(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-landmark"
      {...props}
    >
      <Path d="M3 22L21 22" />
      <Path d="M6 18L6 11" />
      <Path d="M10 18L10 11" />
      <Path d="M14 18L14 11" />
      <Path d="M18 18L18 11" />
      <Path d="M12 2L20 7 4 7z" />
    </Svg>
  );
}

// Plus - Lucide
function Plus(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-plus"
      {...props}
    >
      <Path d="M5 12h14M12 5v14" />
    </Svg>
  );
}

// ResetList - Lucide
function ResetList(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-list-restart"
      {...props}
    >
      <Path d="M21 6H3M7 12H3M7 18H3M12 18a5 5 0 009-3 4.5 4.5 0 00-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14" />
      <Path d="M11 10v4h4" />
    </Svg>
  );
}

// LogOut- Lucide
function LogOut(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-log-out"
      {...props}
    >
      <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <Path d="M16 17L21 12 16 7" />
      <Path d="M21 12L9 12" />
    </Svg>
  );
}

// UserX - Lucide
function UserX(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-user-x"
      {...props}
    >
      <Path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <Circle cx={9} cy={7} r={4} />
      <Path d="M17 8L22 13" />
      <Path d="M22 8L17 13" />
    </Svg>
  );
}

// --- Weather ---

// Thermometer - Lucide

function Thermometer(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-thermometer"
      {...props}
    >
      <Path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z" />
    </Svg>
  );
}

// Cloud - Lucide

function Cloud(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-cloud"
      {...props}
    >
      <Path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z" />
    </Svg>
  );
}

// Sun - Lucide

function Sun(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-sun"
      {...props}
    >
      <Circle cx={12} cy={12} r={4} />
      <Path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </Svg>
  );
}

// CloudRain - Lucide

function CloudRain(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-cloud-rain"
      {...props}
    >
      <Path d="M4 14.899A7 7 0 1115.71 8h1.79a4.5 4.5 0 012.5 8.242M16 14v6M8 14v6M12 16v6" />
    </Svg>
  );
}

// CloudSun - Lucide

function CloudSun(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-cloud-sun"
      {...props}
    >
      <Path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.947 12.65a4 4 0 00-5.925-4.128M13 22H7a5 5 0 114.9-6H13a3 3 0 010 6z" />
    </Svg>
  );
}

// Cloudy - Lucide

function Cloudy(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-cloudy"
      {...props}
    >
      <Path d="M17.5 21H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z" />
      <Path d="M22 10a3 3 0 00-3-3h-2.207a5.502 5.502 0 00-10.702.5" />
    </Svg>
  );
}

// CloudSunRain - Lucide

function CloudSunRain(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-cloud-sun-rain"
      {...props}
    >
      <Path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.947 12.65a4 4 0 00-5.925-4.128M3 20a5 5 0 118.9-4H13a3 3 0 012 5.24M11 20v2M7 19v2" />
    </Svg>
  );
}

// CloudLightning - Lucide

function CloudLightning(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-cloud-lightning"
      {...props}
    >
      <Path d="M6 16.326A7 7 0 1115.71 8h1.79a4.5 4.5 0 01.5 8.973" />
      <Path d="M13 12l-3 5h4l-3 5" />
    </Svg>
  );
}

// SnowFlake - Lucide

function SnowFlake(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-snowflake"
      {...props}
    >
      <Path d="M2 12L22 12" />
      <Path d="M12 2L12 22" />
      <Path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4" />
    </Svg>
  );
}

// Waves - Lucide

function Waves(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-waves"
      {...props}
    >
      <Path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </Svg>
  );
}

// --- Shapes ---

function CircleHome(props) {
  return (
    <Svg
      width={127}
      height={127}
      viewBox="0 0 127 127"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={63.5} cy={63.5} r={62.5} stroke="#0760FB" strokeWidth={0.5} />
    </Svg>
  );
}
function SquareHome(props) {
  return (
    <Svg
      width={69}
      height={69}
      viewBox="0 0 69 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={23.5665}
        y={-3}
        width={55.3111}
        height={55.3111}
        rx={10}
        transform="rotate(28.706 23.567 -3)"
        stroke="#0760FB"
        strokeWidth={0.5}
      />
    </Svg>
  );
}
export {
  // Login / Register
  Eye,
  EyeSlash,

  // Icon NavBar
  Home,
  Calendar,
  Check,
  Envelope,
  User,

  // ----
  Bell,
  MapPin,
  UserRound,
  UsersRound,
  Clock,
  CircleAlert,
  ChevronRight,
  Link,
  Utensils,
  BookOpen,
  Student,
  RedirectTo,
  Phone,
  Info,
  ArrowRight,
  ArrowLeft,
  ChevronUpDown,
  ChevronDown,
  ThumbsUp,
  LayoutList,
  DoorOpen,
  Hourglass,
  Clock2,
  Clock8,
  ImageUp,
  IdCard,
  Lock,
  UserRoundPen,
  InstaIcon,
  Settings,
  NotepadText,
  Landmark,
  Plus,
  ResetList,
  LogOut,
  UserX,

  // Weather
  Thermometer,
  Cloud,
  Sun,
  CloudRain,
  CloudSun,
  Cloudy,
  CloudSunRain,
  CloudLightning,
  SnowFlake,
  Waves,

  // Shapes
  CircleHome,
  SquareHome,
};
