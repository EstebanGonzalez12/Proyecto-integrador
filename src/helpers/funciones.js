import Swal from "sweetalert2";

export const alerta = (titulo, texto, icono = "info") => {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#1d4ed8",
  });
};
