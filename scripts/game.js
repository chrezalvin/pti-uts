$(function(){
    function loadPlayers(){
        let getVal = new URLSearchParams(window.location.search);
        if(getVal.get("name") === null) 
            return false;
        return getVal.get("name").split(',');
    }
    
    function decideTurn(previousTurn, playerLength){
        console.log(playerLength);
        if(playerLength !== 1)
            return (previousTurn + 1) % playerLength;
        else return 0;
    }
    
    function muteElement(element){
        element.muted = true;
    }
    
    function unmuteElement(element){
        element.muted = false;
    }

    function playSound(selector){
        $(selector)[0].play();
    }

    let players = loadPlayers();
    if(!players){
        alert("nama player gagal di load, mengembalikan anda ke halaman login");
        window.location.href = "index.html";
        return;
    }

    players = players.map(name => {return {name: name, boneCount: 0}});

    let playerTurn = 0;
    const playerTurnDisplay = $("#playerTurnDisplay");
    const playerListUI = $("#playerList");
    const volumeIcon = $("#volumeIcon");
    const spike = $("#spike");
    const backBtn = $("#backBtn");
    const boneRoom = $("#boneRoom");
    const restartBtn = $("#restart");

    const bone = $(".bone");

    let gameOverFlag = false;

    // updates everything, used on all event when it's done
    function bringUpdate(){
        if(!players) return;

        if(gameOverFlag) {
            $("#gameOverOptions").removeClass("visually-hidden");
            return;
        }
        else{
            const gameOverOptions = $("#gameOverOptions");
            if(!gameOverOptions.hasClass("visually-hidden"))
                gameOverOptions.addClass("visually-hidden");
        }

        const playerList = players.map((p, index) => {
            return `<tr ${index === playerTurn ? 'class="bg-green"': ""}>
                <td>
                    <b>${p.name}</b>
                </td>
                <td>${p.boneCount}</td>
            </tr>`
        });
        playerListUI.html(`${playerList.join("\n")}`);
        
        playerTurnDisplay.html(`${players[playerTurn].name}'s Turn`);
    }

    function generateBones(amount){
        const myArr = [];
        const randomizer = Array(Math.ceil(amount * 5 / 100)).fill(0).map(_ => Math.ceil(Math.random() * amount));
        console.log(randomizer)
        for(let iii = 0; iii < amount; ++iii){
            myArr.push(`
            <div class="col-1">
                <img src="./assets/bone-icon.svg" class="bone ${randomizer.find(v => v === iii) ? "wake-up": ""}" style="height: 40px;">
            </div>`)
        }

        boneRoom.html(myArr.join('\n'));

        const bone = $(".bone");

        bone.on("mouseover", () =>{
            playSound("#pop");
        })
    
        bone.on("click", function(e){
            if(gameOverFlag) return;

            playSound("#boneCollect");
            if(this.classList.contains("wake-up")){
                gameOver();
                return;
            }
    
            ++players[playerTurn].boneCount;
            playerTurn = decideTurn(playerTurn, players.length);
            this.remove();
            bringUpdate()
        })
    }

    generateBones(10 * players.length);

    function gameOver(){
        gameOverFlag = true;
        playerTurnDisplay.html(`${players[playerTurn].name} has woken up Spike!`);
        bone.off("click");
        spike.attr("src", "./assets/dog-awake.jpg");
        playSound("#dogBark");
        bringUpdate();
    }

    volumeIcon.on("click", () =>{
        const mute = "bi-volume-mute";
        const up = "bi-volume-up";

        const audios = $("audio");

        if(volumeIcon.hasClass(mute)){
            volumeIcon.addClass(up);
            volumeIcon.removeClass(mute);

            audios.each((_, elem) => unmuteElement(elem));
        }
        else{
            volumeIcon.addClass(mute);
            volumeIcon.removeClass(up);

            audios.each((_, elem) => muteElement(elem));
        }

        bringUpdate();
    })

    // waking up spike by clicking
    spike.on("click", () => gameOver())

    restartBtn.on("click", ()=> {
        players = players.map(name => {return {...name, boneCount: 0}});
        boneRoom.html("");
        generateBones(10 * players.length);
        spike.attr("src", "./assets/dog-sleep.gif");
        gameOverFlag = false;
        bringUpdate();
    })

    backBtn.on("click", () =>{
        window.location.href = `index.html?name=${players.map(player => player.name).join(',')}`;
    })
    $("#backMenu").on("click", () => {
        window.location.href = `index.html`;
    })


    bringUpdate();
})