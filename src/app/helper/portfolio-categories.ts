import { environment } from 'src/environments/environment';
const imgUrl = environment.IMGURL;

export const caegoryItem = {
  items: [{
    title: 'Creative',
    seo_title: 'Video game UA, trailers, websites, marketing assets and more',
    description : 'With a passion for visual impact and rich experience, WAYPOINT works on all Marketing Art.',
    hero_image: `${imgUrl}/img/hero/gundam.jpg`,
    subtitle: 'Marketing. Art',
    slug: 'creative'
  },
  {
    title: 'Collectibles',
    seo_title: 'Video game collector’s editions and influencer kits',
    description : "Making your IP come to life through collector's editions, press kits, swag, store merch, and backer rewards.",
    hero_image: `${imgUrl}/img/hero/happy.jpg`,
    subtitle: 'Heroes. Crafted',
    slug: 'collectibles'
  },
  {
    title: 'E-Commerce',
    seo_title: 'Video game ecommerce, shops, and e-commerce merch',
    description : 'Extending your reach and delighting fans with specialty items. E-shops, product design, manufacturing, distribution, fulfillment, and even taxes …',
    hero_image: `${imgUrl}/img/hero/ecommerce.jpg`,
    subtitle: 'Delight. Fans',
    slug: 'e-commerce'
  },
  {
    title: 'Experiential',
    seo_title: 'Video game trade show booths and experiential activations',
    description : "Creating experiences for brands through events, digital activations, booths, fan days, and more.",
    hero_image: `${imgUrl}/img/hero/experiential.jpg`,
    subtitle: 'Experience. Stories',
    slug: 'experiential'
  },
  {
    title: 'Games',
    seo_title: 'Video game development, work for hire, and original IP',
    description : 'We are experts in mobile games made with Unity and Unreal. We build architectures to scale.',
    hero_image: `${imgUrl}/img/hero/games.jpg`,
    subtitle: 'Work. For hire',
    slug: 'games'
  },
]
}
