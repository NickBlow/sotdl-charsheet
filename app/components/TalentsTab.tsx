import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

const TalentsTab = ({ talents, onChange }) => {
  // Add a new talent
  const handleAddTalent = () => {
    onChange([...talents, { name: "", description: "" }]);
  };

  // Remove a talent
  const handleRemoveTalent = (index) => {
    onChange(talents.filter((_, i) => i !== index));
  };

  // Update a talent property
  const handleUpdateTalent = (index, field, value) => {
    const updatedTalents = [...talents];
    updatedTalents[index] = {
      ...updatedTalents[index],
      [field]: value,
    };
    onChange(updatedTalents);
  };

  const moveTalent = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= talents.length) return;
    const updated = [...talents];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Talents</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddTalent}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Talent
        </button>
      </div>

      {talents.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No talents added yet. Click the button above to add one.
        </div>
      ) : (
        talents.map((talent, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Talent Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  value={talent.name || ""}
                  onChange={(e) =>
                    handleUpdateTalent(index, "name", e.target.value)
                  }
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  value={talent.description || ""}
                  onChange={(e) =>
                    handleUpdateTalent(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col ml-2">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => moveTalent(index, -1)}
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => moveTalent(index, 1)}
                >
                  <ArrowDown className="h-5 w-5" />
                </button>
              </div>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveTalent(index)}
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TalentsTab;
