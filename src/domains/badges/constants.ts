export const BADGES = [
  {
    id: 'founding-member',
    name: 'Founding Member',
    description: 'One of the first users to join the platform',
    icon: '/badges/founding-member.svg',
    category: 'lifecycle',
    rarity: 'legendary',
    // maximum number of users that can receive this badge. honoured to the earliest joiners
    maxAwards: 100,
    // visual accent for advanced design (frontend can consume)
    color: '#FFD700',
  },
  {
    id: 'first-article',
    name: 'First Article',
    description: 'Published your first article on the platform',
    icon: '/badges/first-article.svg',
    category: 'authoring',
    rarity: 'common',
    color: '#6C8EF5',
  },
  {
    id: 'author-5',
    name: 'Rising Author',
    description: 'Published 5 articles',
    icon: '/badges/author-5.svg',
    category: 'authoring',
    rarity: 'uncommon',
    color: '#4FC08D',
  },
  {
    id: 'author-10',
    name: 'Established Author',
    description: 'Published 10 articles',
    icon: '/badges/author-10.svg',
    category: 'authoring',
    rarity: 'rare',
    color: '#8A4CFF',
  },
  {
    id: 'author-15',
    name: 'Seasoned Author',
    description: 'Published 15 articles',
    icon: '/badges/author-15.svg',
    category: 'authoring',
    rarity: 'epic',
    color: '#FF6B6B',
  },
  {
    id: 'community-builder',
    name: 'Community Builder',
    description: 'Actively engaged with the community: comments, replies and helpful feedback',
    icon: '/badges/community-builder.svg',
    category: 'community',
    rarity: 'uncommon',
    color: '#FF9F1C',
  },
  {
    id: 'mentor',
    name: 'Mentor',
    description: 'Helped other authors grow; awarded for sustained mentorship and accepted guidance',
    icon: '/badges/mentor.svg',
    category: 'community',
    rarity: 'rare',
    color: '#2EC4B6',
  },
  {
    id: 'top-creator-100',
    name: 'Top 100 Creators',
    description: 'Ranked in the platform top 100 creators for the month',
    icon: '/badges/top-creator-100.svg',
    category: 'performance',
    rarity: 'epic',
    color: '#FF4D6D',
  }
]

export const findBadgeById = (id: string) => BADGES.find(b => b.id === id) || null
