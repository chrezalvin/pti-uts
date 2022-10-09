// shorthand for doc ready
$(function(){

    const inputPlayer = $("#playerName");
    const addPlayerBtn = $("#addPlayerBtn")
    const playGameBtn = $("#playGameBtn")

    const players = [];

    // updates everything, used on all event when it's done
    function bringUpdate(){
        const playerListRender = players.map((player, index) => `<tr><th>#${index + 1}</th><td>${player}</td></tr>`)
        $("#playerList").html(`
        <table class="table table-light">
        <thead>
            <tr>
                <th colspan="2" class="text-center">Player List</th>
            </tr>
        </thead>
        <tbody>
            ${playerListRender.join('\n')}
        </tbody>
        </table>
        `);

        if(players.length > 3){
            inputPlayer.attr("disabled", true);
            inputPlayer.attr("placeholder", "maximum player reached!");
            addPlayerBtn.attr("disabled", true);
        }

        switch(players.length){
            case 1: $("#noplayer").html("2nd Player"); break;
            case 2: $("#noplayer").html("3rd Player"); break;
            case 3: $("#noplayer").html("4th Player"); break;
            default: $("#noplayer").html("Maxed!"); break;
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
        if(players.length === 0){
            alert("pemain tidak ada, harap tulis minimal satu nama pemain!");
            return;
        }

        window.location.href = `game.html?name=${players.join(',')}`;
    })
})