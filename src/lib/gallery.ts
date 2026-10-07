import coast from '@/assets/editorial-0.jpg';
import lilies from '@/assets/editorial-1.jpg';
import architecture from '@/assets/editorial-2.jpg';
import room from '@/assets/editorial-3.jpg';
import mountain from '@/assets/moments-0.jpg';
import salad from '@/assets/moments-1.jpg';
import fashion from '@/assets/moments-2.jpg';
import leaves from '@/assets/moments-3.jpg';
import ocean from '@/assets/discover-0.jpg';
import vase from '@/assets/discover-1.jpg';
import matcha from '@/assets/discover-2.jpg';
import canyon from '@/assets/discover-3.jpg';
import sunset from '@/assets/inspiration-0.jpg';
import stairs from '@/assets/inspiration-1.jpg';
import flowers from '@/assets/inspiration-2.jpg';
import cottage from '@/assets/inspiration-3.jpg';

export type Pin = { id: string; image: string; title: string; category: string; author: string; height: string; likes: number };
export const categories = ['For you', 'Nature', 'Travel', 'Architecture', 'Interiors', 'Art & design', 'Food', 'Fashion'];
export const initialPins: Pin[] = [
  {id:'1',image:coast,title:'A little piece of the Italian coast',category:'Travel',author:'Sofia Laurent',height:'tall',likes:248},
  {id:'2',image:lilies,title:'The beauty of simple things',category:'Nature',author:'Flora Studio',height:'short',likes:186},
  {id:'3',image:architecture,title:'Chasing light and quiet corners',category:'Architecture',author:'Noah Miller',height:'medium',likes:324},
  {id:'4',image:mountain,title:'Somewhere above the clouds',category:'Nature',author:'Ella Woods',height:'tall',likes:512},
  {id:'5',image:salad,title:'A taste of slow summer',category:'Food',author:'The Sunday Table',height:'short',likes:173},
  {id:'6',image:room,title:'A home that feels like a hug',category:'Interiors',author:'Olive & Oak',height:'medium',likes:287},
  {id:'7',image:ocean,title:'Where the ocean meets the shore',category:'Travel',author:'Luca James',height:'medium',likes:431},
  {id:'8',image:fashion,title:'Summer, in linen',category:'Fashion',author:'Amelie Rose',height:'tall',likes:209},
  {id:'9',image:vase,title:'A study in blue',category:'Art & design',author:'Studio Forma',height:'tall',likes:365},
  {id:'10',image:leaves,title:'A little more green',category:'Nature',author:'Flora Studio',height:'short',likes:154},
  {id:'11',image:matcha,title:'My kind of morning ritual',category:'Food',author:'The Sunday Table',height:'short',likes:228},
  {id:'12',image:canyon,title:'Take the road less traveled',category:'Travel',author:'Ella Woods',height:'medium',likes:398},
  {id:'13',image:sunset,title:'Stay for the sunset',category:'Travel',author:'Luca James',height:'medium',likes:284},
  {id:'14',image:stairs,title:'Perfectly imperfect geometry',category:'Architecture',author:'Noah Miller',height:'short',likes:191},
  {id:'15',image:flowers,title:'Wild at heart',category:'Nature',author:'Flora Studio',height:'tall',likes:347},
  {id:'16',image:cottage,title:'A slower kind of life',category:'Travel',author:'Sofia Laurent',height:'medium',likes:489},
];