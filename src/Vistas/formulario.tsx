import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentSearchComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);

  // Carga inicial de datos
  useEffect(() => {
    axios
      .get("/api/estudiantes")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  // Manejador de búsqueda
  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm
      .trim()
      .replace(/\s+/g, "")
      .toUpperCase();
    const found = data.find(
      (est) =>
        est.Carnet.replace(/\s+/g, "").toUpperCase() === trimmedSearchTerm
    );
    setSelectedEstudiante(found || null);
  };

  // Limpiar búsqueda y seleccionado
  const handleClear = () => {
    setSearchTerm("");
    setSelectedEstudiante(null);
  };

  return (
    <>
      {/* ////////////////// */}
      <div className="container">
        <form>
          <h1>
            <b>CONSULTA DE ALUMNOS</b>
          </h1>

          <br />
          <br />
          <label>
            Nombre del curso:
            <input
              type="text"
              value={selectedEstudiante ? selectedEstudiante.Estudiante : ""}
              disabled
            />
          </label>
          <br />
          <br />
          <label>
            Creditos:
            <input
              type="text"
              value={selectedEstudiante ? selectedEstudiante.Email : ""}
              disabled
            />
          </label>
          <br />
          <br />
          <label>
            Descripccion:
            <input
              type="text"
              value={selectedEstudiante ? selectedEstudiante.Descripccion : ""}
              disabled
            />
          </label>
          <fieldset>
            <legend>
              <b>Elija la accion</b>
            </legend>
            <div className="button-group">
              <button type="button" onClick={handleSearch}>
                Guardar
              </button>
              <button type="button" onClick={handleClear}>
                Limpiar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default StudentSearchComponent;
