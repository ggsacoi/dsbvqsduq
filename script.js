// let video = document.querySelector('video');
// if(navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({ video: true })
//     .then(function(stream) {
//         video.srcObject = stream;
//     })
//     .catch(function(error) {
//         console.log("Error: " + error);
//     });
// }
navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // Show a map centered at latitude / longitude.

  map.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/Co6J330sC18" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
});
addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("snap");
    const theme = localStorage.getItem('theme');
    const audio = document.querySelector('audio');
    if(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if(theme === 'dark') {
            toggle.checked = true;
        }
    }
    toggle.addEventListener("change", () => {
        const newTheme = toggle.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        audio.play();
    });
});
