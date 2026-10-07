import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { Search, Sparkles, Plus, Bell, Bookmark, Heart, ArrowUpRight, ChevronDown, SlidersHorizontal, Leaf, X, Upload, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { initialPins, categories, type Pin } from '@/lib/gallery';

export const Route = createFileRoute('/')({
 head: () => ({meta: [{title:'Folia — Find your next inspiration'},{name:'description',content:'Explore a world of beautiful ideas. Discover photography, design, travel and everyday inspiration on Folia.'},{property:'og:title',content:'Folia — Find your next inspiration'},{property:'og:description',content:'A fresh collection of photography, design and everyday inspiration.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: Index,
});
function Index() {
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState('For you');
 const [tab,setTab]=useState('Explore');
 const [saved,setSaved]=useState<string[]>([]);
 const [pins,setPins]=useState(initialPins);
 const [selected,setSelected]=useState<Pin|null>(null);
 const [create,setCreate]=useState(false);
 const [notice,setNotice]=useState('');
 const [sort,setSort]=useState('Curated');
 const [title,setTitle]=useState('');
 const [uploadCategory,setUploadCategory]=useState('Nature');
 const [file,setFile]=useState<File|null>(null);
 const inputRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(''),3000);return()=>clearTimeout(timer);},[notice]);
 const toggleSave=(id:string)=>{setSaved(current=>current.includes(id)?current.filter(x=>x!==id):[...current,id]);};
 const filtered=pins.filter(pin=>(tab!=='Saved'||saved.includes(pin.id))&&(category==='For you'||pin.category===category)&&`${pin.title} ${pin.author} ${pin.category}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==='Popular'?b.likes-a.likes:0);
 const initials=(name:string)=>name.split(' ').slice(0,2).map(x=>x[0]).join('');
 const share=async(pin:Pin)=>{try{await navigator.clipboard.writeText(`${pin.title} — ${window.location.origin}?pin=${pin.id}`);setNotice('Link copied to clipboard');}catch{setNotice('Sharing is not available in this browser');}};
 useEffect(()=>{const id=new URLSearchParams(window.location.search).get('pin');if(id)setSelected(initialPins.find(p=>p.id===id)??null);},[]);
 const addPin=(event:React.FormEvent)=>{event.preventDefault();if(!file||!title.trim())return;const newPin:Pin={id:crypto.randomUUID(),image:URL.createObjectURL(file),title:title.trim(),category:uploadCategory,author:'You',height:'medium',likes:0};setPins(p=>[newPin,...p]);setCreate(false);setTitle('');setFile(null);setTab('Explore');setCategory('For you');setQuery('');setNotice('Your image was added to this session');};
 return <>
  <div className="ambient" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} className="particle" style={{left:`${(i*37)%100}%`,top:`${(i*19)%100}%`,animationDelay:`-${i}s`}}/>)}</div>
  <header className="site-nav">
   <a href="/" className="brand" aria-label="Folia home"><Leaf className="brand-mark" strokeWidth={2.5}/>folia<span className="text-primary">.</span></a>
   <nav className="nav-links" aria-label="Main navigation">{['Explore','Saved'].map(item=><Button key={item} variant="nav" onClick={()=>{setTab(item);setCategory('For you');}} className={tab===item?'nav-active':''}>{item==='Saved'&&<Bookmark className="hidden sm:block"/>}{item}</Button>)}</nav>
   <div className="nav-right"><Button variant="selected" className="create-button" onClick={()=>setCreate(true)}><Plus/><span className="create-label">Create a pin</span></Button><Button size="icon" variant="nav" className="notification" aria-label="Notifications" title="Notifications" onClick={()=>setNotice('You’re all caught up. No new notifications.')}><Bell/></Button><div className="avatar" title="Guest profile">AR</div></div>
  </header>
  <main>
   <section className="intro"><div className="intro-label"><Sparkles size={13}/>A little curiosity. Endless possibilities.</div><h1>Find your next <span>inspiration.</span></h1><p>Beautiful ideas, unexpected discoveries, and things worth saving.</p>
    <div className="search-wrap"><Search/><input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} aria-label="Search inspiration" placeholder="Search for anything that inspires you..."/>{query?<Button size="icon" variant="ghost" className="h-5 w-5" aria-label="Clear search" onClick={()=>setQuery('')}><X/></Button>:<span className="search-hint">Explore your curiosity</span>}</div>
   </section>
   <div className="category-row" aria-label="Categories">{categories.map(item=><Button key={item} variant={category===item?'selected':'pill'} className="category" aria-pressed={category===item} onClick={()=>setCategory(item)}>{item==='For you'&&<Sparkles size={13}/>} {item}</Button>)}</div>
   <section className="gallery-area">
    <div className="gallery-heading"><h2>{tab==='Saved'?<Bookmark size={17}/>:<Compass size={17}/>} {tab==='Saved'?'Your saved inspiration':query?`Results for “${query}”`:category==='For you'?'Picked for your curious mind':`${category} inspiration`}<span>{filtered.length} ideas to explore</span></h2><Button variant="nav" className="sort" onClick={()=>setSort(v=>v==='Curated'?'Popular':'Curated')}><SlidersHorizontal size={13}/>{sort}<ChevronDown size={13}/></Button></div>
    {filtered.length?<div className="masonry">{filtered.map((pin,index)=><article className="pin" key={pin.id}>
     <div className={`pin-image ${pin.height}`} role="button" tabIndex={0} aria-label={`Open ${pin.title}`} onClick={()=>setSelected(pin)} onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(pin);}}}>
      <img src={pin.image} alt={pin.title} width={512} height={768} loading={index<5?'eager':'lazy'}/><div className="pin-overlay"><span className="pin-category">{pin.category}</span></div>
      <Button variant="save" className={`pin-save ${saved.includes(pin.id)?'is-saved':''}`} aria-label={`${saved.includes(pin.id)?'Unsave':'Save'} ${pin.title}`} onClick={e=>{e.stopPropagation();toggleSave(pin.id);}}><Bookmark size={12} fill={saved.includes(pin.id)?'currentColor':'none'}/>{saved.includes(pin.id)?'Saved':'Save'}</Button>
     </div><div className="pin-meta"><h3>{pin.title}</h3><div className="pin-author"><div className="avatar">{initials(pin.author)}</div>{pin.author}<span className="pin-likes"><Heart size={10}/>{pin.likes}</span></div></div>
    </article>)}</div>:<div className="empty"><Bookmark size={32}/><h2>{tab==='Saved'?'Your inspiration starts here':'No ideas found — yet'}</h2><p>{tab==='Saved'?'Save a few favorites and make this space your own.':'Try a different search or explore another category.'}</p><Button variant="selected" className="mt-5" onClick={()=>{setTab('Explore');setQuery('');setCategory('For you');}}>Explore ideas<ArrowUpRight/></Button></div>}
    {filtered.length>0&&<div className="end-note"><Sparkles size={14}/>A little inspiration goes a long way.</div>}
   </section>
  </main>
  <Dialog open={selected!==null} onOpenChange={open=>{if(!open)setSelected(null);}}><DialogContent className="detail">{selected&&<><img className="detail-image" src={selected.image} alt={selected.title}/><div className="detail-copy"><span className="text-xs text-primary">{selected.category}</span><DialogTitle>{selected.title}</DialogTitle><DialogDescription>A moment worth keeping, shared by {selected.author}.</DialogDescription><div className="detail-author"><span className="avatar">{initials(selected.author)}</span>{selected.author}</div><div className="flex flex-wrap gap-2"><Button variant="selected" onClick={()=>toggleSave(selected.id)}><Bookmark/>{saved.includes(selected.id)?'Saved':'Save inspiration'}</Button><Button variant="pill" onClick={()=>share(selected)}><ArrowUpRight/>Share</Button></div><span className="flex items-center gap-2 text-xs text-muted-foreground"><Heart size={14}/>{selected.likes} people found inspiration here</span></div></>}</DialogContent></Dialog>
  <Dialog open={create} onOpenChange={setCreate}><DialogContent className="create-dialog"><DialogTitle>Create a pin</DialogTitle><DialogDescription>Add an image to your gallery for this session.</DialogDescription><form onSubmit={addPin}><div className="upload-zone"><Upload size={26}/><input type="file" accept="image/*" required aria-label="Choose image" onChange={e=>{const f=e.target.files?.[0];if(f&&!f.type.startsWith('image/')){setNotice('Please choose an image file');return;}if(f&&f.size>10*1024*1024){setNotice('Please choose an image smaller than 10 MB');return;}setFile(f??null);}}/></div><label htmlFor="pin-title">Title</label><input id="pin-title" required maxLength={100} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Give your inspiration a name"/><label htmlFor="pin-category">Category</label><select id="pin-category" value={uploadCategory} onChange={e=>setUploadCategory(e.target.value)}>{categories.slice(1).map(c=><option key={c}>{c}</option>)}</select><Button type="submit" variant="selected" className="mt-6 w-full" disabled={!file||!title.trim()}><Plus/>Create pin</Button></form></DialogContent></Dialog>
  {notice&&<div className="notice" role="status">{notice}</div>}
 </>;
}
