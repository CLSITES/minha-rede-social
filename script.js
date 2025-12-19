const firebaseConfig = {
  apiKey: "AIzaSyCibPIyt2ke5bS7uz-rlDihVqUxOh9OQJc",
  authDomain: "minha-rede-social-ccf8d.firebaseapp.com",
  projectId: "minha-rede-social-ccf8d",
  storageBucket: "minha-rede-social-ccf8d.firebasestorage.app",
  messagingSenderId: "164222245470",
  appId: "1:164222245470:web:56638419c5f0c8db26f2cf"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

function register() {
  auth.createUserWithEmailAndPassword(
    email.value, password.value
  );
}

function login() {
  auth.signInWithEmailAndPassword(
    email.value, password.value
  );
}

auth.onAuthStateChanged(user => {
  if (user) {
    auth.style.display = "none";
    app.style.display = "block";
    loadFeed();
  }
});

function postImage() {
  const file = image.files[0];
  const ref = storage.ref("posts/" + Date.now());
  ref.put(file).then(() => {
    ref.getDownloadURL().then(url => {
      db.collection("posts").add({ image: url });
      loadFeed();
    });
  });
}

function loadFeed() {
  feed.innerHTML = "";
  db.collection("posts").get().then(snapshot => {
    snapshot.forEach(doc => {
      feed.innerHTML += `<img src="${doc.data().image}">`;
    });
  });
}
