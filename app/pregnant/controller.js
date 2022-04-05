import Pregnant from "./model.js";
import { formatDate, getUmur } from "../../utilities/index.js";

const getHtp = (hpht) => {
  const splitHpht = hpht.split(" ");
  if (
    splitHpht.length !== 3 ||
    isNaN(splitHpht[0]) ||
    Number(splitHpht[0]) > 31 ||
    isNaN(splitHpht[1]) ||
    Number(splitHpht[1]) > 12 ||
    isNaN(splitHpht[2])
  ) {
    throw "HPHT tidak benar";
  }
  const tgl =
    Number(splitHpht[0]) + 7 > 30
      ? (Number(splitHpht[0]) + 7) % 30
      : Number(splitHpht[0]) + 7;
  const bulan =
    Number(splitHpht[1]) <= 3
      ? Number(splitHpht[1]) + 9
      : Number(splitHpht[1]) - 3;
  const tahun = Number(splitHpht[2]) + 1;
  return `${tgl} ${bulan} ${tahun}`;
};

const getStatus = ({
  penolong,
  tempat,
  pendamping,
  transport,
  calonPendonor,
}) => {
  console.log(penolong, tempat, pendamping, transport, calonPendonor);
  if (!penolong || !tempat || !pendamping || !transport || !calonPendonor) {
    return false;
  }
  return true;
};

const getDateNow = () => {
  const date = new Date();
  const tgl = date.getDate();
  const bln = date.getMonth();
  const thn = date.getFullYear();
  return `${tgl} ${bln + 1} ${thn}`;
};

const getUsiaKehamilan = (hpht, date) => {
  const [tgl, bln, thn] = hpht.split(" ");
  const [dateTgl, dateBln, dateThn] = date.split(" ");
  const timeHpht = new Date(Number(thn), Number(bln) - 1, Number(tgl));
  const timeDate = new Date(
    Number(dateThn),
    Number(dateBln) - 1,
    Number(dateTgl)
  );
  const usia = timeDate - timeHpht;
  const usiaMinggu = Math.floor(usia / (7 * 24 * 60 * 60 * 1000));
  return usiaMinggu;
};

export const createPregnant = async (req, res) => {
  const pregnant = req.body;
  try {
    const htp = getHtp(pregnant.hpht);
    const status = getStatus(pregnant);
    pregnant.htp = htp;
    pregnant.status = status;
    const newPregnant = new Pregnant(pregnant);
    await newPregnant.save();
    res.status(200).json({ message: "Berhasil disimpan" });
  } catch (error) {
    if (error)
      res
        .status(500)
        .json({ errorMessage: error ? error : "Internal server error" });
  }
};

export const createCekup = async (req, res) => {
  const { date, tm1, tm2, ...cekup } = req.body;
  const { id } = req.params;
  try {
    if (!date) {
      const nowDate = getDateNow();
      cekup.date = nowDate;
    } else {
      cekup.date = date;
    }

    if (tm1) {
      await Pregnant.findOneAndUpdate({ _id: id }, { tm1: true });
    }
    if (tm2) {
      await Pregnant.findOneAndUpdate({ _id: id }, { tm2: true });
    }

    const pregnant = await Pregnant.findById(id);
    cekup.uKehamilan = getUsiaKehamilan(pregnant.hpht, cekup.date);

    await Pregnant.findByIdAndUpdate(id, { cekup: [...pregnant.cekup, cekup] });
    res.status(200).json({ message: "Riwayat cekup disimpan" });
  } catch (error) {
    if (error)
      res
        .status(500)
        .json({ errorMessage: error ? error : "Internal server error" });
  }
};

export const getAllPregnant = async (req, res) => {
  try {
    let pregnants = await Pregnant.find(
      {},
      "_id name husband htp noHp kader status"
    ).populate("kader");
    pregnants = pregnants.map((pregnant) => {
      return {
        _id: pregnant._id,
        kader: pregnant.kader.name,
        name: pregnant.name,
        husband: pregnant.husband,
        htp: formatDate(pregnant.htp),
        noHp: pregnant.noHp,
        status: pregnant.status ? "Selesai" : "Proses",
      };
    });
    res.status(200).json({ data: pregnants });
  } catch (error) {
    if (error)
      res
        .status(500)
        .json({ errorMessage: error ? error : "Internal server error" });
  }
};

export const getAllPregnantKader = async (req, res) => {
  const { id } = req.params;
  try {
    let pregnants = await Pregnant.find(
      { kader: id },
      "_id name husband htp noHp kader status"
    ).populate("kader");
    pregnants = pregnants.map((pregnant) => {
      return {
        _id: pregnant._id,
        kader: pregnant.kader.name,
        name: pregnant.name,
        husband: pregnant.husband,
        htp: formatDate(pregnant.htp),
        noHp: pregnant.noHp,
        status: pregnant.status ? "Selesai" : "Proses",
      };
    });
    res.status(200).json({ data: pregnants });
  } catch (error) {
    if (error)
      res
        .status(500)
        .json({ errorMessage: error ? error : "Internal server error" });
  }
};

export const getPregnantById = async (req, res) => {
  const { id } = req.params;
  try {
    let pregnant = await Pregnant.findById(id);
    pregnant = {
      _id: pregnant._id,
      name: pregnant.name,
      husband: pregnant.husband,
      nik: pregnant.nik,
      bpjs: pregnant.bpjs,
      hpht: formatDate(pregnant.hpht),
      htp: formatDate(pregnant.htp),
      golDarah: pregnant.golDarah,
      noHp: pregnant.noHp,
      allRisk: pregnant.allRisk,
      umur: getUmur(pregnant.born),
      allTablet: pregnant.cekup.reduce((total, arr) => total + arr.tDarah, 0),
      tm1: pregnant.tm1,
      tm2: pregnant.tm2,
      cekup: pregnant.cekup.map((data) => ({
        ...data,
        date: formatDate(data.date),
      })),
    };
    res.status(200).json({ data: pregnant });
  } catch (error) {
    if (error)
      res
        .status(500)
        .json({ errorMessage: error ? error : "Internal server error" });
  }
};
