// ── Config ──────────────────────────────────────────────
const API_BASE   = 'https://jsonplaceholder.typicode.com';
const PAGE_SIZE  = 8;

// ── State ───────────────────────────────────────────────
let allItems     = [];   // all fetched items
let currentType  = 'posts';
let page         = 1;
let searchQuery  = '';

// ── DOM refs ────────────────────────────────────────────
const itemList     = document.getElementById('itemList');
const skeletonList = document.getElementById('skeletonList');
const emptyState   = document.getElementById('emptyState');
const emptyMsg     = document.getElementById('emptyMsg');
const loadMoreBtn  = document.getElementById('loadMoreBtn');
const footerInfo   = document.getElementById('footerInfo');
const searchInput  = document.getElementById('searchInput');
const statLoaded   = document.getElementById('statLoaded');
const statShowing  = document.getElementById('statShowing');
const statSource   = document.getElementById('statSource');
const statStatus   = document.getElementById('statStatus');
const toggleBtns   = document.querySelectorAll('.toggle-btn');

// ── Helpers ─────────────────────────────────────────────
function setStatus(text) { statStatus.textContent = text; }

function updateStats(showing) {
  statLoaded.textContent  = allItems.length;
  statShowing.textContent = showing;
  statSource.textContent  = currentType === 'posts' ? '/posts' : '/users';
}

function showSkeleton(show) {
  skeletonList.classList.toggle('hidden', !show);
  itemList.classList.toggle('hidden', show);
}

function getFiltered() {
  if (!searchQuery) return allItems;
  const q = searchQuery.toLowerCase();
  return allItems.filter(item => {
    if (currentType === 'posts') {
      return item.title.toLowerCase().includes(q) || item.body.toLowerCase().includes(q);
    } else {
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.username.toLowerCase().includes(q)
      );
    }
  });
}

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

// ── Render ───────────────────────────────────────────────
function renderPostCard(post, delay) {
  const card = document.createElement('div');
  card.className = 'post-card';
  card.style.animationDelay = `${delay * 40}ms`;
  card.innerHTML = `
    <div class="post-id">#${post.id}</div>
    <div class="post-body">
      <div class="post-title">${post.title}</div>
      <div class="post-excerpt">${post.body.slice(0, 100)}…</div>
      <div class="post-meta">
        <span class="tag">user · ${post.userId}</span>
        <span class="tag">post · ${post.id}</span>
      </div>
    </div>`;
  return card;
}

function renderUserCard(user, delay) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.style.animationDelay = `${delay * 40}ms`;
  card.innerHTML = `
    <div class="user-avatar">${getInitials(user.name)}</div>
    <div>
      <div class="user-name">${user.name}</div>
      <div class="user-handle">@${user.username}</div>
    </div>
    <div class="user-right">
      <div class="user-email">${user.email}</div>
      <div class="user-company">${user.company.name}</div>
    </div>`;
  return card;
}

function renderItems() {
  const filtered = getFiltered();
  const visible  = filtered.slice(0, page * PAGE_SIZE);

  itemList.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    emptyMsg.textContent = searchQuery
      ? `No results for "${searchQuery}".`
      : 'No data available.';
    loadMoreBtn.classList.add('hidden');
    footerInfo.textContent = '';
    updateStats(0);
    return;
  }

  emptyState.classList.add('hidden');

  visible.forEach((item, i) => {
    const card = currentType === 'posts'
      ? renderPostCard(item, i)
      : renderUserCard(item, i);
    itemList.appendChild(card);
  });

  const hasMore = visible.length < filtered.length;
  loadMoreBtn.classList.toggle('hidden', !hasMore);
  footerInfo.textContent = hasMore
    ? `Showing ${visible.length} of ${filtered.length}`
    : `All ${filtered.length} item${filtered.length !== 1 ? 's' : ''} shown`;

  updateStats(visible.length);
}

// ── Fetch ────────────────────────────────────────────────
async function fetchData(type) {
  setStatus('Fetching…');
  showSkeleton(true);
  loadMoreBtn.classList.add('hidden');
  emptyState.classList.add('hidden');
  page = 1;

  try {
    const res  = await fetch(`${API_BASE}/${type}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allItems = await res.json();
    setStatus('OK');
    renderItems();
  } catch (err) {
    setStatus('Error');
    emptyState.classList.remove('hidden');
    emptyMsg.textContent = `Failed to fetch data. (${err.message})`;
    updateStats(0);
  } finally {
    showSkeleton(false);
  }
}

// ── Events ───────────────────────────────────────────────

// Type toggle
toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.type === currentType) return;
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentType  = btn.dataset.type;
    searchQuery  = '';
    searchInput.value = '';
    fetchData(currentType);
  });
});

// Load more
loadMoreBtn.addEventListener('click', () => {
  page++;
  renderItems();
  // Smooth scroll to first new item
  const cards = itemList.querySelectorAll('.post-card, .user-card');
  const firstNew = cards[(page - 1) * PAGE_SIZE];
  if (firstNew) firstNew.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Search (debounced)
let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchQuery = searchInput.value.trim();
    page = 1;
    renderItems();
  }, 280);
});

// ── Init ─────────────────────────────────────────────────
fetchData(currentType);