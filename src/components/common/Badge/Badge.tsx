import './Badge.css';

interface BadgeProps {
    text: string;
    canRemove?: boolean;
    onRemove?: (text: string) => void;
}

export default function Badge({ text, canRemove, onRemove }: BadgeProps) {
    return (
        <span className="badge">
            <span className="badge-text">{text}</span>
            {canRemove ? (
                <span className='badge-close' onClick={() => onRemove?.(text)}>⨯</span>
            ): null}
        </span>
    );
}
