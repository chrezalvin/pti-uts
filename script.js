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

        switch(playercnt){
            case 1: $("#noplayer").html("2nd Player"); break;
            case 2: $("#noplayer").html("3rd Player"); break;
            case 3: $("#noplayer").html("4th Player"); break;
            default: $("#noplayer").html("Maxed!"); break;
        }
    }

    inputPlayer.on("keydown", (e) => {
        if(e.key === "Enter")
            addPlayerBtn.trigger("click");

        console.log(e.currentTarget.value.length)
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
        bringUpdate();
    })


    playGameBtn.on("click", () => {
        if (playercnt >= 1) {
            window.location.href = 'game.html';
        return false;
        }
        
    })
})