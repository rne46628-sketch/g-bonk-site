// main.js
// Starfield generation and animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let width, height;
const stars = [];
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
function drawStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  stars.forEach((star) => {
    ctx.globalAlpha = 0.5 + Math.random() * 0.5;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();
// Tokenomics donut chart using Chart.js
const chartCtx = document.getElementById('supplyChart').getContext('2d');
new Chart(chartCtx, {
  type: 'doughnut',
  data: {
    labels: ['Liquidity Pool', 'Community', 'Treasury'],
    datasets: [
      {
        data: [50, 25, 25],
        backgroundColor: ['#ffd700', '#ff3860', '#00c2cb'],
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