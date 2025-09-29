// @/components/request.tsx
"use client";

import { JSX, useEffect, useState } from "react";

export function TestRequest(): JSX.Element {
    const [message, setMessage] = useState<string>("Loading...");

    useEffect(() => {
        fetch("/api")
            .then(res => res.json())
            .then(data => setMessage(data.message))
            .catch(err => setMessage("Error: " + err.message));
    }, []);

    return (
        <span>
            {message}
        </span>
    );
}
