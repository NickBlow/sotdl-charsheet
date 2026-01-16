import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

const CompanionsTab = ({ companions, onChange }) => {
  // Add a new companion
  const handleAddCompanion = () => {
    onChange([
      ...companions,
      {
        name: "",
        type: "",
        size: 1,
        perception: 10,
        health: 0,
        defense: 0,
        power: 0,
        insanity: 0,
        corruption: 0,
        strength: 10,
        agility: 10,
        intellect: 10,
        will: 10,
        speed: 10,
        notes: "",
      },
    ]);
  };

  // Remove a companion
  const handleRemoveCompanion = (index) => {
    onChange(companions.filter((_, i) => i !== index));
  };

  // Update a companion property
  const handleUpdateCompanion = (index, field, value) => {
    const updatedCompanions = [...companions];
    updatedCompanions[index] = {
      ...updatedCompanions[index],
      [field]: value,
    };
    onChange(updatedCompanions);
  };

  const moveCompanion = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= companions.length) return;
    const updated = [...companions];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    onChange(updated);
  };

  const sizeOptions = [
    { value: 0.125, label: "1/8" },
    { value: 0.25, label: "1/4" },
    { value: 0.5, label: "1/2" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Companions</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddCompanion}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Companion
        </button>
      </div>

      {companions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No companions added yet. Click the button above to add one.
        </div>
      ) : (
        companions.map((companion, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group"
          >
            {/* Header with name, type, and controls */}
            <div className="flex items-start mb-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={companion.name || ""}
                    onChange={(e) =>
                      handleUpdateCompanion(index, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={companion.type || ""}
                    onChange={(e) =>
                      handleUpdateCompanion(index, "type", e.target.value)
                    }
                    placeholder="e.g., Animal, Construct, Undead"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-2">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => moveCompanion(index, -1)}
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => moveCompanion(index, 1)}
                >
                  <ArrowDown className="h-5 w-5" />
                </button>
              </div>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveCompanion(index)}
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>

            {/* Basic Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                  value={companion.size ?? 1}
                  onChange={(e) => {
                    const parsedValue = parseFloat(e.target.value);
                    handleUpdateCompanion(
                      index,
                      "size",
                      Number.isFinite(parsedValue) ? parsedValue : 1
                    );
                  }}
                >
                  {sizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Perception
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.perception || 10}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "perception",
                      parseInt(e.target.value) || 10
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Health
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.health || 0}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "health",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Defense
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.defense || 0}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "defense",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Power
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.power || 0}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "power",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speed
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.speed || 10}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "speed",
                      parseInt(e.target.value) || 10
                    )
                  }
                />
              </div>
            </div>

            {/* Mental Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insanity
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.insanity || 0}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "insanity",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Corruption
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.corruption || 0}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "corruption",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
            </div>

            {/* Attributes Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Strength
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.strength || 10}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "strength",
                      parseInt(e.target.value) || 10
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agility
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.agility || 10}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "agility",
                      parseInt(e.target.value) || 10
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intellect
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.intellect || 10}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "intellect",
                      parseInt(e.target.value) || 10
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Will
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={companion.will || 10}
                  onChange={(e) =>
                    handleUpdateCompanion(
                      index,
                      "will",
                      parseInt(e.target.value) || 10
                    )
                  }
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                value={companion.notes || ""}
                onChange={(e) =>
                  handleUpdateCompanion(index, "notes", e.target.value)
                }
                placeholder="Special abilities, behaviors, equipment, etc."
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CompanionsTab;
