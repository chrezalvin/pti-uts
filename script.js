function firstSecondMaker(count){
    switch(count){
        case 1: return "1st";
        case 2: return "2nd";
        case 3: return "3rd";
        default: return `${count}th`;
    }
}

function hideBootstrap(){

}

function flipPage(){
    const lobbyPage = $("#lobby");
    const playPage = $("#play");

    if(lobbyPage.hasClass("visually-hidden")){
        lobbyPage.removeClass("visually-hidden");
        playPage.addClass("visually-hidden");
    }
    else{
        playPage.removeClass("visually-hidden");
        lobbyPage.addClass("visually-hidden");
    }
}

// shorthand for doc ready
$(function(){

    const inputPlayer = $("#playerName");
    const addPlayerBtn = $("#addPlayerBtn");
    const playGameBtn = $("#playGameBtn");

    const players = [];
    const playerCountUI = $("#playerCount");

    // updates everything, used on all event when it's done
    function bringUpdate(){
        const playerListRender = players.map((player) => `<li>${player}</li>`)
        $("#playerList").html(`
        <h3>Player List:</h3>
        ${playerListRender.join('\n')}
        `);

        if(players.length > 3){
            inputPlayer.attr("disabled", true);
            inputPlayer.attr("placeholder", "maximum player reached!");
            addPlayerBtn.attr("disabled", true);
        }
    }

    inputPlayer.on("keydown", (e) => {
        if(e.key === "Enter")
            addPlayerBtn.trigger("click");
    })

    addPlayerBtn.on("click", () => {
        if(inputPlayer.val() === "") return;
        if(players.find((name) => name === inputPlayer.val()))
        {
            alert("terdapat nama peserta yang sama, mohon diganti dengan nama lain");
            return;
        }

        players.push(inputPlayer.val());
        inputPlayer.val("");
        inputPlayer.trigger("focus");
        
        bringUpdate();
    })

    playGameBtn.on("click", () => {
        flipPage();
        console.log("game play"); // TODO
    })
})