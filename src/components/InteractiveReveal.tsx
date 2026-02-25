import { useEffect, useRef, useState, useCallback } from 'react';

interface InteractiveRevealProps {
    imageUrl: string;
}

export default function InteractiveReveal({ imageUrl }: InteractiveRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const requestRef = useRef<number>(0);
    const currentPos = useRef({ x: 50, y: 50 });

    const updatePosition = useCallback((x: number, y: number) => {
        currentPos.current = { x, y };

        if (!requestRef.current) {
            requestRef.current = requestAnimationFrame(() => {
                setMousePos(currentPos.current);
                requestRef.current = 0;
            });
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            updatePosition(x, y);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 0) return;
            const rect = container.getBoundingClientRect();
            const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
            const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
            updatePosition(x, y);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [updatePosition]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none"
            aria-hidden="true"
        >
            {/* Grayscale background layer with dark overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        filter: 'grayscale(100%)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-walnut/70 to-espresso/90" />
            </div>

            {/* Color reveal layer - enhanced brightness and contrast */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-out z-10"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    filter: 'brightness(1.2) contrast(1.1) saturate(1.1)',
                    maskImage: `radial-gradient(circle 350px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 80%)`,
                    WebkitMaskImage: `radial-gradient(circle 350px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 80%)`
                }}
            />
        </div>
    );
}
