let portfoliocontainer = document.querySelector('#portfolioinnhold');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB8u7h63V8_k5N_6uAY1e5o3tGRPVF5Tns",
    authDomain: "portfolio-1aef4.firebaseapp.com",
    projectId: "portfolio-1aef4",
    storageBucket: "portfolio-1aef4.appspot.com",
    messagingSenderId: "526450019123",
    appId: "1:526450019123:web:958233c56476639d6a0c46"
  };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);


const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = flamelink({
  firebaseApp,
  dbType: 'cf' // cloud firestore
});

app.content.get({
    schemaKey: 'portfolioprosjekt', // navnet på schema-et ditt
    orderBy: 'order',
    populate: [{
      field: 'prosjektbilde',
      size: {
        height: 9999,
        quality: 1,
        width: 667
      }
    }]
  })
  .then(projects => {
    console.log('Project:', projects)
    let html = '' ;
    let teller = 0;
    for(const property in projects) {
        let proj = projects[property];
        let iseven = teller % 2 === 0;
        if(iseven) {
            html += `
            <a class="prosjektlink" href="/prosjekt.html?id=${proj.id}">
            <div class="prosjekt imgfirst">
            <img class="prosjektimg" src="${proj.prosjektbilde[0].url}">
                <div class="protext">
                    <h3 class="prosjekttittel">${proj.prosjekttittel}</h3>
                    <p class="fagfelt">${proj.ferdigheter}</p>
                </div>
            </div>
            </a>
            `;  
        } else {
            html += `
            <a class="prosjektlink" href="/prosjekt.html?id=${proj.id}">
            <div class="prosjekt textfirst">
                <div class="protext">
                    <h3 class="prosjekttittel">${proj.prosjekttittel}</h3>
                    <p class="fagfelt">${proj.ferdigheter}</p>
                </div>
                <img class="prosjektimg" src="${proj.prosjektbilde[0].url}">
            </div>
            </a>
        `;
        }
        teller++;
    }

    portfoliocontainer.innerHTML = html;
  })
  .catch(error => { console.error('Error', error); })