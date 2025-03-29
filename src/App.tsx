"use client";
import { useState } from "react";
import { Check } from "lucide-react";

export default function PageSelection() {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState<Record<number, string>>({});
  
  const pages = [1, 2, 3, 4];
  const selectAnimationStages = ["outlined", "tick1", "tick2", "blue-tick", "blue-bg", ];
  const deselectAnimationStages = ["light-blue", "blue-bg", "blue-tick", "tick2", "tick1", "outlined", "reset"];

  const handlePageSelect = (pageNum: number) => {
    const isSelected = selectedPages.includes(pageNum);

    // Use different animation sequence based on whether selecting or deselecting
    if (isSelected) {
      // Deselecting - run reverse animation
      runDeselectionAnimation(pageNum);
    } else {
      // Selecting - run normal animation
      runSelectionAnimation(pageNum);
    }

    setTimeout(() => {
      setSelectedPages((prev) =>
        isSelected ? prev.filter((p) => p !== pageNum) : [...prev, pageNum]
      );
      setCheckboxStates((prev) => ({ ...prev, [pageNum]: isSelected ? "reset" : "blue-bg" }));
      setIsAllSelected(selectedPages.length + (isSelected ? -1 : 1) === pages.length);
    }, (isSelected ? deselectAnimationStages.length : selectAnimationStages.length) * 120);
  };

  const handleSelectAll = () => {
    const newSelected = !isAllSelected;

    // Run appropriate animation for all pages simultaneously
    if (newSelected) {
      // Selecting all
      pages.forEach(page => {
        runSelectionAnimation(page);
      });
    } else {
      // Deselecting all
      pages.forEach(page => {
        runDeselectionAnimation(page);
      });
    }

    setTimeout(() => {
      setSelectedPages(newSelected ? [...pages] : []);
      setIsAllSelected(newSelected);
      const newState = newSelected ? "blue-bg" : "reset";
      setCheckboxStates(Object.fromEntries(pages.map((page) => [page, newState])));
    }, (newSelected ? selectAnimationStages.length : deselectAnimationStages.length) * 120);
  };

  const runSelectionAnimation = (pageNum: number) => {
    selectAnimationStages.forEach((stage, index) => {
      setTimeout(() => {
        setCheckboxStates((prev) => ({ ...prev, [pageNum]: stage }));
      }, index * 120);
    });
  };

  const runDeselectionAnimation = (pageNum: number) => {
    deselectAnimationStages.forEach((stage, index) => {
      setTimeout(() => {
        setCheckboxStates((prev) => ({ ...prev, [pageNum]: stage }));
      }, index * 120);
    });
  };

  const renderCheckbox = (pageNum: number, isSelected: boolean, onClick: () => void) => {
    const state = checkboxStates[pageNum] || (isSelected ? "blue-bg" : "reset");
    let boxStyle = "w-6 h-6 rounded border border-gray-300 bg-white";
    let checkStyle = "opacity-0";

    switch (state) {
      case "outlined":
        boxStyle = "w-6 h-6 rounded border-2 border-gray-400 bg-white";
        checkStyle = "opacity-30 text-gray-500";
        break;
      case "tick1":
        checkStyle = "opacity-50 text-gray-500";
        break;
      case "tick2":
        checkStyle = "opacity-80 text-gray-700";
        break;
      case "blue-tick":
        boxStyle = "w-6 h-6 rounded border border-blue-500 bg-white";
        checkStyle = "opacity-100 text-blue-500";
        break;
      case "blue-bg":
        boxStyle = "w-6 h-6 rounded border-0 bg-blue-500";
        checkStyle = "opacity-100 text-white";
        break;
      case "light-blue":
        boxStyle = "w-6 h-6 rounded border-0 bg-blue-300";
        checkStyle = "opacity-100 text-white";
        break;
      case "reset":
        boxStyle = "w-6 h-6 rounded border border-gray-300 bg-white";
        checkStyle = "opacity-0";
        break;
      default:
        boxStyle = isSelected ? "w-6 h-6 rounded border-0 bg-blue-500" : "w-6 h-6 rounded border border-gray-300 bg-white";
        checkStyle = isSelected ? "opacity-100 text-white" : "opacity-0";
        break;
    }

    return (
      <div
        className="relative cursor-pointer"
        onClick={onClick}
        onMouseEnter={() => {
          if (isSelected) {
            setCheckboxStates((prev) => ({ ...prev, [pageNum]: "light-blue" }));
          } else {
            setCheckboxStates((prev) => ({ ...prev, [pageNum]: "tick1" }));
          }
        }}
        onMouseLeave={() => {
          if (isSelected) {
            setCheckboxStates((prev) => ({ ...prev, [pageNum]: "blue-bg" }));
          } else {
            setCheckboxStates((prev) => ({ ...prev, [pageNum]: "reset" }));
          }
        }}
      >
        <div className={boxStyle}></div>
        <div className={`absolute inset-0 flex items-center justify-center ${checkStyle}`}>
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between py-3">
            <label className="text-gray-800 font-medium">All pages</label>
            {renderCheckbox(0, isAllSelected, handleSelectAll)}
          </div>

          <div className="h-px bg-gray-200 my-1" />

          {pages.map((page) => (
            <div key={page} className="flex items-center justify-between py-3">
              <label className="text-gray-800">Page {page}</label>
              {renderCheckbox(page, selectedPages.includes(page), () => handlePageSelect(page))}
            </div>
          ))}

          <div className="h-px bg-gray-200 my-1" />

          <button
            className="w-full py-3 mt-3 rounded text-center font-medium transition-all duration-200 bg-[rgba(255,206,34,1)] hover:bg-[rgba(255,216,77,1)] active:bg-[rgba(245,190,24,1)]"
            onClick={() => {
              console.log("Selected pages:", selectedPages);
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
