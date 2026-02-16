export const VALID_PASSWORDS = ['принцесса', 'принцессочка', 'принцесск', 'принце'];

export const LOADING_PHRASES = [
  '💕 загружаем любовь...',
  '✨ буферизируем волшебство...',
  '🦄 призываем единорогов...',
  '💖 упаковываем нежность...',
  '🦇 собираем черепа...',
  '🐹 зовем капибар...',
];

export const TIMELINE_PHRASES = [
  'наши самые милые моменты',
  'история нашей любви',
  'каждое мгновение заслуживает памяти',
  'вместе мы космос',
  'ты мое самое любимое приключение',
  'любовь в деталях каждого дня',
  'здесь живут наши самые теплые воспоминания',
  'ты мой дом и мое вдохновение',
  'все лучшее в моей жизни началось с тебя',
  'мы пишем эту историю сердцем',
  'наша нежность сильнее любых расстояний',
  'каждый день с тобой как маленькое чудо',
];

export const REASONS_BANK = [
  'Ты умеешь сделать любой мой день счастливым одним взглядом.',
  'С тобой даже тишина звучит как самая уютная музыка.',
  'Ты смеешься так, что у меня внутри сразу становится светло.',
  'Ты веришь в меня даже в моменты, когда я сам сомневаюсь.',
  'Рядом с тобой я чувствую себя дома, где бы мы ни были.',
  'Ты замечаешь мелочи, из которых и состоит настоящая любовь.',
  'С тобой обычные дни превращаются в маленькие праздники.',
  'Ты умеешь поддержать так, что после этого хочется горы двигать.',
  'Ты делаешь меня лучше без давления, просто своей нежностью.',
  'Мне нравится, как ты смотришь на мир: тепло и искренне.',
  'С тобой можно быть собой на сто процентов и это бесценно.',
  'Ты вдохновляешь меня мечтать смелее и жить ярче.',
  'Ты даришь мне чувство спокойствия, которого я раньше не знал.',
  'Ты моя любимая привычка, от которой не хочется избавляться.',
  'Потому что это ты, и с тобой мое сердце выбирает «навсегда».',
];

export const formatDate = (dateStr: string): string => {
  const months: { [key: string]: string } = {
    '01': 'января',
    '02': 'февраля',
    '03': 'марта',
    '04': 'апреля',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08': 'августа',
    '09': 'сентября',
    '10': 'октября',
    '11': 'ноября',
    '12': 'декабря',
  };
  
  const [day, month, year] = dateStr.split('.');
  return `${day} ${months[month]} ${year}`;
};

export const formatMonthYear = (dateStr: string): string => {
  const months: { [key: string]: string } = {
    '01': 'январь',
    '02': 'февраль',
    '03': 'март',
    '04': 'апрель',
    '05': 'май',
    '06': 'июнь',
    '07': 'июль',
    '08': 'август',
    '09': 'сентябрь',
    '10': 'октябрь',
    '11': 'ноябрь',
    '12': 'декабрь',
  };
  
  const [, month, year] = dateStr.split('.');
  return `${months[month]} ${year}`;
};

export const MOCK_TIMELINE_DATA = [
  {
    id: 1,
    date: '14.03.2024',
    title: 'Первая встреча',
    description: 'Наша история началась в этот прекрасный день, когда ты поняла, что ты моя принцесса',
    photos: [
      'https://images.unsplash.com/photo-1516962644323-5f45f8a0f3ff?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546527868-ccfd7ee50fa5?w=500&h=500&fit=crop',
    ],
  },
  {
    id: 2,
    date: '05.04.2024',
    title: 'Первое свидание',
    description: 'Романтический вечер, который изменил всё',
    photos: [
      'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1530268729831-4be0ea1ead84?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1545847519-2a53f818bdca?w=500&h=500&fit=crop',
    ],
  },
  {
    id: 3,
    date: '22.04.2024',
    title: 'Первый поцелуй',
    description: 'Момент, который остался в сердцах навечно 💕',
    photos: [
      'https://images.unsplash.com/photo-1515738901601-b340bcfc7860?w=500&h=500&fit=crop',
      'https://lh3.googleusercontent.com/pw/AP1GczNeE1XFukqqOntvVNWEvap0a16wgy0Ic-vM5Cc1VoW_tTAm0qcmK2ESIS7IMyhvmOf1I4dqUngC4QXYfj1nhlODZWs6YJ0ZNjK_9wCxP3x2q70RPdmFC-mpY3ZWVb1xp9o935TPEWQQSEjzoq_VR8QO=w1480-h1972-s-no-gm?authuser=0',
    ],
  },
  {
    id: 4,
    date: '12.05.2024',
    title: 'Приключение вместе',
    description: 'Путешествие в страну волшебства и единорогов',
    photos: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop',
    ],
  },
  {
    id: 5,
    date: '15.06.2024',
    title: 'День рождения принцессы',
    description: 'День, когда мир получил ещё одного ангела',
    photos: [
      'https://images.unsplash.com/photo-1526047932273-031fefade091?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop',
    ],
  },
  {
    id: 6,
    date: '01.07.2024',
    title: 'Месячница',
    description: 'Один месяц вечного счастья вместе',
    photos: [
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1516962594247-afb54c3ec978?w=500&h=500&fit=crop',
    ],
  },
  {
    id: 7,
    date: '14.08.2024',
    title: 'Специальный вечер',
    description: 'Когда мы поняли, что это любовь',
    photos: [
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1495396881207-f1b1f4a46db3?w=500&h=500&fit=crop',
    ],
  },
];
