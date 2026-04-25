console.log("Extraction Engine Initialized");

let isVip = false;
let currentPlatform = 'youtube';

// Initialize App Logic
document.addEventListener('DOMContentLoaded', () => {
    setupPlatformSelection();
    setupFetchLogic();
    setupVipUiLogic(); // New VIP specific logic
});

function setupPlatformSelection() {
    const icons = document.querySelectorAll('.platform-icon');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            icons.forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
            currentPlatform = icon.dataset.platform;
            console.log("Switched to:", currentPlatform);
        });
    });
}

function setupVipUiLogic() {
    // VIP Platform Selection
    const vipIcons = document.querySelectorAll('.vip-platform-icon');
    vipIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            vipIcons.forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
            currentPlatform = icon.dataset.platform;
            console.log("VIP Switched to:", currentPlatform);
        });
    });

    // VIP Fetch Button
    const vipFetchBtn = document.getElementById('vipFetchBtn');
    const vipUrlInput = document.getElementById('vipVideoUrl');

    if (vipFetchBtn) {
        vipFetchBtn.addEventListener('click', () => {
            const url = vipUrlInput.value.trim();
            if (!url) {
                showVipError("Priority link required.");
                return;
            }

            vipFetchBtn.disabled = true;
            vipFetchBtn.innerHTML = 'BYPASSING...';
            
            setTimeout(() => {
                vipFetchBtn.disabled = false;
                vipFetchBtn.innerHTML = 'SECURE FETCH';
                console.log("VIP Fetching:", url);
            }, 3000);
        });
    }
}

function showVipError(msg) {
    const errorMsg = document.getElementById('vipErrorMsg');
    if (!errorMsg) return;
    
    errorMsg.innerText = msg;
    errorMsg.style.display = 'block';
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 4000);
}

function switchMode(mode) {
    console.log("Mode shift:", mode);
    if (mode === 'vip') {
        if (!isVip) {
            openVipModal();
        } else {
            setVipMode(true);
        }
    } else {
        setVipMode(false);
    }
}

function openVipModal() {
    const modal = document.getElementById('vipModal');
    if (!modal) return;
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeVipModal() {
    const modal = document.getElementById('vipModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        if (!isVip) {
            const modeNormal = document.getElementById('modeNormal');
            const modeVip = document.getElementById('modeVip');
            if (modeNormal) modeNormal.classList.add('active');
            if (modeVip) modeVip.classList.remove('active');
        }
    }, 600);
}

function verifyVip() {
    const passInput = document.getElementById('vipPass');
    const btn = document.querySelector('.unlock-btn');
    
    if (passInput.value === 'VIP_X_2026') {
        isVip = true;
        setVipMode(true);
        closeVipModal();
    } else {
        btn.innerText = 'ACCESS DENIED';
        btn.style.background = 'linear-gradient(90deg, #ff4b2b, #ff416c)';
        passInput.value = '';
        setTimeout(() => {
            btn.innerText = 'UNLOCK ACCESS';
            btn.style.background = 'linear-gradient(90deg, #7000ff 0%, #4e148c 100%)';
        }, 2000);
    }
}

function setVipMode(active) {
    const body = document.body;
    const modeNormal = document.getElementById('modeNormal');
    const modeVip = document.getElementById('modeVip');

    if (active) {
        body.classList.add('vip-active');
        if (modeVip) modeVip.classList.add('active');
        if (modeNormal) modeNormal.classList.remove('active');
    } else {
        body.classList.remove('vip-active');
        if (modeNormal) modeNormal.classList.add('active');
        if (modeVip) modeVip.classList.remove('active');
    }
}

function setupFetchLogic() {
    const fetchBtn = document.getElementById('fetchBtn');
    const urlInput = document.getElementById('videoUrl');

    if (!fetchBtn) return;

    fetchBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (!url) {
            showError("Input required.");
            return;
        }

        fetchBtn.disabled = true;
        fetchBtn.innerHTML = '<span class="loader"></span> ANALYZING...';
        
        setTimeout(() => {
            fetchBtn.disabled = false;
            fetchBtn.innerHTML = 'Fetch →';
            console.log("Fetching:", url);
        }, 2500);
    });
}

function showError(msg) {
    const errorMsg = document.getElementById('errorMsg');
    if (!errorMsg) return;
    
    errorMsg.innerText = msg;
    errorMsg.style.display = 'block';
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 4000);
}

