import React from "react";

const InfoTab = ({ info, onChange }) => {
  // Handle input changes
  const handleChange = (field, value) => {
    onChange({
      ...info,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Character Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={info.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Level
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={info.level}
            onChange={(e) =>
              handleChange("level", parseInt(e.target.value) || 0)
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ancestry
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={info.ancestry}
            onChange={(e) => handleChange("ancestry", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professions
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            value={info.professions}
            onChange={(e) => handleChange("professions", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Languages: Spoken
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={info.languagesSpoke}
            onChange={(e) => handleChange("languagesSpoke", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Languages: Read and Write
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={info.languagesReadWrite}
            onChange={(e) => handleChange("languagesReadWrite", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lifestyle
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={info.lifestyle}
          onChange={(e) => handleChange("lifestyle", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={5}
          value={info.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={5}
          value={info.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>
    </div>
  );
};

export default InfoTab;
