import { useState, useEffect, useCallback, useRef } from "react";
import { Save, Share2, Check } from "lucide-react";
import InfoTab from "./InfoTab";
import StatsTab from "./StatsTab";
import WeaponsTab from "./WeaponsTab";
import PathsTab from "./PathsTab";
import TalentsTab from "./TalentsTab";
import SpellsTab from "./SpellsTab";
import EquipmentTab from "./EquipmentTab";
import { useFetcher, useNavigate, useRevalidator } from "react-router";

const ShadowOfTheDemonLordSheet = ({
  initialData: charData,
}: {
  initialData: any;
}) => {
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const previousCharacterRef = useRef<string>(null!);
  const autosaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  let fetcher = useFetcher();

  // Add state for toast notification
  const [showToast, setShowToast] = useState(false);

  const [character, setCharacter] = useState(
    charData || {
      info: {
        name: "",
        level: 1,
        ancestry: "",
        professions: "",
        languagesSpoke: "",
        languagesReadWrite: "",
        lifestyle: "",
        description: "",
        notes: "",
      },
      stats: {
        size: 1,
        speed: 10,
        damage: 0,
        health: 0,
        healingRate: 0,
        defense: 0,
        fortune: 0,
        power: 0,
        corruption: 0,
        insanity: 0,
        afflictions: "",
        strength: 10,
        strengthMod: 0,
        agility: 10,
        agilityMod: 0,
        intellect: 10,
        intellectMod: 0,
        will: 10,
        willMod: 0,
        perception: 10,
        perceptionMod: 0,
      },
      weapons: [],
      paths: {
        novice: { name: "", details: "" },
        expert: { name: "", details: "" },
        master: { name: "", details: "" },
        levels: Array(10)
          .fill(0)
          .map(() => ({ name: "", details: "" })),
      },
      talents: [],
      spells: [],
      equipment: {
        currency: {
          gc: 0,
          ss: 0,
          cp: 0,
          bits: 0,
        },
        items: [],
      },
    }
  );

  // Initialize previousCharacterRef with the initial character data
  useEffect(() => {
    console.log("Setting initial character reference");
    previousCharacterRef.current = JSON.stringify(character);
  }, []);

  // Update character state when charData changes from revalidation
  useEffect(() => {
    if (charData) {
      const newDataString = JSON.stringify(charData);
      const currentCharacterString = JSON.stringify(character);

      // Only update if the data has actually changed and we're not in the middle of editing
      // This check prevents overwriting user changes when data is reloaded
      if (
        newDataString !== currentCharacterString &&
        fetcher.state === "idle"
      ) {
        console.log("Updating character from revalidated data");
        setCharacter(charData);
        previousCharacterRef.current = newDataString;
      }
    }
  }, [charData, fetcher.state]);

  // Setup window focus listener to revalidate data
  useEffect(() => {
    // Function to handle window focus
    const handleWindowFocus = () => {
      console.log("Window focused - revalidating data from server");
      revalidator.revalidate();
    };

    // Add event listener
    window.addEventListener("focus", handleWindowFocus);

    // Cleanup function
    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [revalidator]);

  // Save character data function
  const saveCharacter = useCallback(() => {
    console.log("Saving character data...");
    fetcher.submit(JSON.stringify(character), {
      method: "post",
      encType: "application/json",
    });

    // After saving, update the previous character reference
    previousCharacterRef.current = JSON.stringify(character);
    console.log("Previous character reference updated after save");
  }, [character, fetcher]);

  // Check if character has changed and trigger autosave
  useEffect(() => {
    // Convert character to string for comparison
    const currentCharacterString = JSON.stringify(character);

    // Skip initial render or when character is not yet initialized
    if (!previousCharacterRef.current) {
      previousCharacterRef.current = currentCharacterString;
      return;
    }

    // Only trigger autosave if the character has actually changed
    if (previousCharacterRef.current !== currentCharacterString) {
      console.log("Character changed, scheduling autosave...");

      // Clear any existing timeout to prevent multiple saves
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }

      // Set a timeout for autosave
      autosaveTimeoutRef.current = setTimeout(() => {
        console.log("Executing autosave...");
        saveCharacter();
        autosaveTimeoutRef.current = null;
      }, 3000);
    }

    // Cleanup function to clear the timeout when component unmounts or effect reruns
    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
  }, [character, saveCharacter]);

  // Create a new character
  const handleNewCharacter = () => {
    navigate("/");
  };

  // Handle share button click
  const handleShare = () => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Copy to clipboard
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        // Show toast notification
        setShowToast(true);

        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with buttons - improved for mobile */}
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 gap-4">
          <div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-auto"
              onClick={handleNewCharacter}
            >
              New Character
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center">
              <span className="text-green-600 text-sm">
                {fetcher.state !== "idle" ? "Saving..." : ""}
                {revalidator.state !== "idle" ? "Refreshing..." : ""}
              </span>
              {charData?.lastSaved && (
                <span className="text-gray-500 text-sm ml-2 hidden sm:inline">
                  Last saved: {charData.lastSaved}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center"
                onClick={saveCharacter}
              >
                <Save className="mr-1 h-4 w-4" />
                Save
              </button>
              <button
                className="bg-gray-600 text-white px-3 py-2 rounded-md flex items-center"
                onClick={handleShare}
              >
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Tabs - improved for mobile */}
        <div className="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap">
          {[
            "info",
            "stats",
            "weapons",
            "paths",
            "talents",
            "spells",
            "equipment",
          ].map((tab) => (
            <button
              key={tab}
              className={`px-3 sm:px-6 py-3 text-sm sm:text-lg font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === "info" && (
            <InfoTab
              info={character.info}
              onChange={(updatedInfo) => {
                setCharacter({
                  ...character,
                  info: updatedInfo,
                });
              }}
            />
          )}

          {activeTab === "stats" && (
            <StatsTab
              stats={character.stats}
              onChange={(updatedStats) => {
                setCharacter({
                  ...character,
                  stats: updatedStats,
                });
              }}
            />
          )}

          {activeTab === "weapons" && (
            <WeaponsTab
              weapons={character.weapons}
              onChange={(updatedWeapons) => {
                setCharacter({
                  ...character,
                  weapons: updatedWeapons,
                });
              }}
            />
          )}

          {activeTab === "paths" && (
            <PathsTab
              paths={character.paths}
              onChange={(updatedPaths) => {
                setCharacter({
                  ...character,
                  paths: updatedPaths,
                });
              }}
            />
          )}

          {activeTab === "talents" && (
            <TalentsTab
              talents={character.talents}
              onChange={(updatedTalents) => {
                setCharacter({
                  ...character,
                  talents: updatedTalents,
                });
              }}
            />
          )}

          {activeTab === "spells" && (
            <SpellsTab
              spells={character.spells}
              onChange={(updatedSpells) => {
                setCharacter({
                  ...character,
                  spells: updatedSpells,
                });
              }}
            />
          )}

          {activeTab === "equipment" && (
            <EquipmentTab
              equipment={character.equipment}
              onChange={(updatedEquipment) => {
                setCharacter({
                  ...character,
                  equipment: updatedEquipment,
                });
              }}
            />
          )}
        </div>
      </div>

      {/* Toast Notification - better positioning for mobile */}
      {showToast && (
        <div className="fixed bottom-4 left-4 sm:left-auto sm:right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center z-50">
          <Check className="mr-2 h-4 w-4" />
          Copied!
        </div>
      )}
    </div>
  );
};

export default ShadowOfTheDemonLordSheet;
