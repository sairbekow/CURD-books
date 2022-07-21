const expanded = [
  {
    id: 'tt2462gd3',
    name: 'Гарри Поттер и философский камень',
    author: 'Джоан Роулинг',
    isFavorite: true,
    publishYear: 1997,
    publishHouse: 'Росмэн',
    pagesNumber: 399,
    genres: ['Приключения', 'Фэнтези'],
    originalLanguage: 'Английский'
  },
  {
    id: '373yyr74y',
    name: 'Гарри Поттер и тайная комната',
    author: 'Джоан Роулинг',
    isFavorite: false,
    publishYear: 1998,
    publishHouse: 'Росмэн',
    pagesNumber: 480,
    genres: ['Приключения', 'Фэнтези', 'Роман'],
    originalLanguage: 'Английский'
  },
  {
    id: '56734jfjjf',
    name: 'Охота на овец',
    author: 'Харуки Мураками',
    isFavorite: true,
    publishYear: 1982,
    publishHouse: 'Kodansha',
    pagesNumber: 448,
    genres: ['Магический реализм', 'Роман'],
    originalLanguage: 'Японский'
  },
  {
    id: '74hg47wjuGG',
    name: 'Война и мир',
    author: 'Лев Толстой',
    isFavorite: false,
    publishYear: 1865,
    publishHouse: 'Эксмо',
    pagesNumber: 1300,
    genres: ['Исторический роман', 'Роман'],
    originalLanguage: 'Русский'
  },
  {
    id: '36ggf64gd',
    name: 'О дивный новый мир',
    author: 'Олдос Хаксли',
    isFavorite: false,
    publishYear: 1932,
    publishHouse: 'Chatto & Windus',
    pagesNumber: 352,
    genres: ['Научная фантастика', 'Утопия'],
    originalLanguage: 'Английский'
  }
]

const main = expanded.map((item) => ({
  id: item.id,
  name: item.name,
  author: item.author,
  isFavorite: item.isFavorite,
}))

module.exports = {
  main,
  expanded
}