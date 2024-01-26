import { useState } from "react";
import { Group, Issues } from "../../interfaces";

export function useGestor() {
    const [groupSelector, setGroupSelector] = useState<{
      isOpen: boolean;
      selectedIssue?: Issues;
      groupsToAssign: Group[];
    }>({isOpen: false, groupsToAssign: []});

    return {
        groupSelector, setGroupSelector
    }
}