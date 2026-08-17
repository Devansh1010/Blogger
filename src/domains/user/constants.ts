export const BADGES = [
  {
    id: 'founding-member',
    name: 'Founding Member',
    description: 'One of the first 100 users to join the platform',
    icon: '/founding-member.svg',
  },
  {
    id: 'first-article',
    name: 'First Article',
    description: 'Published the first article',
    icon: '/first-article.svg',
  },
  {
    id: 'author-5',
    name: 'Rising Author',
    description: 'Published 5 articles',
    icon: '/author-5.svg',
  },
  {
    id: 'author-10',
    name: 'Established Author',
    description: 'Published 10 articles',
    icon: '/author-10.svg',
  },
  {
    id: 'author-15',
    name: 'Seasoned Author',
    description: 'Published 15 articles',
    icon: '/author-15.svg',
  }
]

export const findBadgeById = (id: string) => BADGES.find(b => b.id === id) || null
