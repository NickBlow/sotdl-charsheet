const PathsTab = ({ paths, onChange }) => {
  // Handle pathType change (novice, expert, master)
  const handlePathTypeChange = (pathType, field, value) => {
    const updatedPaths = {
      ...paths,
      [pathType]: {
        ...paths[pathType],
        [field]: value,
      },
    };
    onChange(updatedPaths);
  };

  // Handle level path change
  const handleLevelPathChange = (levelIndex, field, value) => {
    const updatedLevels = [...paths.levels];
    updatedLevels[levelIndex] = {
      ...updatedLevels[levelIndex],
      [field]: value,
    };

    const updatedPaths = {
      ...paths,
      levels: updatedLevels,
    };

    onChange(updatedPaths);
  };

  // Skip rendering individual level sections for levels 1, 3, and 7
  // as they are already covered by the dedicated path sections
  const shouldShowLevel = (levelIndex) => {
    // Skip levels 0 (level 1), 2 (level 3), and 6 (level 7)
    return levelIndex !== 0 && levelIndex !== 2 && levelIndex !== 6;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Character Paths</h2>

      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level 1 (Novice Path)
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={paths.novice.name || ""}
              onChange={(e) =>
                handlePathTypeChange("novice", "name", e.target.value)
              }
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              value={paths.novice.details || ""}
              onChange={(e) =>
                handlePathTypeChange("novice", "details", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level 3 (Expert Path)
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={paths.expert.name || ""}
              onChange={(e) =>
                handlePathTypeChange("expert", "name", e.target.value)
              }
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              value={paths.expert.details || ""}
              onChange={(e) =>
                handlePathTypeChange("expert", "details", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level 7 (Master Path)
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={paths.master.name || ""}
              onChange={(e) =>
                handlePathTypeChange("master", "name", e.target.value)
              }
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              value={paths.master.details || ""}
              onChange={(e) =>
                handlePathTypeChange("master", "details", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Level progression - only showing non-path levels */}
      <h3 className="text-xl font-medium mb-4">Other Level Benefits</h3>
      {[...Array(10)].map(
        (_, i) =>
          shouldShowLevel(i) && (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border border-gray-200 mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level {i + 1}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={paths.levels[i]?.name || ""}
                    onChange={(e) =>
                      handleLevelPathChange(i, "name", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Details
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={2}
                    value={paths.levels[i]?.details || ""}
                    onChange={(e) =>
                      handleLevelPathChange(i, "details", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default PathsTab;
