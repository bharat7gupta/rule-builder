import './TextBox.css';

interface TextBoxProps {
    value: string;
    onChange: (value: string) => void;
}

export default function TextBox({ value, onChange }: TextBoxProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={(event) => onChange(event?.target.value)}
            className="custom-textbox"
        />
    );
}
