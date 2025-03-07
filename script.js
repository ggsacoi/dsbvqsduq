 // ⚡ Connexion à Supabase (remplace par tes infos)
 const SUPABASE_URL = "https://njipfgiiyompcwwqcwdh.supabase.co";  // Ton URL Supabase
 const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaXBmZ2lpeW9tcGN3d3Fjd2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNzc4NDEsImV4cCI6MjA1Njk1Mzg0MX0.ngQ2CXCxhh9yPntzBf5VLdtNqSnKlRx_ckj0cF4962s";  // Ta clé API Supabase (service_role si backend)
 const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
 console.log("✅ Supabase configuré !");
 navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    sendPosition(latitude, longitude);
});

 // 🔄 Fonction pour envoyer la position GPS à Supabase
 async function sendPosition(latitude, longitude) {
     const { data, error } = await supabase
         .from("positions") // Nom de ta table
         .insert([{ latitude, longitude, timestamp: new Date() }]);

     if (error) {
         console.error("❌ Erreur en envoyant la position:", error.message);
     } else {
         console.log("✅ Position envoyée avec succès:", data);
     }
 }

 // 🌍 Affichage de la carte Google Maps
 function updateMap(latitude, longitude) {
     document.getElementById("map").innerHTML = 
         `<iframe width="100%" height="100%" 
             src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed">
         </iframe>`;
 }

 // ⏳ Suivi de la position toutes les 5 secondes
 function trackPosition() {
     if ("geolocation" in navigator) {
         navigator.geolocation.watchPosition(position => {
             const { latitude, longitude } = position.coords;
             
             // 📍 Mise à jour de la carte et envoi à Supabase
             updateMap(latitude, longitude);
             sendPosition(latitude, longitude);

         }, error => {
             console.error("❌ Erreur de géolocalisation:", error);
         }, {
             enableHighAccuracy: true, // Plus précis mais consomme plus de batterie
             maximumAge: 0, 
             timeout: 5000 
         });

     } else {
         console.log("⚠️ La géolocalisation n'est pas supportée par ce navigateur.");
     }
 }

 // 🚀 Lancer le tracking GPS
 trackPosition();