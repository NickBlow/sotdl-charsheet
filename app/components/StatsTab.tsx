import React from "react";

const StatsTab = ({ stats, onChange }) => {
  // Handle input changes
  const handleChange = (field, value) => {
    const updatedStats = {
      ...stats,
      [field]: value,
    };

    // If health is being updated, calculate healing rate as health / 4
    if (field === "health") {
      updatedStats.healingRate = Math.floor(value / 4);
    }

    // If the field is one of the main attributes, calculate its modifier
    if (
      ["strength", "agility", "intellect", "will", "perception"].includes(field)
    ) {
      updatedStats[field + "Mod"] = value - 10;
    }

    onChange(updatedStats);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Character Stats</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            value={stats.size}
            onChange={(e) =>
              handleChange("size", parseInt(e.target.value) || 0)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Speed
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            value={stats.speed}
            onChange={(e) =>
              handleChange("speed", parseInt(e.target.value) || 0)
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Damage
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            value={stats.damage}
            onChange={(e) =>
              handleChange("damage", parseInt(e.target.value) || 0)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Health
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            value={stats.health}
            onChange={(e) =>
              handleChange("health", parseInt(e.target.value) || 0)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Healing Rate
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            value={stats.healingRate}
            onChange={(e) =>
              handleChange("healingRate", parseInt(e.target.value) || 0)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Defence
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            value={stats.defense}
            onChange={(e) =>
              handleChange("defense", parseInt(e.target.value) || 0)
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fortune
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
          value={stats.fortune}
          onChange={(e) =>
            handleChange("fortune", parseInt(e.target.value) || 0)
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Power
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            value={stats.power}
            onChange={(e) =>
              handleChange("power", parseInt(e.target.value) || 0)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Corruption
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            value={stats.corruption}
            onChange={(e) =>
              handleChange("corruption", parseInt(e.target.value) || 0)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insanity
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
            value={stats.insanity}
            onChange={(e) =>
              handleChange("insanity", parseInt(e.target.value) || 0)
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Afflictions
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
          rows={3}
          value={stats.afflictions}
          onChange={(e) => handleChange("afflictions", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {["strength", "agility", "intellect", "will", "perception"].map(
          (stat) => (
            <div
              key={stat}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <label className="block text-center text-lg font-medium text-gray-800 mb-2 capitalize">
                {stat}
              </label>
              <input
                type="number"
                className="w-full p-2 text-center text-xl font-bold border border-gray-300 rounded-md mb-2 bg-white text-black"
                value={stats[stat]}
                onChange={(e) =>
                  handleChange(stat, parseInt(e.target.value) || 0)
                }
              />
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modifier
                </label>
                <div className="w-full p-2 text-center border border-gray-300 rounded-md bg-gray-100">
                  {stats[stat + "Mod"] >= 0
                    ? "+" + stats[stat + "Mod"]
                    : stats[stat + "Mod"]}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StatsTab;
