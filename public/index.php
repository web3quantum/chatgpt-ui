<?php
require_once __DIR__ . '/../config/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SCAI Wallet Connect</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold mb-6 text-center">Connect SCAI ID</h1>
            <div id="walletSection" class="space-y-4">
                <button id="connectWallet" class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Connect CoinMask Wallet
                </button>
            </div>
            <div id="verificationForm" class="hidden space-y-4 mt-6">
                <input type="text" id="scaiId" placeholder="Enter SCAI ID" class="w-full p-2 border rounded">
                <input type="email" id="email" placeholder="Enter email" class="w-full p-2 border rounded">
                <button id="verify" class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                    Verify and Link
                </button>
            </div>
        </div>
    </div>
    <script src="/js/wallet.js"></script>
</body>
</html>