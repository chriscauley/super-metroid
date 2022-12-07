export const getStaticUrl = (url) => {
  const root = process.env.NODE_ENV === 'production' ? '.' : ''
  return root + url
}
