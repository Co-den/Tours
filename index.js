var $eOCCT$axios = require("axios");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/* eslint-disable */ /* eslint-disable */ const $da7c3a1cbc8b150a$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy',
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';
        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);
        // Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    console.log('Fitting map bounds to locations');
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};


/* eslint-disable */ 
/* eslint-disable */ const $2aa7e4f71e700ad4$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
    console.log('Alert hidden');
};
const $2aa7e4f71e700ad4$export$de026b00723010c1 = (type, msg, time = 7)=>{
    $2aa7e4f71e700ad4$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    console.log(`Alert shown: ${type} - ${msg}`);
    window.setTimeout($2aa7e4f71e700ad4$export$516836c6a9dfc573, time * 1000);
};


const $7e2e6df33960c717$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await (0, ($parcel$interopDefault($eOCCT$axios)))({
            method: "POST",
            url: "http://127.0.0.1:3000/api/v1/users/login",
            data: {
                email: email,
                password: password,
                withCredentials: true
            }
        });
        if (res.data.status === "success") {
            (0, $2aa7e4f71e700ad4$export$de026b00723010c1)("success", "Logged in successfully!");
            window.setTimeout(()=>{
                console.log("Redirecting to home page...");
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        console.log("Login failed for email:", email);
        console.log("Error details:", err.response); // Log the full error response
        (0, $2aa7e4f71e700ad4$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $7e2e6df33960c717$export$7200a869094fec36 = async (name, email, password, passwordConfirm)=>{
    try {
        const res = await (0, ($parcel$interopDefault($eOCCT$axios)))({
            method: "POST",
            url: "http://127.0.0.1:3000/api/v1/users/signup",
            data: {
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            }
        });
        if (res.data.status === "success") {
            (0, $2aa7e4f71e700ad4$export$de026b00723010c1)("success", "Signed up successfully!");
            window.setTimeout(()=>{
                console.log("Redirecting to home page...");
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        console.log("Signup failed for email:", email);
        console.log("Error details:", err.response); // Log the full error response
        (0, $2aa7e4f71e700ad4$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $7e2e6df33960c717$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await (0, ($parcel$interopDefault($eOCCT$axios)))({
            method: "GET",
            url: "http://127.0.0.1:3000/api/v1/users/logout"
        });
        res.data.status = "success";
        console.log("Logout successful");
        (0, $2aa7e4f71e700ad4$export$de026b00723010c1)("success", "Logout successful");
        location.reload(true);
    } catch (err) {
        console.log("Logout failed");
        (0, $2aa7e4f71e700ad4$export$de026b00723010c1)("error", "Error logging out! Try again.");
    }
};


/* eslint-disable */ 

const $ad27d9687e6e2901$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';
        console.log(`Updating ${type} settings`);
        const res = await (0, ($parcel$interopDefault($eOCCT$axios)))({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res.data.status === 'success') {
            console.log(`${type.toUpperCase()} updated successfully`);
            (0, $2aa7e4f71e700ad4$export$de026b00723010c1)('success', `${type.toUpperCase()} updated successfully!`);
        }
    } catch (err) {
        console.log(`Error updating ${type} settings:`, err.response.data.message);
        (0, $2aa7e4f71e700ad4$export$de026b00723010c1)('error', err.response.data.message);
    }
};



// DOM ELEMENTS
const $443a3c75b7aa6a72$var$mapBox = document.getElementById("map");
const $443a3c75b7aa6a72$var$signupForm = document.querySelector(".form--signup");
const $443a3c75b7aa6a72$var$loginForm = document.querySelector(".form--login");
const $443a3c75b7aa6a72$var$logOutBtn = document.querySelector(".nav__el--logout");
const $443a3c75b7aa6a72$var$userDataForm = document.querySelector(".form-user-data");
const $443a3c75b7aa6a72$var$userPasswordForm = document.querySelector(".form-user-password");
const $443a3c75b7aa6a72$var$bookBtn = document.getElementById("book-tour");
// DELEGATION
if ($443a3c75b7aa6a72$var$mapBox) {
    const locations = JSON.parse($443a3c75b7aa6a72$var$mapBox.dataset.locations);
    console.log("Displaying map with locations:", locations);
    (0, $da7c3a1cbc8b150a$export$4c5dd147b21b9176)(locations);
}
if ($443a3c75b7aa6a72$var$signupForm) $443a3c75b7aa6a72$var$signupForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    console.log("Signing up with email:", email);
    (0, $7e2e6df33960c717$export$7200a869094fec36)(name, email, password, passwordConfirm);
});
if ($443a3c75b7aa6a72$var$loginForm) $443a3c75b7aa6a72$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("Logging in with email:", email);
    (0, $7e2e6df33960c717$export$596d806903d1f59e)(email, password);
});
if ($443a3c75b7aa6a72$var$logOutBtn) $443a3c75b7aa6a72$var$logOutBtn.addEventListener("click", ()=>{
    console.log("Logging out user");
    (0, $7e2e6df33960c717$export$a0973bcfe11b05c9)();
});
if ($443a3c75b7aa6a72$var$userDataForm) $443a3c75b7aa6a72$var$userDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    console.log("Updating user data");
    (0, $ad27d9687e6e2901$export$f558026a994b6051)(form, "data");
});
if ($443a3c75b7aa6a72$var$userPasswordForm) $443a3c75b7aa6a72$var$userPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    console.log("Updating user password");
    await (0, $ad27d9687e6e2901$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
});
const $443a3c75b7aa6a72$var$alertMessage = document.querySelector("body").dataset.alert;
if ($443a3c75b7aa6a72$var$alertMessage) {
    console.log("Showing alert message:", $443a3c75b7aa6a72$var$alertMessage);
    (0, $2aa7e4f71e700ad4$export$de026b00723010c1)("success", $443a3c75b7aa6a72$var$alertMessage, 20);
}


//# sourceMappingURL=index.js.map
