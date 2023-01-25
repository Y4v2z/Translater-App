const fromLang = document.querySelector("#fromLang");
const toLang = document.querySelector("#toLang");
const btnTranslate = document.querySelector("#btnTranslate")
const fromText = document.querySelector("#from-text")
const toText = document.querySelector("#to-text")
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");
// Languages isimli Js dosyasından dillerin alınması(diller der kaynağından alındı)
for (let lang in languages) {
    // console.log(languages);
    // console.log(lang, languages[lang]);
    let option = `<option value="${lang}">${languages[lang]}</option>`;
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);
    fromLang.value = "tr-TR"
    toLang.value = "en-GB"
}
// Bu kısım hoca tarafından yapıldı. "btn click" olayı ile gerçeleşek iş aynı anda yazıldı ancak ben bunu aşağıda ayırdım. ayrıca "enter" key downu ekledim.
// btnTranslate.addEventListener("click", () => {
//     let text = fromText.value;
//     // console.log(text);
//     let from = fromLang.value;
//     let to = toLang.value;
//     const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             toText.value = data.responseData.translatedText

//         })
// })
btnTranslate.addEventListener("click", () => {
    translate();
})
fromText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        translate();

    };
})
// Burada ise hocanın yaptığından farklı olarak "click" ayrı ele alınmaış olup sorgu da fonksiyon içinde yapılmıştır.
function translate() {
    let text = fromText.value;
    console.log(text);
    let from = fromLang.value;
    let to = toLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText
        })
}
translate();

// bu kısım işlemin asekron olarak yapılma şekli.
// async function translate() {
//     try {
//         let text = fromText.value;
//         let from = fromLang.value;
//         let to = toLang.value;
//         const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
//         const response = await fetch(url)
//         const data = await response.json();
//         toText.value = data.responseData.translatedText;

//     }
//     catch (error) {
//     }
// }
// Eğer sorgudan sonra cevabın gelip gelmediğini kontrol etmek istiyorsan if bloğu ile bunu yaparsın. cevabın gelmediği durumdaki 
// hata mesajı dışarıda yazılacak bir fonksiyon Ör: renderError gibi yakalanır. 
// if(!response.ok){
//     throw new Error("request failure")
// } bunun catch bloğunda yakalanması için dışarıdaki fonksiyon ile yaparsın.
// translate();
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
