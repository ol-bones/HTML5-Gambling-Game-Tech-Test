class Game {
    constructor() {
        this.m_GameElements = [];
        this.m_ParticleEffects = [];

        this.wheelTargetNumber = 1;
        this.spinning = false;
        this.spinEndTime = -1;

        this.TextScreen = new SafeTextScreen();

        this.Rewards = this.setupRewards();
        this.CurrentRewards = [];
        this.SafesOpened = [];

        var elementsToAdd = [
            "background_safe_minigame",
            "screen_safe_background",
            "screen_safe_win",
            "coins",
            "safe_minigame1",
            "safe_minigame2",
            "safe_minigame3",
            "safe_minigame4",
            "safe_minigame5",
            "safe_minigame6",
            "safe_minigame7",
            "safe_minigame8",
            "safe_minigame9",
            "safe_open_minigame1",
            "safe_open_minigame2",
            "safe_open_minigame3",
            "safe_open_minigame4",
            "safe_open_minigame5",
            "safe_open_minigame6",
            "safe_open_minigame7",
            "safe_open_minigame8",
            "safe_open_minigame9",
            "gold1",
            "gold2",
            "gold3",
            "gold4",
            "gold5",
            "gold6",
            "gold7",
            "gold8",
            "gold9",
            "notes1",
            "notes2",
            "notes3",
            "notes4",
            "notes5",
            "notes6",
            "notes7",
            "notes8",
            "notes9",
            "ring1",
            "ring2",
            "ring3",
            "ring4",
            "ring5",
            "ring6",
            "ring7",
            "ring8",
            "ring9",
            "support_safe_dial_minigame",
            "safe_dial_minigame",
        ];

        var p = new Particle("star1");

        for(let element of elementsToAdd) {
            this.m_GameElements.push(new GameElement(element));
        }

        this.m_ParticleEffects.push(p);

        console.log("HEHEHEH");
        console.log(this.getGameElementByName("safe_dial_minigame"));


        this.setupGame();

        setInterval(this.update.bind(this), 1000/60);
    }

    getGameElementByName(name) {
        return this.m_GameElements.filter(function(e) {
            return e.m_Name === name;
        })[0] || null;
    }

    getGameElementsByName(name) {
        return this.m_GameElements.filter(function(e) {
            return e.m_Name.search(name) === 0;
        });
    }

    setupRewards() {
        var rewardCount = [3,3,3];
        var rewards = [];

        var sum = (function() {
            return rewardCount.reduce(function(a,b) {
                return a+b;
            })
        });
        while(sum() > 0) {
            var curRewardType = Math.ceil(Math.random()*3)-1;

            if(rewardCount[curRewardType] > 0) {
                switch(curRewardType+1) {
                    case 1: rewards.push("gold");
                    case 2: rewards.push("notes");
                    case 3: rewards.push("ring");
                }
                rewardCount[curRewardType]--;
            }
        }

        return rewards;
    }


    setupGame() {
        this.getGameElementByName("safe_open_minigame1").hide();
        this.getGameElementByName("safe_open_minigame2").hide();
        this.getGameElementByName("safe_open_minigame3").hide();
        this.getGameElementByName("safe_open_minigame4").hide();
        this.getGameElementByName("safe_open_minigame5").hide();
        this.getGameElementByName("safe_open_minigame6").hide();
        this.getGameElementByName("safe_open_minigame7").hide();
        this.getGameElementByName("safe_open_minigame8").hide();
        this.getGameElementByName("safe_open_minigame9").hide();

        for(let gold of this.getGameElementsByName("gold")) {
            gold.hide();
        }
        for(let ring of this.getGameElementsByName("ring")) {
            ring.hide();
        }
        for(let note of this.getGameElementsByName("note")) {
            note.hide();
        }

        this.getGameElementByName("screen_safe_win").hide();
    this.getGameElementByName("safe_dial_minigame").m_Angle = this.wheelNumberToAngle(1);
    console.log(this.getGameElementByName("safe_dial_minigame").m_Angle);
    }

    wheelSpinTo(number) {
        this.spinTo = this.wheelNumberToAngle(number);
    }

    wheelNumberToAngle(number) {
        var wheel_step = ((Math.PI*2)/9);
        return (wheel_step*1)+(wheel_step*-(number-1));
    }

    play() {
        if(this.spinning) { return; }

        var targetGenerator = (function() {
            return Math.ceil(Math.random() * 9);
        });
        var target = targetGenerator();
        while(this.SafesOpened.includes(target)) {
            target = targetGenerator();
        }
        this.wheelTargetNumber = target;
        this.spinEndTime = Date.now() + 5000;

        this.spinning = true;
        this.TextScreen.InstructionText = "SPINNING!";
    }

    open_safe(number) {
        this.getGameElementByName("safe_minigame" + number).hide();
        this.getGameElementByName("safe_open_minigame" + number).show();
        this.TextScreen.setText(number);
        this.TextScreen.InstructionText = "SAFE " + number.toString();

        this.getGameElementByName(this.Rewards[number] + number.toString()).show();

        this.CurrentRewards.push(this.Rewards[number]);
        var rewardsEarned = this.CurrentRewards.length;

        this.SafesOpened.push(number);

        if(rewardsEarned.length === 1) { return; }
        if(this.CurrentRewards[rewardsEarned-1] === this.CurrentRewards[rewardsEarned-2]) {
            this.TextScreen.InstructionText = "WIN";
            this.TextScreen.win();
            this.getGameElementByName("screen_safe_win").show();
        }
        if(rewardsEarned.length === 4) {
            this.TextScreen.InstructionText = "LOSE";
        }

    }

    update() {

        var wheel = this.getGameElementByName("safe_dial_minigame");

        var checktargetmath = (this.wheelTargetNumber === 9) ? 0 : this.wheelTargetNumber;
        if(Date.now() >= this.spinEndTime
        && ((wheel.m_Angle >= this.wheelNumberToAngle(checktargetmath) - 0.04) && (wheel.m_Angle <= this.wheelNumberToAngle(checktargetmath) + 0.04)) && this.spinning) {
            this.spinning = false;
            this.open_safe(this.wheelTargetNumber);
        }
        if(this.spinning) {
            wheel.m_Angle -= 0.04;
        }
        if(wheel.m_Angle <= -4.88)
        {
            wheel.m_Angle = this.wheelNumberToAngle(0);
        }

        for(let element of this.m_GameElements) {
            element.update();
        }
        for(let particle of this.m_ParticleEffects) {
            particle.update();
        }
    }
}
