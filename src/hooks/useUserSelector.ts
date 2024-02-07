import { useState } from "react";

export default function useUserSelector() {
    const [open, setOpen] = useState(false);

    return { open, setOpen}
}