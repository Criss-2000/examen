import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Style/abel.css"; // Importar el CSS Module

const Estudiantes = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cursos")
      .then((response) => {
        setData(response.data); // Aquí accedemos directamente al array
        setFilteredData(response.data); // Inicialmente muestra todos los datos
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim(); // Eliminar espacios adicionales en el término de búsqueda
    const filtered = data.filter(
      (est) =>
        est.Carnet &&
        est.Carnet.replace(/\s+/g, "").includes(
          trimmedSearchTerm.replace(/\s+/g, "")
        )
    );
    setFilteredData(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredData(data); // Restaurar la lista completa
  };

  return (
    <>
      <div className="container">
        <form action="">
          <label htmlFor="carnet" translate="no">
            Carnet:
            <input type="text" required name="carnet" id="carnet" />
          </label>
          <br />
          <br />
          <label htmlFor="carnet" translate="no">
            Nombre curso:
            <input type="text" disabled name="nombre" id="nombre" />
          </label>
          <br />
          <br />
          <label htmlFor="carnet" translate="no">
            Creditos:
            <input type="email" disabled name="correo" id="correo" />
          </label>
          <br />
          <br />
          <label htmlFor="carnet" translate="no">
            Descripccion:
            <input type="text" disabled name="seccion" id="seccion" />
          </label>
          <fieldset>
            <legend>
              <b>Elija la accion</b>
            </legend>
            <div className="container-boton">
              <button type="submit">Guardar</button>
              <button type="submit">Limpiar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Estudiantes;
