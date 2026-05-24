const SERVICES = [
  {
    title: "Токарная обработка",
    desc: "Тела вращения, втулки, валы, фланцы. ЧПУ и универсальные станки.",
    icon: "◉",
  },
  {
    title: "Фрезерная обработка",
    desc: "Корпуса, пластины, пазы, контуры по 3D-модели и чертежу.",
    icon: "▣",
  },
  {
    title: "Электроэрозионная резка",
    desc: "Проволочная и пробивная ЭЭО: сложные контуры, закалённые стали, твёрдые сплавы.",
    icon: "⚡",
  },
  {
    title: "Лазерная резка",
    desc: "Раскрой листа, контуры и отверстия в стали, нержавейке и алюминии по DXF/DWG.",
    icon: "◇",
  },
  {
    title: "Сверление и расточка",
    desc: "Отверстия точных допусков, посадки под подшипники и штифты.",
    icon: "⊙",
  },
  {
    title: "Единичные и серийные заказы",
    desc: "От опытного образца до партий с повторяемым качеством.",
    icon: "≡",
  },
  {
    title: "Контроль качества",
    desc: "Измерительный инструмент, протоколы, сопровождение входного контроля.",
    icon: "✓",
  },
];

// Добавьте свои фото: положите файлы в assets/works/ и укажите путь в image.
const WORKS = [
  {
    title: "Корпус Клеймителя",
    material: "Алюминиевый сплав",
    operations: "Фрезерная обработка, сверление",
    industry: "Приборостроение",
    image: "assets/works/korpus-kleimitelya.jpg",
  },
  {
    title: "Изготовление профильного резца",
    material: "Быстрорежущая сталь",
    operations: "Проволочная электроэрозионная резка",
    industry: "Инструментальное производство",
    image: "assets/works/izgotovlenie-profilnogo-rezca.jpg",
  },
  {
    title: "Кольцо обдува экструдера",
    material: "Д16Т",
    operations: "Фрезерная обработка на ЧПУ",
    industry: "Полимерная экструзия",
    image: "assets/works/kolco-obduva-ekstrudera-d16t.jpg",
  },
  {
    title: "Раскрой деталей на лазере",
    material: "Листовая сталь",
    operations: "Лазерная резка по DXF",
    industry: "Серийное производство",
    image: "assets/works/raskroy-detalej-na-lazere.jpg",
  },
  {
    title: "Электроэрозионная резка блока деталей проволокой",
    material: "Конструкционная сталь",
    operations: "Проволочная электроэрозионная резка",
    industry: "Серийное производство",
    image: "assets/works/elektroerozionnaya-rezka-bloka-provolokoj.jpg",
  },
  {
    title: "Проверка шероховатости токарной обработки",
    material: "Ra 0,080 мкм (ISO 4287)",
    operations: "Токарная обработка, контроль шероховатости",
    industry: "Контроль качества",
    image: "assets/works/proverka-sherohovatosti-tokarnoj.jpg",
    imageFit: "contain",
  },
  {
    title: "Обработка нержавеющей стали 12х18н10т",
    material: "Сталь 12Х18Н10Т",
    operations: "Фрезерная обработка, сверление, расточка",
    industry: "Машиностроение",
    image: "assets/works/obrabotka-nerzhaveyushchej-stali-12h18n10t.jpg",
  },
  {
    title: "Прижим ножа дробилки, сталь 40х 45HRC",
    material: "Сталь 40Х, 45 HRC",
    operations: "Фрезерная обработка, термообработка",
    industry: "Дробильное оборудование",
    image: "assets/works/prizhim-nozha-drobilki-40h-45hrc.jpg",
    imageFit: "contain",
  },
  {
    title: "Изготовление деталей узла протяжки сталь 12х18н10т",
    material: "Сталь 12Х18Н10Т",
    operations: "Фрезерная обработка, расточка, сверление",
    industry: "Машиностроение",
    image: "assets/works/detali-uzla-protyazhki-12h18n10t.jpg",
  },
  {
    title: "Изготовление профильной звёздочки для транспортёрного механизма",
    material: "Сталь 40Х, HRC 55",
    operations: "Фрезерная обработка профиля, термообработка",
    industry: "Конвейерное оборудование",
    image: "assets/works/profilnaya-zvezdochka-40h.jpg",
  },
  {
    title:
      "Изготовление экструзионной 3‑слойной головки для пищевой промышленности — производство полиамидных оболочек для сосисок",
    material: "Нержавеющая сталь",
    operations: "Токарная обработка, расточка, полировка",
    industry: "Пищевая промышленность",
    image: "assets/works/ekstruzionnaya-golovka-3sloy-2.jpg",
  },
  {
    title:
      "Изготовление экструзионной 3‑слойной головки для пищевой промышленности — производство полиамидных оболочек для сосисок",
    material: "Нержавеющая сталь",
    operations: "Токарная обработка, расточка, полировка",
    industry: "Пищевая промышленность",
    image: "assets/works/ekstruzionnaya-golovka-3sloy.jpg",
  },
  {
    title:
      "Изготовление распылительного узла для распыления металлических порошков горнодобывающей промышленности",
    material: "Конструкционная сталь",
    operations: "Токарная и фрезерная обработка, расточка",
    industry: "Горнодобывающая промышленность",
    image: "assets/works/raspylitelnyj-uzel-gornodob.jpg",
  },
  {
    title: "Черновая обработка стали 40Х13",
    material: "Сталь 40Х13",
    operations: "Черновая фрезерная обработка",
    industry: "Машиностроение",
    image: "assets/works/chernovaya-stal-40h13.jpg",
  },
];
