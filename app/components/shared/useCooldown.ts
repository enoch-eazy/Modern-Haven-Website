"use client";

import { useCallback, useEffect, useState } from "react";

/** Seconds left before an action (like "resend code") is allowed again. */
export function useCooldown(initialSeconds = 0) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) return;
        const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(timer);
    }, [seconds]);

    const start = useCallback((value: number) => setSeconds(value), []);
    return [seconds, start] as const;
}

/** Reads "wait 42s" out of the API's cooldown message, falling back to a full minute. */
export function cooldownFromMessage(message: string) {
    const match = message.match(/(\d+)s/);
    return match ? Number(match[1]) : 60;
}
