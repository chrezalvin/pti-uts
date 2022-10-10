function loadPlayers(){
    let getVal = new URLSearchParams(window.location.search);
    if(getVal.get("name") === null) 
        return false;
    return getVal.get("name").split(',');
}

function decideTurn(previousTurn, playerLength){
    if(playerLength !== 1)
        return (previousTurn + 1) % playerLength;
    else return 1;
}

$(function(){
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

    const bone = $(".bone");

    // updates everything, used on all event when it's done
    function bringUpdate(){
        if(!players) 
            return;

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

    volumeIcon.on("click", () =>{
        const mute = "bi-volume-mute";
        const up = "bi-volume-up";

        if(volumeIcon.hasClass(mute)){
            volumeIcon.addClass(up);
            volumeIcon.removeClass(mute);
        }
        else{
            volumeIcon.addClass(mute);
            volumeIcon.removeClass(up);
        }

        bringUpdate();
    })

    bone.on("click", function(e){
        const rng = Math.random();
        if(rng < (0.25 / players.length)){
            alert(`You woke up spike!, now he's angy :(`);
        }

        ++players[playerTurn].boneCount;
        playerTurn = decideTurn(playerTurn, players.length);
        this.remove();
        bringUpdate()
    })

    bringUpdate();
})