let isVip = false;
let currentPlatform = 'youtube';

function switchPhase(phaseNum) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    const phase = document.getElementById(`phase${phaseNum}`);
    if (phase) phase.classList.add('active');
}

function switchMode(mode) {
    if (mode === 'vip' && !isVip) {
        // Modal will be added in Step 2
        console.log("VIP Mode activation requested");
    } else {
        setVipMode(false);
    }
}

function setVipMode(active) {
    isVip = active;
    const body = document.body;
    if (active) body.classList.add('vip-active');
    else body.classList.remove('vip-active');
}

function showError(msg) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.innerText = msg;
    errorMsg.style.display = 'block';
}
