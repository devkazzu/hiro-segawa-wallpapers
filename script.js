const categories = [
  ["All","✧"],["Anime","♡"],["Nature","🌿"],["Sky","☁"],["Flowers","🌸"],["Cars","🚘"],["Galaxy","✦"],["Mountains","⛰"],["City","🌃"],["Aesthetic","୨୧"],["Ocean","🌊"]
];
// Use a local file from /wallpapers/ OR an Unsplash photo ID.
const photo = (source,w=850) => {
  if (source.startsWith("wallpapers/") || source.startsWith("./wallpapers/") || source.startsWith("https://") || source.startsWith("http://")) return source;
  return `https://images.unsplash.com/${source}?auto=format&fit=crop&w=${w}&q=85`;
};
let items = [
["Sakura Daydream","Anime","soft, pink, dreamy", "photo-1490750967868-88aa4486c946"],
["Golden Hour Meadow","Nature","golden, meadow, warm","photo-1470252649378-9c29740c9fa8"],
["Cloud Nine","Sky","clouds, blue, peaceful","photo-1490730141103-6cac27aaab94"],
["Pink Bloom","Flowers","pink, floral, spring","photo-1494972308805-463bc619d34e"],
["Midnight Drive","Cars","night, road, cinematic","photo-1503376780353-7e6692767b70"],
["Milky Way Dreams","Galaxy","stars, space, night","photo-1462331940025-496dfbfc7564"],
["Mountain Silence","Mountains","mountain, mist, calm","photo-1464822759023-fed622ff2c3b"],
["Neon Streets","City","neon, city, night","photo-1519608487953-e999c86e7455"],
["Lavender Fields","Nature","lavender, purple, field","photo-1470252649378-9c29740c9fa8"],
["Ocean Whisper","Ocean","sea, blue, waves","photo-1500375592092-40eb2168fd21"],
["Cherry Blossom","Flowers","sakura, blossom, pink","photo-1522383225653-ed111181a951"],
["Retro Porsche Mood","Cars","sports car, retro","photo-1503376780353-7e6692767b70"],
["Aurora Nights","Sky","aurora, green, night","photo-1531366936337-7c912a4589a7"],
["Forest Escape","Nature","forest, green, escape","photo-1448375240586-882707db888b"],
["Purple Universe","Galaxy","purple, stars, universe","photo-1462331940025-496dfbfc7564"],
["Rainy Tokyo","City","rain, japan, city","photo-1519608487953-e999c86e7455"],
["Soft Petals","Flowers","flower, macro, pastel","photo-1490750967868-88aa4486c946"],
["Alpine Morning","Mountains","alps, snow, morning","photo-1464822759023-fed622ff2c3b"],
["Blue Horizon","Ocean","horizon, blue, calm","photo-1500375592092-40eb2168fd21"],
["Dreamy Sunset","Sky","sunset, orange, clouds","photo-1470252649378-9c29740c9fa8"],
["JDM Nights","Cars","jdm, night, street","photo-1492144534655-ae79c964c9d7"],
["Green Sanctuary","Nature","green, leaves, forest","photo-1448375240586-882707db888b"],
["Moonlit Sky","Galaxy","moon, stars, dark","photo-1534796636912-3b95b3ab5986"],
["Blush Garden","Flowers","blush, garden, soft","photo-1490750967868-88aa4486c946"],
["Coastal Calm","Ocean","coast, sea, peaceful","photo-1518837695005-2083093ee35b"],
["City After Dark","City","urban, night, lights","photo-1519608487953-e999c86e7455"],
["Cloudscape","Sky","cloudscape, pastel","photo-1490730141103-6cac27aaab94"],
["Road Trip","Cars","road, drive, travel","photo-1503376780353-7e6692767b70"],
["Wildflower Study","Nature","wildflower, nature","photo-1470252649378-9c29740c9fa8"],
["Starfall","Galaxy","stars, galaxy, night","photo-1462331940025-496dfbfc7564"],
["Snow Peaks","Mountains","snow, peaks, winter","photo-1464822759023-fed622ff2c3b"],
["Pastel Bloom","Flowers","pastel, pink, flower","photo-1522383225653-ed111181a951"],
["Ocean Blue","Ocean","blue, water, sea","photo-1500375592092-40eb2168fd21"],
["Night Runner","Cars","supercar, road, night","photo-1492144534655-ae79c964c9d7"],
["Sakura Breeze","Anime","anime mood, sakura, pink","photo-1522383225653-ed111181a951"],
["Misty Woods","Nature","mist, woods, green","photo-1448375240586-882707db888b"],
["Pink Sky","Sky","pink sky, clouds","photo-1490730141103-6cac27aaab94"],
["Cosmic Dust","Galaxy","cosmos, stars","photo-1534796636912-3b95b3ab5986"],
["Mountain Lake","Mountains","lake, mountain, reflection","photo-1501785888041-af3ef285b470"],
["Urban Glow","City","city, lights, aesthetic","photo-1519608487953-e999c86e7455"],
["Petal Rain","Flowers","blossom, spring, petals","photo-1490750967868-88aa4486c946"],
["Open Road","Cars","road, car, travel","photo-1511919884226-fd3cad34687c"],
["Sea of Clouds","Mountains","clouds, mountain, sky","photo-1464822759023-fed622ff2c3b"],
["Summer Coast","Ocean","summer, coast, sea","photo-1518837695005-2083093ee35b"],
["Dusk Boulevard","City","dusk, city, lights","photo-1519608487953-e999c86e7455"],
["Golden Petals","Flowers","golden, flower, macro","photo-1522383225653-ed111181a951"],
["Blue Planet","Galaxy","planet, blue, space","photo-1462331940025-496dfbfc7564"],
["Quiet Forest","Nature","quiet, forest, green","photo-1448375240586-882707db888b"],
["Dream Drive","Cars","dream, car, motion","photo-1492144534655-ae79c964c9d7"],
["Anime Evening","Anime","anime aesthetic, evening","photo-1470252649378-9c29740c9fa8"],
["Moon Garden","Aesthetic","moon, dreamy, calm","photo-1531366936337-7c912a4589a7"],
["Soft Focus","Aesthetic","minimal, soft, neutral","photo-1490750967868-88aa4486c946"],
["Blue Hour","Sky","blue hour, sky","photo-1490730141103-6cac27aaab94"]
].map((x,i)=>({id:i+1,title:x[0],category:x[1],tags:x[2],image:photo(x[3]),likes:Math.floor(80+Math.random()*900)}));

const grid=document.getElementById("wallpaperGrid"), pills=document.getElementById("categoryPills");
const search=document.getElementById("searchInput"), sort=document.getElementById("sortSelect");
const modal=document.getElementById("wallpaperModal"), modalImage=document.getElementById("modalImage");
let activeCategory="All", favorites=JSON.parse(localStorage.getItem("hiro-favorites")||"[]"), showFavorites=false, visible=20, currentItem=null;
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2100)}
function updateFavCount(){document.getElementById("favCount").textContent=favorites.length}
function renderPills(){pills.innerHTML=categories.map(([name,icon])=>`<button class="category-pill ${activeCategory===name?"active":""}" data-category="${name}"><span>${icon}</span>${name}</button>`).join("");pills.querySelectorAll("button").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.category;showFavorites=false;visible=20;renderPills();renderGrid()})}
function filteredItems(){let q=search.value.toLowerCase().trim();let list=items.filter(x=>(activeCategory==="All"||x.category===activeCategory)&&(!q||`${x.title} ${x.category} ${x.tags}`.toLowerCase().includes(q))&&(!showFavorites||favorites.includes(x.id)));if(sort.value==="az")list.sort((a,b)=>a.title.localeCompare(b.title));if(sort.value==="za")list.sort((a,b)=>b.title.localeCompare(a.title));return list}
function renderGrid(){let list=filteredItems();document.getElementById("galleryTitle").innerHTML=showFavorites?'Your <em>favorites</em>':activeCategory==="All"?'Freshly <em>picked</em>':`${activeCategory} <em>collection</em>`;document.getElementById("resultText").textContent=`Showing ${Math.min(visible,list.length)} of ${list.length} wallpapers.`;grid.innerHTML=list.length?list.slice(0,visible).map(x=>`<article class="wallpaper-card" data-id="${x.id}"><img class="card-image" loading="lazy" src="${x.image}" alt="${x.title}" onerror="this.src='https://picsum.photos/seed/hiro${x.id}/600/800'"><div class="card-overlay"><div><div class="card-title">${x.title}</div><div class="card-category">${x.category}</div></div><button class="heart-btn ${favorites.includes(x.id)?"saved":""}" data-fav="${x.id}" aria-label="Save ${x.title}">${favorites.includes(x.id)?"♥":"♡"}</button></div><div class="card-meta"><strong>${x.title}</strong><span>${x.category}</span></div></article>`).join(""):`<div class="empty-state"><b>No wallpapers found ♡</b>Try another search or category.</div>`;grid.querySelectorAll(".wallpaper-card").forEach(card=>{card.addEventListener("click",e=>{if(!e.target.closest(".heart-btn"))openModal(card.dataset.id)})});grid.querySelectorAll(".heart-btn").forEach(btn=>btn.onclick=e=>{e.stopPropagation();toggleFavorite(Number(btn.dataset.fav))});document.getElementById("loadMore").style.display=visible<list.length?"inline-flex":"none"}
function toggleFavorite(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem("hiro-favorites",JSON.stringify(favorites));updateFavCount();renderGrid();toast(favorites.includes(id)?"Saved to your favorites ♡":"Removed from favorites")}
function openModal(id){currentItem=items.find(x=>String(x.id)===String(id));if(!currentItem)return;modalImage.src=currentItem.image;modalImage.alt=currentItem.title;document.getElementById("modalTitle").textContent=currentItem.title;document.getElementById("modalCategory").textContent=currentItem.category;document.getElementById("modalTags").textContent=currentItem.tags.split(", ").map(x=>"#"+x).join("  ");document.getElementById("modalFavorite").textContent=favorites.includes(id)?"♥ Saved":"♡ Save";document.getElementById("downloadBtn").href=currentItem.image.replace("w=850","w=1800");document.getElementById("downloadBtn").download=`hiro-segawa-${currentItem.title.toLowerCase().replaceAll(" ","-")}.jpg`;modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.getElementById("modalClose").onclick=closeModal;document.getElementById("modalBackdrop").onclick=closeModal;document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search.focus()}});
document.getElementById("modalFavorite").onclick=()=>{if(currentItem){toggleFavorite(currentItem.id);document.getElementById("modalFavorite").textContent=favorites.includes(currentItem.id)?"♥ Saved":"♡ Save"}};
document.getElementById("favoritesToggle").onclick=()=>{showFavorites=!showFavorites;activeCategory="All";visible=100;renderPills();renderGrid();document.getElementById("discover").scrollIntoView({behavior:"smooth"})};
document.getElementById("loadMore").onclick=()=>{visible+=16;renderGrid()};
search.addEventListener("input",()=>{visible=20;showFavorites=false;renderGrid()});sort.onchange=renderGrid;
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("hiro-theme",document.body.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("hiro-theme")==="light")document.body.classList.add("light");
document.getElementById("menuBtn").onclick=()=>document.getElementById("navLinks").classList.toggle("open");
document.querySelectorAll(".nav-links a").forEach(a=>a.onclick=()=>document.getElementById("navLinks").classList.remove("open"));
document.getElementById("year").textContent=new Date().getFullYear();
async function loadAddedWallpapers(){
  const addUnique = (arr) => { for (const item of arr) { if (!items.some(existing => String(existing.id) === String(item.id))) items.push({...item, image: item.image}); } };
  try {
    const response = await fetch('./wallpapers/wallpapers.json', {cache:'no-store'});
    if (response.ok) { const published = await response.json(); if (Array.isArray(published)) addUnique(published); }
  } catch (e) { /* Local file preview may block fetch; the base gallery still works. */ }
  try {
    const drafts = JSON.parse(localStorage.getItem('hiro-admin-drafts-v1') || '[]');
    if (Array.isArray(drafts)) addUnique(drafts);
  } catch (e) { console.warn('Could not load local wallpaper drafts.', e); }
  renderPills(); renderGrid(); updateFavCount();
}
loadAddedWallpapers();