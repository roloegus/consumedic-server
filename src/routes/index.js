const { Router } = require("express");
const doctors = require("./doctors");
const patients = require("./patients");
const socialSecurity = require("./socialSecurity");
const specialties = require("./specialties");
const opinions = require("./opinions");
const clinicHistory = require("./clinicHistory");
const payments = require("./payments");
const horarios = require("./horarios");
const appointments = require("./appointments");
const mail = require("./mail");
const documentos = require("./documentos");
const dashboardMedico = require("./dashboardMedico");
const dashboardPaciente = require("./dashboardPaciente");
const panelAdmin = require("./panelAdmin")

//!fake data
const { createFakeData } = require("../fakeData/fakeData");
const { dataFalsaDoctores } = require("../fakeData/fake2");


const router = Router();

router.post("/fake", async (req, res) => {
  try {
    await createFakeData();
    return res.status(200).send("data created");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/fake2", async (req, res) => {
  try {
    await dataFalsaDoctores();
    return res.status(200).send("data created");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.use("/doctors", doctors);
router.use("/patients", patients);
router.use("/socialSecurity", socialSecurity);
router.use("/specialties", specialties);
router.use("/opinions", opinions);
router.use("/clinicHistory", clinicHistory);
router.use("/payments", payments);
router.use("/appointments", appointments);
router.use("/mail", mail);
router.use("/horarios", horarios);
router.use("/documentos", documentos);
router.use("/perfilMedico/", dashboardMedico);
router.use("/perfilPaciente/", dashboardPaciente);
router.use("/admin", panelAdmin)

module.exports = router;
