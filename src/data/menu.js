/*
  THE MENU: edit drinks here.
  color: "pink" | "teal" | "blush" (header color of the board)
  Each item: name, optional desc, optional price ("$5.50"), optional tag ("top seller").
*/
export const SHOW_SAMPLE_BANNER = false

export const MENU = [
  {
    title: 'specialty iced lattes', sub: 'Her signature builds', color: 'pink',
    items: [
      { name: 'Dubai', tag: 'top seller' },
      { name: 'Biscoff' },
      { name: 'Chocolate Nana-Pudding' },
      { name: 'Chocolate Covered Strawberry' },
      { name: 'Cocoa Puffs' },
      { name: 'Lucky You' },
      { name: 'Sandy Crunch' },
    ],
  },
  {
    title: 'matcha', sub: 'Iced and layered', color: 'teal',
    items: [
      { name: 'Banana Pudding' },
      { name: 'Fruity Pebbles' },
      { name: 'Strawberry' },
    ],
  },
  {
    title: 'dirty red bulls', sub: 'For when you need the extra boost', color: 'blush',
    items: [
      { name: 'Peachy Beachy', desc: 'Red Bull, peach & strawberry syrups with half & half' },
      { name: 'Malibu Sunrise', desc: 'Red Bull, strawberry, pineapple & coconut syrups topped with whipped cream' },
      { name: 'Shark Attack', desc: 'Red Bull, blue raspberry & coconut syrup, half & half topped with whipped cream' },
      { name: 'Dole Whip', desc: 'Red Bull, vanilla & pineapple syrups and coconut cream' },
    ],
  },
  {
    title: 'dirty sodas', sub: 'Fizzy, fruity and a little extra', color: 'pink',
    items: [
      { name: 'Coconut Bliss', desc: 'Diet Coke, coconut syrup, coconut creamer & lime' },
      { name: 'Rootie Tootie', desc: 'Root beer, vanilla syrup, marshmallow fluff, whipped cream or half & half' },
      { name: 'Pink Starburst', desc: 'Sprite, peach, strawberry & raspberry syrups with half & half' },
      { name: 'Creamy Dr. Pepper', desc: 'Dr Pepper, vanilla syrup & half & half' },
      { name: 'Cool Dr. Pepper', desc: 'Dr Pepper, vanilla syrup & coconut cream' },
      { name: 'Bond Fire', desc: 'Root beer, marshmallow fluff, toasted marshmallow syrup & half & half. Whipped cream optional' },
      { name: 'Pink Piña Colada', desc: 'Sprite, pineapple & coconut syrup with strawberry cold foam' },
      { name: 'Dreamy Dr. Pepper', desc: 'Dr Pepper, strawberry & vanilla syrups with half & half' },
      { name: 'Green Apple Jolly Rancher', desc: 'Sprite, green apple syrup & half & half' },
      { name: 'Caramel Apple', desc: 'Sprite, caramel drizzle, caramel & green apple syrups with half & half' },
      { name: 'Pink Sunrise', desc: 'Sprite, strawberry & vanilla syrups with coconut creamer' },
      { name: 'Pineapple Queen', desc: 'Sprite, watermelon & pineapple syrups topped with strawberry popping pearls' },
    ],
  },
]
