const InfoTab = ({ info, onChange }) => {
  // Handle input changes
  const handleChange = (field, value) => {
    onChange({
      ...info,
      [field]: value,
    });
  };

  const adventures = info.adventures || [];

  const handleAdventureChange = (index, field, value) => {
    const updatedAdventures = adventures.map((adventure, i) =>
      i === index
        ? {
            ...adventure,
            [field]: value,
          }
        : adventure
    );
    handleChange("adventures", updatedAdventures);
  };

  const handleAddAdventure = () => {
    handleChange("adventures", [
      ...adventures,
      { title: "", summary: "" },
    ]);
  };

  const handleRemoveAdventure = (index) => {
    handleChange(
      "adventures",
      adventures.filter((_, i) => i !== index)
    );
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Character Information</h2>

      {/* Top section - Primary character details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={info.name || ""}
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
            value={info.level || 0}
            onChange={(e) =>
              handleChange("level", parseInt(e.target.value) || 0)
            }
          />
        </div>
      </div>

      {/* Personality and Background - Added as requested */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personality
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            value={info.personality || ""}
            onChange={(e) => handleChange("personality", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            value={info.background || ""}
            onChange={(e) => handleChange("background", e.target.value)}
          />
        </div>
      </div>

      {/* Heritage information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ancestry
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={info.ancestry || ""}
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
            value={info.professions || ""}
            onChange={(e) => handleChange("professions", e.target.value)}
          />
        </div>
      </div>

      {/* Languages section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Languages: Spoken
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={info.languagesSpoke || ""}
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
            value={info.languagesReadWrite || ""}
            onChange={(e) => handleChange("languagesReadWrite", e.target.value)}
          />
        </div>
      </div>

      {/* Lifestyle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lifestyle
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={info.lifestyle || ""}
          onChange={(e) => handleChange("lifestyle", e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={5}
          value={info.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Adventures */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Adventures</h3>
          <button
            type="button"
            onClick={handleAddAdventure}
            className="bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Add Adventure
          </button>
        </div>

        {adventures.length === 0 ? (
          <p className="text-gray-500">No adventures recorded yet.</p>
        ) : (
          adventures.map((adventure, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={adventure.title || ""}
                    onChange={(e) =>
                      handleAdventureChange(index, "title", e.target.value)
                    }
                    placeholder="e.g., The Goblin Warrens"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Summary
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  value={adventure.summary || ""}
                  onChange={(e) =>
                    handleAdventureChange(index, "summary", e.target.value)
                  }
                  placeholder="Key events, allies, lessons learned..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveAdventure(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={5}
          value={info.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>
    </div>
  );
};

export default InfoTab;
