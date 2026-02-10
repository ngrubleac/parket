import { useEffect, useRef, useState } from 'react';

interface InteractiveRevealProps {
    imageUrl: string;
}

export default function InteractiveReveal({ imageUrl }: InteractiveRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setMousePos({ x, y });
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 0) return;
            const rect = container.getBoundingClientRect();
            const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
            const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
            setMousePos({ x, y });
        };

        // Listen on document to track mouse even over text/buttons
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouchMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
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
                className="absolute inset-0 bg-cover bg-center transition-all duration-200 ease-out z-10"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    filter: 'brightness(1.2) contrast(1.15) saturate(1.1)',
                    maskImage: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`
                }}
            />
        </div>
    );
}
