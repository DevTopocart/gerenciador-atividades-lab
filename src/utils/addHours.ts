
export function addHours(json: any) {
    let totalHoras = 0;
  
    if (json.time_entries && Array.isArray(json.time_entries)) {
      for (const entry of json.time_entries) {
        if (entry.hours && typeof entry.hours === "number") {
          totalHoras += entry.hours;
        }
      }
    }
    return totalHoras.toFixed(2);
  }
  