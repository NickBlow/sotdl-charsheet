import { Trash2, Plus } from "lucide-react";

const EquipmentTab = ({ equipment, onChange }) => {
  // Update currency
  const handleCurrencyChange = (currency, value) => {
    const updatedEquipment = {
      ...equipment,
      currency: {
        ...equipment.currency,
        [currency]: value,
      },
    };
    onChange(updatedEquipment);
  };

  // Add a new item
  const handleAddItem = () => {
    const updatedEquipment = {
      ...equipment,
      items: [...equipment.items, { name: "" }],
    };
    onChange(updatedEquipment);
  };

  // Remove an item
  const handleRemoveItem = (index) => {
    const updatedEquipment = {
      ...equipment,
      items: equipment.items.filter((_, i) => i !== index),
    };
    onChange(updatedEquipment);
  };

  // Update an item
  const handleUpdateItem = (index, value) => {
    const updatedItems = [...equipment.items];
    updatedItems[index] = { name: value };

    const updatedEquipment = {
      ...equipment,
      items: updatedItems,
    };

    onChange(updatedEquipment);
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
            className="bg-white p-4 rounded-lg border border-gray-200 mb-4"
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
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(index)}
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

export default EquipmentTab;
