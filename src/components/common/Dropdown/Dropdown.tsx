import { ChangeEvent } from 'react';
import './Dropdown.css';

interface DropdownProps {
    children?: React.ReactNode;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({ children, onChange }: DropdownProps) {
    return (
        <div className="custom-select-container">
            <select className="custom-select" onChange={onChange}>
                {children}
            </select>
            <div className="select-arrows">
                <div className="arrow-up"></div>
                <div className="arrow-down"></div>
            </div>
        </div>
    );
}