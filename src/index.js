// Fetch all ramen images and display them in the #ramen-menu div
function fetchRamen() {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramenData => {
      ramenData.forEach(ramen => {
        const img = document.createElement('img')
        img.src = ramen.image
        img.alt = ramen.name
        img.dataset.id = ramen.id
        document.querySelector('#ramen-menu').append(img)
      })
    })
}

// Show the details of the selected ramen in the #ramen-detail div
function showRamenDetails(ramenId) {
  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(ramenData => {
      const ramenImg = document.querySelector('#ramen-detail img')
      ramenImg.src = ramenData.image
      ramenImg.alt = ramenData.name
      document.querySelector('#ramen-detail h2').textContent = ramenData.name
      document.querySelector('#ramen-detail h3').textContent = ramenData.restaurant
      document.querySelector('#ramen-rating-display').textContent = ramenData.rating
      document.querySelector('#ramen-comment-display').textContent = ramenData.comment
      document.querySelector('#ramen-rating').value = ramenData.rating
      document.querySelector('#ramen-comment').value = ramenData.comment
      document.querySelector('#ramen-id').value = ramenData.id
    })
}

// Create a new ramen and display it in the #ramen-menu div
function addNewRamen(event) {
  event.preventDefault()

  const ramenData = {
    name: event.target.name.value,
    restaurant: event.target.restaurant.value,
    image: event.target.image.value,
    rating: event.target.rating.value,
    comment: event.target['new-comment'].value
  }

  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ramenData)
  })
    .then(response => response.json())
    .then(ramen => {
      const img = document.createElement('img')
      img.src = ramen.image
      img.alt = ramen.name
      img.dataset.id = ramen.id
      document.querySelector('#ramen-menu').append(img)
      event.target.reset()
    })
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  fetchRamen()
  showRamenDetails(1)
})

document.querySelector('#ramen-menu').addEventListener('click', event => {
  if (event.target.matches('img')) {
    showRamenDetails(event.target.dataset.id)
  }
})

document.querySelector('#new-ramen').addEventListener('submit', addNewRamen)