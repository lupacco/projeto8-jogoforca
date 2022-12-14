import styled from 'styled-components';

const alphabet = ["A","B","C","D","E","F","G","H","I","J",
"K","L","M","N","O","P","Q","R","S","T",
"U","V","W","X","Y","Z"];

export default function Letras(props){
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    function testLetter(event){
        let letter = event.target.textContent.toLowerCase()
        if(!props.gameStarted || props.testedLetters.includes(letter)){
            return
        }
        let progress = props.wordToBeFilled
        let word = String(props.word)
        if(word.includes(letter)){
            for(let i=0; i<word.length; i++){
                if(word[i] === letter){
                    progress = setCharAt(progress,i*2,word[i])
                    props.setWordToBeFilled(progress)
                }
            }    
        }else{
            props.setGameStep(props.gameStep + 1)
        }
        event.target.classList.remove('letter-enabled')
        event.target.classList.add('letter-disabled')
        const newTestedLetters = [...props.testedLetters, letter]
        props.setTestedLetters(newTestedLetters)
    }

    function revealWord(){
        let word = props.word
        let progress = props.wordToBeFilled
        for(let i=0; i<word.length; i++){
            progress = setCharAt(progress,i*2,word[i])
            props.setWordToBeFilled(progress)
        }
    }
    
    function checkEndGame(){
        if(!props.wordToBeFilled.includes('_') && props.wordToBeFilled && props.gameStarted){
            console.log('Parabéns, você vencêu!')
            props.setUserWin(true)
            props.setGameStarted(false)
        }
        else if(props.gameStep === 6){
            console.log(`Você perdeu! a palavra correta era ${props.word}`)
            props.setUserWin(false)
            props.setGameStarted(false)
            revealWord()
        }
    }
    checkEndGame()

    return(
        <LetrasContainer>
            <section>
                {alphabet.map((letter, index) => {
                    return(
                        <button data-test="letter" key={index} onClick={testLetter} className={`letter ${props.gameStarted ? "letter-enabled" : "letter-disabled"}`}>
                            {letter}
                        </button>
                    )
                })}
            </section>
        </LetrasContainer>
    )
}

const LetrasContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;

    section{
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-auto-flow: column;
    margin: 0 128px;
    }

    .letter{
        margin: 4px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        border: solid 1px #7AA7C7;
    }
    .letter-disabled{
        color: #798A9F;
        background: #9FAAB5;
    }
    .letter-enabled{
        color: #39739D;
        background-color: #E1ECF4;
    }
    .letter:hover{
        cursor: pointer;
    }
`