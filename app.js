const button = document.querySelector('#button')
const audioElement = document.querySelector('#audio')
//Passing our Joke to VoiceRSS 
const tellMe = (joke) =>{
    VoiceRSS.speech({
        key: "42bd633a29b54c72a991a78d595e81a7",
        src: `${joke}`,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
      });
} 

//Get Jokes from joke API
const getJokes = async()=>{
    let joke ='';
    const apiUrl = `https://v2.jokeapi.dev/joke/Programming?type=twopart`
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data);
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`
        }else{
            joke = data.joke
        }
        //text-to speech
        tellMe(joke)
        //Disable Button
        toogleButton()
    } catch (error) {
        console.log(`Error Occured of ${error}`);
    }
}
// Disable / Enable button 
const toogleButton =()=>{
    button.disabled = !button.disabled;
}

//Event Listners 
button.addEventListener('click',getJokes)
audioElement.addEventListener('ended',toogleButton)