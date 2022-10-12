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

    const bone = $(".bone");

    let gameOverFlag = false;

    // updates everything, used on all event when it's done
    function bringUpdate(){
        if(!players) return;

        if(gameOverFlag) return;

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

    function gameOver(){
        gameOverFlag = true;
        playerTurnDisplay.html(`${players[playerTurn].name} has woken up Spike!`);
        bone.off("click");
        spike.attr("src", "./assets/dog-awake.jpg");
        playSound("#dogBark");
    }

    function gameWin(){

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

    bone.on("mouseover", () =>{
        playSound("#pop");
    })

    bone.on("click", function(e){
        playSound("#boneCollect");
        const rng = Math.random();
        if(rng < (0.25 / players.length)){
            gameOver();
            return;
        }

        ++players[playerTurn].boneCount;
        playerTurn = decideTurn(playerTurn, players.length);
        this.remove();
        bringUpdate()
    })

    spike.on("click", () => gameOver())

    backBtn.on("click", () =>{
        window.location.href = `index.html?name=${players.map(player => player.name).join(',')}`;
    })

    bringUpdate();
})