function CTA({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#006F6A] hover:bg-[#006f6a]/80 dark:bg-[#F97008] dark:hover:bg-[#F97008]/80 transition-all text-white py-2 px-4 rounded-2xl font-semibold drop-shadow-[0_4px_0_#00A59D] dark:drop-shadow-[0_4px_0_#F7AB73] text-sm sm:text-base"
    >
      Get Started
    </button>
  );
}

export default CTA;