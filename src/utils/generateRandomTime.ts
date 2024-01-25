export function generateRandomTime() {
    const minTime = 30;
    const maxTime = 60;
    const randomTime =
      Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    return randomTime * 60 * 1000;
  }
  