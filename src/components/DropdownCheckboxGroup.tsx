import React, { useEffect, useRef, useState } from "react";

interface DropdownCheckboxGroupProps {
  data: {
    [key: string]: string[];
  };
  selectedOptions: { [key: string]: string[] };
  placeholder: string;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] }>
  >;
  onChange?: (selectedOptions: { [key: string]: string[] }) => void;
  onSelect?: (selectedOptions: { [key: string]: string[] }) => void;
}

const DropdownCheckboxGroup: React.FC<DropdownCheckboxGroupProps> = ({
  data,
  selectedOptions,
  placeholder,
  setSelectedOptions,
  onChange,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    manName: string
  ) => {
    const { value, checked } = event.target;

    setSelectedOptions((prevState) => {
      const updatedOptions = { ...prevState };

      if (!updatedOptions[manName]) {
        updatedOptions[manName] = [];
      }

      if (checked) {
        if (!updatedOptions[manName].includes(value)) {
          updatedOptions[manName].push(value);
        }
      } else {
        updatedOptions[manName] = updatedOptions[manName].filter(
          (option) => option !== value
        );
      }

      return updatedOptions;
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      setIsOverflow(ref.current.scrollHeight > ref.current.clientHeight);
    }
  }, [isOpen]);

  const handleClearSelection = () => {
    setSelectedOptions({});

    if (onChange) {
      onChange({});
    }
  };

  const selectedNamesString = Object.values(selectedOptions)
    .flat()
    .join(", ")
    .slice(0, 15);

  const buttonText =
    Object.values(selectedOptions).flat().length > 0
      ? selectedNamesString + (selectedNamesString.length < 15 ? "" : "...")
      : placeholder;

  const arrowOrClearIcon =
    Object.values(selectedOptions).flat().length > 0 ? (
      <span onClick={handleClearSelection} className="clear-selection">
        X
      </span>
    ) : isOpen ? (
      <span className="arrow-icon">&#9650;</span>
    ) : (
      <span className="arrow-icon">&#9660;</span>
    );

  return (
    <div className="dropdown-checkbox-group">
      <button onClick={() => setIsOpen(!isOpen)}>
        {buttonText}
        {arrowOrClearIcon}
      </button>

      {isOpen && (
        <div
          className={`dropdown-checkbox-list ${isOverflow ? "scrollable" : ""}`}
          ref={ref}
        >
          {Object.entries(data).map(([manName, models]) => (
            <div key={manName}>
              <div className="manufacturer-name">{manName}:</div>
              <div className="model-names">
                {models.map((modelName) => (
                  <label key={modelName}>
                    <input
                      type="checkbox"
                      value={modelName}
                      checked={
                        selectedOptions[manName]
                          ? selectedOptions[manName].includes(modelName)
                          : false
                      }
                      onChange={(event) => handleCheckboxChange(event, manName)}
                    />
                    {modelName}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckboxGroup;
