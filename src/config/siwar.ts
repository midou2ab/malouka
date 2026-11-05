/**
 * ❤️ MALOUKTY — PERSONALIZATION FILE
 * Replace everything here with your own content. Nothing else needs to change.
 *
 * MEDIA: keep personal photos in the root `assets/` folder and point to them below:
 *   - Video:   assets/vid.mov                   -> video.src = vid
 *   - Photos:  assets/pic1.jpg ...             -> gallery[i].src = pic1
 *   - Music:   assets/hbd.mp3                   -> music.src = hbd
 * Leave a `src` empty ("") to show the pretty placeholder instead.
 */

import pic1 from "../../assets/pic1.jpg";
import pic2 from "../../assets/pic2.jpg";
import pic3 from "../../assets/pic3.jpg";
import pic4 from "../../assets/pic4.jpg";
import pic5 from "../../assets/pic5.jpg";
import pic6 from "../../assets/pic6.jpg";
import pic7 from "../../assets/pic7.jpg";
import pic8 from "../../assets/pic8.jpg";
import vid from "../../assets/vid.mov";
import hbd from "../../assets/hbd.mp3";

export const siwar = {
  name: "MALOUKTY",

  intro: {
    teaser: "Something special is waiting for you...",
    greeting: "Happy Birthday, My Love ❤️",
    message:
      "Today, the world celebrates you. And I get to celebrate the most beautiful part of mine.",
    button: "ENTER YOUR LITTLE WORLD ♡",
  },

  menu: {
    title: "Welcome to your little world, MALOUKTY.",
    subtitle: "I made a few little things for you. Each one holds a piece of us.",
  },

  video: {
    src: vid,
    poster: "", // optional cover image, e.g. "/media/video-cover.jpg"
    title: "A little piece of us ❤️",
    caption: "Every second of this is a moment I'd live again, a thousand times, with you.",
  },

  gallery: [
    { src: pic1, caption: "The day everything began" },
    { src: pic2, caption: "Your smile, my favorite view" },
    { src: pic3, caption: "Just us" },
    { src: pic4, caption: "Golden hour, golden you" },
    { src: pic5, caption: "A little adventure" },
    { src: pic6, caption: "Laughing until it hurt" },
    { src: pic7, caption: "My safe place" },
    { src: pic8, caption: "Forever starts here" },
  ] as { src: string; caption?: string }[],

  letter: {
    greeting: "To the girl who makes my world beautiful! ❤️",
    paragraphs: [
      "Happy 18th Birthday, my love! ❤️",
      "Today is not just another birthday. It’s the day someone very special to me came into this world. And I’m so lucky that life brought you into mine.",
      "I wish I could give you the whole world, because you deserve nothing less. I want to see you smile every day, achieve all your dreams, and always feel loved and appreciated.",
      "Thank you for being you, for your beautiful smile, your little habits, your kindness, and all the little things that make you special to me.",
      "I hope this new chapter of your life brings you happiness, success, unforgettable memories, and everything your heart wishes for.",
      "I don’t know what the future has planned for us, but I know that I want to make many more beautiful memories with you.",
      "Happy 18th birthday, princess. Never forget how special you are to me. I love you more than words can explain. ❤️",
    ],
    closing: "Forever yours. 💍",
    signature: "",
  },

  music: {
    src: hbd,
    volume: 0.2,
  },
};
