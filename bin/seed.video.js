require("dotenv").config();
require("./../config/mongo");

const VideoModel = require("./../models/Video");

const videos = [
  {
    title: "Kidaki - Une balle qui tue ?",
    url:
      "https://res.cloudinary.com/anojan/video/upload/v1607876542/rap%20videos/Kidaki_-_Une_balle_qui_tue_usrh2s.ts",
    duration: "2:30",
    likes: 70,
    dislikes: 50,
    date: 15 / 02 / 2019,
  },
  {
    title: "Todd - Boy",
    url:
      "https://res.cloudinary.com/anojan/video/upload/v1607878108/rap%20videos/Todd_-_Boy_jwnjy3.ts",
    duration: "2:21",
    likes: 280,
    dislikes: 30,
    date: 01 / 12 / 2019,
  },
  {
    title: "Wsh D Mba - Dans Chloé",
    url:
      "https://res.cloudinary.com/anojan/video/upload/v1607878108/rap%20videos/Todd_-_Boy_jwnjy3.tsx",
    duration: "2:51",
    likes: 280,
    dislikes: 30,
    date: 13 / 09 / 2020,
  },
  {
    title: "Kaza - HRTBRK #3",
    url:
      "https://res.cloudinary.com/anojan/video/upload/v1607880733/rap%20videos/Kaza_-_HRTBRK_3_zszoh1.ts",
    duration: "2:53",
    likes: 280,
    dislikes: 30,
    date: 03 / 05 / 2019,
  },
  {
    title: "KODES - MECHANT MECHANT MECHANT",
    url:
      "https://res.cloudinary.com/anojan/video/upload/v1607882280/KODES_-_MECHANT_MECHANT_MECHANT_CLIP_OFFICIEL_e3fmdj.ts",
    duration: "2:15",
    likes: 280,
    dislikes: 30,
    date: 04 / 09 / 2019,
  },
  {
    title: "PRIME - TOUT DONNER",
    url:
      "https://res.cloudinary.com/anojan/video/upload/v1607878969/rap%20videos/PRIME_-_TOUT_DONNER_CLIP_OFFICIEL_kqvyrw.ts",
    duration: "2:15",
    likes: 280,
    dislikes: 30,
    date: 03 / 03 / 2019,
  },
];

VideoModel.deleteMany()
  .then(async () => {
    await VideoModel.insertMany(videos);
  })
  .catch((err) => {
    console.error(err);
  });
