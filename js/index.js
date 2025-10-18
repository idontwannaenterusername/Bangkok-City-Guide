// Select all page sections and navigation links

const pageSections = document.querySelectorAll('[data-page]');
const navLinks = document.querySelectorAll('.nav-links a');

// Function to show a specific page section and hide others

function showPage(id){
  const targetId = id.replace('#', '');

  // Loop through all sections to hide or show them
  pageSections.forEach(s=>{
    const isTarget = s.id === targetId;
    s.hidden = !isTarget;
  });

  // Update the active state of navigation links and the URL hash
  navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href')===id));
  if (history.pushState) history.pushState(null, null, id.startsWith('#')?id:('#'+id));
}

// Event listener for the main navigation links

navLinks.forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    showPage(id);
  });
});

// Handle page load: show a specific section if a hash is in the URL, otherwise show highlights

window.addEventListener('load', ()=>{
  const hash = location.hash || '#highlights';
  showPage(hash);
});

// Handle browser back/forward button clicks

window.addEventListener('popstate', ()=>{
  const h = location.hash || '#highlights';
  showPage(h);
});