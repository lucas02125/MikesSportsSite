import React, { SyntheticEvent, useState } from "react";

type Props = {
  values: string[];
  dropdownName: string;
  onChange: (value: string) => void;
};

const Dropdown = ({ values, dropdownName, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(values[0]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleItemClicked = (item: string) => {
    setSelectedItem(item);
    setOpen(false);
    onChange(item);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-6/12 xl:w-3/12 p-4">
        <h4>{dropdownName}</h4>
        <button
          onClick={handleOpen}
          className="bg-lightGreen text-white px-4 py-2 rounded inline-flex items-center hover:text-darkBlue"
        >
          {selectedItem}
          <svg
            className="h-5 w-5 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
            />
          </svg>
        </button>
        {open && (
          <ul className="menu absolute bg-white shadow-lg rounded mt-2 py-1 w-32">
            {values.map((menuItem, index) => (
              <li
                key={index}
                onClick={() => handleItemClicked(menuItem)}
                className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
              >
                {menuItem}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
