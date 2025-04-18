function WhatIsQMModal(props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFF3E6] rounded-[32px] px-8 py-10 shadow-2xl max-w-sm w-full relative">
        <button
          onClick={props.onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 transition-all"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#FD7B06] mb-2">Question Master</h2>
        <p className="text-sm text-[#006F6A] text-justify">
          A Question Master is a person who is responsible for creating and managing the questions on Thaheen.
          <br /><br />
          These QMs help us make sure that the questions are of high quality and are aligned with the course content.
          <br /><br />
          We will reach out to you if we need your help. Keep an eye on your email for a message from us!
        </p>
      </div>
    </div>
  );
}

export default WhatIsQMModal;

