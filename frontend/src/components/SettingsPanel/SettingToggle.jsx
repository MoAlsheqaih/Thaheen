function SettingToggle({ label, enabled, onToggle }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0">
      <span className="text-gray-800">{label}</span>
      <button
        onClick={onToggle}
        className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${enabled ? "bg-orange-500" : "bg-gray-300"}`}
      >
        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-7" : "translate-x-0"}`}></div>
      </button>
    </div>
  );
};

export default SettingToggle;
