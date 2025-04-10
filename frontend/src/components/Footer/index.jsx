import footerMascot from "../../assets/footer.svg";

function Footer() {
  return (
    <footer className="relative mt-16">
      {/* Wave SVG */}
      <div className="absolute bottom-full w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto translate-y-[1px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 20L60 16.7C120 13.3 240 6.7 360 10C480 13.3 600 26.7 720 30C840 33.3 960 26.7 1080 23.3C1200 20 1320 20 1380 20L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V20Z"
            fill="#FD7B06"
          />
        </svg>
      </div>

      {/* Mascot - to show up of the footer */}
      <div className="absolute -top-32 left-20 z-10">
        <img
          src={footerMascot}
          alt="Footer mascot"
          className="w-32 h-32"
        />
      </div>

      <div className="bg-[#FD7B06] w-full py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* <div className="flex flex-1">

          </div> */}

          {/* Middle section - Copyright */}
          <div className="flex flex-1 text-white/60 justify-center">
            <p>© 2024 Thaheen. All rights reserved.</p>
          </div>

          {/* TODO: Put actual links */}
          {/* <div className="flex flex-1 flex-col gap-1 text-white/60 text-sm">

          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer; 