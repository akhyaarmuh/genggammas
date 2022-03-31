export const formatDate = (date) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const splited = date.split(" ");
  return `${splited[0]} ${months[Number(splited[1]) - 1]} ${splited[2]}`;
};

export const getUmur = (born) => {
  const splited = born.split(" ");
  const today = new Date();
  const birthday = new Date(splited[2], Number(splited[1]) - 1, splited[0]);
  let year = 0;

  if (today.getMonth() < birthday.getMonth()) {
    year = 1;
  } else if (
    today.getMonth() == birthday.getMonth() &&
    today.getDate() < birthday.getDate()
  ) {
    year = 1;
  }
  const age = today.getFullYear() - birthday.getFullYear() - year;
  if (age < 0) {
    age = 0;
  }
  return age;
};
