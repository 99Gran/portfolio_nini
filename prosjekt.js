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

// hent inn referanser til html-elementer
let prosjektContent = document.querySelector('#prosjektinnhold');

// hent id fra url
const queryString = window.location.search; // "?id=asdfasdfasdf"
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

app.content.get({
    schemaKey: 'portfolioprosjekt', // navnet på schema-et ditt
    entryId: id,
    populate: [
      {
        field: 'bilder', // originalt 'mainImage'
        size: {
          height: 9999,
          quality: 1,
          width: 667
        }
      },
      {
        field: 'video', // originalt 'mainImage'
        size: {
          height: 9999,
          quality: 1,
          width: 667
        }
      }
    ]
  })
  .then(project => {
    console.log('Project:', project)
    let html = `

      <div class="forside" class=flexbox>
            <div id="fargeboks"  class="top-banner" style="background-color:${project.field_1612344323244}">
              <h1 id="tittel">${project.prosjekttittel}</h1>
              <h2 id="ferdighet">${project.ferdigheter}</h2>
                  <h3 class="ingress">${project.ingress}</h3>
                    <p id="brodtekst" class="introside">${project.prosjektbrodtekst}</p>
                      <h4 id="prosjekteier">${project.prosjekteier}</h4>
                <button class="knapp">${project.linkUrl? `<a href="${project.linkToWebsite}" target="_blank">Link til prosjekt-nettsiden</a>` : "" }</button>
            </div>
        </div>

        <div class="bilder">
          ${project.bilder.map(img => `<img src="${img.url}">`).join('')}
        </div>

      ${project.video.length > 0 ? `
        <div class="video">
          <video width="1280" height="720" controls>
            <source src="${project.video[0].url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      ` : ''}
    `;

    prosjektContent.innerHTML = html;
  })
  .catch(error => { console.error('Error', error); })