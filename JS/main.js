//alert("connected");

const yearSelect = document.querySelector("#selectyear");
const makeSelect = document.querySelector("#make");
const modelSelect = document.querySelector("#model");

fetch("./car-dataset.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load the car dataset.");
    }
    return response.json();
  })

  .then((carData) => {
    const uniqueYears = [];
    carData.forEach((car) => {
      if (!uniqueYears.includes(car.year)) {
        uniqueYears.push(car.year);
      }
    });

    uniqueYears
      .sort((a, b) => b - a)
      .forEach((year) => {
        const option = document.createElement("option");
        option.value = year;

        option.textContent = year;
        yearSelect.appendChild(option);
      });

    yearSelect.addEventListener("change", (event) => {
      const selectedYear = event.target.value;
      makeSelect.innerHTML = '<option value="">Select Make</option>';

      makeSelect.disabled = true;
      modelSelect.innerHTML = '<option value="">Select Model</option>';

      modelSelect.disabled = true;

      if (selectedYear) {
        makeSelect.disabled = false;

        const carsOfYear = carData.filter((car) => car.year == selectedYear);

        const uniqueMakes = [];

        carsOfYear.forEach((car) => {
          if (!uniqueMakes.includes(car.Manufacturer)) {
            uniqueMakes.push(car.Manufacturer);
          }
        });

        uniqueMakes.sort().forEach((make) => {
          const opt = document.createElement("option");
          opt.value = make;
          opt.textContent = make;
          makeSelect.appendChild(opt);
        });
      }
    });

    makeSelect.addEventListener("change", (event) => {
      const selectedYear = yearSelect.value;
      const selectedMake = event.target.value;
      modelSelect.innerHTML = '<option value="">Select Model</option>';

      if (selectedMake) {
        modelSelect.disabled = false;

        const filteredModels = carData.filter(
          (car) => car.year == selectedYear && car.Manufacturer == selectedMake
        );

        filteredModels.forEach((car) => {
          const opt = document.createElement("option");
          opt.value = car.model;
          opt.textContent = car.model;
          modelSelect.appendChild(opt);
        });
      }
    });
    modelSelect.addEventListener("change", (event) => {
      const car = carData.find(
        (c) =>
          c.year == yearSelect.value &&
          c.Manufacturer == makeSelect.value &&
          c.model == event.target.value
      );

      if (car) {
        const { year, Manufacturer, model, price } = car;

        console.log(`Result: ${year} ${Manufacturer} ${model} - $${price}`);
      }
    });
  });
