let walletAddress = null;

async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install CoinMask to continue');
            return;
        }

        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        walletAddress = accounts[0];
        document.getElementById('walletSection').innerHTML = `
            <div class="p-3 bg-gray-100 rounded break-all text-sm">
                ${walletAddress}
            </div>
        `;
        document.getElementById('verificationForm').classList.remove('hidden');
    } catch (error) {
        alert('Failed to connect wallet: ' + error.message);
    }
}

async function verifyAndLink() {
    const scaiId = document.getElementById('scaiId').value;
    const email = document.getElementById('email').value;

    if (!scaiId || !email || !walletAddress) {
        alert('Please fill in all fields and connect your wallet');
        return;
    }

    try {
        const response = await fetch('/api/verify.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress, scaiId, email }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Verification email sent! Please check your inbox.');
        } else {
            alert(data.error || 'Verification failed');
        }
    } catch (error) {
        alert('Verification failed: ' + error.message);
    }
}

document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('verify').addEventListener('click', verifyAndLink);