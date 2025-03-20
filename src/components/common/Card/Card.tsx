import './Card.css';

interface CardProps {
    headerText: string;
    subTitleText: string;
    children?: React.ReactNode;
    className?: string;
}

export default function Card({ headerText, subTitleText, children, className }: CardProps) {
    if (!headerText || !subTitleText) {
        return <div className="card">{children}</div>
    }

    return (
        <div className={`card ${className}`}>
            <header className="card-header">{headerText}</header>
            <p className="card-subtitle">{subTitleText}</p>

            {headerText || subTitleText ? <hr /> : null}

            {children}
        </div>
    );
}
