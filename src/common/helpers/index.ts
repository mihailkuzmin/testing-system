export const timeout = (time: number): Promise<void> => new Promise((res) => setTimeout(res, time))
