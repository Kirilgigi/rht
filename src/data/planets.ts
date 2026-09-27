export interface Planet {
  name: string;
  nameRu: string;
  radius: number; // визуальный радиус в пикселях
  orbitRadius: number; // визуальный радиус орбиты
  realRadius: string; // реальный радиус
  distanceFromSun: string; // расстояние от Солнца
  orbitalPeriod: string; // орбитальный период
  color: string;
  speed: number; // скорость движения (радиан/кадр)
  description: string;
  ringColor?: string;
}

export const planets: Planet[] = [
  {
    name: "Mercury",
    nameRu: "Меркурий",
    radius: 4,
    orbitRadius: 60,
    realRadius: "2 439 км",
    distanceFromSun: "57,9 млн км",
    orbitalPeriod: "88 дней",
    color: "#b5b5b5",
    speed: 0.04,
    description: "Самая маленькая планета и ближайшая к Солнцу. Не имеет атмосферы и спутников."
  },
  {
    name: "Venus",
    nameRu: "Венера",
    radius: 7,
    orbitRadius: 95,
    realRadius: "6 052 км",
    distanceFromSun: "108,2 млн км",
    orbitalPeriod: "225 дней",
    color: "#e8cda0",
    speed: 0.015,
    description: "Самая горячая планета Солнечной системы. Вращается в обратном направлении."
  },
  {
    name: "Earth",
    nameRu: "Земля",
    radius: 8,
    orbitRadius: 135,
    realRadius: "6 371 км",
    distanceFromSun: "149,6 млн км",
    orbitalPeriod: "365,25 дней",
    color: "#4da6ff",
    speed: 0.01,
    description: "Наш дом. Единственная известная планета с жизнью. Имеет один спутник — Луну."
  },
  {
    name: "Mars",
    nameRu: "Марс",
    radius: 6,
    orbitRadius: 175,
    realRadius: "3 390 км",
    distanceFromSun: "227,9 млн км",
    orbitalPeriod: "687 дней",
    color: "#e05040",
    speed: 0.008,
    description: "Красная планета. Имеет два спутника: Фобос и Деймос. Цель будущих колонизаций."
  },
  {
    name: "Jupiter",
    nameRu: "Юпитер",
    radius: 18,
    orbitRadius: 240,
    realRadius: "69 911 км",
    distanceFromSun: "778,5 млн км",
    orbitalPeriod: "11,86 лет",
    color: "#d4a574",
    speed: 0.004,
    description: "Самая большая планета. Газовый гигант с Большим Красным Пятном — гигантским штормом."
  },
  {
    name: "Saturn",
    nameRu: "Сатурн",
    radius: 15,
    orbitRadius: 310,
    realRadius: "58 232 км",
    distanceFromSun: "1 434 млн км",
    orbitalPeriod: "29,46 лет",
    color: "#e8d5a3",
    speed: 0.003,
    ringColor: "#c4a862",
    description: "Знаменита своими кольцами из льда и камней. Вторая по размеру планета."
  },
  {
    name: "Uranus",
    nameRu: "Уран",
    radius: 11,
    orbitRadius: 375,
    realRadius: "25 362 км",
    distanceFromSun: "2 871 млн км",
    orbitalPeriod: "84,01 лет",
    color: "#7ec8e3",
    speed: 0.002,
    description: "Ледяной гигант. Вращается «на боку» — ось наклонена на 98°."
  },
  {
    name: "Neptune",
    nameRu: "Нептун",
    radius: 10,
    orbitRadius: 430,
    realRadius: "24 622 км",
    distanceFromSun: "4 495 млн км",
    orbitalPeriod: "164,8 лет",
    color: "#4169e1",
    speed: 0.001,
    description: "Самая далёкая планета. Имеет самые сильные ветры в Солнечной системе — до 2100 км/ч."
  }
];
