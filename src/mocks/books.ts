import { http, HttpResponse, delay } from 'msw';

const mockBooks = [
  {
    id: '1',
    title: '클린 코드',
    authors: ['로버트 C. 마틴'],
    publisher: '인사이트',
    publishedDate: '2013-12-24',
    pageCount: 584,
    description:
      '애자일 소프트웨어 장인 정신의 핵심을 다룬 클린 코드 작성법에 대한 실용적인 가이드',
  },
  {
    id: '2',
    title: '리팩터링',
    authors: ['마틴 파울러'],
    publisher: '한빛미디어',
    publishedDate: '2020-04-01',
    pageCount: 456,
    description:
      '기존 코드의 구조를 체계적으로 개선하는 리팩터링 기법들을 상세히 설명',
  },
  {
    id: '3',
    title: '이펙티브 타입스크립트',
    authors: ['댄 밴더캄'],
    publisher: '인사이트',
    publishedDate: '2021-06-30',
    pageCount: 336,
    description:
      '타입스크립트를 효과적으로 사용하는 62가지 방법을 제시하는 실용적인 가이드',
  },
  {
    id: '4',
    title: '리액트를 다루는 기술',
    authors: ['김민준'],
    publisher: '길벗',
    publishedDate: '2022-08-01',
    pageCount: 752,
    description:
      '리액트 기초부터 고급 기법까지 체계적으로 학습할 수 있는 완벽한 가이드',
  },
  {
    id: '5',
    title: '모던 자바스크립트 Deep Dive',
    authors: ['이웅모'],
    publisher: '위키북스',
    publishedDate: '2020-09-25',
    pageCount: 956,
    description:
      '자바스크립트의 기본 개념과 동작 원리를 깊이 있게 학습할 수 있는 종합서',
  },
  {
    id: '6',
    title: '함께 자라기',
    authors: ['김창준'],
    publisher: '인사이트',
    publishedDate: '2018-11-30',
    pageCount: 288,
    description:
      '애자일로 가는 길에서 개발자가 갖춰야 할 태도와 학습법에 대한 실용적 조언',
  },
  {
    id: '7',
    title: '테스트 주도 개발',
    authors: ['켄트 벡'],
    publisher: '인사이트',
    publishedDate: '2014-02-14',
    pageCount: 384,
    description:
      'TDD의 창시자가 직접 설명하는 테스트 주도 개발의 핵심 원리와 실천법',
  },
  {
    id: '8',
    title: '도메인 주도 설계',
    authors: ['에릭 에반스'],
    publisher: '위키북스',
    publishedDate: '2011-07-20',
    pageCount: 568,
    description:
      '복잡한 소프트웨어의 핵심을 다루는 도메인 주도 설계 방법론의 바이블',
  },
  {
    id: '9',
    title: '실용주의 프로그래머',
    authors: ['데이비드 토머스', '앤드류 헌트'],
    publisher: '인사이트',
    publishedDate: '2022-03-11',
    pageCount: 416,
    description:
      '숙련된 프로그래머가 되기 위한 실용적인 조언과 기법들을 담은 고전',
  },
  {
    id: '10',
    title: '객체지향의 사실과 오해',
    authors: ['조영호'],
    publisher: '위키북스',
    publishedDate: '2015-06-17',
    pageCount: 264,
    description:
      '객체지향 패러다임의 본질을 이해하고 올바른 객체지향 설계를 위한 가이드',
  },
];

export const bookHandlers = [
  http.get('/api/books/search', async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const query = url.searchParams.get('query')?.toLowerCase() || '';
    const limit = Number(url.searchParams.get('limit')) || 10;
    const offset = Number(url.searchParams.get('offset')) || 0;

    if (!query || query.length < 2) {
      return HttpResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 },
      );
    }

    const results = mockBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.authors.some((author) => author.toLowerCase().includes(query)),
    );

    const totalItems = results.length;
    const totalPages = Math.ceil(totalItems / limit);
    const page = Math.floor(offset / limit) + 1;

    const response = {
      items: results.slice(offset, offset + limit),
      totalItems,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };

    return HttpResponse.json(response);
  }),

  http.get('/api/books/suggestions', async ({ request }) => {
    await delay(100);

    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';

    if (!query) {
      return HttpResponse.json({ suggestions: [] });
    }

    const suggestions = mockBooks
      .map((book) => book.title)
      .filter((title) => title.toLowerCase().includes(query))
      .slice(0, 5);

    return HttpResponse.json({ suggestions });
  }),

  http.get('/api/books/all', async ({ request }) => {
    await delay(200);

    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit')) || 10;

    return HttpResponse.json({
      items: mockBooks.slice(0, limit),
    });
  }),
];
