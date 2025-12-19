// 🔑 CONFIGURAÇÃO DO FIREBASE (suas chaves aqui)
const firebaseConfig = {
  apiKey: "AIzaSyCibPIyt2ke5bS7uz-rlDihVqUxOh9OQJc",
  authDomain: "minha-rede-social-ccf8d.firebaseapp.com",
  projectId: "minha-rede-social-ccf8d",
  storageBucket: "minha-rede-social-ccf8d.firebasestorage.app",
  messagingSenderId: "164222245470",
  appId: "1:164222245470:web:56638419c5f0c8db26f2cf"
};

// 🔥 Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// 🔧 Serviços
const firebaseAuth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// 🎯 ELEMENTOS DA TELA
const authDiv = document.getElementById("auth");
const appDiv = document.getElementById("app");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const imageInput = document.getElementById("image");
const feedDiv = document.getElementById("feed");

// 🧑‍💻 CADASTRAR
function register() {
  firebaseAuth
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(() => alert("Usuário cadastrado com sucesso!"))
    .catch(err => alert(err.message));
}

// 🔐 LOGIN
function login() {
  firebaseAuth
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
}

// 👀 VERIFICA LOGIN
firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    authDiv.style.display = "none";
    appDiv.style.display = "block";
    loadFeed();
  }
});

// 📤 POSTAR IMAGEM
function postImage() {
  const file = imageInput.files[0];
  if (!file) {
    alert("Selecione uma imagem");
    return;
  }

  const ref = storage.ref("posts/" + Date.now());
  ref.put(file).then(() => {
    ref.getDownloadURL().then(url => {
      db.collection("posts").add({ image: url }).then(loadFeed);
    });
  });
}

// 📰 CARREGAR FEED
function loadFeed() {
  feedDiv.innerHTML = "";
  db.collection("posts").get().then(snapshot => {
    snapshot.forEach(doc => {
      const img = document.createElement("img");
      img.src = doc.data().image;
      feedDiv.appendChild(img);
    });
  });
}
