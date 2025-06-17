// ShadowOfTheDemonLordSheet.tsx
// Updated to prevent unsaved edits from being overwritten by a background
// re‑validation. Implements the “snapshot comparison” fix described.

import { useState, useEffect, useCallback, useRef } from "react";
import { Save, Share2, Check } from "lucide-react";
import InfoTab from "./InfoTab";
import StatsTab from "./StatsTab";
import WeaponsTab from "./WeaponsTab";
import PathsTab from "./PathsTab";
import TalentsTab from "./TalentsTab";
import AncestryTraitsTab from "./AncestryTraitsTab";
import SpellsTab from "./SpellsTab";
import EquipmentTab from "./EquipmentTab";
import {
  useFetcher,
  useNavigate,
  useRevalidator,
  useSearchParams,
  useLocation,
} from "react-router";

const ShadowOfTheDemonLordSheet = ({
  initialData: charData,
}: {
  initialData: any;
}) => {
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // ------------------
  // Utilities & Refs
  // ------------------
  const previousCharacterRef = useRef<string | null>(null);
  const autosaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetcher = useFetcher();

  // ------------------
  // Toast state
  // ------------------
  const [showToast, setShowToast] = useState(false);

  // ------------------
  // Active tab logic (hash‑based)
  // ------------------
  const validTabs = [
    "info",
    "stats",
    "weapons",
    "paths",
    "talents",
    "ancestryTraits",
    "spells",
    "equipment",
  ] as const;

  const tabFromHash = location.hash.slice(1); // remove leading '#'
  const activeTab = validTabs.includes(tabFromHash as any)
    ? tabFromHash
    : "info";

  // ------------------
  // Character state
  // ------------------
  const [character, setCharacter] = useState(() => {
    // default structure used when there is no charData
    const data = charData || {
      info: {
        name: "",
        level: 1,
        personality: "",
        background: "",
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
      armor: [],
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
        incantations: [],
      },
    };

    // ensure backwards compatibility fields
    (data as any).ancestryTraits = (data as any).ancestryTraits || [];
    (data as any).equipment = (data as any).equipment || { currency: {}, items: [], incantations: [] };
    (data as any).equipment.incantations = (data as any).equipment.incantations || [];
    (data as any).armor = (data as any).armor || [];

    return data;
  });

  // ------------------
  // Helpers
  // ------------------
  const handleTabChange = (tab: string) => {
    window.location.hash = tab;
  };

  // ------------------
  // Initial mount
  // ------------------
  useEffect(() => {
    previousCharacterRef.current = JSON.stringify(character);

    // ensure URL has a hash so the tab styling is correct on first load
    if (!location.hash) {
      window.location.hash = "info";
    }
  }, []); // run once

  // ---------------------------------------------------------------------------
  // Re‑validation effect — replace local state only when server data differs
  // *from the last-saved snapshot*, NOT from the potentially dirty state.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!charData) return; // nothing new

    const newDataString = JSON.stringify(charData);
    const lastSavedSnapshot = previousCharacterRef.current;

    if (
      lastSavedSnapshot !== newDataString && // **compare with snapshot**
      fetcher.state === "idle" // don't interfere while submitting
    ) {
      const updated = {
        ...charData,
        ancestryTraits: charData.ancestryTraits || [],
        equipment: {
          ...charData.equipment,
          incantations: charData.equipment?.incantations || [],
        },
        armor: charData.armor || [],
      };

      setCharacter(updated);
      previousCharacterRef.current = newDataString; // update snapshot
    }
  }, [charData, fetcher.state]);

  // ---------------------------------------------------------------------------
  // Track when the POST round‑trip finishes so we can record the snapshot of
  // what the server now knows as the latest saved character.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (fetcher.state === "idle" && charData) {
      previousCharacterRef.current = JSON.stringify(charData);
    }
  }, [fetcher.state, charData]);

  // ------------------
  // Window focus → revalidate
  // ------------------
  useEffect(() => {
    const handleWindowFocus = () => {
      revalidator.revalidate();
    };

    window.addEventListener("focus", handleWindowFocus);
    return () => window.removeEventListener("focus", handleWindowFocus);
  }, [revalidator]);

  // ------------------
  // Save (manual OR autosave) – snapshot update happens after round‑trip.
  // ------------------
  const saveCharacter = useCallback(() => {
    fetcher.submit(JSON.stringify(character), {
      method: "post",
      encType: "application/json",
    });
    // no snapshot update here – wait for server confirmation
  }, [character, fetcher]);

  // ------------------
  // Autosave detector
  // ------------------
  useEffect(() => {
    const currentCharacterString = JSON.stringify(character);

    if (!previousCharacterRef.current) {
      previousCharacterRef.current = currentCharacterString;
      return;
    }

    if (previousCharacterRef.current !== currentCharacterString) {
      // schedule/refresh autosave timer
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }

      autosaveTimeoutRef.current = setTimeout(() => {
        saveCharacter();
        autosaveTimeoutRef.current = null;
      }, 3000);
    }

    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
  }, [character, saveCharacter]);

  // ------------------
  // Navigation helpers
  // ------------------
  const handleNewCharacter = () => navigate("/");

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch(console.error);
  };

  // ------------------
  // Render
  // ------------------
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
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
                {fetcher.state !== "idle" ? "Saving…" : ""}
                {revalidator.state !== "idle" ? "Refreshing…" : ""}
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
                <Save className="mr-1 h-4 w-4" /> Save
              </button>
              <button
                className="bg-gray-600 text-white px-3 py-2 rounded-md flex items-center"
                onClick={handleShare}
              >
                <Share2 className="mr-1 h-4 w-4" /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap">
          {validTabs.map((tab) => (
            <button
              key={tab}
              className={`px-3 sm:px-6 py-3 text-sm sm:text-lg font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab === "weapons"
                ? "Weapons and Armor"
                : tab.charAt(0).toUpperCase() +
                  tab.slice(1).replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "info" && (
            <InfoTab
              info={character.info}
              onChange={(updatedInfo) =>
                setCharacter({ ...character, info: updatedInfo })
              }
            />
          )}

          {activeTab === "stats" && (
            <StatsTab
              stats={character.stats}
              onChange={(updatedStats) =>
                setCharacter({ ...character, stats: updatedStats })
              }
            />
          )}

          {activeTab === "weapons" && (
            <WeaponsTab
              weapons={character.weapons}
              armor={character.armor}
              onWeaponsChange={(updatedWeapons) =>
                setCharacter({ ...character, weapons: updatedWeapons })
              }
              onArmorChange={(updatedArmor) =>
                setCharacter({ ...character, armor: updatedArmor })
              }
            />
          )}

          {activeTab === "paths" && (
            <PathsTab
              paths={character.paths}
              onChange={(updatedPaths) =>
                setCharacter({ ...character, paths: updatedPaths })
              }
            />
          )}

          {activeTab === "talents" && (
            <TalentsTab
              talents={character.talents}
              onChange={(updatedTalents) =>
                setCharacter({ ...character, talents: updatedTalents })
              }
            />
          )}

          {activeTab === "ancestryTraits" && (
            <AncestryTraitsTab
              ancestryTraits={character.ancestryTraits || []}
              onChange={(updatedAncestryTraits) =>
                setCharacter({
                  ...character,
                  ancestryTraits: updatedAncestryTraits,
                })
              }
            />
          )}

          {activeTab === "spells" && (
            <SpellsTab
              spells={character.spells}
              incantations={character.equipment.incantations || []}
              onChange={(updatedSpells) =>
                setCharacter({ ...character, spells: updatedSpells })
              }
              onIncantationsChange={(updated) =>
                setCharacter({
                  ...character,
                  equipment: { ...character.equipment, incantations: updated },
                })
              }
            />
          )}

          {activeTab === "equipment" && (
            <EquipmentTab
              equipment={character.equipment}
              weapons={character.weapons}
              armor={character.armor}
              onEquipmentChange={(updated) =>
                setCharacter({ ...character, equipment: updated })
              }
              onWeaponsChange={(updated) =>
                setCharacter({ ...character, weapons: updated })
              }
              onArmorChange={(updated) =>
                setCharacter({ ...character, armor: updated })
              }
            />
          )}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 left-4 sm:left-auto sm:right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center z-50">
          <Check className="mr-2 h-4 w-4" /> Copied!
        </div>
      )}
    </div>
  );
};

export default ShadowOfTheDemonLordSheet;
