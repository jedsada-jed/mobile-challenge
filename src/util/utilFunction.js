export const limitText = (limit, text) => {
  if (text.length > limit) {
    return `${text.substring(0, limit)} ...`
  }
  return text
}