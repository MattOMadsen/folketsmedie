export type UsefulLink = {
  title: string;
  href: string;
  note?: string;
};

export type LinkGroup = {
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  image: string;
  links: UsefulLink[];
};

export const linkGroups: LinkGroup[] = [
  {
    slug: 'video-bloggere',
    title: 'Video-podcasts',
    kicker: 'Heltene på nettet',
    intro: 'Kanaler Folkets Medie henviste til på Rumble.',
    image: '/media/links/video-bloggere.jpg',
    links: [
      { title: 'And We Know', href: 'https://rumble.com/c/AndWeKnow' },
      { title: 'X22 Report', href: 'https://rumble.com/c/X22Report' },
      { title: 'RedPill78', href: 'https://rumble.com/c/RedPill78' },
      { title: 'SantaSurfing', href: 'https://rumble.com/user/SantaSurfing' },
      { title: 'Folkets Medie på Rumble', href: 'https://rumble.com/user/Folketsmedie' },
    ],
  },
  {
    slug: 'telegram-grupper',
    title: 'Telegram-grupper',
    kicker: 'Nyheder uden filter',
    intro: 'Kanaler fra den gamle Nyttige links-side. Nogle kan være lukket siden.',
    image: '/media/links/telegram-grupper.jpg',
    links: [
      { title: 'Folkets Medie', href: 'https://t.me/Folkets_Medie' },
      { title: 'Tommy Robinson News', href: 'https://t.me/TommyRobinsonNews' },
      { title: 'Gateway Pundit', href: 'https://t.me/gatewaypunditofficial' },
      { title: 'We The Media', href: 'https://t.me/WeTheMedia' },
      { title: 'The Patriots Party', href: 'https://t.me/ThePatriotsParty' },
      { title: 'World Wide Demonstration Denmark', href: 'https://t.me/worldwidedenmark' },
      { title: 'Disclose.tv', href: 'https://t.me/disclosetv' },
      { title: 'The Epoch Times', href: 'https://t.me/epochtimes' },
      { title: 'MistyG', href: 'https://t.me/MistyG17' },
      { title: 'Majestic 12 Hub', href: 'https://t.me/Majestic12Mirror' },
      { title: 'Pepe Lives Matter', href: 'https://t.me/PepeMatter' },
      { title: 'Qtime Network', href: 'https://t.me/QtimeNetwork' },
      { title: 'Wendy Rogers', href: 'https://t.me/wendyrogersaz' },
      { title: 'HATS', href: 'https://t.me/HATSTRUTH' },
      { title: 'Resist the Mainstream', href: 'https://t.me/ResisttheMainstream' },
      { title: 'One America News Network', href: 'https://t.me/OANNTV' },
      { title: 'KanekoaTheGreat', href: 'https://t.me/KanekoaTheGreat' },
    ],
  },
  {
    slug: 'udenlandske-medier',
    title: 'Udenlandske medier',
    kicker: 'Medier uden for Danmark',
    intro: 'Udenlandske sider Folkets Medie samlede under Nyttige links.',
    image: '/media/links/udenlandske-medier.jpg',
    links: [
      { title: 'The Gateway Pundit', href: 'https://www.thegatewaypundit.com/' },
      { title: 'LifeSiteNews', href: 'https://www.lifesitenews.com/' },
      { title: 'The National Pulse', href: 'https://thenationalpulse.com/' },
      { title: 'Resist the Mainstream', href: 'https://resistthemainstream.org/' },
      { title: 'InfoWars', href: 'https://www.infowars.com/' },
      { title: 'NTD', href: 'https://www.ntd.com/' },
      { title: 'The Exposé', href: 'https://theexpose.uk/' },
    ],
  },
];

export function getLinkGroup(slug: string): LinkGroup | undefined {
  return linkGroups.find((g) => g.slug === slug);
}
