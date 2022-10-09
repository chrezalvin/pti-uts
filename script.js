// shorthand for doc ready
$(function(){

    const inputPlayer = $("#playerName");
    const addPlayerBtn = $("#addPlayerBtn")
    const playGameBtn = $("#playGameBtn")

    const players = [];
    let playercnt = 0;

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
        ++playercnt;
        if (playercnt == 1) {
            $("#noplayer").html("2nd Player");
        }
        if (playercnt == 2) {
            $("#noplayer").html("3rd Player");
        }
        if (playercnt == 3) {
            $("#noplayer").html("4th Player");
        }
        if (playercnt == 4) {
            $("#noplayer").html("Maxed!");
        }
        bringUpdate();
    })


    playGameBtn.on("click", () => {
        if (playercnt >= 1) {
            window.location.href = 'game.html';
        return false;
        }
        
    })
})