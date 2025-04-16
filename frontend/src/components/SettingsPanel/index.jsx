import { useState } from "react";

import SettingToggle from "./SettingToggle";

const SettingsPanel = () => {
  const [allowGroupActivities, setAllowGroupActivities] = useState(true);
  const [aiGeneratedQuestions, setAiGeneratedQuestions] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(true);

  return (
    <div className="bg-[#FFF7EC] rounded-xl p-6 mt-10 shadow-md mb-32">
      <h2 className="text-lg font-semibold text-orange-500 mb-4">Settings</h2>

      <SettingToggle
        label="Allow group activities"
        enabled={allowGroupActivities}
        onToggle={() => setAllowGroupActivities(!allowGroupActivities)}
      />

      <SettingToggle
        label="AI-generated questions"
        enabled={aiGeneratedQuestions}
        onToggle={() => setAiGeneratedQuestions(!aiGeneratedQuestions)}
      />

      <SettingToggle
        label="Maintenance mode"
        enabled={maintenanceMode}
        onToggle={() => setMaintenanceMode(!maintenanceMode)}
      />
    </div>
  );
};

export default SettingsPanel;
