// Select all page sections and navigation links

const pageSections = document.querySelectorAll('[data-page]');
const tocLinks = document.querySelectorAll('.toclink');

// Function to show a specific page section and hide others

function showPage(id){
  const targetId = id.replace('#', '');

  // Loop through all sections to hide or show them
  pageSections.forEach(s=>{
    const isTarget = s.id === targetId;
    s.hidden = !isTarget;
    if (isTarget) s.scrollIntoView({behavior:'smooth'});
  });

  // Update the active state of navigation links and the URL hash
  tocLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href')===id));
  if (history.pushState) history.pushState(null, null, id.startsWith('#')?id:('#'+id));
}

// "Back to highlights" 버튼 이벤트 리스너
// Event listener for buttons that open a specific section (e.g., "Back to highlights")

document.querySelectorAll('[data-open]').forEach(btn=>{
  btn.addEventListener('click', e=>{
    e.preventDefault();
    const target = btn.getAttribute('data-open');
    showPage(target);
  });
});

// 사이드바 네비게이션
// Event listener for the main sidebar navigation links

tocLinks.forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    showPage(id);
  });
});

// Handle page load: show a specific section if a hash is in the URL, otherwise show highlights

window.addEventListener('load', ()=>{
  if (location.hash) {
    // URL에 해시가 있으면 해당 페이지로 스크롤
    showPage(location.hash);
  } else {
    // 해시가 없으면 스크롤하지 않고 'Highlights' 링크만 활성화
    tocLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href')==='#highlights'));
  }
});

// Handle browser back/forward button clicks

window.addEventListener('popstate', ()=>{
  const h = location.hash || '#highlights';
  showPage(h);
});