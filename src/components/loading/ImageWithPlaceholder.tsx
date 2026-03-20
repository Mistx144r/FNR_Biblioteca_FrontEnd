import {type CSSProperties, useEffect, useRef, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import VanillaTilt from "vanilla-tilt";

type ImageWithPlaceholderProps = {
    src: string;
    alt?: string;
    sizeX?: number | string;
    sizeY?: number | string;
    ref?: boolean;
    fallbackSrc?: string;
    timeoutMs?: number;
};

function loadImage(src: string, timeoutMs: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        const timeout = setTimeout(() => {
            reject(new Error("timeout"));
        }, timeoutMs);

        img.onload = () => {
            clearTimeout(timeout);

            if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
                reject(new Error("invalid_size"));
                return;
            }

            resolve(src);
        };

        img.onerror = () => {
            clearTimeout(timeout);
            reject(new Error("error"));
        };

        img.src = src;
    });
}

function ImageWithPlaceholder({ src, alt = "", sizeX, sizeY, fallbackSrc, timeoutMs = 3000, ref = false }: ImageWithPlaceholderProps) {
    const sizeStyles: CSSProperties = sizeX && sizeY ? { width: sizeX, height: sizeY } : { width: "100%", height: "100%" };

    const tiltRef = useRef<HTMLDivElement & { vanillaTilt?: { destroy: () => void } }>(null);
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

    useEffect(() => {
        if (ref && tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 10,
                speed: 100,
                glare: true,
                "max-glare": 0.1,
            });
        }

        return () => {
            tiltRef.current?.vanillaTilt?.destroy();
        };
    }, [ref]);

    const { data } = useQuery({
        queryKey: ["image", src],
        queryFn: () => loadImage(src, timeoutMs),
        retry: 1,
        staleTime: 50000,
        enabled: !!src,
        refetchOnWindowFocus: false,
    });

    const finalSrc = data ?? fallbackSrc;
    const imageLoaded = loadedSrc === finalSrc;

    return (
        <div
            ref={tiltRef}
            style={sizeStyles}
            className={clsx("group relative rounded-md overflow-hidden", ref ? "shadow-xl" : "")}
        >
            {!imageLoaded && (
                <div className="absolute inset-0 bg-four animate-pulse" />
            )}

            {finalSrc && (
                <img
                    src={finalSrc}
                    alt={alt}
                    onLoad={() => setLoadedSrc(finalSrc)}
                    className={clsx(
                        "z-10 w-full h-full object-cover transition-opacity duration-500",
                        imageLoaded ? "opacity-100" : "opacity-0"
                    )}
                />
            )}
        </div>
    );
}

export default ImageWithPlaceholder;