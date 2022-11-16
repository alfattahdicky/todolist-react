const convertUTCToDate = (utc) => {
  const date = new Date(utc);
  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juli", "Juni", "Agustus", "September", "November", "Desember"]

  return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
}

export default convertUTCToDate;