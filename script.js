const fromLang = document.querySelector("#fromLang");
const toLang = document.querySelector("#toLang");
const btnTranslate = document.querySelector("#btnTranslate")
const fromText = document.querySelector("#from-text")
const toText = document.querySelector("#to-text")
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");
// console.log(languages);
for (let lang in languages) {
    // console.log(lang, languages[lang]); 
    // For in döngüsünde key ve value bu şekilde yazılır.
    let option = `<option value="${lang}">${languages[lang]}</option>`;
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);
    fromLang.value = "tr-TR"
    toLang.value = "en-GB"
}
btnTranslate.addEventListener("click", () => {
    let text = fromText.value;
    // console.log(text);
    let from = fromLang.value;
    let to = toLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText

        })
})
exchange.addEventListener("click", () => {
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;
    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
})
for (let icon of icons) {
    icon.addEventListener("click", (element) => {
        if (element.target.classList.contains("fa-copy")) {
            if (element.target.id == "left") {
                // copy property
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
                // console.log("right copy");
            }
        } else {
            let utterance;
            if (element.target.id == "left") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance);
        }
    })
}