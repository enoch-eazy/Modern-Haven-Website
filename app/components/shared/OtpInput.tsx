"use client";

import { useRef } from "react";

interface OtpInputProps {
    value: string;
    onChange: (value: string) => void;
    /** Called when the last digit is filled in. */
    onComplete?: (value: string) => void;
    length?: number;
    invalid?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    /** Id of the element describing an error, for screen readers. */
    describedBy?: string;
}

/** A row of single-digit boxes. Supports typing, pasting the whole code, arrows and backspace. */
export default function OtpInput({ value, onChange, onComplete, length = 6, invalid, disabled, autoFocus, describedBy }: OtpInputProps) {
    const refs = useRef<(HTMLInputElement | null)[]>([]);
    const digits = Array.from({ length }, (_, i) => value[i] ?? "");

    const focus = (index: number) => refs.current[Math.max(0, Math.min(length - 1, index))]?.focus();

    const commit = (next: string, focusIndex: number) => {
        const clean = next.replace(/\D/g, "").slice(0, length);
        onChange(clean);
        focus(focusIndex);
        if (clean.length === length) onComplete?.(clean);
    };

    const handleChange = (index: number, raw: string) => {
        const typed = raw.replace(/\D/g, "");
        if (!typed) return;
        // The value has no gaps, so typing past the end fills the first empty box. A paste or SMS
        // autofill delivers several digits at once: fill from that box onwards.
        const start = Math.min(index, value.length);
        const next = value.slice(0, start) + typed + value.slice(start + typed.length);
        commit(next, start + typed.length);
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
            event.preventDefault();
            if (digits[index]) {
                onChange(value.slice(0, index) + value.slice(index + 1));
            } else if (index > 0) {
                onChange(value.slice(0, index - 1) + value.slice(index));
                focus(index - 1);
            }
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            focus(index - 1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            focus(index + 1);
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (!pasted) return;
        event.preventDefault();
        commit(pasted, pasted.length);
    };

    return (
        <div role="group" aria-label={`${length}-digit code`} className="grid grid-cols-6 gap-2 sm:gap-3">
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        refs.current[index] = el;
                    }}
                    value={digit}
                    onChange={(event) => handleChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                    onFocus={(event) => event.target.select()}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    autoFocus={autoFocus && index === 0}
                    disabled={disabled}
                    aria-label={`Digit ${index + 1}`}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    className="input-field h-12 !px-0 text-center font-mono text-xl font-bold sm:h-14 sm:text-2xl"
                />
            ))}
        </div>
    );
}
