 const categoryTree = [
    {
      code: "CLIMATE",
      name: "Климатическое оборудование",
      children: [
        // 1. Водоснабжение
        {
          code: "WATER",
          name: "Водоснабжение",
          children: [
            // 1.1 Баки мембранные
            {
              code: "MEMBRANE_TANKS",
              name: "Баки мембранные",
              children: [
                { code: "HYDROACCUMULATORS", name: "Гидроаккумуляторы" },
                { code: "EXPANSION_TANKS", name: "Расширительные баки" },
                { code: "TANK_ACCESSORIES", name: "Аксессуары для баков" },
              ],
            },
            // 1.2 Водонагреватели
            {
              code: "WATER_HEATERS",
              name: "Водонагреватели",
              children: [
                { code: "STORAGE_HEATERS", name: "Водонагреватели накопительные" },
                { code: "GAS_FLOW_HEATERS", name: "Водонагреватели проточные газовые" },
                { code: "ELECTRIC_FLOW_HEATERS", name: "Водонагреватели проточные электрические" },
                { code: "GAS_HEATER_CHIMNEYS", name: "Дымоходы для газовых водонагревателей" },
                { code: "HEATER_SPARE_PARTS", name: "Запчасти для водонагревателей" },
                { code: "MAGNESIUM_ANODES", name: "Магниевые аноды для водонагревателей" },
                { code: "HEATING_ELEMENTS", name: "Нагревательные элементы для водонагревателей" },
                { code: "GAS_COLUMN_HEAT_EXCHANGERS", name: "Теплообменники для газовых колонок" },
                { code: "RCD", name: "УЗО" },
              ],
            },
            // 1.3 Водоочистка
            {
              code: "WATER_TREATMENT",
              name: "Водоочистка",
              children: [
                { code: "UNDER_SINK_FILTERS", name: "Фильтры под мойку" },
                { code: "FILTER_CARTRIDGES", name: "Картриджи для фильтров" },
                { code: "MAIN_FILTERS", name: "Магистральные фильтры" },
                { code: "CONTAINERS", name: "Емкости" },
                { code: "FILTER_HOUSING_KEYS", name: "Ключи колбы фильтра" },
                { code: "FILTER_HOUSINGS", name: "Корпус для фильтров" },
                { code: "WATER_TREATMENT_MEMBRANES", name: "Мембраны для систем очистки воды" },
                { code: "WATER_TREATMENT_SORBENTS", name: "Сорбенты для системы водоочистки" },
                { code: "TABLET_SALT", name: "Таблетированная соль" },
              ],
            },
            // 1.4 КИПиА
            {
              code: "CONTROL_AND_MEASUREMENT",
              name: "КИПиА",
              children: [
                { code: "VACUUM_GAUGES", name: "Вакуумметры" },
                { code: "PRESSURE_SENSORS", name: "Датчики давления" },
                { code: "MANOMETERS", name: "Манометры" },
                { code: "TEMPERATURE_PRESSURE_REGULATORS", name: "Регуляторы температуры и давления прямого действия" },
                { code: "AUTOMATION_SYSTEMS", name: "Системы автоматики" },
                { code: "WATER_METERS", name: "Счетчики воды" },
                { code: "GAS_METERS", name: "Счетчики газа" },
                { code: "HEAT_METERS", name: "Счетчики тепла" },
                { code: "THERMO_MANOMETERS", name: "Термоманометры" },
                { code: "THERMOMETERS", name: "Термометры" },
                { code: "THERMOSTATS", name: "Термостаты" },
                { code: "CONTROL_MODULES", name: "Управляющие модули" },
                { code: "ELECTRONIC_TEMPERATURE_SENSORS", name: "Электронные датчики температур" },
              ],
            },
            // 1.5 Насосное оборудование
            {
              code: "PUMP_EQUIPMENT",
              name: "Насосное оборудование",
              children: [
                { code: "WELL_PUMPS", name: "Насосы скважинные" },
                { code: "CIRCULATION_PUMPS", name: "Насосы циркуляционные" },
                { code: "INLINE_PUMPS", name: "Насосы 'ин-лайн'" },
                { code: "PRESSURE_BOOSTING_PUMPS", name: "Насосы для повышения давления" },
                { code: "PRESSURE_BOOSTING_STATIONS", name: "Установки повышения давления" },
                { code: "CANTILEVER_PUMPS", name: "Насосы консольные" },
                { code: "MULTISTAGE_PUMPS", name: "Насосы многоступенчатые" },
                { code: "WELL_PUMPS_2", name: "Насосы колодезные" },
                { code: "WASTEWATER_PUMPS", name: "Насосы для сточных вод" },
                { code: "SEWAGE_STATIONS", name: "Канализационные установки" },
                { code: "WELL_HEADS", name: "Оголовки скважинные" },
                { code: "PUMP_AUTOMATION", name: "Автоматика для насосов" },
                { code: "PUMP_ACCESSORIES", name: "Аксессуары для насосов" },
                { code: "FIRE_EXTINGUISHING_STATIONS", name: "Станции пожаротушения" },
              ],
            },
            // 1.6 Сантехника
            {
              code: "PLUMBING",
              name: "Сантехника",
              children: [
                { code: "BIDETS", name: "Биде" },
                { code: "BATHS", name: "Ванны" },
                { code: "TOILET_INSTALLATIONS", name: "Инсталляции для систем монтажа унитазов" },
                { code: "INSTALLATION_BUTTONS", name: "Кнопки для инсталляций" },
                { code: "SIPHON_COMPONENTS", name: "Комплектующие для сифонов" },
                { code: "FAUCET_COMPONENTS", name: "Комплектующие для смесителей" },
                { code: "TOILET_COMPONENTS", name: "Комплектующие для унитазов" },
                { code: "SHOWER_HEADS", name: "Лейки для душа" },
                { code: "BATH_INSTALLATION_KITS", name: "Монтажный комплект для ванны" },
                { code: "WATER_HOSES", name: "Подводки для воды" },
                { code: "SINK_PEDESTALS", name: "Пьедесталы для раковин" },
                { code: "SINKS", name: "Раковины" },
                { code: "SIPHONS", name: "Сифоны" },
                { code: "OVERFLOWS", name: "Сливы-переливы" },
                { code: "FAUCETS", name: "Смесители" },
                { code: "DRAINS_CHANNELS", name: "Трапы, лотки и отводящие желоба" },
                { code: "TOILETS", name: "Унитазы" },
              ],
            },
            // 1.7 Трубопроводная арматура и автоматика
            {
              code: "PIPELINE_FITTINGS",
              name: "Трубопроводная арматура и автоматика",
              children: [
                { code: "BOILER_SAFETY_GROUP", name: "Группа безопасности котла" },
                { code: "INDUSTRIAL_REFRIGERATION_COMPONENTS", name: "Промышленные холодильные компоненты" },
                { code: "AIR_SLUDGE_SEPARATORS", name: "Сепараторы воздуха и шлама" },
              ],
            },
          ],
        },
        // 2. Кондиционирование
        {
          code: "AIR_CONDITIONING",
          name: "Кондиционирование",
          children: [
            // 2.1 Бытовые кондиционеры
            {
              code: "HOUSEHOLD_AIR_CONDITIONERS",
              name: "Бытовые кондиционеры",
              children: [
                { code: "PORTABLE_AIR_CONDITIONERS", name: "Мобильные кондиционеры" },
                { code: "WINDOW_AIR_CONDITIONERS", name: "Оконные кондиционеры" },
                { code: "WALL_SPLIT_SYSTEMS", name: "Сплит-системы настенного типа" },
                { code: "FREE_SPLIT_SYSTEMS", name: "Сплит-системы свободной компоновки" },
              ],
            },
            // 2.2 Мульти сплит-системы
            {
              code: "MULTI_SPLIT_SYSTEMS",
              name: "Мульти сплит-системы",
              children: [
                { code: "MULTI_SPLIT_DISTRIBUTION_UNITS", name: "Блоки-распределители мульти сплит-систем" },
                { code: "FREE_MULTI_SPLIT_SYSTEMS", name: "Мульти сплит-системы свободной компоновки" },
              ],
            },
            // 2.3 Охладители воздуха
            {
              code: "AIR_COOLERS",
              name: "Охладители воздуха",
              children: [
                { code: "EVAPORATIVE_HOUSEHOLD_COOLERS", name: "Бытовые охладители воздуха испарительного типа" },
                { code: "INDUSTRIAL_FREONLESS_COOLERS", name: "Охладители воздуха промышленные без фреона (более 25л)" },
                { code: "SEMI_INDUSTRIAL_SPLIT_SYSTEMS", name: "Полупромышленные сплит-системы" },
              ],
            },
            // 2.5 Тепловые насосы
            {
              code: "HEAT_PUMPS",
              name: "Тепловые насосы",
              children: [
                { code: "AIR_TO_AIR_HEAT_PUMPS", name: "Тепловые насосы воздух-воздух" },
              ],
            },
            // 2.6 Тепловые насосы для бассейнов
            {
              code: "POOL_HEAT_PUMPS",
              name: "Тепловые насосы для бассейнов",
              children: [
                { code: "ON_OFF_POOL_HEAT_PUMPS", name: "On/Off тепловые насосы для бассейна" },
                { code: "INVERTER_POOL_HEAT_PUMPS", name: "Инверторные тепловые насосы для бассейнов" },
              ],
            },
          ],
        },
        // 3. Осушение и очистка воздуха
        {
          code: "AIR_DEHUMIDIFICATION_PURIFICATION",
          name: "Осушение и очистка воздуха",
          children: [
            // 3.1 Аксессуары и фильтры для очистителей воздуха
            {
              code: "AIR_PURIFIER_ACCESSORIES",
              name: "Аксессуары и фильтры для очистителей воздуха",
              children: [
                { code: "PURIFIER_ACCESSORIES_FILTERS", name: "Аксессуары и фильтры для очистителей" },
              ],
            },
            // 3.2 Осушители воздуха
            {
              code: "AIR_DEHUMIDIFIERS",
              name: "Осушители воздуха",
              children: [
                { code: "HOUSEHOLD_DEHUMIDIFIERS", name: "Бытовые осушители воздуха" },
                { code: "COMMERCIAL_DEHUMIDIFIERS", name: "Коммерческие осушители воздуха" },
                { code: "SEMI_INDUSTRIAL_DEHUMIDIFIERS", name: "Полупромышленные осушители воздуха" },
                { code: "INDUSTRIAL_DEHUMIDIFIERS", name: "Промышленные осушители воздуха" },
                { code: "DEHUMIDIFIER_FILTERS", name: "Фильтры для осушителей воздуха" },
              ],
            },
            // 3.3 Очистители воздуха
            {
              code: "AIR_PURIFIERS",
              name: "Очистители воздуха",
              children: [
                { code: "HOUSEHOLD_AIR_PURIFIERS", name: "Бытовые очистители воздуха" },
              ],
            },
            // 3.4 Рециркуляторы, стерилизаторы, ионизаторы
            {
              code: "AIR_STERILIZERS",
              name: "Рециркуляторы, стерилизаторы, ионизаторы",
              children: [
                { code: "RECIRCULATORS", name: "Рециркуляторы" },
                { code: "RECIRCULATOR_STANDS", name: "Стойки для рециркуляторов" },
                { code: "RECIRCULATOR_COVERS", name: "Чехлы для рециркуляторов" },
              ],
            },
          ],
        },
        // 4. Отопление
        {
          code: "HEATING",
          name: "Отопление",
          children: [
            // 4.1 Котельное оборудование
            {
              code: "BOILER_EQUIPMENT",
              name: "Котельное оборудование",
              children: [
                { code: "ELECTRIC_BOILERS", name: "Котлы электрические" },
                { code: "GAS_BOILERS", name: "Котлы газовые" },
                { code: "DIESEL_BOILERS", name: "Котлы дизельные" },
                { code: "SOLID_FUEL_BOILERS", name: "Котлы твердотопливные" },
                { code: "BOILERS_BUFFER_TANKS", name: "Бойлеры и буферные ёмкости" },
                { code: "CHIMNEYS", name: "Дымоходы" },
                { code: "BOILER_ACCESSORIES", name: "Аксессуары и комплектующие для котельного оборудования" },
                { code: "GAS_STORAGE_TANKS", name: "Емкости для хранения газа" },
                { code: "BURNER_COMPONENTS", name: "Комплектующие для горелок" },
                { code: "CHIMNEY_COMPONENTS", name: "Комплектующие для дымоходов" },
                { code: "COMBINATION_BOILERS", name: "Котлы комбинированные" },
                { code: "STEEL_FIRE_TUBE_BOILERS", name: "Котлы стальные жаротрубные" },
                { code: "CHIMNEY_ELBOWS", name: "Отводы для дымоходов" },
              ],
            },
            // 4.2 Радиаторная арматура
            {
              code: "RADIATOR_FITTINGS",
              name: "Радиаторная арматура",
              children: [
                { code: "LIQUID_THERMAL_HEADS", name: "Термоголовки жидкостные" },
                { code: "MANUAL_REGULATION_VALVES", name: "Вентили ручной регулировки" },
                { code: "RADIATOR_DRAIN_DEVICES", name: "Дренажные устройства для радиаторов" },
                { code: "PLUGS", name: "Заглушки" },
                { code: "RADIATOR_SHUTOFF_VALVES", name: "Клапаны запорные для радиаторов" },
                { code: "RADIATOR_MANUAL_VALVES", name: "Клапаны ручной регулировки для радиаторов" },
                { code: "THERMOSTATIC_VALVES", name: "Клапаны термостатические" },
                { code: "RADIATOR_WIFI_CONTROL_KITS", name: "Комплекты управления для радиаторов по Wi-Fi" },
                { code: "MAYEVSKY_VALVES", name: "Краны Маевского" },
                { code: "RADIATOR_CONNECTION_KITS", name: "Наборы для подключения радиаторов" },
                { code: "LOWER_CONNECTION_KITS", name: "Наборы нижнего подключения" },
                { code: "THERMOSTATIC_KITS", name: "Наборы термостатические" },
                { code: "DESIGN_LIQUID_THERMAL_HEADS", name: "Термоголовки жидкостные серии DESIGN" },
                { code: "RADIATOR_CONNECTION_TUBES", name: "Трубки для подключения радиаторов" },
                { code: "CHROME_EXTENSIONS", name: "Удлинители хромированные" },
                { code: "LOWER_CONNECTION_UNITS", name: "Узлы нижнего подключения" },
                { code: "SMART_THERMAL_HEADS", name: "Умные термоголовки" },
              ],
            },
            // 4.3 Радиаторы отопления
            {
              code: "HEATING_RADIATORS",
              name: "Радиаторы отопления",
              children: [
                { code: "BIMETALLIC_SECTIONAL_RADIATORS", name: "Радиаторы биметаллические секционные" },
                { code: "ALUMINUM_SECTIONAL_RADIATORS", name: "Радиаторы алюминиевые секционные" },
                { code: "STEEL_PANEL_RADIATORS", name: "Радиаторы стальные панельные" },
                { code: "STEEL_TUBULAR_RADIATORS", name: "Радиаторы стальные трубчатые" },
                { code: "FLOOR_CONVECTORS_WITHOUT_FAN", name: "Конвекторы внутрипольные без вентилятора" },
                { code: "FLOOR_CONVECTORS_WITH_FAN", name: "Конвекторы внутрипольные с вентилятором" },
                { code: "RADIATOR_BRACKETS", name: "Кронштейны для радиаторов" },
                { code: "RADIATOR_CONNECTION_SETS", name: "Присоединительные наборы для радиаторов" },
                { code: "REFLECTORS", name: "Отражатели" },
                { code: "FLOOR_CONVECTOR_ACCESSORIES", name: "Аксессуары и комплектующие для конвекторов внутрипольных" },
                { code: "FLOOR_CONVECTORS", name: "Конвекторы напольные" },
                { code: "CAST_IRON_RADIATORS", name: "Радиаторы чугунные" },
                { code: "FLOOR_CONVECTOR_GRILLES", name: "Решетки для конвекторов внутрипольных" },
              ],
            },
            // 4.4 Полотенцесушители
            {
              code: "TOWEL_WARMERS",
              name: "Полотенцесушители",
              children: [
                { code: "TOWEL_WARMER_ACCESSORIES", name: "Аксессуары и комплектующие для полотенцесушителей" },
                { code: "WATER_TOWEL_WARMERS", name: "Полотенцесушители водяные" },
                { code: "ELECTRIC_TOWEL_WARMERS", name: "Полотенцесушители электрические" },
                { code: "TOWEL_HOLDERS", name: "Полотенцедержатели" },
              ],
            },
            // 4.5 Автоматика для котельных
            {
              code: "BOILER_AUTOMATION",
              name: "Автоматика для котельных",
              children: [
                { code: "AUTOMATION_ACCESSORIES", name: "Аксессуары и комплектующие" },
                { code: "VALVE_ADAPTERS", name: "Адаптеры к запорно-регулирующей арматуре" },
                { code: "BATTERIES", name: "Аккумуляторы" },
                { code: "POWER_SUPPLIES", name: "Блоки питания" },
                { code: "CONTROLLER_EXTENSION_BLOCKS", name: "Блоки расширения для контроллеров систем отопления" },
                { code: "AIR_VENTS", name: "Воздухоотводчики" },
                { code: "TEMPERATURE_SENSORS", name: "Датчики температуры" },
                { code: "UPS", name: "Источники бесперебойного питания" },
                { code: "BALANCING_VALVES", name: "Клапаны балансировочные" },
                { code: "SOLENOID_VALVES", name: "Клапаны электромагнитные" },
                { code: "BOILER_CONTROL_PANELS", name: "Пульты и панели управления для котлов" },
                { code: "RELAYS", name: "Реле" },
                { code: "BOILER_POWER_PROTECTION", name: "Системы защиты котла от сбоев электросети" },
                { code: "THERMAL_AUTOMATION", name: "Тепловая автоматика" },
                { code: "THERMAL_INFORMERS", name: "Теплоинформаторы" },
                { code: "THERMOSTATS_CONTROLLERS", name: "Термостаты и контроллеры" },
                { code: "BOILER_HEATING_ELEMENTS", name: "ТЭНы для котельного оборудования" },
              ],
            },
            // 4.6 Теплый пол
            {
              code: "UNDERFLOOR_HEATING",
              name: "Теплый пол",
              children: [
                { code: "HEATING_MATS", name: "Нагревательные маты для теплого пола" },
                { code: "INFRARED_HEATING_FILM", name: "Нагревательная инфракрасная пленка для теплого пола" },
                { code: "HEATING_CABLE", name: "Нагревательный кабель для теплого пола" },
                { code: "UNDERFLOOR_HEATING_THERMOSTATS", name: "Терморегуляторы для теплого пола" },
                { code: "UNDERFLOOR_HEATING_ACCESSORIES", name: "Комплектующие для теплых полов" },
                { code: "UNDERFLOOR_HEATING_UNDERLAY", name: "Подложки для монтажа теплого пола" },
                { code: "UNDERFLOOR_HEATING_INSULATION", name: "Теплоизоляция для монтажа теплого пола" },
              ],
            },
          ],
        },
        // 5. Тепловое оборудование
        {
          code: "THERMAL_EQUIPMENT",
          name: "Тепловое оборудование",
          children: [
            // 5.1 Бытовые электрические обогреватели
            {
              code: "HOUSEHOLD_ELECTRIC_HEATERS",
              name: "Бытовые электрические обогреватели",
              children: [
                { code: "ELECTRIC_CONVECTORS", name: "Электрические конвекторы" },
                { code: "OIL_RADIATORS", name: "Маслонаполненные радиаторы" },
                { code: "THERMAL_FANS", name: "Тепловентиляторы" },
                { code: "CONVECTOR_CONTROL_UNITS", name: "Блоки управления для электрических конвекторов" },
                { code: "HEATER_STANDS", name: "Ножки для обогревателей" },
                { code: "CONVECTOR_BRACKETS", name: "Кронштейны для электрических конвекторов" },
                { code: "HEATER_ELEMENTS", name: "Нагревательные элементы для электрических обогревателей" },
                { code: "HEATER_SWITCHES", name: "Переключатели и выключатели безопасности для электрических обогревателей" },
                { code: "HEATER_REMOTES", name: "Пульты управления для обогревателей" },
                { code: "CONVECTOR_THERMOSTATS", name: "Термостаты защитные для конвекторов" },
                { code: "ELECTRIC_CONVECTION_MODULES", name: "Электрические конвекционные отопительные модули" },
              ],
            },
            // 5.2 Водяные тепловентиляторы и дестратификаторы
            {
              code: "WATER_THERMAL_FANS",
              name: "Водяные тепловентиляторы и дестратификаторы",
              children: [
                { code: "WATER_THERMAL_FANS_ITEMS", name: "Водяные тепловентиляторы" },
                { code: "DESTRATIFICATION_FANS", name: "Дестратификаторы и вентиляторы" },
              ],
            },
            // 5.3 Воздушные и тепловые завесы
            {
              code: "AIR_CURTAINS",
              name: "Воздушные и тепловые завесы",
              children: [
                { code: "COMPACT_AIR_CURTAINS", name: "Компактные" },
                { code: "INDUSTRIAL_AIR_CURTAINS", name: "Промышленные" },
                { code: "INTERIOR_AIR_CURTAINS", name: "Интерьерные" },
                { code: "AIR_CURTAIN_ACCESSORIES", name: "Аксессуары для воздушных завес" },
                { code: "COMMERCIAL_AIR_CURTAINS", name: "Коммерческие" },
              ],
            },
            // 5.4 Греющий кабель
            {
              code: "HEATING_CABLE_THERMAL",
              name: "Греющий кабель",
              children: [
                { code: "ICE_PROTECTION_SYSTEMS", name: "Системы антиобледенения" },
              ],
            },
            // 5.5 Инфракрасные обогреватели
            {
              code: "INFRARED_HEATERS",
              name: "Инфракрасные обогреватели",
              children: [
                { code: "ELECTRIC_INFRARED_HEATERS", name: "Электрические инфракрасные обогреватели" },
                { code: "GAS_INFRARED_HEATERS", name: "Газовые инфракрасные обогреватели" },
                { code: "HEATER_COVERS", name: "Чехлы для обогревателей" },
                { code: "INFRARED_HEATER_SPARE_PARTS", name: "Запчасти для инфракрасных обогревателей" },
                { code: "INFRARED_HEATER_LAMPS", name: "Лампы для инфракрасных обогревателей" },
                { code: "INFRARED_HEATER_STANDS", name: "Стойки для инфракрасных обогревателей" },
                { code: "INFRARED_HEATER_THERMOSTATS", name: "Терморегуляторы для обогревателей" },
              ],
            },
            // 5.6 Сушилки для рук
            {
              code: "HAND_DRYERS",
              name: "Сушилки для рук",
              children: [
                { code: "HAND_DRYERS_ITEMS", name: "Сушилки для рук" },
              ],
            },
            // 5.7 Тепловые пушки и теплогенераторы
            {
              code: "THERMAL_GUNS_GENERATORS",
              name: "Тепловые пушки и теплогенераторы",
              children: [
                { code: "GAS_THERMAL_GUNS", name: "Газовые тепловые пушки" },
                { code: "DIESEL_THERMAL_GUNS", name: "Дизельные тепловые пушки" },
                { code: "ELECTRIC_THERMAL_GUNS", name: "Электрические тепловые пушки" },
                { code: "SUSPENDED_HEAT_GENERATORS", name: "Теплогенераторы подвесного типа" },
                { code: "MOBILE_HEAT_GENERATORS", name: "Теплогенераторы мобильного типа" },
                { code: "FLEXIBLE_HOSES", name: "Гибкие рукава" },
                { code: "GAS_HOSES", name: "Газовые шланги" },
                { code: "BURNERS", name: "Горелки" },
                { code: "THERMAL_GUN_SPARE_PARTS", name: "Запчасти для тепловых пушек" },
                { code: "SAFETY_VALVES", name: "Предохранительные клапаны" },
                { code: "REMOVABLE_FILTERS", name: "Фильтры съемные" },
              ],
            },
            // 5.8 Электрические камины
            {
              code: "ELECTRIC_FIREPLACES",
              name: "Электрические камины",
              children: [
                { code: "PORTAL_ELECTRIC_FIREPLACES", name: "Электрические камины портального типа" },
                { code: "BIO_FIREPLACES", name: "Биокамины" },
                { code: "FIREPLACE_PORTALS", name: "Порталы для электрокаминов" },
                { code: "FIREPLACE_SETS", name: "Каминокомплекты" },
                { code: "PORTAL_PROTECTIVE_COATING", name: "Защитное покрытие для порталов" },
                { code: "DECORATIVE_FIREPLACE_FUEL", name: "Декоративное топливо для каминов" },
                { code: "FIREPLACE_STOVES", name: "Печи камины" },
                { code: "FIREPLACE_REMOTES", name: "Пульты управления для каминов" },
                { code: "BIO_FIREPLACE_CABINETS", name: "Тумбы для биокаминов" },
                { code: "ELECTRIC_STEAM_HEARTHS", name: "Электрические паровые очаги" },
              ],
            },
          ],
        },
        // 6. Увлажнение воздуха
        {
          code: "AIR_HUMIDIFICATION",
          name: "Увлажнение воздуха",
          children: [
            // 6.1 Аксессуары и фильтры для увлажнителей воздуха
            {
              code: "HUMIDIFIER_ACCESSORIES",
              name: "Аксессуары и фильтры для увлажнителей воздуха",
              children: [
                { code: "AIR_WASHER_ACCESSORIES", name: "Аксессуары для моек и климатических комплексов" },
                { code: "INDUSTRIAL_HUMIDIFIER_ACCESSORIES", name: "Аксессуары для промышленных увлажнителей" },
                { code: "HUMIDIFIER_FILTERS_ACCESSORIES", name: "Аксессуары и фильтры для увлажнителей" },
                { code: "HUMIDIFIER_TANKS", name: "Баки для увлажнителей воздуха" },
                { code: "HUMIDITY_CONTROL_ELEMENTS", name: "Элементы контроля влажности" },
              ],
            },
            // 6.2 Комбинированные приборы: увлажнение и очистка
            {
              code: "COMBINED_HUMIDIFICATION_CLEANING",
              name: "Комбинированные приборы: увлажнение и очистка",
              children: [
                { code: "CLIMATIC_COMPLEXES", name: "Климатические комплексы" },
                { code: "AIR_WASHERS", name: "Мойки воздуха" },
              ],
            },
            // 6.3 Увлажнители воздуха
            {
              code: "HUMIDIFIERS",
              name: "Увлажнители воздуха",
              children: [
                { code: "HOUSEHOLD_HUMIDIFIERS", name: "Бытовые увлажнители воздуха" },
                { code: "INDUSTRIAL_HUMIDIFIERS", name: "Промышленные увлажнители воздуха" },
              ],
            },
          ],
        },
      ],
    },
    // Остальные разделы (Двери, Плитка, Монтажные материалы)
    {
      code: "DOORS",
      name: "Двери",
      children: [
        { code: "D1", name: "Межкомнатные двери" },
        { code: "D2", name: "Входные двери" },
        { code: "D3", name: "Фурнитура для двери" },
        { code: "D4", name: "Комплектующие и доборы" },
      ],
    },
    {
      code: "TILES",
      name: "Плитка",
      children: [
        { code: "T1", name: "Керамогранит" },
        { code: "T2", name: "Настенная плитка" },
        { code: "T3", name: "Плитка для пола" },
        { code: "T4", name: "Мозаика" },
        { code: "T5", name: "Плиточный декор и бордюры" },
      ],
    },    
    {
      code: "INSTALL",
      name: "Монтажные материалы",
      children: [
        { code: "M1", name: "Клеи и смеси" },
        { code: "M2", name: "Герметики" },
        { code: "M3", name: "Пены, анкера и крепеж" },
        { code: "M4", name: "Комплектующие для систем" },
        { code: "M5", name: "Инструменты и расходные материалы" },
      ],
    },
  ];

  module.exports = { CATEGORY_TREE: categoryTree };