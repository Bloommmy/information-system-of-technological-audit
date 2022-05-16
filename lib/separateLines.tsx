
export const separateLines = (separator) => (stringItems) => {
  return (stringItems || '').split(separator).map((item, index, array) => (
    <>
      {item}
      {(index + 1) < array.length ? <br /> : ''}
    </>
  ))
}
