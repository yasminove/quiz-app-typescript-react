export {}

export const shffleChoices = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5)
}