// Données des produits
const products = [
    { title: "Moonbeam", link: "https://gomoonbeam.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png" },
    { title: "Cursor", link: "https://cursor.so", thumbnail: "https://aceternity.com/images/products/thumbnails/new/cursor.png" },
    { title: "Rogue", link: "https://userogue.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/rogue.png" },
    { title: "Editorially", link: "https://editorially.org", thumbnail: "https://aceternity.com/images/products/thumbnails/new/editorially.png" },
    { title: "Editrix AI", link: "https://editrix.ai", thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png" },
    { title: "Pixel Perfect", link: "https://app.pixelperfect.quest", thumbnail: "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png" },
    { title: "Algochurn", link: "https://algochurn.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png" },
    { title: "Aceternity UI", link: "https://ui.aceternity.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png" },
    { title: "Tailwind Master Kit", link: "https://tailwindmasterkit.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png" },
    { title: "SmartBridge", link: "https://smartbridgetech.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png" },
    { title: "Renderwork Studio", link: "https://renderwork.studio", thumbnail: "https://aceternity.com/images/products/thumbnails/new/renderwork.png" },
    { title: "Creme Digital", link: "https://cremedigital.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/cremedigital.png" },
    { title: "Golden Bells Academy", link: "https://goldenbellsacademy.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png" },
    { title: "Invoker Labs", link: "https://invoker.lol", thumbnail: "https://aceternity.com/images/products/thumbnails/new/invoker.png" },
    { title: "E Free Invoice", link: "https://efreeinvoice.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png" },
  ];
  
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }
  
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  // Main HeroParallax class
  class HeroParallax {
    constructor() {
      this.container = document.getElementById('parallax-container');
      this.scrollProgress = 0;
      this.translateX = [0, 0, 0];
      this.rotateX = 15;
      this.rotateZ = 20;
      this.translateY = -700;
      this.opacity = 0.2;
  
      this.setupRows();
      this.setupEventListeners();
      this.animate();
    }
  
    setupRows() {
      const firstRow = products.slice(0, 5);
      const secondRow = products.slice(5, 10);
      const thirdRow = products.slice(10, 15);
  
      this.container.innerHTML = `
        <div class="product-row reverse"></div>
        <div class="product-row"></div>
        <div class="product-row reverse"></div>
      `;
  
      const rows = this.container.querySelectorAll('.product-row');
      
      this.populateRow(rows[0], firstRow);
      this.populateRow(rows[1], secondRow);
      this.populateRow(rows[2], thirdRow);
    }
  
    populateRow(row, products) {
      products.forEach(product => {
        const card = this.createProductCard(product);
        row.appendChild(card);
      });
    }
  
    createProductCard(product) {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <a href="${product.link}">
          <img src="${product.thumbnail}" alt="${product.title}">
        </a>
        <h2>${product.title}</h2>
      `;
      return card;
    }
  
    setupEventListeners() {
      window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress = window.scrollY / scrollHeight;
      });
    }
  
    animate() {
      const targetRotateX = lerp(15, 0, this.scrollProgress);
      const targetRotateZ = lerp(20, 0, this.scrollProgress);
      const targetTranslateY = lerp(-700, 0, this.scrollProgress);
      const targetOpacity = lerp(0.2, 1, this.scrollProgress);
  
      this.rotateX = lerp(this.rotateX, targetRotateX, 0.1);
      this.rotateZ = lerp(this.rotateZ, targetRotateZ, 0.1);
      this.translateY = lerp(this.translateY, targetTranslateY, 0.1);
      this.opacity = lerp(this.opacity, targetOpacity, 0.1);
  
      const maxTranslate = window.innerWidth * 0.3;
      this.translateX[0] = lerp(0, -maxTranslate, this.scrollProgress);
      this.translateX[1] = lerp(0, maxTranslate, this.scrollProgress);
      this.translateX[2] = lerp(0, -maxTranslate, this.scrollProgress);
  
      this.updateStyles();
  
      requestAnimationFrame(() => this.animate());
    }
  
    updateStyles() {
      this.container.style.transform = `rotateX(${this.rotateX}deg) rotateZ(${this.rotateZ}deg) translateY(${this.translateY}px)`;
      this.container.style.opacity = this.opacity;
  
      const rows = this.container.querySelectorAll('.product-row');
      rows.forEach((row, index) => {
        row.style.transform = `translateX(${this.translateX[index]}px)`;
      });
    }
  }
  
  // Initialize the parallax effect
  document.addEventListener('DOMContentLoaded', () => {
    new HeroParallax();
  });