import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

const WeaponsTab = ({ weapons, armor, onWeaponsChange, onArmorChange }) => {
  // Add a new weapon
  const handleAddWeapon = () => {
    onWeaponsChange([
      ...weapons,
      { name: "", modifier: 0, damage: "", properties: "" },
    ]);
  };

  const moveWeapon = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= weapons.length) return;
    const updated = [...weapons];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    onWeaponsChange(updated);
  };

  // Remove a weapon
  const handleRemoveWeapon = (index) => {
    onWeaponsChange(weapons.filter((_, i) => i !== index));
  };

  // Update a weapon property
  const handleUpdateWeapon = (index, field, value) => {
    const updatedWeapons = [...weapons];
    updatedWeapons[index] = {
      ...updatedWeapons[index],
      [field]: value,
    };
    onWeaponsChange(updatedWeapons);
  };

  // ------------------
  // Armor helpers
  // ------------------
  const handleAddArmor = () => {
    onArmorChange([
      ...armor,
      { name: "", rating: 0, properties: "" },
    ]);
  };

  const moveArmor = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= armor.length) return;
    const updated = [...armor];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    onArmorChange(updated);
  };

  const handleRemoveArmor = (index) => {
    onArmorChange(armor.filter((_, i) => i !== index));
  };

  const handleUpdateArmor = (index, field, value) => {
    const updated = [...armor];
    updated[index] = { ...updated[index], [field]: value };
    onArmorChange(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Weapons</h2>

      {weapons.map((weapon, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weapon Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={weapon.name || ""}
                onChange={(e) =>
                  handleUpdateWeapon(index, "name", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modifier
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={weapon.modifier || 0}
                onChange={(e) =>
                  handleUpdateWeapon(
                    index,
                    "modifier",
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Damage
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={weapon.damage || ""}
                onChange={(e) =>
                  handleUpdateWeapon(index, "damage", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Properties
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-l-md"
                  value={weapon.properties || ""}
                  onChange={(e) =>
                    handleUpdateWeapon(index, "properties", e.target.value)
                  }
                />
                <div className="flex flex-col opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => moveWeapon(index, -1)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => moveWeapon(index, 1)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
                <button
                  className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 ml-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100"
                  onClick={() => handleRemoveWeapon(index)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        onClick={handleAddWeapon}
      >
        <Plus className="mr-1 h-4 w-4" />
        Add Weapon
      </button>

      {/* Armor Section */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Armor</h2>

      {armor.map((a, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Armor Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={a.name || ""}
                onChange={(e) =>
                  handleUpdateArmor(index, "name", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={a.rating || 0}
                onChange={(e) =>
                  handleUpdateArmor(index, "rating", parseInt(e.target.value) || 0)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Properties
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-l-md"
                  value={a.properties || ""}
                  onChange={(e) =>
                    handleUpdateArmor(index, "properties", e.target.value)
                  }
                />
                <div className="flex flex-col opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => moveArmor(index, -1)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => moveArmor(index, 1)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
                <button
                  className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 ml-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100"
                  onClick={() => handleRemoveArmor(index)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        onClick={handleAddArmor}
      >
        <Plus className="mr-1 h-4 w-4" />
        Add Armor
      </button>
    </div>
  );
};

export default WeaponsTab;
