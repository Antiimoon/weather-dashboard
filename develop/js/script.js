class CurrentLocation {
    constructor() {
        this._name = "Current Location";
        this.unit = "imperial";
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    getUnit() {
        return this._unit;
    }

    setUnit(unit) {
        this._unit = unit;
    }
}

const getGeoWeather = (event) => {
    if (event) {
        if (event.type === "click") {
            const mapIcon = document.querySelector(".fa-map-marker-alt");
            addSpinner(mapIcon);
        }
    }
    if (!navigator.geolocation) geoError();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};


const geoError = (errObj) => {
    const errMsg = errObj.message ? errObj.message : "Geolocation not supported";
    displayError(errMsg, errMsg);
}

const addSpinner = (element) => {
    animateButton(element);
    setTimeout(animateButton, 1000, element);
};

const displayError = (headerMsg, srMsg) => {
    updateWeatherLocationHeader(headerMsg);
    updateScreenReaderConfirmation(srMsg);
};

const updateWeatherLocationHeader = (message) => {
    const h1 = document.getElementById("currentforecast-location");
    h1.textContent = message;
};

const updateScreenReaderConfirmation = (message) => {
    document.getElementById("confirmation").textContent = message;
};





