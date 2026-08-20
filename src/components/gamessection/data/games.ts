export type GameGenre =
  | 'FPS'
  | 'Open World'
  | 'RPG'
  | 'Story'
  | 'Racing'
  | 'Battle Royale'
  | 'Action'
  | 'Horror'
  | 'Fighting';

export interface Game {
  id: string;
  title: string;
  developer: string;
  genre: string[];
  image: string;
  description?: string;
  isFeatured?: boolean;
  playStatus?: 'Played' | 'Not Played';
}

export const featuredGames: Game[] = [
  {
    id: 'valorant',
    title: 'Valorant',
    developer: 'Riot Games',
    genre: ['FPS'],
    image: 'https://wallpapers.com/images/featured/valorant-305kescxw5dpup7y.jpg',
    description: 'Precision gunplay meets unique agent abilities in this highly competitive tactical shooter.',
    isFeatured: true
  },
  {
    id: 'rdr2',
    title: 'Red Dead Redemption 2',
    developer: 'Rockstar Games',
    genre: ['Open World', 'Story', 'Action'],
    image: 'https://images.wallpapersden.com/image/wl-arthur-morgan-red-dead-redemption-2_92837.jpg',
    description: 'An epic tale of life in America’s unforgiving heartland, featuring unprecedented open-world detail.',
    isFeatured: true
  },
  // {
  //   id: 'ghost',
  //   title: 'Ghost of Tsushima',
  //   developer: 'Sucker Punch',
  //   genre: ['Open World', 'Action', 'Story'],
  //   image: 'https://images.wallpapersden.com/image/download/ghost-of-tsushima-4k-art_bGZua2yUmZqaraWkpJRobGxnrWdmZ2c.jpg',
  //   description: 'A breathtaking samurai epic set in beautiful feudal Japan.',
  //   isFeatured: true
  // },
  {
    id: 'tlou',
    title: 'The Last of Us',
    developer: 'Naughty Dog',
    genre: ['Story', 'Action', 'Horror'],
    image: 'https://images3.alphacoders.com/129/1295037.jpg',
    description: 'A grueling journey across a post-pandemic United States in a masterpiece of emotional storytelling.',
    isFeatured: true
  }
];

export const libraryGames: Game[] = [
  { id: 'gtav', title: 'Grand Theft Auto V', developer: 'Rockstar Games', genre: ['Open World', 'Action'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202202/2816/mYnP2bWXQemDqy8pzJTksF5P.png' },
  { id: 'gtaiv', title: 'Grand Theft Auto IV', developer: 'Rockstar Games', genre: ['Open World', 'Action'], image: 'https://upload.wikimedia.org/wikipedia/en/b/b7/Grand_Theft_Auto_IV_cover.jpg' },
  { id: 'rdr', title: 'Red Dead Redemption', developer: 'Rockstar Games', genre: ['Open World', 'Action', 'Story'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202307/1118/fa27448dbd712ce3f6c8d17208d246ca82fb32fb90232490.png' },
  { id: 'cyberpunk', title: 'Cyberpunk 2077', developer: 'CD Projekt Red', genre: ['Open World', 'RPG', 'Action'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/2812/2855140cb03e48227b231ff61d120a16b3f9ff7702f2af2a.png' },
  { id: 'eldenring', title: 'Elden Ring', developer: 'FromSoftware', genre: ['RPG', 'Open World', 'Action'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooZA2lIgRo.png' },
  { id: 'gow', title: 'God of War', developer: 'Santa Monica Studio', genre: ['Action', 'Story'], image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/ax0V5KTMCjrJEqD6O1wz678Q.png' },
  { id: 'gowr', title: 'God of War Ragnarök', developer: 'Santa Monica Studio', genre: ['Action', 'Story'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XFSd5OEMHOX18nKqX2GZ.png' },
  { id: 'spiderman', title: 'Marvel\'s Spider-Man', developer: 'Insomniac Games', genre: ['Action', 'Open World'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202008/1020/22s3B2B4eXz0J0vH4Z1Uj2GZ.png' },
  { id: 'spiderman2', title: 'Marvel\'s Spider-Man 2', developer: 'Insomniac Games', genre: ['Action', 'Open World'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3fa1dc471fecf6ddddfc4ed337c7ee0077ec0443bc2.png' },
  { id: 'tlou2', title: 'The Last of Us Part II', developer: 'Naughty Dog', genre: ['Story', 'Action', 'Horror'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/0278e9fdb78e1d51c3a6479fccae975aab3453bde2c6f133.png' },
  { id: 'uncharted4', title: 'Uncharted 4', developer: 'Naughty Dog', genre: ['Action', 'Story'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/aZ7D2F2W0rF2r8hF4E3I4t9T.png' },
  { id: 'unchartedll', title: 'Uncharted: The Lost Legacy', developer: 'Naughty Dog', genre: ['Action', 'Story'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/aZ7D2F2W0rF2r8hF4E3I4t9T.png' },
  { id: 'bgmi', title: 'BGMI', developer: 'Krafton', genre: ['Battle Royale', 'Action'], image: 'https://w0.peakpx.com/wallpaper/709/354/HD-wallpaper-bgmi-pubg.jpg' },
  { id: 'hzd', title: 'Horizon Zero Dawn', developer: 'Guerrilla Games', genre: ['Open World', 'RPG', 'Action'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202009/2418/aZ7D2F2W0rF2r8hF4E3I4t9T.png' },
  { id: 'hfw', title: 'Horizon Forbidden West', developer: 'Guerrilla Games', genre: ['Open World', 'RPG', 'Action'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/vQ9yLqUq7V5fV4v8vQ8r8r8r.png' },
  { id: 'ac2', title: 'Assassin\'s Creed II', developer: 'Ubisoft', genre: ['Action', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/5/50/Assassin%27s_Creed_II_Box_Art.JPG' },
  { id: 'ac4', title: 'Assassin\'s Creed IV', developer: 'Ubisoft', genre: ['Action', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg' },
  { id: 'acorigins', title: 'Assassin\'s Creed Origins', developer: 'Ubisoft', genre: ['RPG', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Assassin%27s_Creed_Origins_Cover_Art.png' },
  { id: 'acodyssey', title: 'Assassin\'s Creed Odyssey', developer: 'Ubisoft', genre: ['RPG', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/9/99/ACOdysseyCoverArt.png' },
  { id: 'acvalhalla', title: 'Assassin\'s Creed Valhalla', developer: 'Ubisoft', genre: ['RPG', 'Open World'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202006/1520/ED2llXG3yHn0e2mI91m230mX.png' },
  { id: 'farcry3', title: 'Far Cry 3', developer: 'Ubisoft', genre: ['FPS', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Far_Cry_3_box_art.jpg' },
  { id: 'farcry4', title: 'Far Cry 4', developer: 'Ubisoft', genre: ['FPS', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/3/30/Far_Cry_4_box_art.jpg' },
  { id: 'farcry5', title: 'Far Cry 5', developer: 'Ubisoft', genre: ['FPS', 'Open World'], image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2221/zY0A4uQ7T2T1G7w0x9vG5p2u.png' },
  { id: 'watchdogs', title: 'Watch Dogs', developer: 'Ubisoft', genre: ['Action', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/9/90/Watch_Dogs_box_art.jpg' },
  { id: 'watchdogs2', title: 'Watch Dogs 2', developer: 'Ubisoft', genre: ['Action', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/0/05/Watch_Dogs_2_cover_art.jpg' },
  { id: 'bf1', title: 'Battlefield 1', developer: 'DICE', genre: ['FPS', 'Action'], image: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Battlefield_1_box_art.jpg' },
  { id: 'bf4', title: 'Battlefield 4', developer: 'DICE', genre: ['FPS', 'Action'], image: 'https://upload.wikimedia.org/wikipedia/en/7/74/Battlefield_4_box_art.jpg' },
  { id: 'mw', title: 'Call of Duty: Modern Warfare', developer: 'Infinity Ward', genre: ['FPS', 'Action'], image: 'https://upload.wikimedia.org/wikipedia/en/e/e9/CallofDutyModernWarfare%282019%29.jpg' },
  { id: 'warzone', title: 'Call of Duty: Warzone', developer: 'Raven Software', genre: ['FPS', 'Battle Royale'], image: 'https://upload.wikimedia.org/wikipedia/en/6/69/Call_of_Duty_Warzone_cover.jpg' },
  { id: 'cs2', title: 'Counter-Strike 2', developer: 'Valve', genre: ['FPS'], image: 'https://upload.wikimedia.org/wikipedia/en/f/f2/CS2_Cover_Art.jpg' },
  { id: 'pubg', title: 'PUBG', developer: 'Krafton', genre: ['Battle Royale', 'FPS', 'Action'], image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/PlayerUnknown%27s_Battlegrounds_cover.jpg' },
  { id: 'minecraft', title: 'Minecraft', developer: 'Mojang', genre: ['Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png' },
  { id: 'forza4', title: 'Forza Horizon 4', developer: 'Playground Games', genre: ['Racing', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/8/87/Forza_Horizon_4_cover.jpg' },
  { id: 'forza5', title: 'Forza Horizon 5', developer: 'Playground Games', genre: ['Racing', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg' },
  { id: 'nfsmw', title: 'Need for Speed: Most Wanted', developer: 'Criterion Games', genre: ['Racing'], image: 'https://upload.wikimedia.org/wikipedia/en/9/96/Need_for_Speed_Most_Wanted_%282012%29_cover.png' },
  { id: 'nfsheat', title: 'Need for Speed: Heat', developer: 'Ghost Games', genre: ['Racing', 'Open World'], image: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Need_for_Speed_Heat_cover_art.jpg' },
  { id: 'mk11', title: 'Mortal Kombat 11', developer: 'NetherRealm', genre: ['Fighting'], image: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Mortal_Kombat_11_cover_art.png' },
  { id: 'tekken7', title: 'Tekken 7', developer: 'Bandai Namco', genre: ['Fighting'], image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Official_Tekken_7_Logo.jpg' },
  { id: 'tekken8', title: 'Tekken 8', developer: 'Bandai Namco', genre: ['Fighting'], image: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Tekken_8_box_art.jpg' },
  { id: 're2', title: 'Resident Evil 2', developer: 'Capcom', genre: ['Horror', 'Action'], image: 'https://upload.wikimedia.org/wikipedia/en/3/36/Resident_Evil_2_Cover_Art.jpg' },
  { id: 're4', title: 'Resident Evil 4', developer: 'Capcom', genre: ['Horror', 'Action'], image: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Resident_Evil_4_Remake.jpg' },
  { id: 'revillage', title: 'Resident Evil Village', developer: 'Capcom', genre: ['Horror', 'Story'], image: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png' },
  { id: 'witcher3', title: 'The Witcher 3', developer: 'CD Projekt Red', genre: ['RPG', 'Open World', 'Story'], image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg' },
  { id: 'hogwarts', title: 'Hogwarts Legacy', developer: 'Avalanche Software', genre: ['RPG', 'Open World'], image: 'https://image.api.playstation.com/vulcan/ap/rnd/202208/0921/B9QoX7vV9v5p02X6Q58wLq3u.png' },
  { id: 'detroit', title: 'Detroit: Become Human', developer: 'Quantic Dream', genre: ['Story'], image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Detroit_Become_Human.jpg' },
  { id: 'deathstranding', title: 'Death Stranding', developer: 'Kojima Productions', genre: ['Open World', 'Story'], image: 'https://upload.wikimedia.org/wikipedia/en/2/22/Death_Stranding_core_art.jpg' },
  { id: 'daysgone', title: 'Days Gone', developer: 'Bend Studio', genre: ['Open World', 'Horror', 'Action'], image: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Days_Gone_cover_art.jpg' },
  { id: 'dyinglight', title: 'Dying Light', developer: 'Techland', genre: ['Open World', 'Horror', 'Action'], image: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Dying_Light_cover_art.jpg' },
  { id: 'metro', title: 'Metro Exodus', developer: '4A Games', genre: ['FPS', 'Horror', 'Story'], image: 'https://upload.wikimedia.org/wikipedia/en/6/64/Metro_Exodus_cover_art.jpg' },
];
