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

function Mail(props) {
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
function BigPouce(props) {
  return (
    <Svg
      width="31"
      height="29"
      viewBox="0 0 31 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_1239_3106)">
        <Path
          d="M28.8515 9.32947C28.2696 8.67649 27.5505 8.15289 26.7427 7.79411C25.9349 7.43532 25.0574 7.24974 24.1696 7.24993H19.2197L19.6366 4.78372C19.7841 3.91524 19.6062 3.02407 19.1351 2.27273C18.6641 1.52139 17.9314 0.959963 17.0707 0.690842C16.21 0.421721 15.2786 0.462841 14.4464 0.806701C13.6143 1.15056 12.9367 1.77425 12.5375 2.56401L10.5198 6.54547V25.3749H23.301C24.7943 25.369 26.2359 24.8412 27.3634 23.8877C28.4909 22.9341 29.2294 21.6181 29.4446 20.1791L30.3195 14.1374C30.4432 13.2804 30.3761 12.4075 30.1228 11.5779C29.8695 10.7483 29.4359 9.98149 28.8515 9.32947Z"
          fill="#12841D"
          {...props}
        />
        <Path
          d="M0.592651 13.2917V19.3333C0.594622 20.9351 1.24894 22.4707 2.41207 23.6033C3.57521 24.7359 5.1522 25.3731 6.79712 25.375H8.03801V7.25H6.79712C5.1522 7.25192 3.57521 7.88907 2.41207 9.02168C1.24894 10.1543 0.594622 11.6899 0.592651 13.2917Z"
          fill="#12841D"
          {...props}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1239_3106">
          <Rect
            width="29.7814"
            height="29"
            fill="white"
            transform="translate(0.592651)"
          />
        </ClipPath>
      </Defs>
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

function People(props) {
  return (
    <Svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clip-path="url(#clip0_307_4873)">
        <Path
          d="M9 8.5C9.89002 8.5 10.76 8.25074 11.5001 7.78375C12.2401 7.31675 12.8169 6.65299 13.1575 5.87641C13.4981 5.09982 13.5872 4.24529 13.4135 3.42087C13.2399 2.59645 12.8113 1.83917 12.182 1.2448C11.5526 0.650425 10.7508 0.245652 9.87791 0.0816645C9.00499 -0.0823227 8.10019 0.00184147 7.27792 0.323514C6.45566 0.645186 5.75285 1.18992 5.25839 1.88883C4.76392 2.58774 4.5 3.40943 4.5 4.25C4.50119 5.37683 4.97568 6.45718 5.81934 7.25396C6.66299 8.05075 7.80689 8.49888 9 8.5ZM9 1.41667C9.59334 1.41667 10.1734 1.58284 10.6667 1.89417C11.1601 2.2055 11.5446 2.64801 11.7716 3.16573C11.9987 3.68346 12.0581 4.25314 11.9424 4.80276C11.8266 5.35237 11.5409 5.85722 11.1213 6.25347C10.7018 6.64972 10.1672 6.91957 9.58527 7.02889C9.00333 7.13822 8.40013 7.08211 7.85195 6.86766C7.30377 6.65321 6.83524 6.29006 6.50559 5.82412C6.17595 5.35818 6 4.81038 6 4.25C6 3.49856 6.31607 2.77789 6.87868 2.24653C7.44129 1.71518 8.20435 1.41667 9 1.41667Z"
          fill="#252525"
          {...props}
        />
        <Path
          d="M9 9.91675C7.2104 9.91862 5.49466 10.5909 4.22922 11.786C2.96378 12.9812 2.25199 14.6016 2.25 16.2917C2.25 16.4796 2.32902 16.6598 2.46967 16.7926C2.61032 16.9255 2.80109 17.0001 3 17.0001C3.19891 17.0001 3.38968 16.9255 3.53033 16.7926C3.67098 16.6598 3.75 16.4796 3.75 16.2917C3.75 14.9767 4.30312 13.7155 5.28769 12.7857C6.27226 11.8558 7.60761 11.3334 9 11.3334C10.3924 11.3334 11.7277 11.8558 12.7123 12.7857C13.6969 13.7155 14.25 14.9767 14.25 16.2917C14.25 16.4796 14.329 16.6598 14.4697 16.7926C14.6103 16.9255 14.8011 17.0001 15 17.0001C15.1989 17.0001 15.3897 16.9255 15.5303 16.7926C15.671 16.6598 15.75 16.4796 15.75 16.2917C15.748 14.6016 15.0362 12.9812 13.7708 11.786C12.5053 10.5909 10.7896 9.91862 9 9.91675Z"
          fill="#252525"
          {...props}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_307_4873">
          <Rect width="18" height="17" fill="white" {...props} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

function Bin(props) {
  return (
    <Svg
      width={25}
      height={28}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.375 9.5h-2.712A4.383 4.383 0 0015.375 6h-1.75a4.383 4.383 0 00-4.287 3.5H6.625a.875.875 0 000 1.75H7.5v11.375A4.38 4.38 0 0011.875 27h5.25a4.38 4.38 0 004.375-4.375V11.25h.875a.875.875 0 100-1.75zm-8.75-1.75h1.75A2.63 2.63 0 0117.85 9.5h-6.7a2.631 2.631 0 012.475-1.75zm6.125 14.875a2.625 2.625 0 01-2.625 2.625h-5.25a2.625 2.625 0 01-2.625-2.625V11.25h10.5v11.375z"
        fill="#E80D0D"
        {...props}
      />
      <Path
        d="M12.75 21.75a.875.875 0 00.875-.875v-5.25a.875.875 0 10-1.75 0v5.25a.875.875 0 00.875.875zM16.25 21.75a.875.875 0 00.875-.875v-5.25a.875.875 0 10-1.75 0v5.25a.875.875 0 00.875.875z"
        fill="#E80D0D"
        {...props}
      />
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

function ColorPal(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1315_10251)" fill="#000">
        <Path d="M12.836 6.037a1.125 1.125 0 10.578 2.175 1.125 1.125 0 00-.578-2.175zM9.086 3.787a1.125 1.125 0 10.578 2.175 1.125 1.125 0 00-.578-2.175zM5.336 6.037a1.125 1.125 0 10.578 2.175 1.125 1.125 0 00-.578-2.175zM5.336 10.537a1.125 1.125 0 10.578 2.174 1.125 1.125 0 00-.578-2.174z" />
        <Path d="M9.375.005A9 9 0 00.062 9a9.01 9.01 0 009 9c.254 0 .503-.017.75-.038a.75.75 0 00.687-.75l-.024-2.69a2.675 2.675 0 014.568-1.922l.075.075a1.432 1.432 0 001.327.39 1.417 1.417 0 001.032-.882 8.944 8.944 0 00.583-3.408A9.116 9.116 0 009.375.005zm6.736 11.55l-.01-.01a4.175 4.175 0 00-7.125 2.988l.018 1.967a7.5 7.5 0 11.068-15c.087 0 .176 0 .264.004a7.595 7.595 0 017.234 7.308 7.418 7.418 0 01-.446 2.738l-.003.005z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1315_10251">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
function MailProfile(props) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1172_135475)" fill="#0760FB" {...props}>
        <Path d="M16.967 3.926l-5.962 5.963a3.547 3.547 0 01-5.01 0L.033 3.926C.023 4.038 0 4.139 0 4.25v8.5a3.546 3.546 0 003.542 3.542h9.916A3.546 3.546 0 0017 12.75v-8.5c0-.111-.023-.212-.033-.324z" />
        <Path d="M10.003 8.887l6.47-6.47A3.532 3.532 0 0013.458.707H3.542A3.532 3.532 0 00.527 2.416l6.47 6.47a2.13 2.13 0 003.006 0z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1172_135475">
          <Path fill="#fff" d="M0 0H17V17H0z" {...props} />
        </ClipPath>
      </Defs>
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

// Shapes
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
  Mail,
  User,

  // ----
  Bell,
  MapPin,
  UserRound,
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
  BigPouce,
  LayoutList,
  ImageUp,
  IdCard,
  Lock,
  UserRoundPen,
  InstaIcon,
  NotepadText,
  Landmark,
  ColorPal,
  MailProfile,
  Bin,
  Plus,
  ResetList,
  LogOut,
  CircleHome,
  SquareHome,
};
