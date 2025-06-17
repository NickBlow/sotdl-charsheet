import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

const EquipmentTab = ({
  equipment,
  weapons,
  armor,
  onEquipmentChange,
  onWeaponsChange,
  onArmorChange,
}) => {
  // Update currency
  const handleCurrencyChange = (currency, value) => {
    const updatedEquipment = {
      ...equipment,
      currency: {
        ...equipment.currency,
        [currency]: value,
      },
    };
    onEquipmentChange(updatedEquipment);
  };

  // Add a new item
  const handleAddItem = () => {
    const updatedEquipment = {
      ...equipment,
      items: [...equipment.items, { name: "" }],
    };
    onEquipmentChange(updatedEquipment);
  };

  // Remove an item
  const handleRemoveItem = (index) => {
    const updatedEquipment = {
      ...equipment,
      items: equipment.items.filter((_, i) => i !== index),
    };
    onEquipmentChange(updatedEquipment);
  };

  // Update an item
  const handleUpdateItem = (index, value) => {
    const updatedItems = [...equipment.items];
    updatedItems[index] = { name: value };

    const updatedEquipment = {
      ...equipment,
      items: updatedItems,
    };

    onEquipmentChange(updatedEquipment);
  };

  // Move item up or down
  const moveItem = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= equipment.items.length) return;
    const updatedItems = [...equipment.items];
    const [moved] = updatedItems.splice(index, 1);
    updatedItems.splice(newIndex, 0, moved);
    onEquipmentChange({ ...equipment, items: updatedItems });
  };

  // ------------------
  // Incantations
  // ------------------
  const handleAddIncantation = () => {
    const updated = {
      ...equipment,
      incantations: [
        ...(equipment.incantations || []),
        { name: "", description: "" },
      ],
    };
    onEquipmentChange(updated);
  };

  const handleRemoveIncantation = (index) => {
    const updated = {
      ...equipment,
      incantations: (equipment.incantations || []).filter((_, i) => i !== index),
    };
    onEquipmentChange(updated);
  };

  const handleUpdateIncantation = (index, field, value) => {
    const list = [...(equipment.incantations || [])];
    list[index] = { ...list[index], [field]: value };
    onEquipmentChange({ ...equipment, incantations: list });
  };

  const moveIncantation = (index, direction) => {
    const list = [...(equipment.incantations || [])];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= list.length) return;
    const [moved] = list.splice(index, 1);
    list.splice(newIndex, 0, moved);
    onEquipmentChange({ ...equipment, incantations: list });
  };

  // ------------------
  // Weapons helpers
  // ------------------
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

  const handleRemoveWeapon = (index) => {
    onWeaponsChange(weapons.filter((_, i) => i !== index));
  };

  const handleUpdateWeapon = (index, field, value) => {
    const updated = [...weapons];
    updated[index] = { ...updated[index], [field]: value };
    onWeaponsChange(updated);
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
      <h2 className="text-2xl font-bold mb-6">Equipment and Currency</h2>

      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <h3 className="text-xl font-medium mb-4">Currency</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gold Crowns (gc)
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={equipment.currency.gc}
              onChange={(e) =>
                handleCurrencyChange("gc", parseInt(e.target.value) || 0)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Silver Shillings (ss)
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={equipment.currency.ss}
              onChange={(e) =>
                handleCurrencyChange("ss", parseInt(e.target.value) || 0)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Copper Pennies (cp)
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={equipment.currency.cp}
              onChange={(e) =>
                handleCurrencyChange("cp", parseInt(e.target.value) || 0)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bits
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={equipment.currency.bits}
              onChange={(e) =>
                handleCurrencyChange("bits", parseInt(e.target.value) || 0)
              }
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Equipment</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddItem}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Equipment
        </button>
      </div>

      {equipment.items.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white p-4 rounded-lg border border-gray-200">
          No equipment added yet. Click the button above to add one.
        </div>
      ) : (
        equipment.items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group"
          >
            <div className="flex items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={item.name || ""}
                  onChange={(e) => handleUpdateItem(index, e.target.value)}
                />
              </div>
              <div className="flex flex-col ml-2">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => moveItem(index, -1)}
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => moveItem(index, 1)}
                >
                  <ArrowDown className="h-5 w-5" />
                </button>
              </div>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(index)}
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))
      )}

      {/* Incantations */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <h3 className="text-xl font-medium">Incantations</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddIncantation}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Incantation
        </button>
      </div>

      {(equipment.incantations || []).length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white p-4 rounded-lg border border-gray-200">
          No incantations added yet.
        </div>
      ) : (
        (equipment.incantations || []).map((inc, index) => (
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

      {/* Weapons */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <h3 className="text-xl font-medium">Weapons</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddWeapon}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Weapon
        </button>
      </div>

      {weapons.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white p-4 rounded-lg border border-gray-200">
          No weapons added yet.
        </div>
      ) : (
        weapons.map((weapon, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weapon Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={weapon.name || ""}
                  onChange={(e) => handleUpdateWeapon(index, "name", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modifier</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={weapon.modifier || 0}
                  onChange={(e) => handleUpdateWeapon(index, "modifier", parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Damage</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={weapon.damage || ""}
                  onChange={(e) => handleUpdateWeapon(index, "damage", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Properties</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-l-md"
                    value={weapon.properties || ""}
                    onChange={(e) => handleUpdateWeapon(index, "properties", e.target.value)}
                  />
                  <div className="flex flex-col">
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => moveWeapon(index, -1)}>
                      <ArrowUp className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => moveWeapon(index, 1)}>
                      <ArrowDown className="h-5 w-5" />
                    </button>
                  </div>
                  <button className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 ml-1" onClick={() => handleRemoveWeapon(index)}>
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Armor */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <h3 className="text-xl font-medium">Armor</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddArmor}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Armor
        </button>
      </div>

      {armor.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white p-4 rounded-lg border border-gray-200">
          No armor added yet.
        </div>
      ) : (
        armor.map((a, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 mb-4 group">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Armor Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={a.name || ""}
                  onChange={(e) => handleUpdateArmor(index, "name", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={a.rating || 0}
                  onChange={(e) => handleUpdateArmor(index, "rating", parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Properties</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-l-md"
                    value={a.properties || ""}
                    onChange={(e) => handleUpdateArmor(index, "properties", e.target.value)}
                  />
                  <div className="flex flex-col">
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => moveArmor(index, -1)}>
                      <ArrowUp className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => moveArmor(index, 1)}>
                      <ArrowDown className="h-5 w-5" />
                    </button>
                  </div>
                  <button className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 ml-1" onClick={() => handleRemoveArmor(index)}>
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EquipmentTab;
