import Badge from "./Badge";
import './Badge.css';

interface BadgeGroupProps {
    items: string[];
    canRemove?: boolean;
    onRemove?: (text: string) => void;
}

export default function BadgeGroup({ items, canRemove, onRemove }: BadgeGroupProps) {
    return (
        <div className="badge-group">
            {items.map(item => (
                <Badge key={item} text={item} canRemove={canRemove} onRemove={() => onRemove?.(item)} />
            ))}
        </div>
    );
}
