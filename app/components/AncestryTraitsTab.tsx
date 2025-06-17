import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

const AncestryTraitsTab = ({ ancestryTraits, onChange }) => {
  // Add a new ancestry trait
  const handleAddAncestryTrait = () => {
    onChange([...ancestryTraits, { name: "", description: "" }]);
  };

  // Remove an ancestry trait
  const handleRemoveAncestryTrait = (index) => {
    onChange(ancestryTraits.filter((_, i) => i !== index));
  };

  // Update an ancestry trait property
  const handleUpdateAncestryTrait = (index, field, value) => {
    const updatedAncestryTraits = [...ancestryTraits];
    updatedAncestryTraits[index] = {
      ...updatedAncestryTraits[index],
      [field]: value,
    };
    onChange(updatedAncestryTraits);
  };

  const moveTrait = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= ancestryTraits.length) return;
    const updated = [...ancestryTraits];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ancestry Traits</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddAncestryTrait}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Ancestry Trait
        </button>
      </div>
      {ancestryTraits.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No ancestry traits added yet. Click the button above to add one.
        </div>
      ) : (
        ancestryTraits.map((trait, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trait Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  value={trait.name || ""}
                  onChange={(e) =>
                    handleUpdateAncestryTrait(index, "name", e.target.value)
                  }
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  value={trait.description || ""}
                  onChange={(e) =>
                    handleUpdateAncestryTrait(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="flex flex-col ml-2">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => moveTrait(index, -1)}
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => moveTrait(index, 1)}
                >
                  <ArrowDown className="h-5 w-5" />
                </button>
              </div>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveAncestryTrait(index)}
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

export default AncestryTraitsTab;
