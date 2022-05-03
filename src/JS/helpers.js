export function currentDate() {
  const date = new Date();
  const sumDay = date.setDate(date.getDate() + 1);
  const sumDayFormat = new Date(sumDay).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formatDate = sumDayFormat.split("/").reverse().join("-");
  return formatDate;
}

export function inputValues() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let locations = {
      origin: document.querySelector("#origin").value,
      destination: document.querySelector("#destination").value,
    };
    return locations;
    /* origin = "";
  destination = ""; */
  });
}