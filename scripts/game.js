function loadPlayers(){
    let getVal = new URLSearchParams(window.location.search);
    if(getVal.get("name") === null) 
        return false;
    return getVal.get("name").split(',');
}

function decideTurn(previousTurn, playerLength){
    if(!playerLength !== 1)
        return (previousTurn + 1) % playerLength;
    else return 1;
}

$(function(){
    const players = loadPlayers();
    if(!players){
        alert("nama player gagal di load, mengembalikan anda ke halaman login");
        window.location.href = "index.html";
        return;
    }

    let playerTurn = 0;
    const playerTurnDisplay = $("#playerTurnDisplay");
    const playerListUI = $("#playerList");
    const volumeIcon = $("#volumeIcon");

    // updates everything, used on all event when it's done
    function bringUpdate(){
        if(!players) 
            return;

        const playerList = players.map((p, index) => {
            return `<tr>
                <td ${index === playerTurn ? 'class="bg-green"': ""}>
                    <b>${p}</b>
                </td>
            </tr>`
        });
        playerListUI.html(`${playerList.join("\n")}`);

        playerTurnDisplay.html(`${players[playerTurn]}'s Turn`);
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
    })

    bringUpdate();
})