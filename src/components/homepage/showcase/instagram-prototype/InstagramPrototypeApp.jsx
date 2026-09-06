import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft, AtSign, Bell, Bookmark, BookmarkCheck, Check, ChevronDown, Copy,
  ChevronRight, CirclePlus, Clapperboard, Clock3, Grid3X3, Heart,
  Home, Link2, LockKeyhole, Menu, MessageCircle, MoreHorizontal, Pin, Play,
  Plus, Repeat2, Search, Send, Smartphone, Sparkles, SquareUserRound,
  UserRound, UsersRound, X
} from 'lucide-react';
import prototypeStyles from './instagram-prototype.css?inline';

const avatarPhotos = [
  'photo-1494790108377-be9c29b29330', 'photo-1500648767791-00dcc994a43e',
  'photo-1534528741775-53994a69daeb', 'photo-1507003211169-0a1dd7228f2d',
  'photo-1527980965255-d3b416303d12', 'photo-1531123897727-8f129e1688ce',
  'photo-1506794778202-cad84cf45f1d', 'photo-1534528741775-53994a69daeb',
  'photo-1508214751196-bcfd4ca60f91', 'photo-1524504388940-b1c1722653e1'
];
const img = (id, w=700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=entropy&fm=webp&w=${w}&q=84`;
const avatarImg = (id, w=120) => `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=faces&fm=webp&w=${w}&h=${w}&q=82`;
const prototypeAsset = path => `${import.meta.env.BASE_URL}instagram-showcase${path.replace(/\.jpg$/, '.webp')}`;
const PROFILE_AVATAR = prototypeAsset('/thumbnails/profile-avatar-cat.jpg');
const mediaSrc = (photo, w=700) => photo.startsWith('/') ? prototypeAsset(photo) : img(photo,w);
const NOW = new Date('2026-09-04T12:00:00');

const items = [
  { id:1, photo:'/thumbnails/life-offline.jpg', title:'Life offline', creator:'slow.weekend', collection:'Travel', annotation:'The feeling for the next trip', savedAt:'2026-09-03', type:'reel', designed:true },
  { id:2, photo:'/thumbnails/may-files.jpg', title:'May files', creator:'archive.process', collection:'Design', annotation:'Personal archive format', savedAt:'2026-09-01', type:'reel', designed:true },
  { id:3, photo:'/thumbnails/random-sketch.jpg', title:'Random sketch', creator:'open.sketchbook', collection:'Design', annotation:'Love this collage direction', savedAt:'2026-08-29', type:'reel', designed:true },
  { id:4, photo:'/thumbnails/the-drama.jpg', title:'The Drama, visual review', creator:'screen.notes', collection:'Design', annotation:'Watch for the graphic direction', savedAt:'2026-08-26', type:'post', designed:true, fit:'contain' },
  { id:5, photo:'/thumbnails/art-of-noticing.jpg', title:'The art of noticing', creator:'tiny.observations', collection:'Design', annotation:'Love the image-as-letter treatment', savedAt:'2026-08-22', type:'reel', designed:true },
  { id:6, photo:'/thumbnails/spring-thinking.jpg', title:'Thinking about spring', creator:'yeyeyer.studio', collection:'Travel', annotation:'A joyful visual thought trail', savedAt:'2026-08-18', type:'post', designed:true },
  { id:7, photo:'/thumbnails/climate-ai.jpg', title:'Could AI offer climate solutions?', creator:'atmos.archive', collection:'Design', annotation:'Interesting editorial data treatment', savedAt:'2026-08-14', type:'reel', designed:true },
  { id:8, photo:'/thumbnails/let-it-rip.jpg', title:'Let it rip', creator:'frame.by.frame', collection:'Design', annotation:'Bold type over an archival still', savedAt:'2026-08-10', type:'reel', designed:true },
  { id:9, photo:'/thumbnails/monthly-recap.jpg', title:'Monthly recap', creator:'desktop.diary', collection:'Design', annotation:'Simple and very personal', savedAt:'2026-08-05', type:'post', designed:true },
  { id:10, photo:'/thumbnails/consumed-create.jpg', title:'Consumed enough. Time to create.', creator:'make.more.club', collection:'Design', annotation:'Keep this reminder', savedAt:'2026-07-30', type:'reel', designed:true },
  { id:11, photo:'/thumbnails/peacemaker.jpg', title:'Peacemaker', creator:'oamc.archive', collection:'Design', annotation:'Great single-symbol poster', savedAt:'2026-07-24', type:'post', designed:true },
  { id:12, photo:'/thumbnails/favorite-fonts.jpg', title:'Favorite fonts, part three', creator:'type.found', collection:'Design', annotation:'Look up these font forms', savedAt:'2026-07-18', type:'reel', designed:true },
  { id:13, photo:'/thumbnails/new-york-day.jpg', title:'Everything I bought in New York', creator:'city.receipts', collection:'Travel', annotation:'Fun title system', savedAt:'2026-07-12', type:'reel', designed:true },
  { id:14, photo:'/thumbnails/april-new-york.jpg', title:'April in New York City', creator:'city.months', collection:'Travel', annotation:'Spring trip mood', savedAt:'2026-07-04', type:'reel', designed:true },
  { id:15, photo:'/thumbnails/quite-evening.jpg', title:'Quite evening', creator:'little.walks', collection:'Travel', annotation:'Pink doodle style', savedAt:'2026-06-27', type:'reel', designed:true },
  { id:16, photo:'/thumbnails/night-cafe.jpg', title:'Slowly meet life in a warm place', creator:'after.dark.city', collection:'Travel', annotation:'Night café atmosphere', savedAt:'2026-06-21', type:'post', designed:true },
  { id:17, photo:'/thumbnails/japan-iphone.jpg', title:'Japan shot on iPhone', creator:'maciej.photos', collection:'Travel', annotation:'Strong type over street photography', savedAt:'2026-06-13', type:'reel', designed:true },
  { id:18, photo:'/thumbnails/cant-beat-ai.jpg', title:'I can’t beat AI', creator:'design.after.work', collection:'Design', annotation:'Save for AI notes', savedAt:'2026-06-05', type:'reel', designed:true },
  { id:19, photo:'/thumbnails/performance-film.jpg', title:'A film about turning life into performance', creator:'cinema.index', collection:'Design', annotation:'Watch later', savedAt:'2026-05-28', type:'post', designed:true },
  { id:20, photo:'/thumbnails/no-solution.jpg', title:'There won’t always be a solution', creator:'twentyfour.lessons', collection:'Design', annotation:'Needed this today', savedAt:'2026-05-19', type:'reel', designed:true },
  { id:21, photo:'/thumbnails/welcome-world.jpg', title:'Welcome to my world', creator:'ordinary.moments', collection:'Design', annotation:'Personal diary layout', savedAt:'2026-05-10', type:'post', designed:true },
  { id:22, photo:'/thumbnails/nyc-doodle.jpg', title:'New York in blue lines', creator:'window.seat', collection:'Travel', annotation:'Try drawing over photos', savedAt:'2026-05-02', type:'post', designed:true },
  { id:23, photo:'/thumbnails/tree-doodle.jpg', title:'Trees in highlighter', creator:'drawn.outside', collection:'Design', annotation:'Love the loose tracing', savedAt:'2026-04-23', type:'post', designed:true },
  { id:24, photo:'/thumbnails/skyline-doodle.jpg', title:'A sky full of sketches', creator:'city.daydreams', collection:'Travel', annotation:'Great mixed-media treatment', savedAt:'2026-04-14', type:'post', designed:true },
  { id:25, photo:'/thumbnails/tigertail.jpg', title:'Tigertail', creator:'film.poster.club', collection:'Design', annotation:'Film-poster reference', savedAt:'2026-04-04', type:'post', designed:true },
  { id:26, photo:'/thumbnails/monday-club.jpg', title:'Why Monday to Saturday Club?', creator:'monday.saturday', collection:'Design', annotation:'Beautiful motion-in-a-still', savedAt:'2026-03-25', type:'reel', designed:true },
  { id:27, photo:'/thumbnails/admiring.jpg', title:'Admiring', creator:'seen.and.repeated', collection:'Design', annotation:'Fantastic color separation', savedAt:'2026-03-15', type:'post', designed:true },
  { id:28, photo:'/thumbnails/unsure.jpg', title:'Unsure? So are we.', creator:'open.questions', collection:'Design', annotation:'Save for the uncertainty folder', savedAt:'2026-03-05', type:'reel', designed:true },
  { id:29, photo:'/thumbnails/arcadia-bay.jpg', title:'Greetings from Arcadia Bay', creator:'postcard.archive', collection:'Travel', annotation:'Vintage postcard direction', savedAt:'2026-02-23', type:'post', designed:true, fit:'contain' },
  { id:30, photo:'photo-1524758631624-e2822e304c36', title:'A better creative desk setup', creator:'makers.at.work', collection:'Job', annotation:'Monitor height looks right', savedAt:'2026-02-13', type:'post' },
  { id:31, photo:'photo-1600566753086-00f18fb6b3ea', title:'Material choices that age well', creator:'interior.materials', collection:'Design', annotation:'Oak and stone reference', savedAt:'2026-02-03', type:'reel' },
  { id:32, photo:'photo-1517836357463-d25dfeac3438', title:'A simple full-body session', creator:'form.first', collection:'Health', annotation:'Save for hotel gym', savedAt:'2026-01-24', type:'post' },
  { id:33, photo:'photo-1530789253388-582c481c54b0', title:'A city break with no checklist', creator:'open.weekend', collection:'Travel', annotation:'Book one great dinner only', savedAt:'2026-01-14', type:'reel' },
  { id:34, photo:'photo-1512621776951-a57141f2eefd', title:'The salad formula worth memorizing', creator:'plant.forward', collection:'Recipes', annotation:'Add crispy chickpeas', savedAt:'2026-01-04', type:'post' },
  { id:35, photo:'photo-1524995997946-a1c2e315a42f', title:'Beautiful books that earn the space', creator:'shelf.life', collection:'Books', annotation:'Look up the architecture title', savedAt:'2025-12-22', type:'post' },
  { id:36, photo:'photo-1551836022-d5d88e9218df', title:'Presenting work with less theatre', creator:'work.in.progress', collection:'Job', annotation:'Strong opening structure', savedAt:'2025-12-09', type:'reel' },
  { id:37, photo:'photo-1487958449943-2429e8be8625', title:'The house with the perfect windows', creator:'architecture.daily', collection:'Design', annotation:'Facade reference', savedAt:'2025-11-25', type:'post' },
  { id:38, photo:'photo-1545205597-3d9d02c29597', title:'Mobility for people who sit all day', creator:'body.manual', collection:'Health', annotation:'Do after long meetings', savedAt:'2025-11-11', type:'reel' },
  { id:39, photo:'photo-1500530855697-b586d89ba3ee', title:'A cabin with nowhere else to be', creator:'north.bound', collection:'Travel', annotation:'Winter birthday idea', savedAt:'2025-10-28', type:'post' },
  { id:40, photo:'photo-1473093295043-cdd812d0e601', title:'Pasta night, better sauce', creator:'al.dente.club', collection:'Recipes', annotation:'Keep pasta water', savedAt:'2025-10-14', type:'reel' },
  { id:41, photo:'photo-1516979187457-637abb4f9353', title:'The stack on every designer’s desk', creator:'object.library', collection:'Books', annotation:'Find the typography book', savedAt:'2025-09-30', type:'reel' },
  { id:42, photo:'photo-1497366811353-6870744d04b2', title:'What a flexible office gets right', creator:'future.of.work', collection:'Job', annotation:'Share with facilities', savedAt:'2025-09-16', type:'post' },
  { id:43, photo:'photo-1513364776144-60967b0f800f', title:'Making a color story by hand', creator:'process.archive', collection:'Design', annotation:'Workshop idea', savedAt:'2025-08-30', type:'reel' },
  { id:44, photo:'photo-1535914254981-b5012eebbd15', title:'The quiet ritual after a long week', creator:'wellness.without.rules', collection:'Health', annotation:'Saturday reset', savedAt:'2025-08-13', type:'post' },
  { id:45, photo:'photo-1500534623283-312aade485b7', title:'Morning above the tree line', creator:'trail.weather', collection:'Travel', annotation:'Pack the small camera', savedAt:'2025-07-27', type:'reel' },
  { id:46, photo:'photo-1546549032-9571cd6b27df', title:'The lemon pasta in fifteen minutes', creator:'small.plates', collection:'Recipes', annotation:'Weeknight keeper', savedAt:'2025-07-10', type:'post' },
  { id:47, photo:'photo-1455390582262-044cdead277a', title:'Notes from a better reading habit', creator:'pencil.margin', collection:'Books', annotation:'Try the one-line summary', savedAt:'2025-06-23', type:'reel' },
  { id:48, photo:'photo-1497215728101-856f4ea42174', title:'The creative team operating manual', creator:'good.work.place', collection:'Job', annotation:'Onboarding reference', savedAt:'2025-06-06', type:'post' },
  { id:49, photo:'photo-1494438639946-1ebd1d20bf85', title:'A room built around one great chair', creator:'considered.spaces', collection:'Design', annotation:'Love this composition', savedAt:'2025-05-19', type:'post' },
  { id:50, photo:'photo-1502904550040-7534597429ae', title:'The swim that fixes the afternoon', creator:'water.practice', collection:'Health', annotation:'Find an outdoor pool', savedAt:'2025-04-30', type:'reel' },
  { id:51, photo:'photo-1503220317375-aaad61436b1b', title:'One backpack, one open week', creator:'carry.less', collection:'Travel', annotation:'Packing list idea', savedAt:'2025-04-11', type:'post' },
  { id:52, photo:'photo-1551183053-bf91a1d81141', title:'A bowl of comfort with real texture', creator:'kitchen.diary', collection:'Recipes', annotation:'Cold-weather dinner', savedAt:'2025-03-18', type:'reel' },
  { id:53, photo:'photo-1496104679561-38d3af73f9b0', title:'The bookshop at the end of the street', creator:'local.reader', collection:'Books', annotation:'Visit next time', savedAt:'2025-02-14', type:'post' },
  { id:54, photo:'photo-1522071820081-009f0129c71c', title:'The meeting that should have been async', creator:'modern.teams', collection:'Job', annotation:'Share with the product team', savedAt:'2024-12-17', type:'reel' },
  { id:55, photo:'/thumbnails/wolf-brothers.jpg', title:'Wolf Brothers, Life is Strange 2', creator:'illustrated.frames', collection:'Art', annotation:'The gradient and linework are beautiful', savedAt:'2026-09-04', type:'post', designed:true },
  { id:56, photo:'/thumbnails/superwole.jpg', title:'Superwole saves the day', creator:'indie.comics.club', collection:'Art', annotation:'Great hand-drawn cover energy', savedAt:'2026-09-02', type:'post', designed:true },
  { id:57, photo:'/thumbnails/hawt-dawg-man.jpg', title:'Hawt Dawg Man', creator:'weird.comics', collection:'Art', annotation:'The character design is perfect', savedAt:'2026-08-31', type:'reel', designed:true },
  { id:58, photo:'/thumbnails/scott-pilgrim.jpg', title:'Scott Pilgrim takes off', creator:'print.and.panel', collection:'Art', annotation:'Love the risograph texture', savedAt:'2026-08-28', type:'post', designed:true },
  { id:59, photo:'/thumbnails/adventure-time.jpg', title:'Adventure Time', creator:'comic.cover.archive', collection:'Art', annotation:'Chaotic color done well', savedAt:'2026-08-25', type:'post', designed:true },
  { id:60, photo:'/thumbnails/spiderman-2.jpg', title:'Spider-Man 2', creator:'poster.rescan', collection:'Art', annotation:'Fantastic grainy poster treatment', savedAt:'2026-08-21', type:'reel', designed:true },
  { id:61, photo:'/thumbnails/batman-truth.jpg', title:'The Batman, unmask the truth', creator:'oribisk.archive', collection:'Art', annotation:'Save the paint-over technique', savedAt:'2026-08-16', type:'post', designed:true },
  { id:62, photo:'/thumbnails/spiderman-red.jpg', title:'Spider-Man in red', creator:'ink.and.web', collection:'Art', annotation:'The sprayed texture is incredible', savedAt:'2026-09-04', type:'post', designed:true },
  { id:63, photo:'/thumbnails/regular-show.jpg', title:'Regular Show after dark', creator:'animated.archive', collection:'Art', annotation:'Beautiful limited blue palette', savedAt:'2026-09-03', type:'post', designed:true },
  { id:64, photo:'/thumbnails/death-card.jpg', title:'Adventure Time: Death', creator:'tarot.toons', collection:'Art', annotation:'Save the tarot-card framing', savedAt:'2026-09-01', type:'post', designed:true },
  { id:65, photo:'/thumbnails/bea-bee.jpg', title:'Bea, ba, doo, bee', creator:'gig.poster.club', collection:'Art', annotation:'Pink cutout treatment', savedAt:'2026-08-30', type:'reel', designed:true },
  { id:66, photo:'/thumbnails/scott-pilgrim-bass.jpg', title:'Scott Pilgrim vs. the world', creator:'bass.battle', collection:'Art', annotation:'Great burst composition', savedAt:'2026-08-27', type:'post', designed:true },
  { id:67, photo:'/thumbnails/scott-pilgrim-world.jpg', title:'An epic of epic epicness', creator:'seven.evil.exes', collection:'Art', annotation:'The rainbow character split works', savedAt:'2026-08-24', type:'post', designed:true },
  { id:68, photo:'/thumbnails/trick-dog.jpg', title:'Trick', creator:'odd.frames', collection:'Art', annotation:'Candid image plus blunt typography', savedAt:'2026-08-20', type:'reel', designed:true },
  { id:69, photo:'/thumbnails/nuclear-kittens.jpg', title:'Nuclear war is bad for kittens', creator:'small.poster', collection:'Art', annotation:'Simple message, perfect scale', savedAt:'2026-08-15', type:'post', designed:true },
  { id:70, photo:'/thumbnails/michael-believes.jpg', title:'Remember that Michael Scott believes in you', creator:'office.prints', collection:'Art', annotation:'Funny motivational poster', savedAt:'2026-08-09', type:'reel', designed:true },
  { id:71, photo:'/thumbnails/dead-poets.jpg', title:'Dead Poets Society', creator:'cinema.type', collection:'Art', annotation:'Love the condensed type system', savedAt:'2026-08-03', type:'post', designed:true },
  { id:72, photo:'/thumbnails/thats-what-she-said.jpg', title:'That’s what she said', creator:'dunder.doodles', collection:'Art', annotation:'Playful crayon art direction', savedAt:'2026-07-27', type:'post', designed:true },
  { id:73, photo:'/thumbnails/work-life-balance.jpg', title:'Work life balance', creator:'paper.office', collection:'Art', annotation:'Blue cutout on notebook paper', savedAt:'2026-07-19', type:'reel', designed:true },
  { id:74, photo:'/thumbnails/national-geographic.jpg', title:'National Geographic, June 1971', creator:'magazine.archive', collection:'Art', annotation:'Classic editorial cover reference', savedAt:'2026-07-11', type:'post', designed:true },
  { id:75, photo:'/thumbnails/redwood-giants.jpg', title:'The greatest giants of our time', creator:'california.fieldnotes', collection:'Travel', annotation:'Redwoods route inspiration', savedAt:'2026-09-02', type:'post', designed:true },
  { id:76, photo:'/thumbnails/healthy-habits.jpg', title:'Healthy habits for creatives', creator:'process.practice', collection:'Health', annotation:'', savedAt:'2026-09-04', type:'post', designed:true, initiallySaved:false },
  { id:77, photo:'/thumbnails/tree-memories.jpg', title:'A tree full of memories', creator:'ordinary.collector', collection:'Design', annotation:'', savedAt:'2026-09-04', type:'post', designed:true, initiallySaved:false },
  { id:78, photo:'/thumbnails/romania-highlights.jpg', title:'Romania, my highlights', creator:'analog.roamer', collection:'Travel', annotation:'', savedAt:'2026-09-04', type:'post', designed:true, initiallySaved:false },
  { id:79, photo:'/thumbnails/new-york-blue.jpg', title:'New York in blue', creator:'street.frame', collection:'Travel', annotation:'', savedAt:'2026-09-04', type:'post', designed:true, initiallySaved:false },
];
const DEFAULT_FEED_IDS = [76,55,77,1,78,62,79,2,63,75,3,56,64,4,65,5];
const profilePosts = [
  {id:201,photo:'/thumbnails/profile-canopy.jpg',title:'Looking up',creator:'averageinstauser',collection:'Travel',annotation:'',savedAt:'2026-09-04',type:'post',designed:true,initiallySaved:false},
  {id:202,photo:'/thumbnails/profile-mountain-friends.jpg',title:'So much love for this bunch',creator:'averageinstauser',collection:'Travel',annotation:'',savedAt:'2026-08-28',type:'post',designed:true,initiallySaved:false},
  {id:203,photo:'/thumbnails/profile-music-today.jpg',title:'Music for today',creator:'averageinstauser',collection:'Travel',annotation:'',savedAt:'2026-08-21',type:'post',designed:true,initiallySaved:false},
  {id:204,photo:'/thumbnails/profile-garden-cat.jpg',title:'Garden friend',creator:'averageinstauser',collection:'Travel',annotation:'',savedAt:'2026-08-14',type:'post',designed:true,initiallySaved:false},
];
const catalogItems = [...items,...profilePosts];
const DAY = 86_400_000;
const RANGE_START = new Date('2024-12-17T12:00:00');
const TOTAL_DAYS = Math.round((NOW-RANGE_START)/DAY);
const dateAtOffset = offset => new Date(RANGE_START.getTime()+(offset*DAY));
const formatRangeDate = offset => dateAtOffset(offset).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
const rangeLabel = ([from,to]) => from===0&&to===TOTAL_DAYS ? 'Any time' : `${formatRangeDate(from)} – ${formatRangeDate(to)}`;

const idsForCollection=name=>items.filter(item=>item.collection===name&&item.initiallySaved!==false).map(item=>item.id);
const initialCollections = [
  { name:'Design', count:31, color:'#ffb5a7', ids:idsForCollection('Design'), private:true },
  { name:'Travel', count:85, color:'#a9c8ff', ids:idsForCollection('Travel'), private:true },
  { name:'Art', count:20, color:'#8e67d4', ids:idsForCollection('Art'), shared:true, people:'You, Alex + 2' },
  { name:'Health', count:212, color:'#b7e4c7', ids:idsForCollection('Health'), shared:true, people:'You, Alex + 1' },
  { name:'Books', count:46, color:'#f6d885', ids:idsForCollection('Books'), private:true },
  { name:'Job', count:31, color:'#cdb4db', ids:idsForCollection('Job'), private:true },
  { name:'Recipes', count:67, color:'#9ed8db', ids:idsForCollection('Recipes'), private:true },
];

function filterAndSort(data, sort, dateRange) {
  let result=[...data];
  const from=dateAtOffset(dateRange[0]), to=dateAtOffset(dateRange[1]);
  from.setHours(0,0,0,0); to.setHours(23,59,59,999);
  result=result.filter(item=>{const saved=new Date(`${item.savedAt}T12:00:00`);return saved>=from&&saved<=to});
  return result.sort((a,b)=>(new Date(b.savedAt)-new Date(a.savedAt))*(sort==='Latest'?1:-1));
}

function Avatar({ n=0,owner=false }) { return <img className="avatar" src={owner?PROFILE_AVATAR:avatarImg(avatarPhotos[n%avatarPhotos.length])} alt="" width="120" height="120" loading="lazy" decoding="async"/>; }
function IconButton({ children,onClick,label,active=false,plain=false }) { return <button aria-label={label} onClick={onClick} className={`icon-button ${plain?'plain':''} ${active?'active':''}`}>{children}</button>; }

function FilterLinesIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M5 7h14M8 12h8M10.5 17h3" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round"/>
  </svg>;
}

function BottomNav({tab,setTab}) {
  return <nav className="bottom-nav">
    <button aria-label="Home" className={tab==='home'?'selected':''} onClick={()=>setTab('home')}><Home fill={tab==='home'?'currentColor':'none'}/></button>
    <button aria-label="Reels"><Clapperboard/></button>
    <button aria-label="Messages"><Send/><i/></button>
    <button aria-label="Search" className={tab==='explore'?'selected':''} onClick={()=>setTab('explore')}><Search/></button>
    <button aria-label="Profile" className={tab==='profile'?'selected':''} onClick={()=>setTab('profile')}><Avatar owner/></button>
  </nav>;
}

function TopBar({title,onBack,onFilter,filterActive=false,menu=false,onMenu,onCreate}) {
  return <header className="topbar">
    <IconButton label="Back" onClick={onBack}><ArrowLeft/></IconButton><h1>{title}</h1>
    <div className="top-actions">{onFilter&&<IconButton label="Filter" active={filterActive} onClick={onFilter}><FilterLinesIcon/>{filterActive&&<i className="active-dot"/>}</IconButton>}{menu?<IconButton label="Options" onClick={onMenu}><MoreHorizontal/></IconButton>:onCreate&&<IconButton label="New collection" onClick={onCreate}><Plus/></IconButton>}</div>
  </header>;
}

function SearchBox({value,onChange,placeholder='Search with AI, titles, or your notes'}) {
  return <label className="search-box"><Search/><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>{value&&<button aria-label="Clear search" onClick={()=>onChange('')}><X/></button>}</label>;
}

function Feed({collections,savedIds,onSave,enhanced}) {
  const [feedMenu,setFeedMenu]=useState(false), [feed,setFeed]=useState('Following'), [liked,setLiked]=useState({});
  useEffect(()=>{
    if(!enhanced){
      setFeed('Following');
      setFeedMenu(false);
    }
  },[enhanced]);
  const activeCollection=enhanced?collections.find(c=>c.name===feed):undefined;
  const feedItems=(activeCollection
    ? activeCollection.ids.map(id=>items.find(x=>x.id===id)).filter(Boolean)
    : DEFAULT_FEED_IDS.map(id=>items.find(x=>x.id===id)).filter(Boolean)
  ).slice(0,16);
  return <div className="screen feed-screen">
    <header className="feed-header"><IconButton plain label="Create"><Plus/></IconButton><button className="wordmark" onClick={()=>setFeedMenu(v=>!v)}>Instagram <ChevronDown/></button><IconButton plain label="Activity"><Heart/></IconButton></header>
    {feedMenu&&<div className="feed-menu popover"><button onClick={()=>{setFeed('Following');setFeedMenu(false)}}><UsersRound/>Following</button><button><Sparkles/>Favorites</button>{enhanced&&<><div className="feed-menu-label"><Bookmark/>Collections</div>{collections.slice(0,4).map(c=><button className="nested" key={c.name} onClick={()=>{setFeed(c.name);setFeedMenu(false)}}>{c.name}{feed===c.name&&<Check/>}</button>)}</>}</div>}
    <div className="stories">{[0,1,2,3,4].map(n=><div key={n}><div className="story-ring"><Avatar n={n} owner={n===0}/></div><span>{n===0?'Your story':['anna','studio','alex','roam'][n-1]}</span></div>)}</div>
    {activeCollection&&<div className="collection-feed-tag"><Sparkles/>{feed} collection feed</div>}
    {feedItems.map((item,index)=>{
      const isLiked=!!liked[item.id], isSaved=savedIds.has(item.id);
      return <article className="post" key={item.id}><div className="post-author"><Avatar n={item.id}/><div><b>{item.creator}</b><span>{activeCollection?`${activeCollection.name} collection`:`Suggested for you · ${item.collection}`}</span></div><MoreHorizontal/></div><div className="post-image"><img className={item.fit==='contain'?'contain':''} src={mediaSrc(item.photo,900)} alt={item.title} width="480" height="480" loading={index<2?'eager':'lazy'} decoding="async"/></div>
        <div className="post-actions"><button aria-label={isLiked?'Unlike':'Like'} onClick={()=>setLiked(current=>({...current,[item.id]:!current[item.id]}))} className={isLiked?'liked':''}><Heart fill={isLiked?'currentColor':'none'}/><b>{isLiked?'12.9K':'12.8K'}</b></button><button aria-label="Comment"><MessageCircle/><b>384</b></button><button aria-label="Share"><Send/></button><button aria-label="Save to collection" className={`save-action ${isSaved?'saved':''}`} onClick={()=>onSave(item)}>{isSaved?<BookmarkCheck/>:<Bookmark/>}</button></div>
        <p className="caption"><b>{item.creator}</b> {item.title}. A small idea worth keeping close. <button>more</button></p><p className="post-date">{index<2?'2 days ago':`${index+2} days ago`}</p>
      </article>;
    })}
  </div>;
}

function CollectionCard({collection,onClick,expanded=false,unread=0}) {
  const shots=collection.ids.slice(0,4).map(id=>catalogItems.find(x=>x.id===id)).filter(Boolean);
  return <button className={`collection-card ${expanded?'expanded':''}`} onClick={onClick}><div className="collection-cover" style={{background:collection.color}}>{(expanded?shots:shots.slice(0,1)).map((shot,i)=><img key={shot.id} src={mediaSrc(shot.photo,expanded?360:250)} alt="" width="480" height="480" loading="lazy" decoding="async" style={expanded?{gridArea:`p${i+1}`}:{}}/>)}{collection.shared&&unread>0&&<span className="collection-unread" aria-label={`${unread} unread updates`}>{unread>9?'9+':unread}</span>}</div><span className="collection-copy"><b>{collection.name}</b><small>{collection.shared?<><UsersRound/>{unread>0?<span className="unread-copy">{unread} new</span>:collection.people}</>:<><LockKeyhole/>Private</>}</small></span></button>;
}

const LONG_PRESS_MS = 500;
const LONG_PRESS_MOVE_TOLERANCE = 12;

function SaveTile({item,onOpen,onOptions,shared,reaction,collectionName}) {
  const [holding,setHolding]=useState(false);
  const holdTimer=useRef(null), startPoint=useRef(null), didLongPress=useRef(false);

  const cancelHold=()=>{
    window.clearTimeout(holdTimer.current);
    holdTimer.current=null;
    startPoint.current=null;
    setHolding(false);
  };

  useEffect(()=>()=>window.clearTimeout(holdTimer.current),[]);

  const startHold=e=>{
    if(!onOptions||!e.isPrimary||e.button!==0)return;
    didLongPress.current=false;
    startPoint.current={x:e.clientX,y:e.clientY};
    setHolding(true);
    holdTimer.current=window.setTimeout(()=>{
      holdTimer.current=null;
      startPoint.current=null;
      didLongPress.current=true;
      setHolding(false);
      navigator.vibrate?.(10);
      onOptions(item,collectionName);
    },LONG_PRESS_MS);
  };

  const trackHold=e=>{
    if(!startPoint.current)return;
    const distance=Math.hypot(e.clientX-startPoint.current.x,e.clientY-startPoint.current.y);
    if(distance>LONG_PRESS_MOVE_TOLERANCE)cancelHold();
  };

  const openItem=e=>{
    if(didLongPress.current){
      e.preventDefault();
      didLongPress.current=false;
      return;
    }
    onOpen(item);
  };

  const openOptionsMenu=e=>{
    if(!onOptions)return;
    e.preventDefault();
    cancelHold();
    didLongPress.current=true;
    onOptions(item,collectionName);
  };

  const handleKeyDown=e=>{
    if(onOptions&&(e.key==='ContextMenu'||(e.shiftKey&&e.key==='F10')))openOptionsMenu(e);
  };

  const showCoverCopy=item.type==='reel'&&!item.designed&&item.id%4!==0;

  return <div className={`save-tile ${holding?'is-holding':''} ${shared?'is-shared':''}`}>
    <button
      className="tile-main"
      aria-label={onOptions?`${item.title}. Tap to open; press and hold for actions`:`Open ${item.title}`}
      aria-haspopup={onOptions?'dialog':undefined}
      aria-keyshortcuts={onOptions?'Shift+F10':undefined}
      onClick={openItem}
      onContextMenu={openOptionsMenu}
      onKeyDown={handleKeyDown}
      onPointerDown={startHold}
      onPointerMove={trackHold}
      onPointerUp={cancelHold}
      onPointerCancel={cancelHold}
      onPointerLeave={cancelHold}
    ><img className={item.fit==='contain'?'contain':''} src={mediaSrc(item.photo,420)} alt={item.title} width="480" height="480" draggable="false" loading="lazy" decoding="async"/></button>
    {onOptions&&<span className="hold-feedback" aria-hidden="true"><span/></span>}
    {showCoverCopy&&<span className={`reel-cover-copy cover-${item.id%4}`}>{item.title}</span>}
    <span className="media-type">{item.type==='reel'?<Play fill="white"/>:<Copy/>}</span>
    {shared&&reaction&&<span className="reaction-badge"><Avatar owner/>{reaction}</span>}
  </div>;
}

function SaveGrid({data,onOpen,onOptions,shared=false,reactions={},collectionName}) {
  return <div className="save-grid">{data.map(item=>{
    const reaction=reactions[`${collectionName}:${item.id}`];
    return <SaveTile key={item.id} item={item} onOpen={onOpen} onOptions={onOptions} shared={shared} reaction={reaction} collectionName={collectionName}/>;
  })}</div>;
}

function FilterMenu({sort,setSort,dateRange,setDateRange,close}) {
  const [from,to]=dateRange, startPercent=(from/TOTAL_DAYS)*100, endPercent=(to/TOTAL_DAYS)*100;
  return <div className="filter-menu popover"><small>SORT SAVES</small>{['Latest','Oldest'].map(x=><button key={x} onClick={()=>setSort(x)}><span>{x} first</span>{sort===x&&<Check/>}</button>)}<small>TIME RANGE</small><div className="custom-range"><div className="range-values"><span><small>FROM</small><b>{formatRangeDate(from)}</b></span><span><small>TO</small><b>{formatRangeDate(to)}</b></span></div><div className="dual-range" style={{'--range-start':`${startPercent}%`,'--range-end':`${endPercent}%`}}><div className="range-track"/><div className="range-fill"/><input aria-label="Start date" type="range" min="0" max={TOTAL_DAYS} value={from} onChange={e=>setDateRange([Math.min(Number(e.target.value),to-1),to])}/><input aria-label="End date" type="range" min="0" max={TOTAL_DAYS} value={to} onChange={e=>setDateRange([from,Math.max(Number(e.target.value),from+1)])}/></div><button className="range-reset" onClick={()=>setDateRange([0,TOTAL_DAYS])}>Reset to any time</button></div><button className="filter-done" onClick={close}>Done</button></div>;
}

function Saved({collections,savedIds,annotations,unreadCollections,onBack,openCollection,onOpen,onOptions,onCreate,enhanced}) {
  const [tab,setTab]=useState('All'), [query,setQuery]=useState(''), [filters,setFilters]=useState(false), [sort,setSort]=useState('Latest'), [dateRange,setDateRange]=useState([0,TOTAL_DAYS]);
  useEffect(()=>{
    if(!enhanced){
      setTab('All');
      setQuery('');
      setFilters(false);
      setSort('Latest');
      setDateRange([0,TOTAL_DAYS]);
    }
  },[enhanced]);
  const searchingCollections=tab==='Collections';
  const searched=catalogItems.filter(x=>savedIds.has(x.id)&&(!enhanced||searchingCollections||`${x.title} ${x.creator} ${x.collection} ${annotations[x.id]||''}`.toLowerCase().includes(query.toLowerCase())));
  const typed=tab==='Reels'?searched.filter(x=>x.type==='reel'):tab==='Posts'?searched.filter(x=>x.type==='post'):searched;
  const shown=filterAndSort(typed,sort,dateRange), filterActive=sort!=='Latest'||dateRange[0]!==0||dateRange[1]!==TOTAL_DAYS;
  const showCollections=tab==='Collections'||(tab==='All'&&(!enhanced||!query));
  const expandedCollections=tab==='Collections';
  const displayedCollections=(expandedCollections?collections:collections.slice(0,4)).filter(c=>!searchingCollections||c.name.toLowerCase().includes(query.toLowerCase()));
  return <div className={`screen scroll-screen saved-screen ${enhanced?'is-enhanced':'is-instagram'}`}><TopBar title="Saved" onBack={onBack} onFilter={enhanced?()=>setFilters(v=>!v):undefined} filterActive={filterActive} onCreate={onCreate}/>{enhanced&&filters&&<FilterMenu sort={sort} setSort={setSort} dateRange={dateRange} setDateRange={setDateRange} close={()=>setFilters(false)}/>}<div className="tabs">{['All','Collections','Series','Reels','Posts'].map(t=><button key={t} className={tab===t?'active':''} onClick={()=>{setTab(t);setQuery('')}}>{t}</button>)}</div><main className="page-content">{enhanced&&<><SearchBox value={query} onChange={setQuery} placeholder={searchingCollections?'Search collections':'Search with AI, titles, or your notes'}/>{query&&!searchingCollections&&<div className="ai-result"><Sparkles/><span><b>AI search</b> found {shown.length} saves across captions and your annotations</span></div>}</>}
    {showCollections&&<section className={expandedCollections?'collections-full':''}><div className="section-heading"><h2>{searchingCollections&&query?`Collections matching “${query}”`:'Collections'}</h2>{tab==='All'&&<button onClick={()=>{setTab('Collections');setQuery('')}}>See all</button>}</div>{displayedCollections.length?<div className={`collection-grid ${expandedCollections?'expanded':''}`}>{displayedCollections.map(c=><CollectionCard collection={c} expanded={expandedCollections} unread={enhanced?(unreadCollections[c.name]||0):0} key={c.name} onClick={()=>openCollection(c.name)}/>)}</div>:<EmptyCollections/>}</section>}
    {tab!=='Collections'&&<section><div className="section-heading"><h2>{enhanced&&query?`Results for “${query}”`:'Reels and posts'}</h2><span>{shown.length} · {sort}{filterActive?` · ${rangeLabel(dateRange)}`:''}</span></div>{shown.length?<SaveGrid data={shown} onOpen={item=>onOpen(item,null)} onOptions={enhanced?onOptions:undefined}/>:<EmptySearch/>}</section>}
  </main></div>;
}

function Collection({collection,annotations,pinned,reactions,onBack,onOpen,onOptions,enhanced}) {
  const [query,setQuery]=useState(''), [filters,setFilters]=useState(false), [sort,setSort]=useState('Latest'), [dateRange,setDateRange]=useState([0,TOTAL_DAYS]);
  useEffect(()=>{
    if(!enhanced){
      setQuery('');
      setFilters(false);
      setSort('Latest');
      setDateRange([0,TOTAL_DAYS]);
    }
  },[enhanced]);
  const all=catalogItems.filter(x=>collection.ids.includes(x.id)&&(!enhanced||`${x.title} ${annotations[x.id]||''}`.toLowerCase().includes(query.toLowerCase())));
  const data=filterAndSort(all,sort,dateRange), pinnedIds=enhanced?(pinned[collection.name]||[]):[], pinnedItems=data.filter(x=>pinnedIds.includes(x.id)), rest=data.filter(x=>!pinnedIds.includes(x.id));
  const filterActive=sort!=='Latest'||dateRange[0]!==0||dateRange[1]!==TOTAL_DAYS;
  const gridProps={onOpen:item=>onOpen(item,collection.name),onOptions:enhanced?onOptions:undefined,shared:enhanced&&!!collection.shared,reactions:enhanced?reactions:{},collectionName:collection.name};
  return <div className={`screen scroll-screen collection-screen ${enhanced?'is-enhanced':'is-instagram'}`}><TopBar title={collection.name} onBack={onBack} onFilter={enhanced?()=>setFilters(v=>!v):undefined} filterActive={filterActive} menu onMenu={()=>{}}/>{enhanced&&filters&&<FilterMenu sort={sort} setSort={setSort} dateRange={dateRange} setDateRange={setDateRange} close={()=>setFilters(false)}/>}<main className="collection-page"><h2>{collection.name}</h2><p>{collection.count} saved posts</p>{collection.shared&&<button className="members"><div className="avatar-stack"><Avatar n={3}/><Avatar n={5}/></div><span><b>{collection.people}</b><small>Shared collection</small></span><ChevronRight/></button>}{enhanced&&<SearchBox value={query} onChange={setQuery}/>}
    {pinnedItems.length>0&&<section><div className="section-heading"><h2><Pin/>Pinned</h2><span>{pinnedItems.length}</span></div><SaveGrid data={pinnedItems} {...gridProps}/></section>}
    <section><div className="section-heading"><h2>{pinnedItems.length?'Your saves':'Saves'}</h2><span>{enhanced?`${rest.length} · ${sort}${filterActive?` · ${rangeLabel(dateRange)}`:''}`:`${rest.length} posts`}</span></div>{rest.length?<SaveGrid data={rest} {...gridProps}/>:<div className="filter-empty">No saves match this filter.</div>}</section>
    {enhanced&&<div className="pin-helper">Press and hold a save to pin, view or edit its annotation, or react</div>}</main></div>;
}

function PostView({item,onClose,onSave,isSaved}) {
  const [liked,setLiked]=useState(false);
  return <div className="post-view"><header className="post-view-header"><button aria-label="Back" onClick={onClose}><ArrowLeft/></button><h2>Post</h2><span/></header><div className="post-author"><Avatar n={item.id} owner={item.creator==='averageinstauser'}/><div><b>{item.creator}</b><span>Original post</span></div><MoreHorizontal/></div><div className="post-view-image"><img className={item.fit==='contain'?'contain':''} src={mediaSrc(item.photo,1000)} alt={item.title} width="480" height="480" loading="lazy" decoding="async"/></div><div className="post-actions"><button onClick={()=>setLiked(v=>!v)} className={liked?'liked':''}><Heart fill={liked?'currentColor':'none'}/></button><button><MessageCircle/></button><button><Send/></button><button aria-label="Save to collection" className={`save-action ${isSaved?'saved':''}`} onClick={()=>onSave(item)}>{isSaved?<BookmarkCheck/>:<Bookmark/>}</button></div><p className="post-view-likes"><b>{liked?'12,841':'12,840'} likes</b></p><p className="caption"><b>{item.creator}</b> {item.title}. A small idea worth keeping close.</p><button className="view-comments">View all 384 comments</button></div>;
}

function ItemOptionsSheet({item,collection,pinned,reaction,annotation,onTogglePin,onAnnotate,onReact,onClose}) {
  const [showReactions,setShowReactions]=useState(false), isPinned=collection?(pinned[collection.name]||[]).includes(item.id):false;
  return <div className="overlay" onClick={onClose}><div className="sheet item-options-sheet" onClick={e=>e.stopPropagation()}><div className="grabber"/><div className="option-post"><img src={mediaSrc(item.photo,150)} alt="" width="150" height="150" loading="lazy" decoding="async"/><span><b>{item.title}</b><small>{collection?collection.name:'All saves'}</small></span></div>
    {collection&&<button className="option-row" onClick={()=>{onTogglePin(collection.name,item.id);onClose()}}><Pin fill={isPinned?'currentColor':'none'}/><span><b>{isPinned?'Unpin save':'Pin save'}</b><small>{isPinned?'Remove from the pinned section':'Keep at the top of this collection'}</small></span></button>}
    <button className="option-row" onClick={()=>{onAnnotate(item);onClose()}}><MessageCircle/><span><b>{annotation?'View or edit annotation':'Add annotation'}</b><small>{annotation||'Private and searchable only by you'}</small></span></button>
    {collection?.shared&&<><button className="option-row" onClick={()=>setShowReactions(v=>!v)}><Heart/><span><b>React in shared collection</b><small>Visible to {collection.people}</small></span><ChevronRight/></button>{showReactions&&<div className="option-reactions">{['👀','🫶','🔥','😂','🏆'].map(emoji=><button key={emoji} className={reaction===emoji?'selected':''} onClick={()=>onReact(collection.name,item.id,emoji)}>{emoji}</button>)}</div>}</>}
  </div></div>;
}

function AnnotationSheet({item,value,onSave,onClose}) {
  const [note,setNote]=useState(value||'');
  return <div className="overlay" onClick={onClose}><div className="sheet annotation-sheet" onClick={e=>e.stopPropagation()}><div className="grabber"/><div className="annotation-heading"><div className="annotation-preview"><img src={mediaSrc(item.photo,150)} alt="" width="150" height="150" loading="lazy" decoding="async"/><MessageCircle/></div><div><h2>{value?'Edit annotation':'Add annotation'}</h2><p>Only you can see and search this note</p></div><button aria-label="Close" onClick={onClose}><X/></button></div><textarea autoFocus value={note} onChange={e=>setNote(e.target.value)} placeholder="What do you want to remember?"/><div className="annotation-actions"><button className="remove-note" onClick={()=>onSave('')}>Remove</button><button className="save-note" onClick={()=>onSave(note)} disabled={!note.trim()}>Save annotation</button></div></div></div>;
}

function SaveSheet({item,collections,isSaved,onToggleSaved,onToggle,onNew,onClose,enhanced}) {
  return <div className="overlay" onClick={onClose}><div className="sheet save-sheet" onClick={e=>e.stopPropagation()}><div className="grabber"/><div className="sheet-title"><div><h2>Save to collection</h2><p>Changes are saved on this device</p></div><button aria-label="Close" onClick={onClose}><X/></button></div><button className="saved-row" onClick={()=>onToggleSaved(item)}><img src={mediaSrc(item.photo,140)} alt="" width="140" height="140" loading="lazy" decoding="async"/><span><b>{isSaved?'Saved':'Save'}</b><small>{isSaved?'In all saved posts':'Add to saved posts'}</small></span>{isSaved?<BookmarkCheck/>:<Bookmark/>}</button>{enhanced&&<><div className="sheet-section-title"><b>Suggested</b><Sparkles/>Powered by AI</div><CollectionRow collection={collections.find(c=>c.name===item.collection)} item={item} ai subtitle="Best match" onToggle={onToggle}/><CollectionRow collection={collections.find(c=>c.name==='Weekend inspiration')||{name:'Weekend inspiration',color:'#8aa6ff',ids:[]}} item={item} ai subtitle="Suggested new collection" onToggle={onToggle}/></>}<div className="sheet-section-title"><b>Your collections</b><button onClick={()=>onNew(item)}><Plus/>New</button></div>{collections.slice(0,4).map(c=><CollectionRow key={c.name} collection={c} item={item} onToggle={onToggle}/>)}</div></div>;
}
function CollectionRow({collection,item,subtitle,onToggle,ai=false}) {
  const added=collection.ids.includes(item.id);
  const coverItem=catalogItems.find(candidate=>candidate.id===collection.ids[0])||(ai?item:null);
  return <button className="collection-row" onClick={()=>onToggle(collection,item)}><span className="mini-cover" style={{background:collection.color}}>{coverItem?<img src={mediaSrc(coverItem.photo,180)} alt="" width="180" height="180" loading="lazy" decoding="async"/>:<Bookmark/>}</span><span><b>{collection.name}</b><small>{subtitle||(collection.shared?'Shared collection':'Private')}</small></span>{added?<BookmarkCheck className="added"/>:<CirclePlus/>}</button>;
}

function NewCollectionSheet({item,onCreate,onClose}) { const [name,setName]=useState(''); return <div className="overlay" onClick={onClose}><form className="sheet new-collection-sheet" onSubmit={e=>{e.preventDefault();if(name.trim())onCreate(name.trim(),item)}} onClick={e=>e.stopPropagation()}><div className="grabber"/><div className="sheet-title"><div><h2>New collection</h2><p>{item?'This post will be added automatically':'Create an empty private collection'}</p></div><button type="button" aria-label="Close" onClick={onClose}><X/></button></div><label>Name<input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Collection name"/></label><button className="create-collection" disabled={!name.trim()}>Create</button></form></div>; }

function Explore({onOpen,annotations}) { const [query,setQuery]=useState(''); const shown=items.filter(x=>`${x.title} ${x.creator} ${x.collection}`.toLowerCase().includes(query.toLowerCase())); return <div className="screen scroll-screen explore-screen"><div className="explore-search"><SearchBox value={query} onChange={setQuery} placeholder="Search"/></div><SaveGrid data={shown.length?shown:items} onOpen={item=>onOpen(item,null)} annotations={annotations}/></div>; }

function Settings({onBack,openSaved}) { const [query,setQuery]=useState(''); const rows=[{label:'Saved',icon:<Bookmark/>,action:openSaved},{label:'Archive',icon:<Repeat2/>},{label:'Your activity',icon:<Clapperboard/>},{label:'Notifications',icon:<Bell/>},{label:'Time management',icon:<Clock3/>},{label:'Instagram for iPad',icon:<Smartphone/>}].filter(x=>x.label.toLowerCase().includes(query.toLowerCase())); return <div className="screen scroll-screen settings-screen"><header className="settings-header"><IconButton label="Back" onClick={onBack}><ArrowLeft/></IconButton><h1>Settings and activity</h1></header><main><SearchBox value={query} onChange={setQuery} placeholder="Search"/>{!query&&<><div className="settings-kicker"><b>Your account</b><span>∞ <b>Meta</b></span></div><button className="account-center"><UserRound/><span><b>Accounts Center</b><small>Password, security, personal details, ad preferences</small></span><ChevronRight/></button><p className="account-copy">Manage your connected experiences and account settings across Meta technologies. <span>Learn more</span></p></>}<section className="settings-section"><h2>How you use Instagram</h2>{rows.map(row=><button key={row.label} onClick={row.action}><span className="settings-icon">{row.icon}</span><b>{row.label}</b><ChevronRight/></button>)}</section><section className="settings-section"><h2>Your insights and tools</h2><button><span className="settings-icon"><Grid3X3/></span><b>Professional dashboard</b><ChevronRight/></button></section></main></div>; }

function Profile({onMenu,onOpen,openSaved,annotations}) { return <div className="screen scroll-screen profile-screen"><header className="profile-topbar"><button><Plus/></button><button className="profile-name">averageinstauser <ChevronDown/></button><div><button><AtSign/></button><button aria-label="Menu" onClick={onMenu}><Menu/></button></div></header><main><section className="profile-identity"><Avatar owner/><div><b>{profilePosts.length}</b><span>posts</span></div><div><b>1,284</b><span>followers</span></div><div><b>618</b><span>following</span></div></section><div className="profile-bio"><b>User</b><span className="profile-category">Product designer</span><span>Design, travel, and things worth remembering.</span><a><Link2/>averageinstauser.com</a></div><button className="banner-button"><Plus/>Add banners</button><button className="dashboard-card"><b>Professional dashboard</b><span>69 views in the last 30 days.</span></button><div className="profile-buttons"><button>Edit profile</button><button>Share profile</button></div><div className="highlights"><button><span><Plus/></span><b>New</b></button><button><span><img className="highlight-cover" src={mediaSrc('/thumbnails/profile-canopy.jpg')} alt="" width="480" height="480" loading="lazy" decoding="async"/></span><b>Design</b></button><button><span><img className="highlight-cover" src={mediaSrc('/thumbnails/profile-mountain-friends.jpg')} alt="" width="480" height="480" loading="lazy" decoding="async"/></span><b>Travel</b></button></div><div className="profile-tabs"><button className="active" aria-label="Posts"><Grid3X3/></button><button aria-label="Reels"><Clapperboard/></button><button aria-label="Reposts"><Repeat2/></button><button aria-label="Saved" onClick={openSaved}><Bookmark/></button><button aria-label="Tagged"><SquareUserRound/></button></div><SaveGrid data={profilePosts} onOpen={item=>onOpen(item,null)} annotations={annotations}/></main></div>; }
function EmptySearch(){return <div className="empty"><Search/><h3>No exact matches</h3><p>Try a concept, creator, collection, or something from your notes.</p></div>}
function EmptyCollections(){return <div className="empty collection-empty"><Search/><h3>No collections found</h3><p>Try searching for a different collection name.</p></div>}
function Toast({text}){return text?<div className="toast"><Check/>{text}</div>:null}

function App(){
  const [tab,setTab]=useState('home'), [settings,setSettings]=useState(false), [savedOrigin,setSavedOrigin]=useState('profile'), [collectionName,setCollectionName]=useState(null), [saving,setSaving]=useState(null), [postContext,setPostContext]=useState(null), [itemOptions,setItemOptions]=useState(null), [annotating,setAnnotating]=useState(null), [creatingFor,setCreatingFor]=useState(undefined), [toast,setToast]=useState('');
  const [collections,setCollections]=useState(initialCollections);
  const [savedIds,setSavedIds]=useState(()=>new Set(items.filter(item=>item.initiallySaved!==false).map(item=>item.id)));
  const [unreadCollections,setUnreadCollections]=useState({Health:3,Art:13});
  const [annotations,setAnnotations]=useState(()=>Object.fromEntries(catalogItems.map(x=>[x.id,x.annotation])));
  const [pinned,setPinned]=useState({Design:[2],Health:[32],Travel:[1],Books:[35],Job:[30],Art:[55]});
  const [reactions,setReactions]=useState({'Health:32':'🥹','Art:55':'🫶','Art:58':'🔥'});
  const collection=collections.find(c=>c.name===collectionName);
  const enhanced=true;
  const notify=text=>{setToast(text);window.clearTimeout(notify.timer);notify.timer=window.setTimeout(()=>setToast(''),1800)};
  const togglePin=(name,id)=>setPinned(current=>({...current,[name]:(current[name]||[]).includes(id)?current[name].filter(x=>x!==id):[id,...(current[name]||[])]}));
  const react=(name,id,emoji)=>{setReactions(current=>({...current,[`${name}:${id}`]:current[`${name}:${id}`]===emoji?'':emoji}));notify('Reaction updated')};
  const saveAnnotation=note=>{setAnnotations(current=>({...current,[annotating.id]:note.trim()}));notify(note.trim()?'Annotation saved':'Annotation removed');setAnnotating(null)};
  const toggleSaved=item=>{
    const removing=savedIds.has(item.id);
    setSavedIds(current=>{const next=new Set(current);removing?next.delete(item.id):next.add(item.id);return next});
    if(removing)setCollections(current=>current.map(c=>c.ids.includes(item.id)?{...c,count:Math.max(0,c.count-1),ids:c.ids.filter(id=>id!==item.id)}:c));
    notify(removing?'Removed from saved posts':'Saved post');
  };
  const toggleCollection=(target,item)=>{
    const existing=collections.find(c=>c.name===target.name), removing=existing?.ids.includes(item.id);
    setCollections(current=>{
      const match=current.find(c=>c.name===target.name);
      if(!match)return [...current,{...target,count:1,private:true,ids:[item.id]}];
      const contains=match.ids.includes(item.id);
      return current.map(c=>c.name===target.name?{
        ...c,
        count:Math.max(0,(c.count??c.ids.length)+(contains?-1:1)),
        ids:contains?c.ids.filter(id=>id!==item.id):[item.id,...c.ids]
      }:c);
    });
    if(!removing)setSavedIds(current=>new Set(current).add(item.id));
    notify(existing?(removing?`Removed from ${target.name}`:`Added to ${target.name}`):`${target.name} created`);
  };
  const createCollection=(name,item)=>{if(collections.some(c=>c.name.toLowerCase()===name.toLowerCase())){notify('A collection with that name already exists');return}setCollections(current=>[...current,{name,count:item?1:0,color:'#d9d9d9',private:true,ids:item?[item.id]:[]}]);if(item)setSavedIds(current=>new Set(current).add(item.id));setCreatingFor(undefined);notify(`${name} created`)};
  const openPost=(item,name)=>setPostContext({item,collectionName:name});
  const openOptions=(item,name)=>setItemOptions({item,collectionName:name});
  const openCollection=name=>{setUnreadCollections(current=>current[name]?{...current,[name]:0}:current);setCollectionName(name)};
  return <div className="app-shell"><div className="showcase"><div className="prototype"><div className="phone enhanced-mode">
    {settings?<Settings onBack={()=>setSettings(false)} openSaved={()=>{setSavedOrigin('settings');setSettings(false);setTab('saved')}}/>:collection?<Collection collection={collection} annotations={annotations} pinned={pinned} reactions={reactions} enhanced={enhanced} onBack={()=>setCollectionName(null)} onOpen={openPost} onOptions={openOptions}/>:tab==='home'?<Feed collections={collections} savedIds={savedIds} onSave={setSaving} enhanced={enhanced}/>:tab==='profile'?<Profile onMenu={()=>setSettings(true)} openSaved={()=>{setSavedOrigin('profile');setTab('saved')}} onOpen={openPost} annotations={annotations}/>:tab==='explore'?<Explore onOpen={openPost} annotations={annotations}/>:<Saved collections={collections} savedIds={savedIds} annotations={annotations} unreadCollections={unreadCollections} enhanced={enhanced} onBack={()=>{setTab('profile');setSettings(savedOrigin==='settings')}} openCollection={openCollection} onOpen={openPost} onOptions={openOptions} onCreate={()=>setCreatingFor(null)}/>}
    {!collection&&!settings&&tab!=='saved'&&<BottomNav tab={tab} setTab={setTab}/>}
    {postContext&&<PostView item={postContext.item} isSaved={savedIds.has(postContext.item.id)} onClose={()=>setPostContext(null)} onSave={setSaving}/>} 
    {enhanced&&itemOptions&&<ItemOptionsSheet item={itemOptions.item} collection={collections.find(c=>c.name===itemOptions.collectionName)} pinned={pinned} reaction={reactions[`${itemOptions.collectionName}:${itemOptions.item.id}`]} annotation={annotations[itemOptions.item.id]} onTogglePin={togglePin} onAnnotate={setAnnotating} onReact={react} onClose={()=>setItemOptions(null)}/>}
    {enhanced&&annotating&&<AnnotationSheet item={annotating} value={annotations[annotating.id]} onSave={saveAnnotation} onClose={()=>setAnnotating(null)}/>}
    {saving&&<SaveSheet item={saving} collections={collections} isSaved={savedIds.has(saving.id)} enhanced={enhanced} onToggleSaved={toggleSaved} onToggle={toggleCollection} onNew={item=>setCreatingFor(item)} onClose={()=>setSaving(null)}/>}
    {creatingFor!==undefined&&<NewCollectionSheet item={creatingFor} onCreate={createCollection} onClose={()=>setCreatingFor(undefined)}/>}
    <Toast text={toast}/>
  </div></div></div></div>;
}

export default function InstagramPrototypeIsland(){
  const hostRef=useRef(null);
  const [shadow,setShadow]=useState(null);

  useEffect(()=>{
    const host=hostRef.current;
    if(!host)return;

    const root=host.shadowRoot||host.attachShadow({mode:'open'});
    const syncScale=()=>{
      const scale=Math.min(host.clientWidth/430,host.clientHeight/884);
      host.style.setProperty('--prototype-scale',String(Math.max(scale,.01)));
    };
    const resize=new ResizeObserver(syncScale);
    resize.observe(host);
    syncScale();
    setShadow(root);
    return()=>resize.disconnect();
  },[]);

  return <div ref={hostRef} style={{position:'absolute',inset:0}}>
    {shadow&&createPortal(<><style>{prototypeStyles}</style><App/></>,shadow)}
  </div>;
}
