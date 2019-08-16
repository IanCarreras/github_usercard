/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const container = document.querySelector('.cards')
// axios.get('https://api.github.com/users/iancarreras')
//   .then(res => {
//     container.appendChild(createUserCard(res.data))
//     axios.get(`${res.data.followers_url}`)
//       .then(res => {
//         let followers = res.data
//         console.log(followers[0].url)
//         followers.forEach(follower => {
//           container.appendChild(createUserCard(follower))
//           return res
//         })
//       })
//     return res
//   })
//   .catch(err => {
//     return err
//   })
axios.get('https://api.github.com/users/iancarreras')
  .then(res => {
    container.appendChild(createUserCard(res.data))
    return res
  })
  .then(res => {
    axios.get(`${res.data.followers_url}`)
      .then(res => {
        res.data.forEach(follower => {
          axios.get(`${follower.url}`)
          .then(res => {
            container.appendChild(createUserCard(res.data))
            return res
          })
        })
        return res        
      })
    return res
  })
  .catch(err => {
    return err
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];
// followersArray.forEach(follower => {
//   axios.get(`https://api.github.com/users/${follower}`)
//     .then(res => {
//       let card = createUserCards(res.data)
//       container.appendChild(card)
//     })
//     .catch(err => {
//       return err
//     })    
// })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
const createUserCard = (data) => {
  const cardDiv = document.createElement('div')
  const img = document.createElement('img')
  const cardInfoDiv = document.createElement('div')
  const h3 = document.createElement('h3')
  const pTypes = ['username', 'location', 'profile', 'followers', 'following', 'bio']
  const pTags = pTypes.map(type => {
    return type = document.createElement('p')
  })

  cardDiv.classList.add('card')
  img.src = `${data.avatar_url}`
  cardInfoDiv.classList.add('card-info')
  h3.classList.add('name')
  h3.innerText = `${data.name}`
  pTags[0].classList.add('usename')
  pTags[0].innerText = data.login
  pTags[1].innerText = 'Location: ' + data.location 
  pTags[2].innerHTML = `
    Profile: 
    <a href='${data.html_url}'>${data.html_url}</a>
  `
  pTags[3].innerText = 'Followers: ' + data.followers
  pTags[4].innerText = 'Following: ' + data.following
  pTags[5].innerText = 'Bio: ' + data.bio

  cardInfoDiv.appendChild(h3)
  pTags.forEach(tag => {
    cardInfoDiv.appendChild(tag)
  })
  cardDiv.appendChild(img)
  cardDiv.appendChild(cardInfoDiv)
  return cardDiv
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
