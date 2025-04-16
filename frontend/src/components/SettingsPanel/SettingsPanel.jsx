import React, { useState } from "react";

const SettingToggle = ({ label, enabled, onToggle }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0">
      <span className="text-gray-800">{label}</span>
      <button
        onClick={onToggle}
        className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
          enabled ? "bg-orange-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
            enabled ? "translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};


const SettingsPanel = () => {
  const [camera, setCamera] = useState(true);
  const [email, setEmail] = useState(false);
  const [points, setPoints] = useState(true);

  return (
    <div className="bg-[#FFF7EC] rounded-xl p-6 mt-10 shadow-md mb-32">
      <h2 className="text-lg font-semibold text-orange-500 mb-4">Setting</h2>
      <SettingToggle
        label="Minimum number of participants for activities"
        enabled={camera}
        onToggle={() => setCamera(!camera)}
      />
      <SettingToggle
        label="AI-generated questions"
        enabled={email}
        onToggle={() => setEmail(!email)}
      />
      <SettingToggle
        label="Maintenance mode"
        enabled={!points}
        onToggle={() => setPoints(!points)}
      />
    </div>
  );
};

export default SettingsPanel;
