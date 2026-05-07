const listings = [
  {
    id: 1,
    title: 'Plaza céntrica con entrada privada',
    city: 'Madrid',
    time: '8:00 - 20:00',
    days: 'Lunes a Viernes',
    price: '12€/hora',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',
    description: 'Plaza cubierta cerca de Gran Vía. Ideal para estancias cortas y acceso rápido al centro. Disponible todo el día en días laborables.',
    rating: 4.8,
    reviews: [
      { name: 'Marta', stars: 5, comment: 'Perfecta ubicación y anfitrión muy atento.' },
      { name: 'Jorge', stars: 4, comment: 'Lugar cómodo y limpio, fácil de reservar.' }
    ]
  },
  {
    id: 2,
    title: 'Plaza tranquila en barrio residencial',
    city: 'Barcelona',
    time: '9:00 - 18:00',
    days: 'Sábado y Domingo',
    price: '9€/hora',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80',
    description: 'Plaza al aire libre en una zona segura y tranquila. Perfecta para visitas de fin de semana o reuniones cortas en la ciudad.',
    rating: 4.6,
    reviews: [
      { name: 'Lucía', stars: 5, comment: 'Buen precio y muy cerca de servicios.' },
      { name: 'Ahmed', stars: 4, comment: 'Recomendable para fin de semana.' }
    ]
  },
  {
    id: 3,
    title: 'Parking flexible junto a estación',
    city: 'Sevilla',
    time: '7:00 - 22:00',
    days: 'Lunes, Miércoles y Viernes',
    price: '11€/hora',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000&q=80',
    description: 'Plaza con acceso fácil a transporte público y estaciones cercanas. Disponible en horarios amplios para mayor comodidad.',
    rating: 4.9,
    reviews: [
      { name: 'Sara', stars: 5, comment: 'Muy buena comunicación y plaza espaciosa.' },
      { name: 'Pablo', stars: 5, comment: 'Ideal para dejar el coche mientras visitas la ciudad.' }
    ]
  }
];

const listingsContainer = document.getElementById('listings');
const citySearch = document.getElementById('citySearch');
const textFilter = document.getElementById('textFilter');
const timeFilter = document.getElementById('timeFilter');
const dayFilter = document.getElementById('dayFilter');
const detailModal = document.getElementById('detailModal');
const closeModal = document.getElementById('closeModal');
const detailImage = document.getElementById('detailImage');
const detailTitle = document.getElementById('detailTitle');
const detailCity = document.getElementById('detailCity');
const detailDays = document.getElementById('detailDays');
const detailTime = document.getElementById('detailTime');
const detailDescription = document.getElementById('detailDescription');
const detailPrice = document.getElementById('detailPrice');
const detailRating = document.getElementById('detailRating');
const reviewsContainer = document.getElementById('reviews');
const contactButton = document.getElementById('contactButton');
const hostForm = document.getElementById('hostForm');
const hostTitle = document.getElementById('hostTitle');
const hostImage = document.getElementById('hostImage');
const hostDescription = document.getElementById('hostDescription');
const hostCity = document.getElementById('hostCity');
const hostTime = document.getElementById('hostTime');
const hostDays = document.getElementById('hostDays');
const hostMonths = document.getElementById('hostMonths');
const hostPrice = document.getElementById('hostPrice');
const hostRating = document.getElementById('hostRating');
const hostMessage = document.getElementById('hostMessage');

function createStarElements(value) {
  const stars = [];
  const rounded = Math.round(value * 2) / 2;
  for (let i = 1; i <= 5; i += 1) {
    if (rounded >= i) {
      stars.push('★');
    } else if (rounded + 0.5 === i) {
      stars.push('☆');
    } else {
      stars.push('☆');
    }
  }
  return stars.join('');
}

function renderListings(items) {
  listingsContainer.innerHTML = items.map(item => `
    <article class="card" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" />
      <div class="card-body">
        <h3>${item.title}</h3>
        <div class="card-meta">
          <span class="badge">${item.city}</span>
          <span>${item.time}</span>
        </div>
        <div class="card-footer">
          <div class="price">${item.price}</div>
          <div class="rating">${createStarElements(item.rating)} <span>${item.rating.toFixed(1)}</span></div>
        </div>
      </div>
    </article>
  `).join('');
}

function applyFilters() {
  const cityValue = citySearch.value.trim().toLowerCase();
  const textValue = textFilter.value.trim().toLowerCase();
  const timeValue = timeFilter.value.trim().toLowerCase();
  const dayValue = dayFilter.value;

  const filtered = listings.filter(listing => {
    const matchesCity = cityValue === '' || listing.city.toLowerCase().includes(cityValue);
    const matchesText = textValue === '' || (`${listing.title} ${listing.description} ${listing.city}`.toLowerCase().includes(textValue));
    const matchesTime = timeValue === '' || listing.time.toLowerCase().includes(timeValue);
    const matchesDay = dayValue === '' || listing.days.toLowerCase().includes(dayValue.toLowerCase());
    return matchesCity && matchesText && matchesTime && matchesDay;
  });

  renderListings(filtered);
  attachCardEvents();
}

function openDetail(id) {
  const item = listings.find(listing => listing.id === id);
  if (!item) return;

  detailImage.src = item.image;
  detailImage.alt = item.title;
  detailTitle.textContent = item.title;
  detailCity.textContent = item.city;
  detailDays.textContent = item.days;
  detailTime.textContent = item.time;
  detailDescription.textContent = item.description;
  detailPrice.textContent = item.price;
  detailRating.innerHTML = `${createStarElements(item.rating)} <span>${item.rating.toFixed(1)} / 5</span>`;
  reviewsContainer.innerHTML = item.reviews.map(review => `
    <div class="review-card">
      <strong>${review.name}</strong>
      <div class="rating">${createStarElements(review.stars)} <span>${review.stars.toFixed(1)}</span></div>
      <p>${review.comment}</p>
    </div>
  `).join('');
  contactButton.href = `mailto:anfitrion+${item.id}@aparca-conmigo.app?subject=Interés%20en%20la%20plaza%20${encodeURIComponent(item.title)}`;

  detailModal.classList.remove('hidden');
  detailModal.setAttribute('aria-hidden', 'false');
}

function closeDetail() {
  detailModal.classList.add('hidden');
  detailModal.setAttribute('aria-hidden', 'true');
}

function attachCardEvents() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      openDetail(Number(card.dataset.id));
    });
  });
}

citySearch.addEventListener('input', applyFilters);
textFilter.addEventListener('input', applyFilters);
timeFilter.addEventListener('input', applyFilters);
dayFilter.addEventListener('change', applyFilters);
closeModal.addEventListener('click', closeDetail);
detailModal.addEventListener('click', event => {
  if (event.target === detailModal) {
    closeDetail();
  }
});

hostForm.addEventListener('submit', event => {
  event.preventDefault();
  const title = hostTitle.value.trim();
  const image = hostImage.value.trim();
  const description = hostDescription.value.trim();
  const city = hostCity.value.trim();
  const time = hostTime.value.trim();
  const days = hostDays.value.trim();
  const months = hostMonths.value.trim();
  const price = hostPrice.value.trim();
  const ratingValue = parseFloat(hostRating.value) || 4.5;

  if (!title || !image || !description || !city || !time || !days || !price) {
    hostMessage.textContent = 'Por favor completa todos los campos obligatorios.';
    return;
  }

  const newId = Math.max(...listings.map(item => item.id), 0) + 1;
  const newListing = {
    id: newId,
    title,
    city,
    time,
    days: `${days}${months ? ` · ${months}` : ''}`,
    price,
    image,
    description,
    rating: ratingValue,
    reviews: [
      { name: 'Plaza nueva', stars: ratingValue, comment: 'Plaza registrada recientemente en la plataforma.' }
    ]
  };

  listings.push(newListing);
  applyFilters();
  hostMessage.textContent = 'Tu plaza se ha publicado correctamente. La verás en el listado.';
  hostForm.reset();
});

renderListings(listings);
attachCardEvents();
