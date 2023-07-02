import React, { useState, useEffect, useRef } from "react";

interface DropdownCheckboxProps {
  options: string[];
  selectedOptions: string[];
  placeholder: string;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  onChange?: (selectedOptions: string[]) => void;
  onSelect?: (selectedOptions: string[]) => void;
}

const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
  options,
  selectedOptions,
  placeholder,
  setSelectedOptions,
  onChange,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      setIsOverflow(ref.current.scrollHeight > ref.current.clientHeight);
    }
  }, [isOpen]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setSelectedOptions((prevState) => {
      let nextState;
      if (prevState.includes(name)) {
        nextState = prevState.filter((item) => item !== name);
      } else {
        nextState = [...prevState, name];
      }

      if (onChange) {
        onChange(nextState);
      }
      if (onSelect) {
        onSelect(nextState);
      }

      return nextState;
    });
  };

  const handleClearSelection = () => {
    setSelectedOptions([]);

    if (onChange) {
      onChange([]);
    }
  };

  let selectedNamesString = selectedOptions.join(", ");
  if (selectedNamesString.length > 15) {
    selectedNamesString = `${selectedNamesString.substr(0, 15)}...`;
  }

  const buttonText =
    selectedOptions.length > 0 ? selectedNamesString : placeholder;

  const arrowOrClearIcon =
    selectedOptions.length > 0 ? (
      <span onClick={handleClearSelection} className="clear-selection">
        X
      </span>
    ) : isOpen ? (
      <span className="arrow-icon">&#9650;</span>
    ) : (
      <span className="arrow-icon">&#9660;</span>
    );

  return (
    <div className="dropdown-checkbox" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {buttonText}
        {arrowOrClearIcon}
      </button>

      {isOpen && (
        <div
          className={`dropdown-checkbox-list ${isOverflow ? "scrollable" : ""}`}
        >
          {options.map((option, index) => (
            <label key={index} className="dropdown-checkbox-list-item">
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                name={option}
                checked={selectedOptions.includes(option)}
                onChange={handleCheckboxChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
