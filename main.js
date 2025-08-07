// main.js
// Starfield generation and animation
// Select whichever canvas exists: #starfield on the main site or #backgroundCanvas on the whitepaper
const canvas = document.getElementById('starfield') || document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let width, height;
const stars = [];

// Create a collection of falling stars for an extra layer of motion
const fallingStars = [];

// Initialise falling stars with random positions and speeds
function initFallingStars(count = 25) {
  for (let i = 0; i < count; i++) {
    fallingStars.push({
      x: Math.random() * width,
      y: Math.random() * -height,
      length: 10 + Math.random() * 20,
      speed: 2 + Math.random() * 3,
    });
  }
}

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
// Initialise a moderate number of stars
for (let i = 0; i < 150; i++) {
  stars.push({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 1.5 });
}

// Kick off the falling stars
initFallingStars(25);
function drawStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  stars.forEach((star) => {
    ctx.globalAlpha = 0.5 + Math.random() * 0.5;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw falling stars as streaks
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 2;
  fallingStars.forEach((fStar) => {
    ctx.beginPath();
    ctx.moveTo(fStar.x, fStar.y);
    ctx.lineTo(fStar.x - fStar.length * 0.2, fStar.y + fStar.length);
    ctx.stroke();
  });
  // Update positions of falling stars
  fallingStars.forEach((fStar) => {
    fStar.y += fStar.speed;
    fStar.x -= fStar.speed * 0.2;
    if (fStar.y > height || fStar.x < 0) {
      // Reset star to the top with a new random position
      fStar.x = Math.random() * width;
      fStar.y = -Math.random() * height;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();
// Tokenomics donut chart using Chart.js
const chartCtx = document.getElementById('supplyChart').getContext('2d');
new Chart(chartCtx, {
  type: 'doughnut',
  data: {
    // Updated tokenomics distribution reflecting circulation, treasury/liquidity,
    // team/development and burned supply. Percentages are approximated
    // based on current supply and Solscan holder distribution.
    labels: ['Circulating', 'Treasury & Liquidity', 'Team/Dev', 'Burned'],
    datasets: [
      {
        data: [47, 23, 17, 13],
        backgroundColor: ['#ffd700', '#ff3860', '#00c2cb', '#9b59b6'],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: { display: false },
    },
  },
});
// Sample tweets feed
const tweets = [
  { text: 'Just bonked my way through the cosmos 🚀🌌 #GBONK #Solana', time: '2h' },
  { text: 'When your bags hit the moon and you’re still holding 🙌💎 #DiamondHands', time: '8h' },
  { text: 'The only rug we know is the one our dog sleeps on 🐕🛋️ #RugProof', time: '1d' },
  { text: 'Staking? More like snacking on gains 🍪🍪 $GBONK', time: '2d' },
  { text: 'Universal domination is one bonk away 👽🎯 #RoadToMars', time: '3d' },
  { text: 'Warning: Exposure to $GBONK may cause uncontrollable laughter 😂🌙', time: '4d' },
];
const tweetFeed = document.getElementById('tweet-feed');
tweets.forEach((tweet) => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>@GalacticBonk</strong> • <span>${tweet.time}</span><br>${tweet.text}`;
  li.className = 'border p-3 rounded-lg bg-cosmicNavy text-gbonkYellow';
  tweetFeed.appendChild(li);
});

// Highlight the tokenomics donut chart when hovering over each list item. This
// subtle interaction draws the eye to the chart and reinforces the connection
// between the numbers and the graphic. We select all list items under the
// tokenomics section and apply a CSS filter to brighten the chart canvas on
// mouse enter and reset on mouse leave.
const tokenItems = document.querySelectorAll('#tokenomics ul li');
const chartCanvas = document.getElementById('supplyChart');
tokenItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    // Increase brightness slightly when a tokenomics list item is hovered
    chartCanvas.style.filter = 'brightness(1.4)';
  });
  item.addEventListener('mouseleave', () => {
    // Reset brightness back to normal
    chartCanvas.style.filter = 'brightness(1)';
  });
});

// Wallet connection logic
// This function attempts to connect to one of the supported wallets (Phantom on Solana,
// Binance Chain Wallet or Trust Wallet on EVM chains). It updates the UI with the
// connected address or displays an error if no wallet is available. The Connect
// Wallet button and address field are in the Buy section.
const connectBtn = document.getElementById('connect-wallet');
const walletAddressElem = document.getElementById('wallet-address');

async function connectWallet() {
  if (!connectBtn) return;
  // Disable the button while attempting to connect
  connectBtn.disabled = true;
  connectBtn.textContent = 'Connecting…';
  try {
    // Phantom (Solana)
    if (window.solana && window.solana.isPhantom) {
      const resp = await window.solana.connect();
      walletAddressElem.textContent = `Connected: ${resp.publicKey.toString()}`;
      connectBtn.textContent = 'Connected';
      return;
    }
    // Binance Chain Wallet (EVM)
    if (window.BinanceChain) {
      const accounts = await window.BinanceChain.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        walletAddressElem.textContent = `Connected: ${accounts[0]}`;
        connectBtn.textContent = 'Connected';
        return;
      }
    }
    // Trust Wallet or any EVM wallet exposing window.ethereum
    if (window.ethereum) {
      // Some wallets (MetaMask, Trust Wallet) expose isTrust or isTrustWallet flags
      const isTrust = window.ethereum.isTrust || window.ethereum.isTrustWallet;
      // Request accounts only if the provider is installed
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        walletAddressElem.textContent = `Connected: ${accounts[0]}`;
        connectBtn.textContent = 'Connected';
        return;
      }
    }
    // If no wallet found, inform the user
    alert('No supported wallet detected. Please install Phantom, Binance Chain Wallet or Trust Wallet.');
    connectBtn.textContent = 'Connect Wallet';
  } catch (err) {
    console.error('Wallet connection error', err);
    alert('Failed to connect to wallet. Please try again.');
    connectBtn.textContent = 'Connect Wallet';
  } finally {
    connectBtn.disabled = false;
  }
}
if (connectBtn) {
  connectBtn.addEventListener('click', connectWallet);
}