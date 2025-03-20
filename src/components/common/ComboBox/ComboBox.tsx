import { useRef, useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import './ComboBox.css';
import { useClickInside } from "../../../hooks/useClickInside";
import { useClickOutside } from "../../../hooks/useClickOutside";

interface ComboBoxProps {
    options: string[];
    values: string[];
    onChange: (values: string[]) => void;
}

export default function ComboBox({ options, values, onChange }: ComboBoxProps) {
    const [open, setOpen] = useState(false);
    const comboBoxRef = useRef(null);

    useClickInside(comboBoxRef, () => setOpen(true));
    useClickOutside(comboBoxRef, () => setOpen(false));

    const isOptionSelected = (option: string) => {
        return values.includes(option);
    };

    const handleOptionClick = (option: string) => {
        if (isOptionSelected(option)) {
            onChange(values.filter((value) => value !== option));
        } else {
            onChange([...values, option]);
        }
    };

    return (
        <div className="combobox" ref={comboBoxRef}>
            <input className="combobox-input" type="text" />
            <SearchIcon className="combobox-search-icon" />
            <span className="combobox-info">{values.length}/{options.length}</span>

            {open ? (
                <div className="combobox-options">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`combobox-option ${isOptionSelected(option) ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            <input
                                type="checkbox"
                                checked={isOptionSelected(option)}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        onChange([...values, option]);
                                    } else {
                                        onChange(values.filter((value) => value !== option));
                                    }
                                }}
                            />
                            <span className="combobox-option-value">{option}</span>
                        </div>
                    ))}
                </div>
            ): null}
        </div>
    );
}
