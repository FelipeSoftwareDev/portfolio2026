import type { ReactNode, CSSProperties } from 'react';
import './GlassCard.css';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

const GlassCard = ({ children, className = '', style }: GlassCardProps) => {
    return (
        <div className={`glass-card ${className}`} style={style}>
            {children}
        </div>
    );
};

export default GlassCard;
