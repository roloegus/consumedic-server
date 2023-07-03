const { PacienteType, ObraSocial } = require('../../db');

const createPatient = async (
  dni,
  email,
  hashedPassword,
  telefono,
  nombre,
  apellido,
  idObraSocial,
  status,
  admin
) => {
  const newObraSocial = await ObraSocial.findByPk(idObraSocial);

  const patientExists = await PacienteType.findOne({
    where: {
      email: email,
    },
  });

  if(patientExists) throw new Error (`Ya existe un paciente registrado con ese email.`)

  const newPatient = await PacienteType.create({
    dni,
    email,
    password: hashedPassword,
    telefono,
    nombre,
    apellido,
    ObraSocialId: newObraSocial?.id,
    status,
    admin
  });
  newPatient.password = '';
  return newPatient;
};

module.exports = { createPatient };
