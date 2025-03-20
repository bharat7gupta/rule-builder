import './TextBox.css';

interface TextBoxProps {
    type?: HTMLInputElement['type'];
    value: string;
    onChange: (value: string) => void;
}

export default function TextBox({ type = 'text', value, onChange }: TextBoxProps) {
    return (
        <div>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event?.target.value)}
                className="custom-textbox"
            />
        </div>
    );
}
