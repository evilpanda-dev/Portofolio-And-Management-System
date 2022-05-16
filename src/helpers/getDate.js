export const getDate = (date) => {
    let dateTime = new Date(date)
    if (date !== null) {
        return `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
    } else {
        return null
    }
}