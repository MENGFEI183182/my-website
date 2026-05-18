// 鼠标光圈
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// 卡片视差（高级感关键）
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 20;
    const moveY = (y - rect.height / 2) / 20;

    card.querySelector(".card-inner").style.transform =
      `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.querySelector(".card-inner").style.transform = "translate(0,0) scale(1)";
  });
});