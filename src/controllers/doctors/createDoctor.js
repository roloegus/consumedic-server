const { DoctorType, Especialidad, ObraSocial, Horario } = require('../../db');
const { createFirstHorarios } = require('../horarios/createFirstHorarios');

const createDoctor = async (
  dni,
  NumMatricula,
  nombre,
  apellido,
  email,
  telefono,
  direccion,
  imagenCloudinary,
  hashedPassword,
  titulo,
  Descripcion,
  precio,
  idEspecialidad,
  idObraSocial,
  status
) => {
  // if (!idEspecialidad) {
  //   throw new Error("Se debe proporcionar al menos una especialidad");
  // }
  // if (!idObraSocial) {
  //   throw new Error("Se debe proporcionar al menos una obra social");
  // }
  const doctorExists = await DoctorType.findOne({
    where: {
      email: email,
    },
  });

  if(doctorExists) throw new Error (`Ya existe un medico con ese email`);
  
  const newDoctor = await DoctorType.create({
    dni,
    NumMatricula,
    nombre,
    apellido,
    email,
    telefono,
    direccion,
    imagen: imagenCloudinary,
    password: hashedPassword,
    titulo,
    Descripcion,
    precio,
    status,
  });

  if (!newDoctor) throw new Error('No se pudo agregar el Doctor');

  if (Array.isArray(idEspecialidad) && idEspecialidad.length > 0) {
    for (let name of idEspecialidad) {
      console.log('name: ', name);
      let idEpecial = name;
      const newEspecialidad = await Especialidad.findAll({
        where: { id: idEpecial },
      });
      if (!newEspecialidad) throw new Error('No se encuentra Especialidad con el ID enviado');
      newDoctor.addEspecialidads(newEspecialidad);
    }
  } else {
    const newEspecialidad = await Especialidad.findAll({
      where: { id: idEspecialidad },
    });
    if (!newEspecialidad) throw new Error('No se encuentra Especialidad con el ID enviado');
    newDoctor.addEspecialidads(newEspecialidad);
  }

  if (Array.isArray(idObraSocial) && idObraSocial.length > 0) {
    for (let name of idObraSocial) {
      let idObra = name;
      const newObraSocial = await ObraSocial.findAll({
        where: { id: idObra },
      });
      if (!newObraSocial) throw new Error('No se encuentra Obra Social con el ID enviado');
      newDoctor.addObraSocials(newObraSocial);
    }
  } else {
    const newObraSocial = await ObraSocial.findAll({
      where: { id: idObraSocial },
    });
    if (!newObraSocial) throw new Error('No se encuentra Obra Social con el ID enviado');
    newDoctor.addObraSocials(newObraSocial);
  }
  await createFirstHorarios(newDoctor.id);

  return newDoctor;
};

module.exports = { createDoctor };
