

interface CarsSchema {
  plate: string
  color: string
  brand: string
  trashed?: boolean
  isAvailable?: boolean;
}

const cars: CarsSchema[] = [
  {
    plate: "asd1234",
    color: "grey",
    brand: "VW",

  },
  {
    plate: "asd1235",
    color: "white",
    brand: "FIAT",
  },
  {
    plate: "asd1236",
    color: "black",
    brand: "OPEL",
  }
];

export default cars;
