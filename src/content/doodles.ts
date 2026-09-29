import type { ImageMetadata } from 'astro';

import bird from '../assets/art/doodles/Doodles_bird_1.png';
import reader from '../assets/art/doodles/Doodles_blog.png';
import burger from '../assets/art/doodles/Doodles_burger.png';
import camera from '../assets/art/doodles/Doodles_camera.png';
import campfire from '../assets/art/doodles/Doodles_campfire.png';
import fishBones from '../assets/art/doodles/Doodles_dead_fish.png';
import disk from '../assets/art/doodles/Doodles_disk.png';
import fish from '../assets/art/doodles/Doodles_fish_1.png';
import controller from '../assets/art/doodles/Doodles_games.png';
import house from '../assets/art/doodles/Doodles_home.png';
import robot from '../assets/art/doodles/Doodles_robot.png';
import scribble from '../assets/art/doodles/Doodles_scribble.png';
import computer from '../assets/art/doodles/Doodles_software 01.09.34.png';
import figure from '../assets/art/doodles/Doodles_whoiam 01.09.34.png';
import tools from '../assets/art/doodles/Doodles_work 01.09.34.png';
import type { Locale } from '../i18n/locales';

export interface Doodle {
  id: string;
  image: ImageMetadata;
  name: Record<Locale, string>;
  /** The drawing's bounds inside the 512px canvas: left, top, right, bottom. */
  box: readonly [number, number, number, number];
}

// Display order in the sketcher panel.
export const doodles: readonly Doodle[] = [
  { id: 'bird', image: bird, name: { en: 'bird', ru: 'птичка' }, box: [189, 185, 439, 434] },
  { id: 'reader', image: reader, name: { en: 'sleepy reader', ru: 'сонный читатель' }, box: [178, 199, 347, 341] },
  { id: 'burger', image: burger, name: { en: 'burger', ru: 'бургер' }, box: [150, 160, 368, 343] },
  { id: 'camera', image: camera, name: { en: 'camera', ru: 'фотоаппарат' }, box: [124, 111, 385, 292] },
  { id: 'campfire', image: campfire, name: { en: 'campfire', ru: 'костёр' }, box: [116, 73, 397, 438] },
  { id: 'fish-bones', image: fishBones, name: { en: 'fish bones', ru: 'рыбий скелет' }, box: [115, 176, 406, 302] },
  { id: 'disk', image: disk, name: { en: 'CD', ru: 'диск' }, box: [68, 69, 481, 413] },
  { id: 'fish', image: fish, name: { en: 'fish', ru: 'рыбка' }, box: [69, 184, 458, 417] },
  { id: 'controller', image: controller, name: { en: 'game controller', ru: 'геймпад' }, box: [165, 185, 325, 341] },
  { id: 'house', image: house, name: { en: 'house', ru: 'домик' }, box: [189, 161, 308, 321] },
  { id: 'robot', image: robot, name: { en: 'little robot', ru: 'робот' }, box: [126, 126, 391, 352] },
  { id: 'scribble', image: scribble, name: { en: 'scribble', ru: 'каракули' }, box: [28, 21, 501, 458] },
  { id: 'computer', image: computer, name: { en: 'computer', ru: 'компьютер' }, box: [147, 204, 323, 335] },
  { id: 'figure', image: figure, name: { en: 'figure with a question', ru: 'человечек с вопросом' }, box: [173, 131, 324, 321] },
  { id: 'tools', image: tools, name: { en: 'wrench and pencil', ru: 'ключ и карандаш' }, box: [168, 175, 313, 319] },
];
