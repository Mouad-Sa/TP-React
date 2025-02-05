import React, { useContext } from "react";
import { LanguageContext } from "../App";

export const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="d-flex justify-content-end gap-2">
      <select
        value={language}
        className="form-select w-auto"
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};
