import type { Book } from '../types'

export const BOOKS: Book[] = [
  {
    id: 'cloud-friends',
    title: '구름 친구들',
    coverEmoji: '⛅',
    description: '하늘 위 구름 친구들의 신나는 하루!',
    color: {
      primary: 'from-sky-300 to-sky-500',
      secondary: 'bg-sky-100',
      accent: 'bg-sky-400',
      text: 'text-sky-700',
    },
    questions: [
      {
        id: 'cloud-q1',
        sentence: '하얀 구름이 하늘에서 _____ 떠다녀요.',
        blankWord: '둥실둥실',
        choices: ['둥실둥실', '폴짝폴짝', '살랑살랑', '삐약삐약'],
        hint: '구름이 가볍게 움직이는 모양이에요.',
      },
      {
        id: 'cloud-q2',
        sentence: '비가 오기 전 하늘이 _____ 색으로 변했어요.',
        blankWord: '잿빛',
        choices: ['잿빛', '노란빛', '분홍빛', '초록빛'],
        hint: '비구름의 색깔을 떠올려 봐요.',
      },
      {
        id: 'cloud-q3',
        sentence: '작은 구름이 바람에 _____ 녹아 사라졌어요.',
        blankWord: '사르르',
        choices: ['사르르', '쿵쾅쿵쾅', '윙윙', '뚝뚝'],
        hint: '슬쩍 녹아 없어지는 느낌이에요.',
      },
      {
        id: 'cloud-q4',
        sentence: '해님이 구름 사이로 _____ 웃으며 나타났어요.',
        blankWord: '방긋방긋',
        choices: ['방긋방긋', '히죽히죽', '나풀나풀', '둥실둥실'],
        hint: '귀엽고 예쁘게 웃는 모습이에요.',
      },
    ],
  },
  {
    id: 'bear-honey',
    title: '곰돌이의 꿀 찾기',
    coverEmoji: '🐻',
    description: '꿀을 찾아 떠나는 곰돌이의 모험!',
    color: {
      primary: 'from-amber-300 to-amber-500',
      secondary: 'bg-amber-100',
      accent: 'bg-amber-400',
      text: 'text-amber-700',
    },
    questions: [
      {
        id: 'bear-q1',
        sentence: '곰돌이는 꿀을 _____ 먹고 싶었어요.',
        blankWord: '많이',
        choices: ['많이', '조금', '빨리', '천천히'],
        hint: '곰돌이가 꿀을 아주 좋아해요.',
      },
      {
        id: 'bear-q2',
        sentence: '나무에서 꿀이 _____ 떨어졌어요.',
        blankWord: '뚝뚝',
        choices: ['뚝뚝', '둥실둥실', '사르르', '나풀나풀'],
        hint: '굵은 방울이 떨어지는 소리예요.',
      },
      {
        id: 'bear-q3',
        sentence: '꿀을 찾은 곰돌이가 _____ 웃었어요.',
        blankWord: '히죽히죽',
        choices: ['히죽히죽', '방긋방긋', '살랑살랑', '폴짝폴짝'],
        hint: '좋아서 못 참고 나오는 웃음이에요.',
      },
      {
        id: 'bear-q4',
        sentence: '벌들이 꿀통 주변을 _____ 날아다녔어요.',
        blankWord: '윙윙',
        choices: ['윙윙', '삐약삐약', '뚝뚝', '사르르'],
        hint: '벌이 날 때 나는 소리예요.',
      },
    ],
  },
  {
    id: 'spring-animals',
    title: '봄날의 동물 친구들',
    coverEmoji: '🌸',
    description: '봄이 왔어요! 동물 친구들을 만나요.',
    color: {
      primary: 'from-green-300 to-emerald-500',
      secondary: 'bg-green-100',
      accent: 'bg-green-400',
      text: 'text-green-700',
    },
    questions: [
      {
        id: 'spring-q1',
        sentence: '아기 토끼가 들판에서 _____ 뛰어놀았어요.',
        blankWord: '폴짝폴짝',
        choices: ['폴짝폴짝', '윙윙', '뚝뚝', '잿빛'],
        hint: '가볍게 높이 뛰는 모습이에요.',
      },
      {
        id: 'spring-q2',
        sentence: '아기 병아리가 엄마를 부르며 _____ 울었어요.',
        blankWord: '삐약삐약',
        choices: ['삐약삐약', '둥실둥실', '히죽히죽', '사르르'],
        hint: '병아리가 내는 소리예요.',
      },
      {
        id: 'spring-q3',
        sentence: '예쁜 나비가 꽃 위를 _____ 날아다녔어요.',
        blankWord: '나풀나풀',
        choices: ['나풀나풀', '폴짝폴짝', '뚝뚝', '방긋방긋'],
        hint: '날개를 가볍게 펄럭이는 모양이에요.',
      },
      {
        id: 'spring-q4',
        sentence: '봄바람이 꽃잎을 _____ 흔들었어요.',
        blankWord: '살랑살랑',
        choices: ['살랑살랑', '삐약삐약', '윙윙', '히죽히죽'],
        hint: '바람이 부드럽게 부는 느낌이에요.',
      },
    ],
  },
  {
    id: 'school-way',
    title: '학교 가는 길',
    coverEmoji: '🏫',
    description: '학교까지 가는 신나는 아침 이야기',
    color: {
      primary: 'from-orange-300 to-orange-500',
      secondary: 'bg-orange-100',
      accent: 'bg-orange-400',
      text: 'text-orange-700',
    },
    distractorPool: [
      '지하도', '계단', '육교', '버스',
      '느릿느릿', '천천히', '뚜벅뚜벅', '살금살금',
      '가로등', '표지판', '소화전', '울타리',
      '나가요', '올라가요', '뛰어가요', '앉아요',
    ],
    questions: [
      {
        id: 'school-q1',
        sentence: '초록불이 켜지면 _____ 을 건너요.',
        blankWord: '횡단보도',
        hint: '차도를 안전하게 건너는 줄무늬 길이에요.',
        example: '앞을 잘 보고 장난도 안 치고 얼른 횡단보도를 건넜어요.',
      },
      {
        id: 'school-q2',
        sentence: '차들이 도로 위를 _____ 달려요.',
        blankWord: '쌩쌩',
        hint: '바람을 가르며 빠르게 달리는 소리예요.',
        example: '큰길로 나가 차들이 쌩쌩 달리는 네거리에 닿았어요.',
      },
      {
        id: 'school-q3',
        sentence: '빨간불 초록불로 알려주는 _____ 을 보며 기다려요.',
        blankWord: '신호등',
        hint: '빨간불, 초록불로 차와 사람을 안내해요.',
        example: '파란 신호등이 켜지자 아줌마가 웃으며 호루라기를 불었어요.',
      },
      {
        id: 'school-q4',
        sentence: '학교에 도착해서 교실로 _____.',
        blankWord: '들어가요',
        hint: '문을 열고 안으로 가는 행동이에요.',
        example: '정글짐 옆을 지나 운동장을 가로질러서 학교 안으로 들어가요.',
      },
    ],
  },
]

export function getBookById(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id)
}
