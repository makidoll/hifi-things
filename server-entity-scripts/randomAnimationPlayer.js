(function() {
    var script = this;

    script.anims = [
        //{"url":"qrc:///avatar/animations/hydra_pose_open_right.fbx","start":0,"end":0},
        //{"url":"qrc:///avatar/animations/hydra_pose_closed_right.fbx","start":0,"end":0},
        //{"url":"qrc:///avatar/animations/touch_point_open_right.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_point_closed_right.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_thumb_open_right.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_thumb_closed_right.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_thumb_point_open_right.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_thumb_point_closed_right.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/hydra_pose_open_left.fbx","start":0,"end":0},
        //{"url":"qrc:///avatar/animations/hydra_pose_closed_left.fbx","start":10,"end":10},
        //{"url":"qrc:///avatar/animations/touch_point_open_left.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_point_closed_left.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_thumb_open_left.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_thumb_closed_left.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_thumb_point_open_left.fbx","start":15,"end":15},
        //{"url":"qrc:///avatar/animations/touch_thumb_point_closed_left.fbx","start":15,"end":15},
        
        //{"url":"qrc:///avatar/animations/idle.fbx","start":0,"end":300},
        //{"url":"qrc:///avatar/animations/talk.fbx","start":0,"end":800},
        
        {"url":"qrc:///avatar/animations/walk_short_fwd.fbx","start":0,"end":39},
        {"url":"qrc:///avatar/animations/walk_fwd.fbx","start":0,"end":30},
        {"url":"qrc:///avatar/animations/walk_fwd_fast.fbx","start":0,"end":25},
        {"url":"qrc:///avatar/animations/jog_fwd.fbx","start":0,"end":25},
        {"url":"qrc:///avatar/animations/run_fwd.fbx","start":0,"end":21},
        {"url":"qrc:///avatar/animations/idle_to_walk.fbx","start":1,"end":13},
        {"url":"qrc:///avatar/animations/settle_to_idle.fbx","start":1,"end":59},
        {"url":"qrc:///avatar/animations/walk_short_bwd.fbx","start":0,"end":38},
        {"url":"qrc:///avatar/animations/walk_bwd_fast.fbx","start":0,"end":27},
        {"url":"qrc:///avatar/animations/jog_bwd.fbx","start":0,"end":24},
        {"url":"qrc:///avatar/animations/run_bwd.fbx","start":0,"end":16},
        {"url":"qrc:///avatar/animations/turn_left.fbx","start":0,"end":32},
        {"url":"qrc:///avatar/animations/side_step_short_left.fbx","start":0,"end":29},
        {"url":"qrc:///avatar/animations/side_step_left.fbx","start":0,"end":20},
        {"url":"qrc:///avatar/animations/walk_left.fbx","start":0,"end":35},
        {"url":"qrc:///avatar/animations/walk_left_fast.fbx","start":0,"end":21},
        {"url":"qrc:///avatar/animations/jog_left.fbx","start":0,"end":24},
        {"url":"qrc:///avatar/animations/side_step_left_fast.fbx","start":0,"end":16},
        {"url":"qrc:///avatar/animations/fly.fbx","start":1,"end":80},
        {"url":"qrc:///avatar/animations/jump_standing_launch.fbx","start":2,"end":16},
        {"url":"qrc:///avatar/animations/jump_running_launch_land.fbx","start":4,"end":15},
        {"url":"qrc:///avatar/animations/jump_standing_apex.fbx","start":0,"end":0},
        {"url":"qrc:///avatar/animations/jump_standing_land_settle.fbx","start":1,"end":6},
    ];

    script.active;
    script.entityID;

    script.getRandomAnim = function() {
        return script.anims[Math.floor(Math.random()*script.anims.length)];
    }

    script.playRandomAnim = function() {
        if (script.active==false) return;

        var anim = script.getRandomAnim();
        var fps = 120;

        var durFrames = anim.end-anim.start;
        var durMs = durFrames/fps * 1000;

        Entities.editEntity(script.entityID, {
            animation: {
                url: anim.url,
                fps: fps,
                firstFrame: anim.start,
                lastFrame: anim.end,
                currentFrame: 0,
                running: true,
                loop: false,
            }
        });

        Script.setTimeout(function() {
            script.playRandomAnim();
        }, durMs);
    }

    script.preload = function(entityID) {
        script.active = true;
        script.entityID = entityID;

        script.playRandomAnim();
    }

    script.unload = function() {
        script.active = false;
    }
})