const { Router } = require("express");
const { loginPatient } = require("../handlers/auth");

const {
  getPatients,
  getPatientsById,
  postPatient,
  putPatient,
  getSoftDeletedPatients,
  restorePatients,
  deletePatients,
  editPatientProfile,
} = require("../handlers/patients");

const patientsRouter = Router();

// GET
patientsRouter.get("/", getPatients); // tener en cuenta el query by ?name=....
patientsRouter.get("/softDeleted", getSoftDeletedPatients);
patientsRouter.get("/:id", getPatientsById);
// POST
patientsRouter.post("/", postPatient);
patientsRouter.post("/login", loginPatient);

//PUT
patientsRouter.put("/", putPatient);

patientsRouter.put("/restore/:id", restorePatients);
patientsRouter.put("/profile", editPatientProfile);

//DELETE
patientsRouter.delete("/:id", deletePatients);

//! esta es nueva
// DELETE
patientsRouter.delete("/detail/:id", deletePatients); // Ruta para eliminar un paciente por ID

module.exports = patientsRouter;
