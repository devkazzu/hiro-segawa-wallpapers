(async () => {
 const params=new URLSearchParams(location.search), id=params.get('id');
 const root=document.getElementById('detailContent');
 const safe=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const favorites=()=>{try{return JSON.parse(localStorage.getItem('hiro-favorites')||'[]')}catch(e){return []}};
 const toast=(message)=>{const el=document.getElementById('toast');if(!el)return;el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)};
 document.getElementById('year').textContent=new Date().getFullYear();
 let catalog=[];try{catalog=JSON.parse(localStorage.getItem('hiro-wallpaper-catalog')||'[]')}catch(e){}
 let item=catalog.find(x=>String(x.id)===String(id));
 if(!item && window.hiroSupabase && id){try{const {data,error}=await window.hiroSupabase.from('wallpapers').select('id,title,category,tags,image_url').eq('id',id).eq('published',true).maybeSingle();if(!error&&data)item={...data,image:data.image_url}}catch(e){console.warn(e)}}
 if(!item){root.innerHTML='<div class="detail-error"><h2>Wallpaper not found ♡</h2><p>This wallpaper may have been removed, or the link may be incorrect.</p><a href="index.html">Return to gallery</a></div>';return;}
 const tagList=String(item.tags||'aesthetic, wallpaper').split(',').map(t=>t.trim()).filter(Boolean);
 const isFav=favorites().some(x=>String(x)===String(item.id));
 root.innerHTML=`<div class="detail-preview"><img id="detailImage" src="${safe(item.image||item.image_url)}" alt="${safe(item.title)} wallpaper" /></div>
 <div class="detail-info"><span class="detail-kicker">HIRO SEGAWA · WALLPAPER DETAILS</span><h1>${safe(item.title)}</h1><p class="detail-description">A handpicked ${safe(item.category||'aesthetic')} wallpaper for your screen. Preview it in full size and download it to make your phone or desktop feel a little more personal.</p>
 <div class="detail-tags">${tagList.map(t=>`<span class="detail-tag">#${safe(t)}</span>`).join('')}</div>
 <div class="detail-facts"><div class="detail-fact"><small>Category</small><strong>${safe(item.category||'Aesthetic')}</strong></div><div class="detail-fact"><small>Image size</small><strong id="imageDimensions">Checking…</strong></div><div class="detail-fact"><small>Collection</small><strong>Wallpaper Universe</strong></div><div class="detail-fact"><small>Format</small><strong id="imageFormat">Image</strong></div></div>
 <div class="download-customizer">
 <div class="download-heading"><strong>Download for your device</strong><span>Choose a ready-made size or enter your own.</span></div>
 <label class="download-label" for="downloadPreset">Device / resolution</label>
 <select id="downloadPreset" class="download-select">
 <optgroup label="Phone wallpapers"><option value="720x1280">Phone HD · 720 × 1280</option><option value="1080x1920" selected>Phone Full HD · 1080 × 1920</option><option value="1440x2560">Phone QHD · 1440 × 2560</option><option value="2160x3840">Phone 4K · 2160 × 3840</option></optgroup>
 <optgroup label="PC / laptop wallpapers"><option value="1366x768">Laptop HD · 1366 × 768</option><option value="1920x1080">PC Full HD · 1920 × 1080</option><option value="2560x1440">PC QHD · 2560 × 1440</option><option value="3840x2160">PC 4K · 3840 × 2160</option><option value="3440x1440">Ultrawide · 3440 × 1440</option></optgroup>
 <option value="custom">Custom size</option><option value="original">Original quality · no resizing</option></select>
 <div class="download-custom-fields" id="customSizeFields" hidden><label>Width (px)<input id="customWidth" type="number" min="1" max="8192" value="1080" inputmode="numeric"></label><label>Height (px)<input id="customHeight" type="number" min="1" max="8192" value="1920" inputmode="numeric"></label></div>
 <div class="download-options"><label>Resize mode<select id="downloadFit" class="download-select"><option value="cover">Fill screen (crop edges)</option><option value="contain">Fit entire image (add padding)</option><option value="stretch">Stretch to exact size</option></select></label><label>File format<select id="downloadFormat" class="download-select"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></label></div>
 <p class="download-quality-note">Larger sizes are generated from the uploaded image. Upscaling cannot add detail that isn't in the original.</p>
 </div>
 <div class="detail-actions"><button class="detail-download" id="detailDownload">Download selected size ↓</button><button class="detail-fav" id="detailFavorite">${isFav?'♥ Saved':'♡ Add to favorites'}</button></div><p class="detail-description" id="downloadHint" style="font-size:.82rem;margin-top:13px">Free wallpaper download · Please respect the original creator's rights.</p></div>`;
 const image=document.getElementById('detailImage');
 image.addEventListener('load',()=>{document.getElementById('imageDimensions').textContent=`${image.naturalWidth} × ${image.naturalHeight}`;document.getElementById('imageFormat').textContent=(item.image||item.image_url||'').split('?')[0].split('.').pop().toUpperCase()||'Image'});
 image.addEventListener('error',()=>{document.getElementById('imageDimensions').textContent='Unavailable';document.getElementById('downloadHint').textContent='This image could not be loaded. Please try another wallpaper.'});
 document.getElementById('detailFavorite').addEventListener('click',()=>{let list=favorites();const exists=list.some(x=>String(x)===String(item.id));list=exists?list.filter(x=>String(x)!==String(item.id)):[...list,item.id];localStorage.setItem('hiro-favorites',JSON.stringify(list));document.getElementById('detailFavorite').textContent=exists?'♡ Add to favorites':'♥ Saved';toast(exists?'Removed from favorites':'Saved to your favorites ♡')});
 const preset=document.getElementById('downloadPreset'),customFields=document.getElementById('customSizeFields');
 preset.addEventListener('change',()=>{customFields.hidden=preset.value!=='custom'});
 document.getElementById('detailDownload').addEventListener('click',async()=>{
  const btn=document.getElementById('detailDownload'),hint=document.getElementById('downloadHint'),original=btn.textContent;
  btn.disabled=true;btn.textContent='Preparing your wallpaper…';
  try{
   const response=await fetch(item.image||item.image_url,{mode:'cors'});if(!response.ok)throw new Error('Could not fetch original image');
   const blob=await response.blob();
   const sourceUrl=URL.createObjectURL(blob);
   try{
    const source=new Image();source.src=sourceUrl;await new Promise((resolve,reject)=>{source.onload=resolve;source.onerror=()=>reject(new Error('Image could not be decoded'))});
    if(preset.value==='original'){
     const ext=(blob.type.split('/')[1]||'jpg').replace('jpeg','jpg');downloadBlob(blob,`hiro-segawa-${slug(item.title)}.${ext}`);
     hint.textContent=`Original image downloaded (${source.naturalWidth} × ${source.naturalHeight}).`;toast('Original wallpaper downloaded ↓');return;
    }
    let width,height;
    if(preset.value==='custom'){width=Number(document.getElementById('customWidth').value);height=Number(document.getElementById('customHeight').value);if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width>8192||height>8192)throw new Error('Enter a width and height from 1 to 8192 pixels.');}
    else [width,height]=preset.value.split('x').map(Number);
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d');
    const fit=document.getElementById('downloadFit').value;
    if(fit==='contain'){
     ctx.fillStyle='#101018';ctx.fillRect(0,0,width,height);const scale=Math.min(width/source.naturalWidth,height/source.naturalHeight),dw=source.naturalWidth*scale,dh=source.naturalHeight*scale;ctx.drawImage(source,(width-dw)/2,(height-dh)/2,dw,dh);
    }else if(fit==='stretch'){ctx.drawImage(source,0,0,width,height)}
    else{const scale=Math.max(width/source.naturalWidth,height/source.naturalHeight),sw=width/scale,sh=height/scale,sx=(source.naturalWidth-sw)/2,sy=(source.naturalHeight-sh)/2;ctx.drawImage(source,sx,sy,sw,sh,0,0,width,height)}
    const mime=document.getElementById('downloadFormat').value;const output=await new Promise(resolve=>canvas.toBlob(resolve,mime,mime==='image/png'?undefined:.92));if(!output)throw new Error('This format is not supported by your browser.');
    const ext=mime==='image/jpeg'?'jpg':mime==='image/png'?'png':'webp';downloadBlob(output,`hiro-segawa-${slug(item.title)}-${width}x${height}.${ext}`);
    hint.textContent=`Your ${width} × ${height} ${ext.toUpperCase()} wallpaper is ready. ♡`;toast(`Downloaded ${width} × ${height} ↓`);
   }finally{URL.revokeObjectURL(sourceUrl)}
  }catch(error){console.error(error);hint.textContent=error.message.includes('CORS')?'This image host does not allow resizing in the browser. Try Original quality, or ask the site admin to upload the image to the wallpaper storage.':error.message;toast('Could not prepare download')}
  finally{btn.disabled=false;btn.textContent=original}
 });
 function slug(value){return String(value||'wallpaper').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'wallpaper'}
 function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000)}
})();
