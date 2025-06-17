import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

const SpellsTab = ({ spells, incantations, onChange, onIncantationsChange }) => {
  // Add a new spell
  const handleAddSpell = () => {
    onChange([
      ...spells,
      { name: "", level: 0, castings: 1, description: "", tradition: "" },
    ]);
  };

  // Remove a spell
  const handleRemoveSpell = (index) => {
    onChange(spells.filter((_, i) => i !== index));
  };

  // Update a spell property
  const handleUpdateSpell = (index, field, value) => {
    const updatedSpells = [...spells];
    updatedSpells[index] = {
      ...updatedSpells[index],
      [field]: value,
    };
    onChange(updatedSpells);
  };

  const moveSpell = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= spells.length) return;
    const updated = [...spells];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    onChange(updated);
  };

  // ------------------
  // Incantations helpers
  // ------------------
  const handleAddIncantation = () => {
    onIncantationsChange([
      ...(incantations || []),
      { name: "", description: "" },
    ]);
  };

  const handleRemoveIncantation = (index) => {
    onIncantationsChange((incantations || []).filter((_, i) => i !== index));
  };

  const handleUpdateIncantation = (index, field, value) => {
    const list = [...(incantations || [])];
    list[index] = { ...list[index], [field]: value };
    onIncantationsChange(list);
  };

  const moveIncantation = (index, direction) => {
    const list = [...(incantations || [])];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= list.length) return;
    const [moved] = list.splice(index, 1);
    list.splice(newIndex, 0, moved);
    onIncantationsChange(list);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Spells</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddSpell}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Spell
        </button>
      </div>

      {spells.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No spells added yet. Click the button above to add one.
        </div>
      ) : (
        spells.map((spell, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spell Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={spell.name || ""}
                  onChange={(e) =>
                    handleUpdateSpell(index, "name", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tradition
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={spell.tradition || ""}
                  onChange={(e) =>
                    handleUpdateSpell(index, "tradition", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={spell.level !== undefined ? spell.level : 0}
                  onChange={(e) =>
                    handleUpdateSpell(
                      index,
                      "level",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Castings
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="flex-1 p-2 border border-gray-300 rounded-l-md"
                    value={spell.castings || 1}
                    onChange={(e) =>
                      handleUpdateSpell(
                        index,
                        "castings",
                        parseInt(e.target.value) || 1
                      )
                    }
                  />
                  <div className="flex flex-col">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => moveSpell(index, -1)}
                    >
                      <ArrowUp className="h-5 w-5" />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => moveSpell(index, 1)}
                    >
                      <ArrowDown className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 ml-1"
                    onClick={() => handleRemoveSpell(index)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Spell Description Field - added below the existing fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                value={spell.description || ""}
                onChange={(e) =>
                  handleUpdateSpell(index, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))
      )}

      {/* Incantations */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <h3 className="text-xl font-medium">Incantations</h3>
      </div>

      {(incantations || []).length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No incantations added yet.
        </div>
      ) : (
        (incantations || []).map((inc, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={inc.name || ""}
                  onChange={(e) => handleUpdateIncantation(index, "name", e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={2}
                  value={inc.description || ""}
                  onChange={(e) => handleUpdateIncantation(index, "description", e.target.value)}
                />
              </div>
              <div className="flex items-start space-x-2">
                <button className="text-gray-500 hover:text-gray-700" onClick={() => moveIncantation(index, -1)}>
                  <ArrowUp className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => moveIncantation(index, 1)}>
                  <ArrowDown className="h-5 w-5" />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveIncantation(index)}>
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddIncantation}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Incantation
        </button>
      </div>
    </div>
  );
};

export default SpellsTab;
